'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";




import { Image } from 'next/image';



export default function CategoriesSlider() {
    const [categories, setcategories] = useState([])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 1000
      };

    function getCategories(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{
            setcategories(res.data.data);
        })
    }
    

useEffect(()=>{
    getCategories()
},[])

  return (
    <>
    <div className='container w-[80%] mx-auto py-20'>
      <h2 className="my-3 capitalize font-semibold text-gray-800 text-2xl">shop popular categories</h2>

    
    <Slider {...settings}>
      {categories.map((category)=> <div>
        <img src={category.image} className="w-full h-[200px] object-cover" alt="" />
        <h4 className="font-semibold">{category.name}</h4>
      </div>)}

    </Slider>
    </div>


    </>
  )
}
