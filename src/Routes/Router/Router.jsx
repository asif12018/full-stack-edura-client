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
import MyEnrollCourseDetails from "../../components/MyEnrollCourseDetails/MyEnrollCourseDetails.jsx";
import CourseProgress from "../../components/CourseProgress/CourseProgress.jsx";
import MyEnrollCourseBanner from "../../components/MyEnrollCourseBanner/MyEnrollCourseBanner.jsx";
import MyEnrollClassVideo from "../../components/MyEnrollClassVideo/MyEnrollClassVideo.jsx";
import AdminProfile from "../../components/AdminProfile/AdminProfile.jsx";
import CourseProgressDetails from "../../components/CourseProgressDetails/CourseProgressDetails.jsx";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage.jsx";
import ProtectAdminRoutes from "./ProtectAdminRoutes.jsx";
import ProtectTeacherRoutes from './ProtectTeacherRoutes';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
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
          element:<ProtectAdminRoutes><AllUsers></AllUsers></ProtectAdminRoutes>
        },
        {
          path:'allCourses',
          element:<ProtectAdminRoutes><AllCourses></AllCourses></ProtectAdminRoutes>
        },
        
        {
          path:'addCourse',
          element:<ProtectTeacherRoutes><AddCourse></AddCourse></ProtectTeacherRoutes>
        },
        {
          path:'myCourses',
          element:<MyCourses></MyCourses>
        },
        {
          path:'myCourses2',
          element:<ProtectTeacherRoutes><MyCourses2></MyCourses2></ProtectTeacherRoutes>
        },
        {
          path:'Profile',
          element:<ProtectTeacherRoutes><Profile></Profile></ProtectTeacherRoutes>
        },
        // {
        //   path:'addCourse',
        //   element:<AddCourse></AddCourse>
        // },
        // {
        //   path:'allCourse',
        //   element:<ProtectAdminRoutes><AllCourses></AllCourses></ProtectAdminRoutes>
        // },
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
        },
        {
          path:'class/:id',
          element:<CourseProgressDetails></CourseProgressDetails>
        },
        {
          path:'myenroll-class/:id',
          element:<MyEnrollCourseDetails></MyEnrollCourseDetails>,
          children:[
            {
              index:true,
              element:<MyEnrollCourseBanner></MyEnrollCourseBanner>
            },
            {
              path:'watch/:id',
              element:<MyEnrollClassVideo></MyEnrollClassVideo>
            }
          ]
        },
        {
          path:'courseProgress/:id',
          element:<ProtectAdminRoutes><CourseProgress></CourseProgress></ProtectAdminRoutes>
        },
        {
          path:'adminProfile',
          element:<ProtectAdminRoutes><AdminProfile></AdminProfile></ProtectAdminRoutes>
        },
        
        
      ]
    }
  ]);


  export default router