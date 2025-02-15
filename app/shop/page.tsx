'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/sanity';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  title: string;
  price: number;
  image?: { asset: { _id: string } };
  slug: { current: string };
  brand?: string;
  storage?: string;
  ram?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(`*[_type == "product"]{ _id, title, price, image, slug, brand, storage, ram }`)
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-10">
        Our Products
      </h1>

      {isLoading && <p className="text-center text-gray-400">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product._id} href={`/product/${product.slug.current}`}>
                <div className="relative bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <div className="w-full h-52 rounded-xl overflow-hidden">
                    {product.image ? (
                      <img
                        className="w-full h-full object-cover"
                        src={urlFor(product.image).width(400).url()}
                        alt={product.title || 'Product Image'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <p className="text-gray-400">No Image Available</p>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white mt-4">{product.title}</h2>
                  <p className="text-lg text-blue-400 mt-2 font-medium">${product.price}</p>
                  {product.brand && <p className="text-gray-300 mt-1"><strong>Brand:</strong> {product.brand}</p>}
                  {product.storage && <p className="text-gray-300"><strong>Storage:</strong> {product.storage}</p>}
                  {product.ram && <p className="text-gray-300"><strong>RAM:</strong> {product.ram}</p>}
                  <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:opacity-90 transition">
                    View Details
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400">No products available.</p>
          )}
        </div>
      )}
    </div>
  );
}
