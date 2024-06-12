import { Outlet } from "react-router-dom";
import NavbarSection from "../../components/Navbar/NavbarSection";
import Footer from "../../components/Footer/Footer";


const Main = () => {
    return (
        <div className=" mx-auto">
            <NavbarSection></NavbarSection>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;