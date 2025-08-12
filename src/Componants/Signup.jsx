import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/util";
const Signup = () => {
  // Set up state for the form fields
  const [firstName, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [error,setError] = useState("");


const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("saif")
      const response = await axios.post(`${BACKEND_URL}/user/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },{
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error) {
        setError(error.response.data.errors);
        console.log(error,"signup failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-700 to-blue-900 bg-gray-100 ">
      <div className="w-full lg:w-[50%] max-w-[69%] sm:w-[68%] bg-gradient-to-r from-black to-blue-800 p-8 rounded-[30px] shadow-lg items-center justify-center flex flex-col ">
        <h1 className="text-2xl font-bold text-center mb-6  text-gray-400">
         Student SignUp
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-auto h-auto ">
          <div className="items-center justify-center">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-400 "
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className="w-[100%] h-[33px]  font-bold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-400"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="w-[100%] p-3 h-[35px] font-bold  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[35px] w-[100%] p-3 font-bold  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[35px] w-[100%]  p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold "
              required
            />
          </div>
          {
            error &&(
            <div className="text-red-500 text-center mb-2">{error}</div>
                
            )
          }

          <button
            type="submit"
            className=" h-[40px] w-[100%]  text-black text-lg font-semibold rounded-md bg-green-700 text-center duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <p 
          onClick={() => navigate("/admin/signup")}
          className="text-white text-center font-semibold">Admin SignUp</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
