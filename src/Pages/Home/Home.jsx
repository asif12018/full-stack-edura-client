import Contact from "../../components/Contact/Contact";
import Discount from "../../components/Discount/Discount";
import Faq from "../../components/Faq/Faq";
import FeedBack from "../../components/FeedBack/FeedBack";
import Hero from "../../components/Hero/Hero";
import Instructor from "../../components/Instructor/Instructor";
import Stats from "../../components/Stats/Stats";
import PopularCourse from "../PopularCourse/PopularCourse";

import Partner from './../../components/Partner/Partner';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Discount></Discount>
            <Partner></Partner>
            <PopularCourse></PopularCourse>
            <FeedBack></FeedBack>
            <Instructor></Instructor>
            <Stats></Stats>
            <Faq></Faq>
            <Contact></Contact>
            
        </div>
    );
};

export default Home;