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

const Home = () => {
  // HOOKS
  const [courses, setCourses] = useState([]);
  const [islogedin, setLogedin] = useState(false);

  const handelLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success("Logout Successfull");
      localStorage.removeItem("user");
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
    <div className=" sm:h-[2000px] lg:h-[1200px] max-h-[1500px]   text-white bg-gradient-to-r from-black to-blue-950   ">
      <div className=" max-w-[1200px] mx-auto   ">
        {/* Header */}
        <header className=" flex items-center justify-between fixed z-idex-50 w-[80%] bg-transparent">
          <div className="  flex items-center w-[265px] max-w-[70%]  ">
            <img
              className=" absolute   text-orange-400 mr-20 mt- w-[300px] h-[200px] "
              src={img}
              alt=""
            />
            {/* <h1 className="text-3xl font-bold text-orange-400 "></h1> */}
          </div>
          <div id="login"
           className="lg:flex-row space-x-4 flex items-center py-4 mt-2   ">
            {islogedin ? (
              <button
                onClick={handelLogout}
                to={"/Login"}
                className="bg-transparent px-5 py-1.5 border border-teal-500 max-w[330px] font-bold rounded-3xl shadow-xl  "
              >
                Logout
              </button>
            ) : (
              <div id="login" className="gap-2 ">
                <Link
                  to={"/Login"}
                  className="bg-transparent px-6  py-2 border border-zinc-400 max-w[330px] font-bold rounded-full shadow-xl   "
                   id="lo"
                >
                  Login
                </Link>
                <Link
                  to={"/Signup"}
                  className="bg-transparent m-3 px-5 py-2 border border-zinc-400 max-w-[330px] rounded-3xl font-bold  shadow-xl   "
                id="snp"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </header>
        {/* main section */}
        <section
          id="s"
          className=" flex flex-col items-center justify-center h-90"
        >
          <div id="text" className="word span font-semibold ml-12">
            <span className="text-cyan-300">H</span>
            <span className="text-cyan-300">E</span>
            <span className="text-cyan-300">L</span>
            <span className="text-cyan-300">L</span>
            <span className="text-cyan-300">0</span>
            <span>C</span>
            <span>O</span>
            <span>D</span>
            <span>E</span>
            <span>R</span>


          </div>
  
            <div className="body  ">
            <p className="animated-paragraph ">PLZ SEARCH YOUR USEFULL COURSE</p>
          </div>
          <p className=" text-gray-400 text-xl font-semibold sm:text-wrap text-center "></p>
          <br />
          <div id="exp" className="  flex space-x-4 gap-6  md:flex-row flex-col mb-6 ">
            <Link 
              to={"/Courses"}
              className="sap  max-w[417px] rounded-full cursor-pointer border-2 hover:border-2 border-sky-500 py-2 px-5  font-bold text-white  duration-200 "
            
            >
              Explore Course
            </Link>

            <Link 
          
              to={"https://github.com/saifAnsari732"}
              className=" max-w[417px] rounded-full border   hover:border-2 border-teal-400 p-2  font-bold text-white  duration-200"
            >
              Explore All Code
            </Link>
          </div>
        </section>
        <section>
          <Slider {...settings}>
            {courses.map((course, id) => {
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
                        className=" rounded-3xl  hover:bg-orange-400 py-2 px-4 text-xl">
                          Enroll Now
                        </Link>
                         
                      </div>
                      {/* <p className="text-center">{course.description}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
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
              <h3>Quick Links</h3>
              <ul>
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
                <li>Email: info@example.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 Main St, City, Country</li>
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
