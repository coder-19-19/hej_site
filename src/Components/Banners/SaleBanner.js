import {SwiperSlide,Swiper} from "swiper/react";

function SaleBanner({data}){
    return (
        data?.length > 0 ? (
            <Swiper style={{marginBottom:"24px"}} spaceBetween={30} centeredSlides={true} autoplay={{
                "delay": 3000,
                "disableOnInteraction": false
            }} pagination={{
                clickable: true
            }} navigation={true} className="mySwiper">
                {data?.map(item => (
                    <SwiperSlide className={"intro-slider animation-slider"}>
                        <div className="banner banner-fixed intro-slide1 content-center content-middle"
                             style={{backgroundColor: "#444342"}} data-index="1">
                            <figure>
                                <img src={process.env.REACT_APP_MEDIA_URL + item?.path} alt="intro-banner" width="1180"
                                     height="300" style={{backgroundColor: "#444342",maxHeight:'200px',minHeight:'200px'}}/>
                            </figure>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        ) : null
    )
}
    export default SaleBanner