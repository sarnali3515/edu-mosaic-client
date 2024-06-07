import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const PopularCourses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/courses');
            // Sort courses by totalEnrollment in descending order
            const sortedCourses = data.sort((a, b) => b.totalEnrollment - a.totalEnrollment);
            return sortedCourses.slice(0, 6);
        }
    });
    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className="hero md:min-h-screen my-5 md:my-8 rounded" style={{ backgroundImage: 'url(https://i.ibb.co/G0G78Cs/study-table-bg.jpg)' }}>
                <div className="hero-overlay bg-opacity-80 rounded"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-72 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                        <div>
                            <h1 className='md:text-4xl mb-7 font-bold text-white'>Most Popular Courses</h1>
                            <Swiper

                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 15 },
                                    480: { slidesPerView: 2, spaceBetween: 15 },
                                    768: { slidesPerView: 3, spaceBetween: 25 },
                                }}
                                modules={[FreeMode, Pagination, Autoplay]}
                                className="mySwiper"
                            >
                                {
                                    courses.map(course =>
                                        <SwiperSlide key={course._id}>
                                            <div className="card w-full md:h-[460px] bg-base-100 rounded border border-white">
                                                <figure className="">
                                                    <img src={course.photo} alt="Shoes" className="h-60 w-full" />
                                                </figure>

                                                <div className="p-4 text-left">
                                                    <h2 className="font-bold text-xl  text-black">{course.title}</h2>
                                                    <p className='text-base mt-3 text-gray-800'>{course.description}</p>
                                                    <div className='flex justify-between '>
                                                        <p className='text-black text-base mt-2'><span className='font-semibold'>Enrollment:</span> {course.totalEnrollment}</p>
                                                        <p className='text-purple-800 text-base mt-2 font-bold'> $ {course.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PopularCourses;