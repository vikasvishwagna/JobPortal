import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

const SignIn = () => {

  const[input, setInput] = useState({
    fullName:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  })

  const handleOnChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const handleForm = (e)=>{
    setInput({...input, file:e.target.files?.[0]})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
     console.log("inputs: ", input);
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto">
        <div
          id="form-div"
          className=" bg-white border-2 p-5 w-1/3 rounded-xl my-10"
        >
          <form action="" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl flex justify-center">Sign-up</h1>

            <div className="my-5 space-y-2">
              <Label>Full Name</Label>
              <Input type="text" placeholder="enter full name" 
              value={input.fullName} 
              name="fullName"
              onChange={handleOnChange}
              />
            </div>

            <div className="my-5 space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email" 
              name="email"
              value={input.email}
              onChange={handleOnChange}
              />
            </div>

            <div className="my-2 space-y-2">
              <Label>Phone Number</Label>
              <Input type="text" placeholder="Ph number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleOnChange}
              />
            </div>

            <div className="my-2 space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="password" 
              name="password"
              value={input.password}
              onChange={handleOnChange}
              />
            </div>

            <div id="radio-div" className="flex items-center justify-between">
              <RadioGroup className="flex items-center ">
                <div className="flex items-center ">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={handleOnChange}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="option-two">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={handleOnChange}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="option-two">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-3">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={handleForm}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <Button className="w-full my-5">SignUp</Button>
            <span>
              Already have an account?
              <Link to="/login" className="text-blue-400">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
