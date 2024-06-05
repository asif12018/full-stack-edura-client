import { createBrowserRouter } from "react-router-dom";
import Main from "../../Root/Main/Main";
import Home from "../../Pages/Home/Home";
import Contact from "../../Pages/Contact/Contact";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import TeachOnEdura from './../../Pages/TeachOnEdura/TeachOnEdura';
import Dashboard from "../../Pages/Dashboard/Dashboard";
import MyEnrollCourses from './../../components/MyEnrollCourses/MyEnrollCourses';
import StudentProfile from './../../components/StudentProfile/StudentProfile';
import TeacherRequest from './../../components/TeacherRequest/TeacherRequest';
import AllUsers from '../../components/AllUsers/AllUsers.jsx'
import AllCourses from "../../components/AllCourses/AllCourses.jsx";
import AddCourse from './../../components/AddCourse/AddCourse';
import MyCourses from '../../components/MyCourses/MyCourses.jsx'
import Profile from './../../components/Profile/Profile';
import AvailableCourse from "../../Pages/AvailableCourse/AvailableCourse.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/contact",
          element:<Contact></Contact>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/joinEdura",
          element:<TeachOnEdura></TeachOnEdura>
        },
        {
          path:'allAvailableClass',
          element:<AvailableCourse></AvailableCourse>
        }
      ]
    },
    {
      path:"dashboard",
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'myEnroll',
          element:<MyEnrollCourses></MyEnrollCourses>
        },
        {
          path:'studentProfile',
          element:<StudentProfile></StudentProfile>
        },
        {
          path:'teacherRequest',
          element:<TeacherRequest></TeacherRequest>
        },
        {
          path:'allUsers',
          element:<AllUsers></AllUsers>
        },
        {
          path:'allCourses',
          element:<AllCourses></AllCourses>
        },
        
        {
          path:'addCourse',
          element:<AddCourse></AddCourse>
        },
        {
          path:'myCourses',
          element:<MyCourses></MyCourses>
        },
        {
          path:'Profile',
          element:<Profile></Profile>
        },
        {
          path:'addCourse',
          element:<AddCourse></AddCourse>
        },
        {
          path:'allCourse',
          element:<AllCourses></AllCourses>
        },
        
      ]
    }
  ]);


  export default router