"use client";

import { useState } from "react";

export default function ShippoTest() {
    interface Shipment {
        rates: { provider: string; amount: string; currency: string }[];
    }

    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(false);
    
    const createShipment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/shippo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setShipment(data);
        } catch (error) {
            console.error("Error creating shipment:", error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <button 
                onClick={createShipment} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={loading}
            >
                {loading ? "Creating Shipment..." : "Create Test Shipment"}
            </button>

            {shipment && (
                <div className="mt-4 p-4 border rounded">
                    <h3 className="text-lg font-bold">Shipment Details:</h3>
                    <p>Carrier: {shipment.rates[0]?.provider}</p>
                    <p>Estimated Cost: {shipment.rates[0]?.amount} {shipment.rates[0]?.currency}</p>
                </div>
            )}
        </div>
    );
}
