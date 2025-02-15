"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Cart = () => {
  const [cartData, setCartData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartData(cart);

    const totalPrice = cart.reduce((acc: number, item: any) => acc + item.price, 0);
    setTotal(totalPrice);
  }, []);

  const removeItem = (index: number) => {
    const updatedCart = cartData.filter((_, i) => i !== index);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedTotal = updatedCart.reduce((acc: number, item: any) => acc + item.price, 0);
    setTotal(updatedTotal);
  };

  const handlePayment = async () => {
    if (cartData.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const stripe = await stripePromise;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartData }),
      });

      const data = await response.json();

      if (data.sessionId) {
        localStorage.setItem("orderId", data.orderId); // Store order ID
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Payment initiation failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Shopping Cart
      </h1>

      <div className="mt-6 space-y-4">
        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300">
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
              <button onClick={() => removeItem(index)} className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 transition-all">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-6 text-lg font-semibold flex justify-between p-4 bg-gray-200 rounded-lg shadow-md">
        <span>Total Amount:</span>
        <span className="font-bold text-blue-600">${total}</span>
      </div>

      <button onClick={handlePayment} className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
