import { createBrowserRouter } from "react-router-dom";
import Main from "../../Root/Main/Main";
import Home from "../../Pages/Home/Home";
import Contact from "../../Pages/Contact/Contact";
import Register from "../../Pages/Register/Register";



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
        }
      ]
    },
  ]);


  export default router