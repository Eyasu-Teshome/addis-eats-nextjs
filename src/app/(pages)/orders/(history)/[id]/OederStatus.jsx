"use client"; import useSWR from "swr"; import { fetcher } from "@/lib/fetcher";
export default function OrderStatus({ id, initialData }) {

    // SWR takes over client-side polling after initial hydration
    const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
        fallbackData: initialData, // Seeds cache so no spinner appears on first paint
        refreshInterval: 5000, // Polls every 5 seconds for status updates
        revalidateOnFocus: true, // Auto-refetches when switching back to tab
    });
    if (error) return <div>Failed to load status update.</div>;
    return (
        <div>
            <div>
                <span>Current Status:</span>
                <span> {order?.status || "Processing"} </span>
            </div>
            <p> Estimated Delivery: {order?.estimatedDelivery || "Calculating..."} </p>
            <p>Live tracking active (polling every 5s)</p>
        </div>
    );
}