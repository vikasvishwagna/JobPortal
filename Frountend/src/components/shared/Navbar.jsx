import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import {  LogOut, User2 } from "lucide-react";

function Navbar() {
  const user = true;

  return (
    <div className="bg-white">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="">
          <h1 className="text-2xl font-bold">
            Job <span className="text-red-600">Portal</span>
          </h1>
        </div>

        <div id="right-items" className=" flex items-center gap-12">
          <ul className="flex font-medium items-center gap-2">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browser</li>
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Button variant="outline">login</Button>
              <Button>signup</Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    className="rounded-full object-cover"
                    src="https://github.com/shadcn.png"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-2 rounded-2xl p-5 mt-1 mx-2 bg-gray-200">
                <div id="popover-box">
                  <div className="flex items-center gap-2 ">
                    <div>
                      <Avatar>
                        <AvatarImage
                          className="rounded-full object-cover w-10 h-10"
                          src="https://github.com/shadcn.png"
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium">Full stack developer</p>
                      <p className="font-light">
                        Transforming ideas into powerfull solutions!
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-5 mx-2">
                      <User2 />
                      <Button variant="link">view profile</Button>
                    </div>
                    <div className="flex items-center gap-5 mx-2">
                      <LogOut />
                      <Button variant="link">logOut</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
