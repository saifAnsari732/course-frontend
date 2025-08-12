import  'react'

import axios from "axios";
import "react";
import { useState, } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../utils/util';

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate=useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data}= await axios.post(
        `${BACKEND_URL}/admine/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     toast.success("login Successfull");
     localStorage.setItem("admin",data.token)
    setTimeout(() => {   
      navigate("/admin/dashboard");
    }, 1200);
    } catch (error) {
      toast.error("Admin not found")
      setError(error.response.data.errors);
    }
  };

  return (
    <div className="  text-white bg-gradient-to-r from-black to-blue-950 h-screen w-full ">
      <form
        onSubmit={SubmitHandler}
        className="flex justify-center items-center h-screen "
      >
        <div
          id="login"
          className="flex flex-col gap-4 items-center justify-center w-[500px] min-w-55 h-[450px] bg-gradient-to-r from-teal-800 to-blue-900  rounded-xl"
        >
          <h1 className="text-2xl font-bold ">Admin Login</h1>
          <label className="mr-40 mt-10">Enter Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-[290px] h-[45px] text-black text-xl rounded-xl placeholder:text-black font-semibold"
            type="text"
          />
          <label className="mr-44 mt-3">Enter Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-[290px] h-[45px] text-black text-xl rounded-xl placeholder:text-black font-semibold "
            type="password"
          />
          {
            error &&(
              <div className="text-red-500 text-center mb-2">{error}</div>
            )
          
          }
          <button className="focus:outline-none focus:ring-2 mt-5 focus:ring-blue-500  rounded-2xl hover:border border-white bg-green-400 w-60  duration-300 font-bold p-2 hover:text-black ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


export default Adminlogin