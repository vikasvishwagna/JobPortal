import React from "react";
import { Badge } from "./ui/badge";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-4xl my-25 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {" "}
              12 Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              PartTime
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>

        <button
          disabled={isApplied}
          className={`rounded-full px-3 py-3 text-white font-medium ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed "
              : "bg-[#7209b7] cursor-pointer"
          } `}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      <h1 className=" font-medium  text-2xl my-8   border-b-gray-800 border-b-2">
        Job Description
      </h1>

      <h1 className="font-bold my-2 text-xl">
        Role:{" "}
        <span className="font-normal text-xl ml-2">Frountend Developer</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Location: <span className="font-normal text-xl ml-2">Hyderabad</span>
      </h1>
      <h1 className="font-bold my-2 text-xl" text-xl>
        Description:{" "}
        <span className="font-normal text-xl ml-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
          debitis.
        </span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Experience:{" "}
        <span className="font-normal text-xl ml-2">Frountend Developer</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Salary: <span className="font-normal text-xl ml-2">12 LPA</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Total Applications: <span className="font-normal text-xl ml-2">4</span>
      </h1>
      <h1 className="font-bold my-2 text-xl">
        Posted Date:{" "}
        <span className="font-normal text-xl ml-2">10/07/2025</span>
      </h1>
    </div>
  );
};

export default JobDescription;
