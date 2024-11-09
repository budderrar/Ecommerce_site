'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import useProducts from '../Hooks/useProducts';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';




export default function RecentProducts() {

  let {data, isError, error, isLoading} = useProducts()
  let {addProductToCart, setitemNumber, itemNumber} = useContext(CartContext);
  let {addProductToWishList} = useContext(WishListContext);

  async function addToCart(id){
    let response = await addProductToCart(id)
    console.log(response.data);
    if(response.data.status == "success"){
      setitemNumber(itemNumber + 1)
     toast.success(response.data.message);
    }
    else{
    toast.error(response.data.message)
    }
  }

  async function addToWishList(id){
    let response = await addProductToWishList(id)
    console.log(response.data);
    if(response.data.status == "success"){
     toast.success(response.data.message);
    }
    else{
    toast.error(response.data.message)
    }
  }



  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <div className="spinner"></div>
  }

  return (
    <>
    <div className="container w-[80%] mx-auto py-20">
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
          <span className='flex items-center gap-1 text-yellow-500'><FaStar />{product.ratingsAverage}</span>
          </div>
       </Link>

       <div className="flex-col space-y-1">
       <button onClick={() => addToCart(product.id)} className='btn'>Add To Cart</button>
       <button onClick={() => addToWishList(product.id)} className='btn'>Add To WishList</button>
       </div>
    
       
      </div>
    

    </div>)}

    </div>

    </div>
    
        
    </>
  );
}
