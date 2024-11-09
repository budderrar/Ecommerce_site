'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import useProducts from '../Hooks/useProducts';


export default function RecentProducts() {

  let {data, isError, error, isLoading} = useProducts()

  if(isError){
    return <h3>{error.message}</h3>
  }

  if(isLoading){
    return <div className="spinner"></div>
  }

  return (
    <>
    <div className="container w-[80%] mx-auto py-20">
      <h4 className="my-3 capitalize font-semibold text-gray-800 text-2xl">Shop All Products</h4>
    <div className="row">
    {data?.data?.data.map((product)=> 
    <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
      
      <div className="product my-2">

      <Link href={`/productDetails/${product.id}`}>
        <img src= {product.imageCover} className="w-full" alt=""/>
        <h3 className='mb-1 font-semibold text-emerald-600'>{product.category.name}</h3>
        <h3 className="font-semibold mb-1">{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between p-3'>
          <span>{product.price}  EGP</span>
          <span className='flex items-center gap-1'><FaStar />{product.ratingsAverage}</span>
          </div>
       </Link>
    
        <button className='btn'>Add To Cart</button>
      </div>
    

    </div>)}

    </div>

    </div>
    
        
    </>
  );
}

