'use client';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import Slider from "react-slick";




export default function productDetails() {
  const [product, setproduct] = useState(null)
  let {id} = useParams()

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
 
  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      console.log(res.data.data);
      setproduct(res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    });
  }
  useEffect(()=>{
    getProduct(id)
  }, [])
  return (
    <>
    
    <div className="row items-center w-[80%] mx-auto">
      <div className="w-1/4">
      <Slider {...settings}>
        {product?.images.map((src)=> <img src={src} className='w-full'/>)}
      </Slider>
      </div>
      <div className="w-3/4 p-4">
      <h3 className='font-bold capitalize text-3xl'>{product?.title}</h3>
      <h4 className='text-gray-600 text-opacity-80 font-semibold font-xs my-4'>{product?.description}</h4>
      <h4 className='font-semibold text-base'>{product?.category.name}</h4>
      <div className='flex justify-between p-5 my-5'>
          <span className='font-semibold'>{product?.price}  EGP</span>
          <span className='flex items-center gap-1'><i className="text-yellow-500"><FaStar /></i>{product?.ratingsAverage}</span>
          </div>
          <button className='btn'>Add To Cart</button>
      </div>

    </div>
    </>
  );
}
