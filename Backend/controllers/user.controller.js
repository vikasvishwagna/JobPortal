import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    const file  = req.file;

    let cloudinaryUrl;
    if(file){
      const fileuri = getDataUri(file);
      cloudinaryUrl = await cloudinary.uploader.upload(fileuri.content, {
        resource_type: 'image'
      })
    }


    // console.log(fullName, email, phoneNumber, password, role)

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        sucess: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        sucess: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto: cloudinaryUrl.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "invalid email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "account doestn exist with corrent role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    console.log("tokenData:", tokenData);//tokenData: { userId: new ObjectId('69027d38e9de6577c87b5e5c') }

    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log("token", token)//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTAyN2QzOGU5ZGU2NTc3Yzg3YjVlNWMiLCJpYXQiOjE3NjIzMzIwOTQsImV4cCI6MTc2MjQxODQ5NH0.GHBwgXFEjEVBPr27H2famjOSr82f3PwB7CNKWWkHKiM

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // console.log("req.file:", req.file);

    // cloudinary 
    let cloudResponse;
      if (file) {
      const fileUri = getDataUri(file);
       cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
    });

    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map(skill => skill.trim());
    }

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; 
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    // console.log("user d:", user)

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


/**notes:
 *  const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });1. A JWT token is created by combining the payload (like userId, email), a secret key (process.env.ACCESS_TOKEN_SECRET), and an expiry time using jwt.sign(). This generates a digitally signed string that can be stored in cookies or headers. Later, when verified using jwt.verify(), it checks the token’s validity and returns the original payload(like userId, email) along with fields like iat (issued at) and exp (expiry), ensuring both data integrity and authentication.
 */