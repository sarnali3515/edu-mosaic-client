import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Feedback = () => {
    const axiosPublic = useAxiosPublic()
    const { data: evaluations } = useQuery({
        queryKey: ['evaluations'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/evaluations`);
            // console.log(data);
            return data;
        }
    });
    return (
        <div className='max-w-screen-xl mx-auto my-14'>
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
                {
                    evaluations?.map(evaluation =>
                        <SwiperSlide key={evaluation._id}>
                            <div className='relative mt-3'>
                                <div className="card w-full h-48 bg-[#D5CAEB]">
                                    <div className="card-body">
                                        <p>{evaluation.description}</p>
                                        <Rating
                                            readonly
                                            initialRating={evaluation.rating}
                                            emptySymbol={<FaRegStar color="#d6ab3c" size={24} />}
                                            fullSymbol={<FaStar color="#d6ab3c" size={24} />}
                                        />
                                        <div className='flex gap-4'>
                                            <div className="avatar">
                                                <div className="w-10 md:w-14 h-10 md:h-14 rounded-full">
                                                    <img src={evaluation.studentPhoto} />
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold">{evaluation.studentName}</h2>
                                                <p className='text-xs'>Student of <span className='font-bold'>{evaluation.classTitle}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                            </div>
                        </SwiperSlide>
                    )
                }


            </Swiper>
        </div>
    );
};

export default Feedback;