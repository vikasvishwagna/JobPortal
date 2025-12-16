import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USERS_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AiSearchButton from "./AiSearchButton";


function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USERS_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 rounded">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="">
          <h1 className="text-2xl font-bold">
            <Link to="/">
              Next <span className="text-red-600">Hire</span>
            </Link>
          </h1>
        </div>

        <div id="right-items" className=" flex items-center gap-12">
          <ul className="flex font-medium items-center gap-3">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li >
                  <Link to="/searchwithai"> <AiSearchButton /> </Link>
                </li>

                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">login</Button>
              </Link>
              <Link to="/signup">
                <Button>signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    className="rounded-full object-cover cursor-pointer"
                    src={
                      user?.profile?.profilePhoto
                        ? user.profile.profilePhoto
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-2 rounded-2xl p-5 mt-1 mx-2 bg-gray-300">
                <div id="popover-box">
                  <div className="flex items-center gap-10 mb-5 ">
                    <div>
                      <Avatar>
                        <AvatarImage
                          className="rounded-full object-cover w-10 h-10"
                          src={
                            user?.profile?.profilePhoto
                              ? user?.profile?.profilePhoto
                              : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                          }
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium">{user?.fullName}</p>
                      <p className="font-light">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-5 mx-2">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link" className="cursor-pointer">
                            view profile
                          </Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-5 mx-2">
                      <LogOut />
                      <Button
                        onClick={handleLogout}
                        variant="link"
                        className="cursor-pointer"
                      >
                        logOut
                      </Button>
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
