import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "lsekdhjgdsnfvsdkjf";


  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {/* {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`} */}
            created on
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            {/* <AvatarImage src={job?.company?.logo} /> */}
            <AvatarImage src='https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_204,dpr_1.25/f_auto,q_auto/v1719942403/ideas-and-advice-prod/blogadmin/nasa-logo/nasa-logo.png?_i=AA' />
          </Avatar>
        </Button>
        <div>
          {/* <h1 className="font-medium text-lg">{job?.company?.name}</h1> */}
          <h1 className="font-medium text-lg">company name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">jobtitle</h1>
        <p className="text-sm text-gray-600">job description</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
           Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          jobType
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={()=>navigate('/description/jobId')}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
