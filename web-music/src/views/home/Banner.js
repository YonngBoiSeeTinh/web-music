import React from "react";
import './home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 

class Banner extends React.Component {
    render() {
        const settings = {
            dots: true,             
            infinite: true,         
            speed: 500,             
            slidesToShow: 1,        
            slidesToScroll: 1,      
            autoplay: true,         
            autoplaySpeed: 1500,    
            arrows: false,           
        };

        // Mảng chứa các đường dẫn ảnh
        const bannerImg = [
            "https://avatar-ex-swe.nixcdn.com/slideshow/2024/09/22/1/6/6/f/1727010302012_org.jpg",
            "https://avatar-ex-swe.nixcdn.com/slideshow/2024/09/22/1/6/6/f/1727010466837_org.jpg",
            "https://avatar-ex-swe.nixcdn.com/slideshow/2024/07/23/2/9/b/b/1721727188064_org.jpg"
        ];

        return (
            <div className="banner">
                <Slider {...settings}>
                    {bannerImg.map((src, index) => (
                        <div className="banner-item" key={index}>
                            <img src={src} />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}

export default Banner;
