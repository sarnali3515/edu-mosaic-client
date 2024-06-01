import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Feedback = () => {
    return (
        <div className='max-w-screen-xl mx-auto my-12'>
            <h2 className='text-4xl mb-6 font-semibold text-center'>What Our Student Says?</h2>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 15 },
                    480: { slidesPerView: 2, spaceBetween: 15 },
                    768: { slidesPerView: 3, spaceBetween: 15 },
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='relative mt-3'>
                        <div className="card w-full bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?</p>
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-xl">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Maria Olivia</h2>
                                        <p className='text-sm'>Student of Graphics Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative mt-3'>
                        <div className="card w-full bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?</p>
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-xl">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Maria Olivia</h2>
                                        <p className='text-sm'>Student of Graphics Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative mt-3'>
                        <div className="card w-full bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?</p>
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-xl">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Maria Olivia</h2>
                                        <p className='text-sm'>Student of Graphics Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative mt-3'>
                        <div className="card w-full bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?</p>
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-xl">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Maria Olivia</h2>
                                        <p className='text-sm'>Student of Graphics Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative mt-3'>
                        <div className="card w-full bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?</p>
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-xl">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Maria Olivia</h2>
                                        <p className='text-sm'>Student of Graphics Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Feedback;