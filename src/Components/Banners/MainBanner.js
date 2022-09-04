import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper/core';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function MainBanner({data}) {
    return (
        <div className="col-12 mb-4">
            <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
                "delay": 3000,
                "disableOnInteraction": false
            }} pagination={{
                clickable: true
            }} navigation={true} className="mySwiper">
                {data?.map(item => (
                    <SwiperSlide key={item?.id} className={"intro-slider animation-slider"}>
                        <div className="banner banner-fixed intro-slide1 content-center content-middle"
                             style={{backgroundColor: "#444342"}} data-index="1">
                            <figure>
                                <img src={process.env.REACT_APP_MEDIA_URL + item?.path} alt="intro-banner" width="1180"
                                     height="600" style={{backgroundColor: "#444342",maxHeight:'500px',objectFit:'cover'}}/>
                            </figure>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MainBanner