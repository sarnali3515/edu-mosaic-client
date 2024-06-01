import Feedback from "../Feedback/Feedback";
import PopularCourses from "../PopularCourses/PopularCourses";
import WebsiteStats from "../WebsiteStats/WebsiteStats";
import Carousel from "./Banner/Carousel";
import PartnersSection from "./PartnersSection";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>EduMosaic - Home</title>
            </Helmet>
            <Carousel></Carousel>
            <PartnersSection></PartnersSection>
            <PopularCourses></PopularCourses>
            <Feedback></Feedback>
            <WebsiteStats></WebsiteStats>
        </div>
    );
};

export default Home;