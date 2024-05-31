import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

const PopularCourses = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className="hero md:min-h-screen my-5 md:my-8" style={{ backgroundImage: 'url(https://i.ibb.co/G0G78Cs/study-table-bg.jpg)' }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-72 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                        <div>
                            <h1 className='md:text-4xl mb-5 font-bold text-white'>Most Popular Courses</h1>
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
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card w-full bg-base-100 rounded-none">
                                        <figure className="">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Shoes!</h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PopularCourses;