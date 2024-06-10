import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Instructor = () => {
    const {user} = useContext(AuthContext);
   
    return (
        <div>
            
            <section className="dark:bg-gray-100 dark:text-gray-800 shadow-2xl">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">Join us as an
                            <span className="dark:text-[#14452f]"> Instructor</span>
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                            <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link to={'/joinEdura'} rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-[#14452f] dark:text-gray-50">Join today!</Link>
                            
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src="https://i.postimg.cc/ydB6Rvcz/Adobe-Stock-104939054-Preview.jpg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                        {/* <img src={`${user?.photoURL}`} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Instructor;