"use client";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  items: { name: string; quantity: number; price: number }[];
  total: string;
  date: string;
  status?: string;
}

export default function Account() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  // ✅ Load Orders from localStorage & Listen for Changes
  useEffect(() => {
    const fetchOrders = () => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        if (Array.isArray(storedOrders)) {
          console.log("📥 Loaded orders from localStorage:", storedOrders);
          setOrders(storedOrders);
        } else {
          console.warn("⚠️ Invalid orders format in localStorage.");
          setOrders([]);
        }
      } catch (error) {
        console.error("❌ Error parsing orders from localStorage:", error);
        setOrders([]);
      }
    };

    fetchOrders();

    // ✅ Polling for LocalStorage Updates (Alternative to storage event)
    const interval = setInterval(() => {
      const newOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders((prevOrders) => {
        if (JSON.stringify(prevOrders) !== JSON.stringify(newOrders)) {
          console.log("🔄 Orders updated:", newOrders);
          return newOrders;
        }
        return prevOrders;
      });
    }, 2000); // Check every 2 seconds (optimized)

    return () => clearInterval(interval);
  }, []);

  // ✅ Update State & localStorage When Cancelling Order
  const handleCancelOrder = (orderId: number) => {
    console.log(`🚫 Cancelling order: ${orderId}`);
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    console.log("📤 Updated orders after cancellation:", updatedOrders);
    alert("🚫 Order has been canceled.");
  };

  // ✅ Update State & localStorage When Reordering
  const handleReorder = (order: Order) => {
    console.log(`🛒 Reordering order: ${order.id}`);
    localStorage.setItem("cart", JSON.stringify(order.items));
    console.log("📥 Items added to cart:", order.items);
    alert("🛒 Items added to cart for reorder!");
  };

  // ✅ Toggle Order Details
  const toggleDetails = (orderId: number) => {
    console.log(`🔍 Toggling details for order: ${orderId}`);
    setShowDetails((prev) => {
      const updated = { ...prev, [orderId]: !prev[orderId] };
      console.log("📤 Updated showDetails state:", updated);
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        My Account
      </h1>

      {/* Order History */}
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Order History</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="p-4 border border-purple-500 rounded-lg mb-4">
              <p className="text-purple-200">
                <strong className="text-pink-400">Order ID:</strong> {order.id}
              </p>
              <p className="text-purple-200">
                <strong className="text-pink-400">Date:</strong> {order.date}
              </p>
              <p className="text-purple-200">
                <strong className="text-pink-400">Total:</strong> ${order.total}
              </p>
              <ul className="list-disc list-inside text-purple-200">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>

              {/* Buttons Container */}
              <div className="flex flex-wrap gap-2 mt-3">
                {/* Cancel Order Button (if still processing) */}
                {order.status !== "Shipped" && order.status !== "Delivered" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}

                {/* Reorder Button */}
                <button
                  onClick={() => handleReorder(order)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Reorder
                </button>

                {/* View Order Details Toggle */}
                <button
                  onClick={() => toggleDetails(order.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {showDetails[order.id] ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-purple-200">🛒 You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
}
