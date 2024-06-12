import Discount from "../../components/Discount/Discount";
import Hero from "../../components/Hero/Hero";
import Instructor from "../../components/Instructor/Instructor";
import PopularCourse from "../PopularCourse/PopularCourse";

import Partner from './../../components/Partner/Partner';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Discount></Discount>
            <Partner></Partner>
            <PopularCourse></PopularCourse>
            <Instructor></Instructor>
            
        </div>
    );
};

export default Home;