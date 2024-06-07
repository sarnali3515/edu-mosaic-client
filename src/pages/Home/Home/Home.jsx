import BestTeachers from "../BestTeachers/BestTeachers";
import Feedback from "../Feedback/Feedback";
import PopularCourses from "../PopularCourses/PopularCourses";
import WebsiteStats from "../WebsiteStats/WebsiteStats";
import Carousel from "./Banner/Carousel";
import JoinAsTeacher from "./JoinAsTeacher/JoinAsTeacher";
import PartnersSection from "./PartnersSection";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>EduMosaic - Home</title>
            </Helmet>
            <Carousel></Carousel>
            <PartnersSection></PartnersSection>
            <PopularCourses></PopularCourses>
            <JoinAsTeacher></JoinAsTeacher>
            <BestTeachers></BestTeachers>
            <WebsiteStats></WebsiteStats>
            <Feedback></Feedback>


        </div>
    );
};

export default Home;