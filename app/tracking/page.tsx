"use client";
import { useState, useEffect } from "react";

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState<any>(null);
  const trackingNumber = "123456789"; // Default tracking ID
  const carrier = "DHL"; // Default carrier

  useEffect(() => {
    console.log("Tracking Number:", trackingNumber);
    console.log("Carrier:", carrier);

    if (!trackingNumber || !carrier) {
      console.error("❌ Tracking number or carrier is missing!");
      return;
    }

    const apiUrl = `/api/tracking?trackingNumber=${trackingNumber}&carrier=${carrier}`;
    console.log("📡 Fetching from:", apiUrl); // Debugging

    const fetchTrackingData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Tracking Data:", data); // Debugging
        setTrackingData(data);
      } catch (error: any) {
        console.error("⚠️ Error fetching tracking data:", error.message);
      }
    };

    fetchTrackingData();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">📦 Shipment Tracking</h1>

      {trackingData ? (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-lg font-semibold">Tracking Number: {trackingData.trackingNumber}</p>
          <p className="text-md">Carrier: {trackingData.carrier}</p>

          <h2 className="mt-4 text-lg font-bold">Tracking History:</h2>
          <ul className="mt-2 space-y-2">
            {trackingData.history?.map((event: any, index: number) => (
              <li key={index} className="text-sm bg-gray-700 p-2 rounded">
                📍 {event.status} - {event.location} ({event.timestamp})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-yellow-500">⏳ Loading tracking details...</p>
      )}
    </div>
  );
}
