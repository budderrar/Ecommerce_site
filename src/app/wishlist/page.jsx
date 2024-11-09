'use client';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';

export default function wishlist() {

   let {getLoggedUserWishList, removeProductFromWishList} = useContext(WishListContext);

  const [WishListItems, setWishListItems] = useState(null);

  async function getWishListItems() {
    let response = await getLoggedUserWishList();

    if (response.data.status === "success") {
      setWishListItems(response.data.data);
    } else {
      toast.error("Failed to fetch WishList items");
    }
  }

  async function deleteItem(productId) {
    let response = await removeProductFromWishList(productId);

    if (response.data.status === "success") {
      setWishListItems(WishListItems.filter(item => item.id !== productId));
      toast.success("Product removed from WishList");
    } else {
      toast.error("Failed to remove product from WishList");
    }
  }

  useEffect(() => {
    getWishListItems();
  }, []);

  return (
    <>
      {WishListItems?.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">Your WishList</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {WishListItems.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span onClick={() => deleteItem(item.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className='capitalize text-red-800 font-bold text-center text-3xl my-8'>No Items in WishList</h1>
      )}
    </>
  );
}
