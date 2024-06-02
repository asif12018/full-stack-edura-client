import { Outlet } from "react-router-dom";
import NavbarSection from "../../components/Navbar/NavbarSection";


const Main = () => {
    return (
        <div className=" mx-auto">
            <NavbarSection></NavbarSection>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;