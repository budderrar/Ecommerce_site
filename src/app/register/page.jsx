'use client';
import axios from 'axios';
import { useFormik } from 'formik'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { FaSpinner } from "react-icons/fa6";
import * as Yup from 'yup'
import { UserContext } from '../Context/UserContext';

export default function Register() {
    let {userLogin, setuserLogin} = useContext(UserContext)
    const router = useRouter();
    const [ApiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    function handleRegister(values){
      setIsLoading(true)
       axios
       .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
       .then((res)=>{
        setIsLoading(false)
        if(res.data.message == "success"){
          document.cookie = `userToken=${res.data.token}; path=/;`;
          localStorage.setItem("userToken", res.data.token)
          setuserLogin(res.data.token)
          router.push('/home');
         
          
        }
      })
       .catch((res) => {
        //console.log(res.response.data.message)
        setIsLoading(false)
        setApiError(res.response.data.message)
        }
        );
    }
    
    
    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3,"min length is 3").max(10, "max length is 10").required("a name is required"),
        email: Yup.string().email("invalid email").required("an email is required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("a phone number is required"),
        password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 characters").required("a password is required"),
        rePassword: Yup.string().oneOf([Yup.ref("password")], "reEnter the correct password").required("reEnter your password")
        
    })
    let formik = useFormik({
       initialValues: {
            name:"",
            email:"",
            phone:"",
            password:"",
            rePassword: "",
        },
        validationSchema,
        onSubmit : handleRegister
    });

  return <>
 {ApiError ?  <div className='w-1/4 mx-auto bg-red-500 text-white font-bold rounded-lg p-3'>{ApiError}</div> : null}
  <div className="my-8">
  <h1 className="text-center text-2xl font-bold text-emerald-500 mb-3">Register Now</h1>
  <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name</label>
      {formik.errors.name && formik.touched.name ? (
        <span className='text-red-700'>{formik.errors.name}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
      {formik.errors.email && formik.touched.email ? (
        <span className='text-red-700'>{formik.errors.email}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
      {formik.errors.phone && formik.touched.phone ? (
        <span className='text-red-700'>{formik.errors.phone}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
      {formik.errors.password && formik.touched.password ? (
        <span className='text-red-700'>{formik.errors.password}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ReEnter your password</label>
      {formik.errors.rePassword && formik.touched.rePassword ? (
        <span className='text-red-700'>{formik.errors.rePassword}</span>
      ):null}
  </div>
  
  <div>
    
  </div>
  <div className="flex items-center gap-4">
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{isLoading ? <FaSpinner />
: "Register" }</button>
<span className='text-blue-600 underline'><Link href="/login">Already registered? Login now.</Link></span>
  </div>
  </form>

  </div>
  
  
  </>
   
}
