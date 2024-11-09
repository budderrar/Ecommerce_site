'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
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
    getCategories();
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
        {categories?.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <Link href={`/categoryDetails/${category.id}`}>
              <img src={category.image} className="w-full h-64 object-cover mb-4" alt={category.name} />
              <h3 className='text-lg font-semibold text-emerald-600 text-center'>{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
