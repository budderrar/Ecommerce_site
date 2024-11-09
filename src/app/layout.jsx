'use client';
import "./globals.css";
import Navbar from "./_Components/navbar/page";
import Footer from "./_Components/footer/page";
import UserContextProvider from "./Context/UserContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from "./Context/WishListContext";



let query = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <UserContextProvider>
        <QueryClientProvider client={query}>
        <CartContextProvider>
        <WishListContextProvider>
        <Navbar/>
        {children}  
        <Toaster/>    
        <ReactQueryDevtools/>
        <Footer/>
        </WishListContextProvider>
        </CartContextProvider>
        </QueryClientProvider>
        </UserContextProvider>
        </body>
    </html>
  );
}
