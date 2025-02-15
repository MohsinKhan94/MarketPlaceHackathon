const Shippo = require('shippo');


import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const shippo = new Shippo.default(process.env.NEXT_PUBLIC_SHIPPO_TEST);

 // Use your test API key in .env file

        const shipment = await shippo.shipment.create({
            address_from: {
                name: "Sender Name",
                street1: "123 Sender St",
                city: "San Francisco",
                state: "CA",
                zip: "94117",
                country: "US",
                phone: "555-555-5555",
                email: "sender@example.com"
            },
            address_to: {
                name: "Receiver Name",
                street1: "456 Receiver St",
                city: "New York",
                state: "NY",
                zip: "10001",
                country: "US",
                phone: "555-555-5555",
                email: "receiver@example.com"
            },
            parcels: [{
                length: "5",
                width: "5",
                height: "5",
                weight: "2",
                distance_unit: "in",
                mass_unit: "lb"
            }],
            carrier_accounts: [], // Optional, will use default carriers
            servicelevel_token: "usps_priority" // Example service
        });

        res.status(200).json(shipment);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}
