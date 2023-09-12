<<<<<<< HEAD

=======
import axios from "axios";
>>>>>>> 6e8688a26a63a1d6e96b18b12c7ecd0e0843a5b6
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { login } from "../services/opreations/auth";
=======
import { setToken,setLoading } from "../redux/slices/authSlice";
>>>>>>> 6e8688a26a63a1d6e96b18b12c7ecd0e0843a5b6

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formData;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || ! password){
      return toast.error("Please enter email and password")
    }
<<<<<<< HEAD
    dispatch(login(email,password,navigate))
=======
    const toastId = toast.loading("Loading...")
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",{
          email,
          password,
        }
      );
      toast.success("Login Successful");
      dispatch(setToken(response.data.token))
      localStorage.setItem("token",JSON.stringify(response.data.token))
      console.log(response.data)
      navigate("/profile");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error.message);
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
>>>>>>> 6e8688a26a63a1d6e96b18b12c7ecd0e0843a5b6
  };

  return (
    <section className="h-min mt-10 mb-10 mx-auto container ">
      <div className="mx-auto p-2">
        <div className="max-w-sm mx-auto my-10 bg-slate-800 px-5 py-10 rounded shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl underline">Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label for="username">Email Address</label>
              <input
                name="email"
                value={email}
                onChange={handleChange}
                type="text"
                id="username"
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label for="password">Password</label>
              <input
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                id="password"
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-10">
              <input
                type="submit"
                value="Login"
                className="py-3 bg-[#0F172A] cursor-pointer rounded text-white font-semibold text-center w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
