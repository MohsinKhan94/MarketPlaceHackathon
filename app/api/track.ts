import type { NextApiRequest, NextApiResponse } from "next";

const Shippo = require("shippo");
const shippo = Shippo(process.env.NEXT_PUBLIC_SHIPPO_TEST);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const trackingNumber = req.query.tracking as string;
  if (!trackingNumber) {
    return res.status(400).json({ error: "Tracking number is required." });
  }

  try {
    const trackingData = await shippo.track.get_status("usps", trackingNumber);
    res.status(200).json(trackingData);
  } catch (error) {
    res.status(500).json({ error: (error as any).message || "Tracking fetch failed." });
  }
}
