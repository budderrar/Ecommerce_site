'use client';
import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    
    function getToken(){
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("userToken");
            console.log("Retrieved Token:", token);  
            return token;
        }
        return null;
    }

    const [cartId, setcartId] = useState()
    const [itemNumber, setitemNumber] = useState()

    function addProductToCart(productId) {
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            { productId: productId },
            { headers }
        )
        .then((res) => res)
        .catch((err) => err);
    }
    function getLoggedUserCart(){
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>{
            setitemNumber(res.data.numOfCartItems)
            setcartId(res.data.data._id)
            return res
        })
        .catch((err)=>err)
    }
    function updateCartProductQuantity(productId, newCount){
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };
        
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: newCount,
            },
            {headers}
        )
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteCartItem(productId){
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };
        
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function checkout(cartId,url,formData) {
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, 
            { shippingAddress: formData },
            {headers,}
        )
        .then((res) => res)
        .catch((err) => err);
    }

    return ( 
      <CartContext.Provider value={{ addProductToCart , getLoggedUserCart, updateCartProductQuantity, deleteCartItem, checkout, cartId, itemNumber, setitemNumber}}>
        {props.children}
      </CartContext.Provider>
    );
}
