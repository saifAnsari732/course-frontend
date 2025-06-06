/* eslint-disable no-unused-vars */
import axios from 'axios';
import 'react'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaDiscourse, FaDownload } from 'react-icons/fa6';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { RiHome2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../utils/util';
const Purchases = () => {
const [purchase, setpurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errormaseg, seterrormaseg] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  console.log("purchases data: ", purchase);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      seterrormaseg("please login");
    } else {
      seterrormaseg(false);
    }
  }, []);

  // Fetch courses
  useEffect(() => {

    const fetchpurchase = async () => {
    const token = localStorage.getItem("user");

      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
           headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        // console.log(response.data.courses);
        setpurchase(response.data.courseData);
        // setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ");
      }
    };
    fetchpurchase();
  }, []);

  // Logout
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

  //side bar
 const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };




  return (
    <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
          >
            <nav>
              <ul className="mt-16 md:mt-0">
                <li className="mb-4">
                  <Link to="/" className="flex items-center">
                    <RiHome2Fill className="mr-2" /> Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/courses" className="flex items-center">
                    <FaDiscourse className="mr-2" /> Courses
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-blue-500">
                    <FaDownload className="mr-2" /> Purchases
                  </a>
                </li>
                <li className="mb-4">
                  <Link to="/settings" className="flex items-center">
                    <IoMdSettings className="mr-2" /> Settings
                  </Link>
                </li>
                <li>
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="flex items-center">
                      <IoLogOut className="mr-2" /> Logout
                    </button>
                  ) : (
                    <Link to="/login" className="flex items-center">
                      <IoLogIn className="mr-2" /> Login
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
    
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
    
          {/* Main Content */}
          <div
            className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } md:ml-64`}
          >
            <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
              My Purchases
            </h2>
    
            {/* Error message */}
            {errormaseg && (
              <div className="text-red-500 text-center mb-4">{}</div>
            )}
    
            {/* Render purchases */}
            {purchase.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {purchase.map((purchase, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      {/* Course Image */}
                      <img
                        className="rounded-lg w-full h-48 object-cover"
                        src={
                          purchase.image?.url || "https://via.placeholder.com/200"
                        }
                        alt={purchase.title}
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-bold">{purchase.title}</h3>
                        <p className="text-gray-500">
                          {purchase.description.length > 100
                            ? `${purchase.description.slice(0, 100)}...`
                            : purchase.description}
                        </p>
                        <span className="text-green-700 font-semibold text-sm">
                          ${purchase.price} only
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have no purchases yet.</p>
            )}
          </div>
        </div>
  )
}

export default Purchases





// /* eslint-disable no-unused-vars */

// import axios from "axios";
// import  { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// import { FaDiscourse, FaDownload } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";
// // import { IoLogIn, IoLogOut } from "react-icons/io5";
// import { RiHome2Fill } from "react-icons/ri";
// import { HiMenu, HiX } from "react-icons/hi"; // Icons for sidebar toggle
// import { Link, useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { FaCircleUser } from "react-icons/fa6";
// // import { BACKEND_URL } from "../utils/utils";

// function Purchases() {
//   const [purchases, setPurchase] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

//   const navigate = useNavigate();
//     const token =localStorage.getItem("user");
//   // const token = user?.token; // using optional chaining to avoid app crashing

//   // console.log("purchases: ", purchases);

//   // Token handling
//   // useEffect(() => {
 
//   //   if (token) {
//   //     setIsLoggedIn(true);
//   //   } else {
//   //     setIsLoggedIn(false);
//   //   }
//   // }, []);

//   // if (!token) {
//   //   navigate("/login");
//   // }

//   // Fetch purchases
//   useEffect(() => {
//     const fetchPurchases = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/v1/user/purchases", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });
//         console.log("responce"+response.data);
//         setPurchase(response.data.courseData);
//       } catch (error) {
//         setErrorMessage("Failed to fetch purchase data");
//         console.log(error);
//       }
//     };
//     fetchPurchases();
//   }, []);

//   // Logout
//   // const handleLogout = async () => {
//   //   try {
//   //     const response = await axios.get(`${BACKEND_URL}/user/logout`, {
//   //       withCredentials: true,
//   //     });
//   //     toast.success(response.data.message);
//   //     localStorage.removeItem("user");
//   //     navigate("/login");
//   //     setIsLoggedIn(false);
//   //   } catch (error) {
//   //     console.log("Error in logging out ", error);
//   //     toast.error(error.response.data.errors || "Error in logging out");
//   //   }
//   // };

//   // Toggle sidebar visibility
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//    <div className="flex">
//         {/* Hamburger menu button for mobile */}
//         <button
//           className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
//           onClick={toggleSidebar}
//         >
//           {isSidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle menu icon */}
//         </button>
  
//         {/* Sidebar */}
//         <aside
//           className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 md:static`}
//         >
//           <div className="flex items-center mb-10 mt-10 md:mt-0">
//             <img src="photo" alt="Profile" className="rounded-full h-12 w-12" />
//           </div>
//           <nav>
//             <ul>
//               <li className="mb-4">
//                 <a href="/" className="flex items-center">
//                   <RiHome2Fill className="mr-2" /> Home
//                 </a>
//               </li>
//               <li className="mb-4">
//                 <a href="#" className="flex items-center text-blue-500">
//                   <FaDiscourse className="mr-2" /> Courses
//                 </a>
//               </li>
//               <li className="mb-4">
//                 <a href="/purchases" className="flex items-center">
//                   <FaDownload className="mr-2" /> Purchases
//                 </a>
//               </li>
//               <li className="mb-4">
//                 <a href="#" className="flex items-center">
//                   <IoMdSettings className="mr-2" /> Settings
//                 </a>
//               </li>
//               {/* <li>
//                 {isLoggedIn ? (
//                   <Link to={"/"}
                    
