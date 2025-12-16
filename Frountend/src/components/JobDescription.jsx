import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATIONS_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";
import { toast } from "sonner";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyNow = async () => {
    try {
      const res = await axios.post(
        `${APPLICATIONS_API_END_POINT}/applyJob/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    console.log("USER:", user);
    console.log("JOB:", singleJob);
  }, [user, singleJob]);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        dispatch(setSingleJob(null)); // clear old data
        const res = await axios.get(`${JOB_API_END_POINT}/getById/${jobId}`, {
          withCredentials: true,
        });
        //console.log("JOB DATA --->", res.data.job);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  useEffect(() => {
    if (singleJob && user?._id) {
      const applied = singleJob.applications?.some(
        (application) =>
          application?.applicant?._id === user?._id ||
          application?.applicant === user?._id
      );
      setIsApplied(applied);
    }
  }, [singleJob, user?._id]);

  return (
    <div className="max-w-4xl my-25 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <button
          onClick={isApplied ? null : handleApplyNow}
          disabled={isApplied}
          className={`rounded-full px-3 py-3 text-white font-medium ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] cursor-pointer"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      <h1 className="font-medium text-2xl my-8 border-b-gray-800 border-b-2">
        Job Description
      </h1>

      <h1 className="font-bold my-2 text-xl">
        Role:{" "}
        <span className="font-normal text-xl ml-2">{singleJob?.title}</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Location:{" "}
        <span className="font-normal text-xl ml-2">{singleJob?.location}</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Description:{" "}
        <span className="font-normal text-xl ml-2">
          {singleJob?.description}
        </span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Experience:{" "}
        <span className="font-normal text-xl ml-2">
          {singleJob?.experienceLevel}
        </span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Salary:{" "}
        <span className="font-normal text-xl ml-2">
          {singleJob?.salary} LPA
        </span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Total Applications:{" "}
        <span className="font-normal text-xl ml-2">
          {singleJob?.applications?.length}
        </span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Posted Date:{" "}
        <span className="font-normal text-xl ml-2">
          {singleJob?.createdAt?.split("T")[0]}
        </span>
      </h1>
    </div>
  );
};

export default JobDescription;

// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "@/redux/jobSlice";
// import {
//   APPLICATIONS_API_END_POINT,
//   JOB_API_END_POINT,
// } from "@/utils/constants";
// import { toast } from "sonner";

// const JobDescription = () => {
//   const { user } = useSelector((store) => store.job);
//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();
//   const { singleJob } = useSelector((store) => store.job);
//   // const isInitallyApplied = singleJob?.applications?.some(
//   //   (application) =>
//   //     application?.applicant === user?._id ||
//   //     application?.applicant?._id === user?._id  );
//   const [isApplied, setIsApplied] = useState(false);

//   const handleApplyNow = async () => {
//     try {
//       const res = await axios.post(
//         `${APPLICATIONS_API_END_POINT}/applyJob/${jobId}`,
//         {},
//         { withCredentials: true }
//       );
//       // console.log(res);
//       if (res.data.success) {
//         setIsApplied(true);
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//          dispatch(setSingleJob(null));
//         const res = await axios.get(`${JOB_API_END_POINT}/getById/${jobId}`, {
//           withCredentials: true,
//         });
//         console.log("JOB DATA --->", res.data.job);
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) =>
//                 application?.applicant?._id === user?._id ||
//                 application?.applicant === user?._id
//             )
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//    useEffect(() => {
//     if (singleJob && user?._id) {
//       const applied = singleJob.applications?.some(
//         (application) =>
//           application?.applicant?._id === user?._id ||
//           application?.applicant === user?._id
//       );
//       setIsApplied(applied);
//     }
//   }, [singleJob, user?._id]);

//   return (
//     <div className="max-w-4xl my-25 mx-auto">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge className={"text-blue-700 font-bold"} variant="ghost">
//               {" "}
//               {singleJob?.positions} Positions
//             </Badge>
//             <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//               {singleJob?.salary} LPA
//             </Badge>
//           </div>
//         </div>

//         <button
//           onClick={isApplied ? null : handleApplyNow}
//           disabled={isApplied}
//           className={`rounded-full px-3 py-3 text-white font-medium ${
//             isApplied
//               ? "bg-gray-400 cursor-not-allowed "
//               : "bg-[#7209b7] cursor-pointer"
//           } `}
//         >
//           {isApplied ? "Applied" : "Apply Now"}
//         </button>
//       </div>

//       <h1 className=" font-medium  text-2xl my-8   border-b-gray-800 border-b-2">
//         Job Description
//       </h1>

//       <h1 className="font-bold my-2 text-xl">
//         Role:{" "}
//         <span className="font-normal text-xl ml-2">{singleJob?.title}</span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl">
//         Location:{" "}
//         <span className="font-normal text-xl ml-2">{singleJob?.location}</span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl ">
//         Description:{" "}
//         <span className="font-normal text-xl ml-2">
//           {singleJob?.description}
//         </span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl">
//         Experience:{" "}
//         <span className="font-normal text-xl ml-2">
//           {singleJob?.experienceLevel}
//         </span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl">
//         Salary:{" "}
//         <span className="font-normal text-xl ml-2">
//           {singleJob?.salary} LPA
//         </span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl">
//         Total Applications:{" "}
//         <span className="font-normal text-xl ml-2">
//           {singleJob?.applications?.length}
//         </span>
//       </h1>
//       <h1 className="font-bold my-2 text-xl">
//         Posted Date:{" "}
//         <span className="font-normal text-xl ml-2">
//           {singleJob?.createdAt.split("T")[0]}
//         </span>
//       </h1>
//     </div>
//   );
// };

// export default JobDescription;
