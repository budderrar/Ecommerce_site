'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import logo from '../../../assets/freshcart-logo.svg'
import Link from 'next/link'
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import { UserContext } from '@/app/Context/UserContext'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/app/Context/CartContext'



export default function Navbar() {

  let {userLogin, setuserLogin} = useContext(UserContext)
  let {itemNumber, setitemNumber} = useContext(CartContext)
  let router = useRouter()

  function SignOut (){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    router.push('/login')
    

  }

  return <>

  <nav className=" border-gray-200 bg-slate-200 text-gray-950">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className='flex items-center gap-5'>
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="h-8" alt="freshcart logo" />
        </Link>
        
        {userLogin !== null ? <>
          <ul className="flex gap-4 items-center">
                    <li><Link href="/home">Home</Link></li>
                    <li><Link href="/cart">Cart<div className='absolute top-[6px]  size-4 bg-emerald-600 text-white rounded-full flex items-center justify-center'>{itemNumber}</div></Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/categories">Categories</Link></li>
                    <li><Link href="/brands">Brands</Link></li>
                    <li><Link href="/wishlist" className="text-emerald-600 text-xl"><FaCartPlus /></Link></li>
                 </ul>
        </>: null}

        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="icons flex gap-4">
          <FaFacebook />
          <FaLinkedin />
          <FaYoutube/>
          <FaTiktok/>
          <FaTwitter/>
          </div>
            <div className="links flex gap-4">

              {userLogin !== null ? <span onClick={SignOut} className='text-sm cursor-pointer'>SignOut</span> : 
              <>
              <Link href="/login" className="text-sm ">Login</Link>
              <Link href="/register" className="text-sm ">Register</Link>
             </>
              }
              
            
            </div>
        </div>
    </div>
</nav>
  </>
}

