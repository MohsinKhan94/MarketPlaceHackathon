"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, Trash2 } from "lucide-react";
import { client } from "@/sanity/lib/sanity";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function getProduct(slug: string | undefined) {
  if (!slug) return null;

  const query = `*[_type == "product" && slug.current == $slug][0]{
    title, 
    "id": _id, 
    "image": image.asset->url, 
    brand, 
    storage, 
    ram, 
    price, 
    category
  }`;

  return await client.fetch(query, { slug }) || null;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(params.slug);
      if (!data) notFound();
      setProduct(data);
    };

    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  if (!product) return null;

  // **Add to Cart Function**
  const addToCart = () => {
    let updatedCart = [...cart];

    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart!");
  };

  // **Remove from Cart Function**
  const removeFromCart = () => {
    const updatedCart = cart.filter((item) => item.id !== product.id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Product removed from cart.");
  };

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center py-12 px-6 gap-8">
      <div className="md:w-1/2">
        <div className="glass p-4 rounded-2xl">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {product.title}
        </h1>
        <p className="text-lg">Brand: {product.brand}</p>
        <p className="text-lg">Storage: {product.storage}</p>
        <p className="text-lg">RAM: {product.ram}</p>
        <p className="text-3xl text-pink-500 font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm">Category: {product.category}</p>

        <div className="flex space-x-4">
          <button
            onClick={addToCart}
            className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart ? "Add More" : "Add to Cart"}
          </button>

          {isInCart && (
            <button
              onClick={removeFromCart}
              className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}
