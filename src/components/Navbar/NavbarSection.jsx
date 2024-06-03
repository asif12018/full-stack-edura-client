
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaGoogleScholar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import './NavbarSection.css'
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext, useState } from "react";

const NavbarSection = () => {
    const { user , userSignOut, setUser} = useContext(AuthContext)
    const [isDropdownOpens, setIsDropdownOpens] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false)
    //logout function
    const handleLogout = () =>{
        userSignOut()
        .then(() => {
            // Sign-out successful.
            setUser(null)
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    }
    return (
        <div className="">
            <Navbar fluid className="py-6 flex-col  !bg-[#14452f]">
                <Navbar.Brand >
                    <FaGoogleScholar className="text-white text-4xl mr-4" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Edura</span>
                </Navbar.Brand>
                <Navbar.Toggle onClick={()=>setNavOpen(!isNavOpen)} />
                <Navbar.Collapse className={isNavOpen ? 'block' : 'hidden'}>
                    <Navbar.Link >
                        <NavLink className={({ isActive }) => isActive ? 'text-white font-bold' : ''} to={'/'}>Home</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        All Classes
                    </Navbar.Link>
                  

                   {
                    user?.email ?  <Navbar.Link >
                    <NavLink className={({ isActive }) => isActive ? 'text-white font-bold' : ''} to={'/dashboard'}>Dashboard</NavLink>
                </Navbar.Link> : ''
                   }


                    {
                        user?.email ? '' : <Navbar.Link >
                        <NavLink className={({ isActive }) => isActive ? 'text-white font-bold' : ''} to={'/register'}>Register</NavLink>
                    </Navbar.Link>
                    }
                    {
                        user?.email ? '' : <Navbar.Link >
                        <NavLink className={({ isActive }) => isActive ? 'text-white font-bold' : ''} to={'/login'}>Login</NavLink>
                    </Navbar.Link>
                    }
                    <Navbar.Link>
                    <NavLink className={({ isActive }) => isActive ? 'text-white font-bold' : ''} to={'/joinEdura'}>Teach on Edura</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        {
                            user?.photoURL && <div className="relative">
                            <button
                                id="dropdownUserAvatarButton"
                                onClick={() => setIsDropdownOpens(!isDropdownOpens)}
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={user?.photoURL}
                                    alt="user photo"
                                />
                            </button>

                            <div
                                id="dropdownAvatar"
                                className={`z-10 ${isDropdownOpens ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute translate-x-0 md:-translate-x-40`}
                            >
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{user?.displayName}</div>
                                    <div className="font-medium truncate">{user?.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                    <li>
                                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsDropdownOpens(false)}>Dashboard</a>
                                    </li>
                                    <li>
                                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsDropdownOpens(false)}>Settings</a>
                                    </li>
                                    <li>
                                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsDropdownOpens(false)}>Earnings</a>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() =>{
                                        setIsDropdownOpens(false)
                                        handleLogout()

                                    }}>Sign out</a>
                                </div>
                            </div>
                        </div>
                        }
                    </Navbar.Link>

                </Navbar.Collapse>
            </Navbar>


        </div>
    );
};

export default NavbarSection;