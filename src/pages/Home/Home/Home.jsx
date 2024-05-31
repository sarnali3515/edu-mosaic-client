import PopularCourses from "../PopularCourses/PopularCourses";
import Carousel from "./Banner/Carousel";
import PartnersSection from "./PartnersSection";


const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <PartnersSection></PartnersSection>
            <PopularCourses></PopularCourses>
        </div>
    );
};

export default Home;