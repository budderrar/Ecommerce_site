'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
     // Show a spinner while loading
  }

  if (error) {
    return <div className="error">Something went wrong: {error.message}</div>; // Show error message
  }

  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {brands?.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center">
            <Link href={`/brandDetails/${brand.id}`}>
              <img src={brand.image} className="w-full h-64 object-cover mb-4" alt={brand.name} />
              <h3 className='text-lg font-semibold text-emerald-600 text-center'>{brand.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}