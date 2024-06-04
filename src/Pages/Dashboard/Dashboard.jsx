import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { BounceLoader } from "react-spinners";
import { AiFillSwitcher } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { MdAddChart } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import './Dashboard.css'
const Dashboard = () => {
    const [userInfo, isLoading, reloadUser] = useUser();
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    // console.log(userInfo)
    return (
        <div className="grid grid-cols-12">
            {/* let bar of the dashboard */}
            <div className="col-span-4 border-r-[0.5px] border-gray-600 min-h-screen bg-[#14452f] text-white">
                <div className="flex flex-col items-center  gap-5 mt-8 ">
                    <div className="flex flex-col gap-5">
                        {/*===== student dashboard =======*/}
                    <NavLink  to={'myEnroll'} className={({ isActive })=> isActive ? 'border-b-2 border-white':''}><span className="flex justify-between items-center gap-2"><AiFillSwitcher />My Enroll Courses</span></NavLink>
                    <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'studentProfile'}><span className="flex items-center gap-2"><PiStudentFill />Student Profile</span></NavLink>
                    {/**====== admin dashboard ======== */}
                    {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && (
                        <>
                            
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'addCourse'}><span className="flex items-center gap-2"><MdAddChart />Add Courses</span></NavLink>
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'Profile'}><span className="flex items-center gap-2"><RiAdminFill />Profile</span></NavLink>
                            
                        </>
                    )}
                    {/**====== teacher ====== */}
                    {
                        userInfo?.role == 'admin' && <>
                            
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'myCourses'}><span className="flex items-center gap-2"><SiGoogleclassroom />My Courses</span></NavLink>
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'teacherRequest'} className={'text-left'}><span className="flex items-center gap-2"><FaChalkboardTeacher />Teacher Request</span></NavLink>
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'allUsers'}><span className="flex items-center gap-2"><FaUsers />Users</span></NavLink>
                            <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'allCourses'}><span className="flex gap-2 items-center"><IoBookmarks />All Courses</span></NavLink>
                            

                        </>
                    }

                    <NavLink className={({ isActive })=> isActive ? 'border-b-2 border-white':''} to={'/'}><span className="flex items-center gap-2"><MdHome />Home</span></NavLink>
                    </div>
                </div>



            </div>
            <div className="col-span-8 bg-[#14452f]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;