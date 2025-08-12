import "react";
import { BACKEND_URL } from "../utils/util";
import img from "../Componants/images/l.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./images/Style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import TypewriterCourses from "./TypewriterCourses ";
import TypewriterHello from "./TypewriterHello ";
import { CircleLoader } from 'react-spinners';
const Home = () => {


  // HOOKS
  const [courses, setCourses] = useState([]);
  const [islogedin, setLogedin] = useState(false);
  const [corslogedin, setcorsLogedin] = useState(false);

  const handelLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(" user Logout Successfull");
       setTimeout(() => {
      localStorage.removeItem("user");
       }, 1200);
      setLogedin(false);
    } catch (error) {
      console.log("logout error: " + error);
      toast.error("logout error: " + error);
    }
  };
  // Token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`
        );
        setCourses(response.data.courses);
        setcorsLogedin(true)
        // console.log(response.data.courses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);
  // Slick Slider
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" sm:h-[2000px]  lg:h-[1200px] max-h-[1500px]   text-white bg-gradient-to-r from-black to-blue-950   ">
      <div className=" w-full">
        {/* Header */}
        <header className="  flex items-center  z-index-50 w-[80%]   ">
          <div className="  flex items-center w-[205px] max-w-[60%] justify-center relative ">
            <img
              className="text-orange-400 absolute mt-[80px] w-[300px] h-[200px] "
              src={img}
              alt=""
            />
            {/* <h1 className="text-3xl font-bold text-orange-400 "></h1> */}
          </div>
        
        </header>
 {/* Main Section with Beautiful Gradient Background */}
<section
  id="home"
  className="flex flex-col items-center w-full justify-center mt-20 py-12 px-4 bg-gradient-to-br from-black-300 via-purple-900 to-gray-900"
>
  {/* Animated "HELLO CODER Saif" text with typewriter effect */}
  <div className="text-4xl md:text-6xl font-bold mb-8 text-center">
    <TypewriterHello />
  </div>

  {/* Animated course names */}
  <div className="text-xl md:text-2xl font-semibold mb-8 h-10 text-cyan-300">
    <TypewriterCourses />
  </div>

  {/* Search your course text */}
  <p className="text-gray-300 text-lg md:text-xl mb-12 animate-pulse">
    PLZ SEARCH YOUR USEFULL COURSE
  </p>
  
  {/* Action Buttons */}
  <div className="flex space-x-4 gap-6 md:flex-row flex-col mb-12">
    <Link 
      to={"/Courses"}
      className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 py-3 px-8 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      Explore Course
    </Link>

    <Link 
      to={"https://github.com/saifAnsari732"}
      className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-3 px-10 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      Explore All Code
    </Link>
  </div>

  {/* Login/Signup Buttons */}
  <div className="absolute top-6 right-6  left-55 flex"> 
    {islogedin ? (
      <button
        onClick={handelLogout}
        className="bg-gradient-to-tr from-teal-500 to-teal-600 px-3 py-1.5 border border-teal-500 max-w[330px] font-bold rounded-3xl shadow-xl  "
      >
        Logout
      </button> ):( 
      <div className=" ">
    <Link 
      to={"/login"}
      className="rounded-full bg-teal-600 backdrop-blur-sm hover:bg-white/20 border border-white/30 py-2 px-7 font-medium text-white transition-all duration-300"
    >
      Login
    </Link>
    <Link 
      to={"/signup"}
      className="rounded-full bg-cyan-600 hover:bg-cyan-700 py-2 px-6 font-medium text-white transition-all duration-300"
    >
      Sign Up
    </Link>
   </div>
      )}
  </div>

</section>
        <section>
          {corslogedin?
          <Slider {...settings}>
            {
            courses.map((course, id) => {
              return (
                <div
                  key={id}
                  className="  z-222 p-4 relative flex m-5  w-92 transition-transform duration-500 transform hover:scale-105 bg-gradient-to-r from-black to-blue-950 rounded-2xl "
                >
                  <div className="">
                    <img
                      src={course.image.url}
                      alt=""
                      className="w-full h-36 object-contain g-slate-800  bg-transparent rounded-3xl bg-cover   "
                    />

                    <div className="">
                      <h2 className="text-xl font-bold text-white text-center">
                        {" "}
                        {course.title}{" "}
                      </h2>
                      <div className="flex justify-center p-5">
                        <Link
                        to={`/buy/${course._id}`}
                          className=" rounded-3xl  bg-orange-400 py-2 px-5 text-xl"
                        >
                          Enroll Now
                        </Link>
                         
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            
            
           
            }
          </Slider>:
            <div className=" h-[200px] w-full flex items-center justify-center"> 
              <h1 className="text-white text-lg font-semibold"> Loading...
               <CircleLoader color="teal" size={70} loading={true} />
             </h1>
             </div>
          }
          </section> 
        <hr />
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>
                We are a company dedicated to providing the best services in the
                industry. Our mission is to deliver excellence.
              </p>
            </div>

            <div className="footer-section">
              <h3 className=" font-semibold text-3xl">Quick Links</h3>
              <ul className="text-xl ">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul>
                <li>Email: saifansari@mail.com</li>
                <li>Phone: +91 9905234866</li>
                <li>Address: 123, Lucknow, Uttar Pradesh</li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="/">
                  <FaFacebook className="text-2xl bg-blue-600 rounded-full  font-semibold" />
                </a>
                <a href="/">
                  <FaInstagram className="text-2xl bg-red-600 rounded-full  font-semibold" />
                </a>
                <a href="/">
                  <FaTelegram className="text-2xl bg-blue-600 rounded-full font-semibold" />
                </a>
                <a href="/">
                  <FaTelegram className="text-2xl bg-blue-600 rounded-full font-semibold" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
