import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Login = () => {
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:""
  })

  const handleChange = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(input)
  }

  return (
    <div>
    <Navbar/>
    <div className=" flex items-center justify-center mx-auto ">
      <div id="form-div" className=" bg-white border-2 p-5 w-1/3 rounded-xl my-10">

        <form action="" onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl flex justify-center">Login</h1>

          <div className="my-5 space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="email" name="email"
            value={input.email}
            onChange={handleChange}
            />
          </div>

          <div className="my-2 space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="password"
            name="password" value={input.password} onChange={handleChange}
            />
          </div>

          <div id="radio-div" className="flex items-center justify-between">
            <RadioGroup className='flex items-center ' >
              <div className="flex items-center ">
                <Input type="radio" name="role" value="student" 
                className='cursor-pointer'
                checked={input.role==="student"}
                onChange={handleChange} />
                <Label htmlFor="option-two">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiter" className='cursor-pointer' onChange={handleChange} 
                checked={input.role==="recruiter"} />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
    
          </div>
          <Button className='w-full my-5'>Login</Button>
          <span>Don't have an account? <Link to='/signup' className="text-blue-400">Create one</Link></span>
        </form>
      </div>
    </div>
   </div> 
  );
}

export default Login