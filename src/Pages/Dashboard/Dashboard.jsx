import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { BounceLoader } from "react-spinners";

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
                    {/*===== student dashboard =======*/}
                    <NavLink to={'myEnroll'} className={'text-left'}>My Enroll Courses</NavLink>
                    <NavLink to={'studentProfile'}>Student Profile</NavLink>
                    {/**====== admin dashboard ======== */}
                    {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && (
                        <>
                            
                            <NavLink to={'addCourse'}>Add Courses</NavLink>
                            <NavLink to={'Profile'}>Profile</NavLink>
                        </>
                    )}
                    {/**====== teacher ====== */}
                    {
                        userInfo?.role == 'admin' && <>
                            <NavLink to={'addCourse'}>Add Courses</NavLink>
                            <NavLink to={'myCourses'}>My Courses</NavLink>
                            <NavLink to={'teacherRequest'} className={'text-left'}>Teacher Request</NavLink>
                            <NavLink to={'allUsers'}>Users</NavLink>
                            <NavLink to={'allCourses'}>All Courses</NavLink>

                        </>
                    }

                    <NavLink to={'/'}>Home</NavLink>
                </div>



            </div>
            <div className="col-span-8 bg-[#14452f]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;