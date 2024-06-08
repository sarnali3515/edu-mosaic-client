
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img2 from '../../../../assets/carousel-1.jpg'
import img1 from '../../../../assets/carousel-2.jpg'
import img3 from '../../../../assets/carousel-3.jpg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function Carousel() {
    return (
        <div className='max-w-screen-xl px-6 pb-5 mx-auto rounded-xl'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3800,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide
                        image={img1}
                        title='Discover Our Top Courses'
                        text='Unlock new skills with our expert-led classes. Stay updated on the latest courses and exclusive offers by subscribing to our newsletter.'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={img2}
                        title='Boost Your Career with Us'
                        text='Explore diverse subjects and gain industry expertise. Subscribe for the latest updates and special offers'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={img3}
                        title='Reach Your Learning Goals'
                        text='Advance your skills with our comprehensive courses. Get news, updates, and promotions by subscribing to our newsletter.'
                    ></Slide>
                </SwiperSlide>



            </Swiper>
        </div>
    );
}