import "react";
// import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./Componants/Home";
import Login from "./Componants/Login";
import Signup from "./Componants/Signup";
import { Toaster } from "react-hot-toast";
import Courses from "./Componants/Courses";
import Buy from "./Componants/Buy";
import Purchases from "./Componants/Purchases";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminSignup from "./Admin/Adminsignup";
import Adminlogin from "./Admin/Adminlogin";
import Admindashboard from "./Admin/Admindashboard";
import CreateCourse from "./Admin/CreateCourse";
import Updatecourse from "./Admin/Updatecourse";
import OurCoure from "./Admin/OurCoure";
function App() {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin")

  return (
    <div>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        <Route path="/Courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route
          path="/purchases"
          element={user ? <Purchases /> : <Navigate to={"/login"} />}
        />

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route
          path="/admin/dashboard"
          element={
            admin ? <Admindashboard /> : <Navigate to={"/admin/login"} />
          }
        />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/update-course/:id" element={<Updatecourse />} />
        <Route path="/admin/our-courses" element={<OurCoure />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

