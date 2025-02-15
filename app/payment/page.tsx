"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    const storedTotal = localStorage.getItem("order_total");
    if (storedTotal) {
      setTotalAmount(storedTotal);
    }
  }, []);

  const handlePayment = () => {
    alert("Payment Successful!");
    localStorage.removeItem("order_total"); // Clear total after payment
    router.push("/order-confirmation"); // Redirect to My Account page
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Payment
      </h1>

      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Payment Details</h2>
        <p className="text-purple-200">
          <strong className="text-pink-400">Total Amount:</strong> ${totalAmount}
        </p>

        <input
          type="text"
          placeholder="JazzCash Account Number"
          className="w-full bg-transparent border border-purple-500 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none mt-4"
        />
        <input
          type="password"
          placeholder="JazzCash PIN"
          className="w-full bg-transparent border border-purple-500 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none mt-4"
        />

        <button
          onClick={handlePayment}
          className="w-full text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mt-6"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