//                     className="flex items-center"
//                     onClick={handleLogout}
//                   >
//                     <IoLogOut className="mr-2" /> Logout
//                   </Link>
//                 ) : (
//                   <Link to={"/login"} className="flex items-center">
//                     <IoLogIn className="mr-2" /> Login
//                   </Link>
//                 )}
//               </li> */}
//             </ul>
//           </nav>
//         </aside>
  
//         {/* Main content */}
//         <main className="ml-9 md:ml-44 sm:items-center justify-center  w-full bg-white p-10">
//           <header className="flex justify-between items-center mb-10">
//             <h1 className="text-xl font-bold">Courses</h1>
//             <div className="flex items-center space-x-3">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   placeholder="Type here to search..."
//                   className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
//                 />
//                 <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
//                   <FiSearch className="text-xl text-gray-600" />
//                 </button>
//               </div>
  
//               <FaCircleUser className="text-4xl text-blue-600" />
//             </div>
//           </header>
  
//           {/* Vertically Scrollable Courses Section */}
//           <div className="overflow-y-auto h-[75vh] ">
//             {isLoggedIn ? (
//               <p className="text-center text-gray-500 mt-36 justify-center text-3xl"> Loading.....</p>
//             )
//              : purchases.length === 0 ? (
//               // Check if courses array is empty
//               <p className="text-center text-gray-500">
//                 No course posted yet by admin
//               </p>
//             ) 
//             : (
//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {purchases.map((course) => (
//                   <div
//                     key={course._id}
//                     className="border border-gray-200 rounded-lg p-4 shadow-sm"
//                   >
//                     <img
//                       src={course.image.url}
//                       alt={course.title}
//                       className="rounded mb-4"
//                     />
//                     <h2 className="font-bold text-lg mb-2">{course.title}</h2>
//                     <p className="text-gray-600 mb-4">
//                       {/* {course.description.length > 100
//                         ? `${course.description.slice(0, 100)}...`
//                         : course.description} */}
//                     </p>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="font-bold text-xl">
//                         ₹{course.price}{" "}
//                         <span className="text-gray-500 line-through">5999</span>
//                       </span>
//                       <span className="text-green-600">20% off</span>
//                     </div>
  
//                     {/* Buy page */}
//                     <Link
//                       to={`/buy/${course._id}`} // Pass courseId in URL
//                       className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
//                     >
//                       Buy Now
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//   );
// }

// export default Purchases;
