import axios from "axios";
import "react";
import { useState, } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/util";
// import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate=useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
      console.log("data");
    try {
      const {data}= await axios.post(
        `${BACKEND_URL}/user/login`,
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
     toast.success("Student login Successfull");
     localStorage.setItem("user",data.token)
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error("Student login failed");
      setError(error.response.data.errors);
    }
  };

  return (
    <div className="  text-white bg-gradient-to-r from-teal-500 to-blue-950 h-screen w-full ">
      <form
        onSubmit={SubmitHandler}
        className="flex justify-center items-center h-screen "
      >
        <div
          id="login"
          className="flex flex-col gap-2 items-center justify-center w-[400px] min-w-60 h-[450px] bg-gradient-to-r from-black to-blue-800  rounded-xl"
        >
          <h1 className="text-2xl font-bold ">Student Login</h1>
          <label className="mr-40 mt-10">Enter Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-[290px] h-[45px] text-black text-xl rounded-xl placeholder:text-black font-semibold"
            // placeholder="Email Address"
            type="text"
          /> 
          <label className="mr-44 mt-3">Enter Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:outline-none  focus:ring-2 focus:ring-blue-500 w-[290px] h-[45px] text-black text-xl rounded-xl placeholder:text-black font-semibold "
            // placeholder="Password"
            type="password"
          />
          {
            error &&(
              <div className="text-red-500 text-center mb-2">{error}</div>
            )
          
          }
          <button className="outline-none focus:ring-2 ring-blue-500  rounded-2xl hover:border border-white bg-green-400 w-60  duration-300 font-bold p-2 text-black mt-5">
            Submit
          </button>
          <p
          onClick={() => navigate("/admin/login")}
          className="mt-2 cursor-pointer">Admin Login</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
