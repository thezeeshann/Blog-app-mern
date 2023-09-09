import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formdData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword } = formdData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }

    try {
      await axios.post("http://localhost:8000/api/v1/auth/signup", formdData,{
        headers:{
          "Content-Type":"application/json"
        }
      });
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error.message);
      toast.error("Something went wrong")
      navigate("/signup");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="h-min mt-10 mb-10 mx-auto container ">
      <div className="mx-auto p-2">
        <div className="max-w-sm mx-auto my-10 bg-slate-800 px-5 py-10 rounded shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl underline">Sign up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {/* <form> */}
            <div className="mt-5">
              <label for="username">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                id="username"
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label for="username">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={handleChange}
                name="lastName"
                id="username"
                required
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label for="username">Email</label>
              <input
                required
                type="text"
                id="username"
                name="email"
                value={email}
                onChange={handleChange}
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label for="username">Create Password</label>
              <input
                required
                type="password"
                id="username"
                name="password"
                value={password}
                onChange={handleChange}
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label for="password">Confirm Password</label>
              <input
                required
                type="password"
                id="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-10">
              <button className="py-3 bg-[#0F172A] cursor-pointer rounded text-white font-semibold text-center w-full">
                Sign Up
              </button>
            </div>
          </form>
          {/* </form> */}
        </div>
      </div>
    </section>
  );
};

export default Signup;
