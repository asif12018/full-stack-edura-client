
import { Navbar } from "flowbite-react";
import { FaGoogleScholar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import './NavbarSection.css'
const NavbarSection = () => {
    return (
        <div className="">
            <Navbar fluid className="py-6 !bg-[#14452f]">
                <Navbar.Brand href="https://flowbite-react.com">
                    <FaGoogleScholar className="text-white text-4xl mr-4" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Edura</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link >
                        <NavLink className={({isActive})=> isActive ? 'text-white font-bold': ''} to={'/'}>Home</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        All Classes
                    </Navbar.Link>
                    <Navbar.Link >
                        Teach on
                    </Navbar.Link>
                    <Navbar.Link >
                        <NavLink className={({isActive})=> isActive ? 'text-white font-bold': ''} to={'/contact'}>Contact</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        <NavLink  className={({isActive})=> isActive ? 'text-white font-bold': ''} to={'/register'}>Register</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        <NavLink  className={({isActive})=> isActive ? 'text-white font-bold': ''} to={'/login'}>Login</NavLink>
                    </Navbar.Link>
                    <Navbar.Link >
                        User
                    </Navbar.Link>
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarSection;