import { Helmet } from "react-helmet-async";
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
// console.log('API Key:', import.meta.env.VITE_APIKEY);
// console.log('Auth Domain:', import.meta.env.VITE_AUTHDOMAIN);
// console.log('Project ID:', import.meta.env.VITE_PROJECTID);
// console.log('Storage Bucket:', import.meta.env.VITE_STORAGEBUCKET);
// console.log('Messaging Sender ID:', import.meta.env.VITE_MESSAGINGSENDERID);
// console.log('App ID:', import.meta.env.VITE_APPID);
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
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