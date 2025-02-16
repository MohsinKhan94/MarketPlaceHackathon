"use server";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("📡 API Called");

    // Ensure dynamic execution
    (global as any).dynamic = "force-dynamic";

    const { searchParams } = new URL(req.url);
    const trackingNumber = searchParams.get("trackingNumber");
    const carrier = searchParams.get("carrier");

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
    const trackingData = getMockTrackingData(trackingNumber, carrier);

    console.log("✅ API Success:", trackingData);
    return NextResponse.json(trackingData, { status: 200 });
  } catch (error) {
    console.error("⚠️ API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to return mock tracking data (can be replaced with real API response)
function getMockTrackingData(trackingNumber: string, carrier: string) {
  return {
    trackingNumber,
    carrier,
    history: [
      { status: "Shipped", location: "Warehouse", timestamp: "2024-02-14 10:00 AM" },
      { status: "In Transit", location: "City Hub", timestamp: "2024-02-14 02:00 PM" },
      { status: "Out for Delivery", location: "Local Depot", timestamp: "2024-02-14 06:00 PM" },
    ],
  };
}
