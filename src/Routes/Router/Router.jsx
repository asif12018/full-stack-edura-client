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
import CourseDetails from "../../Pages/CourseDetails/CourseDetails.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ShowCourseProgress from "../../components/ShowCourseProgress/ShowCourseProgress.jsx";
import UpdateCourse from "../../components/UpdateCourse.jsx/UpdateCourse.jsx";
import MyCourses2 from "../../components/MyCourses2/MyCourses2.jsx";
import PaymentGate from "../../components/PaymentGate/PaymentGate.jsx";

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
          element:<PrivateRoutes><TeachOnEdura></TeachOnEdura></PrivateRoutes>
        },
        {
          path:'/allAvailableClass',
          element:<AvailableCourse></AvailableCourse>
        },
        {
          path:'/courseDetails/:id',
          element:<PrivateRoutes><CourseDetails></CourseDetails></PrivateRoutes>
        }
      ]
    },
    {
      path:"dashboard",
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
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
          path:'myCourses2',
          element:<MyCourses2></MyCourses2>
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
        {
          path:'showCourseProgress/:id',
          element:<ShowCourseProgress></ShowCourseProgress>
        },
        {
          path:'update/:id',
          element:<UpdateCourse></UpdateCourse>
        },
        {
          path:'pay/:id',
          element:<PaymentGate></PaymentGate>
        }
        
      ]
    }
  ]);


  export default router