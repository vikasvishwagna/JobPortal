import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// recruiter post the job.
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//based on keyword
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || " ";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

// no of jobs created by admin.
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ success: false, message: "Missing input" });
    }

    const prompt = `
You are a job-search assistant. Extract structured search filters from the user's sentence.
Return ONLY JSON with keys: role, location, company, skills (array).
Input: """${input}"""
Example output:
{
  "role": "full stack developer",
  "location": "Hyderabad",
  "company": "",
  "skills": ["react", "nodejs"]
}
If a field is not present, return empty string or empty array.
    `.trim();

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
    });

    console.log("aiResp: ", aiResponse)
    
    const raw = aiResponse?.text ?? aiResponse?.response?.text ?? "";
    let filters = {
      role: "",
      location: "",
      company: "",
      skills: [],
    };

    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : raw;
      const parsed = JSON.parse(jsonString);

      filters.role = parsed.role ?? "";
      filters.location = parsed.location ?? "";
      filters.company = parsed.company ?? "";
      filters.skills = Array.isArray(parsed.skills)
        ? parsed.skills
        : parsed.skills
        ? [parsed.skills]
        : [];
    } catch (parseErr) {
      
      console.warn(
        "Could not parse model JSON, falling back to simple heuristics:",
        parseErr
      );
      const lower = raw.toLowerCase();
      if (lower.includes("hyderabad")) filters.location = "Hyderabad";
    }

    const query = {};

// ROLE from Gemini → search inside title or description
if (filters.role) {
  query.$or = [
    { title: { $regex: filters.role, $options: "i" } },
    { description: { $regex: filters.role, $options: "i" } }
  ];
}

// LOCATION
if (filters.location) {
  query.location = { $regex: filters.location, $options: "i" };
}

// COMPANY (company is an ObjectId) →
// We cannot directly match text here.
// So we fallback to OR match against description/title.
if (filters.company) {
  query.$or = [
    ...(query.$or || []),
    { title: { $regex: filters.company, $options: "i" } },
    { description: { $regex: filters.company, $options: "i" } }
  ];
}

// SKILLS → your model uses "requirements: [String]"
if (filters.skills?.length > 0) {
  query.requirements = {
    $in: filters.skills.map(s => new RegExp(s, "i"))
  };
}

// FALLBACK → if no filters extracted
if (Object.keys(query).length === 0) {
  const q = input.trim();
  query.$or = [
    { title: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } },
    { requirements: { $in: [new RegExp(q, "i")] } },
  ];
}


    // 3) Execute DB query
    const jobs = await Job.find(query).limit(100).populate({
        path: "company",
      }).lean();

    // 4) Return results + the parsed filters
    return res.status(200).json({
      success: true,
      filters,
      jobs,
      rawModelText: raw, // optional: helpful for debugging
    });
  } catch (err) {
    console.error("searchWithAi error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
