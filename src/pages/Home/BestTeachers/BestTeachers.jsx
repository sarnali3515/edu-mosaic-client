import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

const BestTeachers = () => {

    const teachersData = [
        {
            id: 1,
            name: "Maria Olivia",
            image: "https://i.ibb.co/XV8gsXn/women1.jpg",
            title: "FrontEnd web development"

        },
        {
            id: 2,
            name: "David Lee",
            image: "https://i.ibb.co/VBNGRpL/young-bearded-man-with-striped-shirt.jpg",
            title: "Project Management Strategies"

        },
        {
            id: 3,
            name: "Amanda Miller",
            image: "https://i.ibb.co/HdPJkvW/women-2.jpg",
            title: "Graphics Design"

        },
        {
            id: 4,
            name: "Amelia Emily",
            image: "https://i.ibb.co/m5WWrx9/freestocks-9-UVml-Ib0w-JU-unsplash.jpg",
            title: "Data Science"

        },
        {
            id: 5,
            name: "Tom Harris",
            image: "https://i.ibb.co/Hhv0YqT/whereslugo-DMVD9-Rk-ZIw-Q-unsplash.jpg",
            title: "Digital Marketing"

        },

    ];

    return (
        <div>
            <h2 className="text-3xl mt-12 mb-5 text-center font-bold"> Our Best Teachers</h2>
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
                    1024: { slidesPerView: 3, spaceBetween: 25 },
                    1150: { slidesPerView: 4, spaceBetween: 25 }
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    teachersData.map(teacher =>
                        <SwiperSlide key={teacher.id}>
                            <div className="md:h-[460px] p-10 bg-base-100 rounded border border-white">
                                <div className='relative'>
                                    <div className="avatar">
                                        <div className="w-72 rounded">
                                            <img src={teacher.image} alt={teacher.name} />
                                        </div>
                                    </div>
                                    <div className="absolute  bottom-1 w-72 p-4 text-center bg-purple-600 bg-opacity-70 rounded">
                                        <h2 className="font-bold text-xl text-white">{teacher.name}</h2>
                                        <p className='text-xs mt-3 text-gray-200'>Expert in {teacher.title}</p>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    );
};

export default BestTeachers;