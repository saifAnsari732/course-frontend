/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import img from "../Componants/images/s.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/util";
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);
// handle logout
 const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };


  return (
    <div>  
       
    <div className="flex h-screen bg-gradient-to-t from-gray-100 via-orange-200 to-blue-500">
          {/* Sidebar */}
          <div className="w-64 bg-slate-400 p-5">
            <div className="flex items-center flex-col mb-10">
              <img src={img} alt="Profile" className="rounded-full h-20 w-20" />
               {/* eslint-disable-next-line react/no-unescaped-entities */}
              <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
            </div>
            <nav className="flex flex-col space-y-4 ">
              <Link to="/admin/our-courses">
                <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
                  Our Courses
                </button>
              </Link>
              <Link to="/admin/create-course">
                <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
                  Create Course
                </button>
              </Link>
    
              <Link to="/">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                  Home
                </button>
              </Link>
              <Link to="/admin/login">
                <button
                  onClick={handleLogout}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
                >
                  Logout
                </button>
              </Link>
            </nav>
          </div>
          <div className="flex h-screen items-center justify-center ml-[8%]">
           <h1 className="text-2xl font-semibold">Welcome to Admin Dashboard</h1>
          </div>
        </div>
        </div>
    
  );
};

export default AdminDashboard;
