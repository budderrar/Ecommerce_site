'use client'
import React from 'react'
import slide1 from "../../assets/slider-image-1.jpeg"
import slide2 from "../../assets/slider-image-2.jpeg"
import slide3 from "../../assets/slider-image-3.jpeg"
import slide4 from "../../assets/grocery-banner.png"
import slide5 from "../../assets/grocery-banner-2.jpeg"
import Slider from 'react-slick'
import Image from 'next/image';

export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return (
    <>
      <div className=" flex items-center mx-auto max-w-screen-lg my-10">
        <div className="w-2/3 ">
        <Slider {...settings}>
          <Image className="w-full h-[400px] object-cover" src={slide3} alt="Slide 1"   />
          <Image className="w-full h-[400px] object-cover" src={slide4} alt="Slide 1"  />
          <Image className="w-full h-[400px] object-cover" src={slide5} alt="Slide 1"  />
          </Slider>
        </div>
        <div className="w-1/3 flex flex-col">
          <Image className="w-full h-[200px]" src={slide2} alt="Slide 2"  />
          <Image className="w-full h-[200px]" src={slide3} alt="Slide 3"  />
        </div>
      </div>
    </>
  );
}
