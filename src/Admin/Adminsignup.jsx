/* eslint-disable no-unused-vars */
import "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import img from "../Componants/images/l.png";
import { BACKEND_URL } from "../utils/util";

const Adminsignup = () => {
  // Set up state for the form fields
  const [firstName, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [islogedin, setLogedin] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("saif");
      const response = await axios.post(
        `${BACKEND_URL}/admine/signup`,
        {
          firstName,
          lastName,
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
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      if (error) {
        setError(error.response.data.errors);
        console.log(error, "signup failed");
      }
    }
  };

  return (
  <div>  
      {/* <header className=" flex items-center justify-between fixed z-idex-50 w-[95%] bg-transparent text-white ">
          <div className="  flex items-center w-[265px] max-w-[70%]  ">
            <img
              className=" absolute   text-orange-400 mr-20 mt- w-[300px] h-[200px] "
              src={img}
              alt=""
            />
          </div>
          <div id="login"
           className="lg:flex-row space-x-4 flex items-center py-4 mt-2   ">
            {islogedin ? (
              <button
                // onClick={handelLogout}
                to={"/Login"}
                className="bg-transparent px-5 py-1.5 border border-zinc-400 max-w[330px] font-bold rounded-3x shadow-xl  "
              >
                Logout
              </button>
            ) : (
              <div id="login" className="gap-2 ">
                <Link
                  to={"/admin/Login"}
                  className="bg-transparent px-6  py-2 border border-zinc-400 max-w[330px] font-bold rounded-full shadow-xl   "
                   id="lo"
                >
                  Login
                </Link>
                <Link
                  to={"/admin/Signup"}
                  className="bg-transparent m-3 px-5 py-2 border border-zinc-400 max-w-[330px] rounded-3xl font-bold  shadow-xl   "
                id="snp"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </header> */}
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-blue-900 bg-gray-100 ">     
      <div className="w-full lg:w-[50%] max-w-[69%] sm:w-[68%] bg-gradient-to-r from-green-800 to-blue-900 p-8 rounded-lg shadow-lg items-center justify-center flex flex-col gap-4">
      
        <h1 className="text-2xl font-bold text-center mb-6  text-gray-400">
         Admin SignUp
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-auto h-auto ">
          <div className="items-center justify-center">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-black "
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className="w-[100%] h-[35px]  font-bold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-black"
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
              className="block text-sm font-medium text-black"
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
              className="block text-sm font-medium text-black"
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
          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}

          <button
            type="submit"
            className=" h-[40px] w-[100%] font-semibold text-black  rounded-md bg-purple-400 text-center duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Adminsignup;
