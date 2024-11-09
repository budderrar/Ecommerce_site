'use client';
import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {

    function getToken(){
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("userToken");
            console.log("Retrieved Token:", token);  
            return token;
        }
        return null;
    }

    function addProductToWishList(productId) {
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
            { productId: productId },
            { headers }
        )
        .then((res) => res)
        .catch((err) => err);
    }

    function getLoggedUserWishList() {
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
        .then((res) => res)
        .catch((err) => err);
    }

    function removeProductFromWishList(productId) {
        const token = getToken();
        if (!token) {
          console.log('No token found, user not logged in.');
          return; 
        }

        let headers = {
            token: token,
        };

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
        .then((res) => res)
        .catch((err) => err);
    }

    return ( 
      <WishListContext.Provider value={{ addProductToWishList, getLoggedUserWishList, removeProductFromWishList }}>
        {props.children}
      </WishListContext.Provider>
    );
}
