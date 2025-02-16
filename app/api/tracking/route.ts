"use server";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure this API route runs dynamically

export async function GET(req: Request) {
  try {
    console.log("📡 API Called");

    const { searchParams } = new URL(req.url);
    const trackingNumber = searchParams.get("trackingNumber")?.trim();
    const carrier = searchParams.get("carrier")?.trim();

    console.log("🔍 Tracking Number:", trackingNumber);
    console.log("🚛 Carrier:", carrier);

    if (!trackingNumber || !carrier) {
      console.error("❌ Missing trackingNumber or carrier!");
      return NextResponse.json(
        { error: "Missing trackingNumber or carrier" },
        { status: 400 }
      );
    }

    // Fetch tracking details (Replace this with an actual API call in the future)
    const trackingData = await getMockTrackingData(trackingNumber, carrier);

    console.log("✅ API Success:", trackingData);
    return NextResponse.json(trackingData, { status: 200 });
  } catch (error) {
    console.error("⚠️ API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Function to return mock tracking data (can be replaced with real API response)
async function getMockTrackingData(trackingNumber: string, carrier: string) {
  return {
    trackingNumber,
    carrier,
    status: "Out for Delivery",
    estimatedDelivery: "2024-02-16",
    history: [
      { status: "Shipped", location: "Warehouse", timestamp: "2024-02-14 10:00 AM" },
      { status: "In Transit", location: "City Hub", timestamp: "2024-02-14 02:00 PM" },
      { status: "Out for Delivery", location: "Local Depot", timestamp: "2024-02-14 06:00 PM" },
    ],
  };
}
