/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import img from "../Componants/images/l.png";
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
                  {isLoggedIn ? (
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
              </header>  */}
    <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-5">
            <div className="flex items-center flex-col mb-10">
              <img src={img} alt="Profile" className="rounded-full h-20 w-20" />
              <h2 className="text-lg font-semibold mt-4">I m Admin</h2>
            </div>
            <nav className="flex flex-col space-y-4">
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
          <div className="flex h-screen items-center justify-center ml-[40%]">
            Welcome!!!
          </div>
        </div>
        </div>
    // <div className="flex h-screen bg-gray-100 font-sans">
    //   {/* Sidebar Backdrop (for mobile) */}
    //   {sidebarOpen && (
    //     <div
    //       className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    //       onClick={toggleSidebar}
    //     />
    //   )}

    //   {/* Sidebar */}
    //   <div
    //     className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform ${
    //       sidebarOpen ? "translate-x-0" : "-translate-x-full"
    //     } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    //   >
    //     <div className="flex items-center mt-8 justify-between p border-b">
    //       <img className="h-52 absolute " src={img} alt="" />
         
    //       {/* <h1 className="text-xl font-bold text-indigo-600">ShopMe</h1> */}
    //       <button
    //         onClick={toggleSidebar}
    //         className="lg:hidden absolute left-48 text-gray-500 hover:text-gray-700"
    //       >
    //         <FiX size={24} />
    //       </button>
    //     </div>

    //     <nav className="p-4">
    //       <h1 className="text-2xl  text-gray-500 font-semibold mb-4">
    //         Saif Ansari
    //       </h1>
    //       <ul className="space-y-2">
    //         <br />
    //         <li>
    //           <a
    //             href="#"
    //             className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
    //           >
    //             <FiHome className="mr-3 text-indigo-500" />
    //             <span>Create</span>
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
    //           >
    //             <FiBox className="mr-3 text-indigo-500" />
    //             <span>Update</span>
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
    //           >
    //             <FiUsers className="mr-3 text-indigo-500" />
    //             <span>Home</span>
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
    //           >
    //             <FiShoppingCart className="mr-3 text-indigo-500" />
    //             <span>Logout</span>
    //           </a>
    //         </li>
        
    //       </ul>
    //     </nav>
    //   </div>

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     {/* Top Navigation */}
    //     <header className="bg-white shadow-sm z-10">
    //       <div className="flex items-center justify-between p-4">
    //         <button
    //           onClick={toggleSidebar}
    //           className="lg:hidden text-gray-500 hover:text-gray-700"
    //         >
    //           <FiMenu size={24} />
    //         </button>

    //         <div className="flex items-center space-x-4">
    //           <div className="text-sm text-gray-500">{currentTime}</div>
    //           <div className="flex items-center">
    //             <span className="mr-2 text-sm font-medium">Saif</span>
    //             <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
    //               💹
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </header>

    //     {/* Main Content Area */}
    //     <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
    //       <div className="mb-6">
    //         <h2 className="text-2xl font-bold text-gray-800">
    //           Welcome back, Saif <span className="text-indigo-600">💹</span>
    //         </h2>
    //         <p className="text-gray-500">{currentTime}</p>
    //       </div>

    //       <div className="  text-white grid grid-cols-1 md:grid-cols-3 gap-6">
    //         {/* Products Card */}
    //         <div className="bg-green-500 p-6 rounded-lg shadow-sm border border-gray-100">
    //           <div className="flex items-center justify-between">
    //             <h3 className="text-lg font-medium ">Create</h3>
    //             <FiBox className="" size={20} />
    //           </div>
    //           <p className="mt-4 text-3xl font-bold ">5</p>
    //           <p className="mt-2 text-sm ">
    //             Total products in store
    //           </p>
    //         </div>

    //         {/* Users Card */}
    //         <div className="bg-green-600 p-6 rounded-lg shadow-sm border border-gray-100">
    //           <div className="flex items-center justify-between">
    //             <h3 className="text-lg font-medium ">Update</h3>
    //             <FiUsers className="" size={20} />
    //           </div>
    //           <p className="mt-4 text-3xl font-bold text-ray-800">5</p>
    //           <p className="mt-2 text-sm text-gay-500">
    //             Total registered users
    //           </p>
    //         </div>

    //         {/* Orders Card */}
    //         <div className="bg-green-700 p-6 rounded-lg shadow-sm border border-gray-100">
    //           <div className="flex items-center justify-between">
    //             <h3 className="text-lg font-medium text-gay-700">Home</h3>
    //             <FiShoppingCart className="text-indgo-500" size={20} />
    //           </div>
    //           <p className="mt-4 text-3xl font-bold text-gay-800">5</p>
    //           <p className="mt-2 text-sm text-gay-500">Total orders placed</p>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default AdminDashboard;
