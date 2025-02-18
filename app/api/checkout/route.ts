import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia", 
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    console.log("🛒 Received Items:", items);

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
    }

    const lineItems = items.map((item) => {
      if (!item.title || !item.price || !item.quantity) {
        throw new Error(`Invalid item format: ${JSON.stringify(item)}`);
      }

      if (isNaN(item.price) || isNaN(item.quantity) || item.price <= 0 || item.quantity <= 0) {
        throw new Error(`Invalid price or quantity: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { 
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    console.log("✅ Line Items:", JSON.stringify(lineItems, null, 2));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/order-confirmation`,
      cancel_url: `${baseUrl}/cart`,
      metadata: { timestamp: new Date().toISOString() },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Checkout API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
