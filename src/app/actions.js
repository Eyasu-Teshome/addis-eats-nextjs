"use server";

import { getSession } from "@/lib/session";

// Mock database store
let ordersDb = [
  { id: "101", userId: "usr_01", items: "Doro Wat", status: "Preparing" },
];

export async function cancelOrder(orderId) {
  // 1. Authentication Check: Who are you?
  const user = await getSession();
  if (!user) {
    throw new Error("401: You must be signed in to perform this action.");
  }

  const order = ordersDb.find((o) => o.id === orderId);
  if (!order) {
    throw new Error("404: Order not found.");
  }

  // 2. Authorization Check: Do you own this record?
  if (order.userId !== user.id && user.role !== "staff") {
    throw new Error("403: Unauthorized. You can only cancel your own orders.");
  }

  // Perform mutation
  order.status = "Cancelled";
  
  return { success: true, order };
}