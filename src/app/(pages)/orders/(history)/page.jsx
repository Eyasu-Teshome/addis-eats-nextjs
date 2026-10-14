import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Mock database query scoped strictly to session user ID
async function getOrdersForUser(userId) {
  const mockOrders = [
    { id: "101", userId: "usr_01", items: "Doro Wat, Injera", status: "Preparing" },
    { id: "102", userId: "usr_02", items: "Shiro Tegabeno", status: "Delivered" },
  ];
  return mockOrders.filter((order) => order.userId === userId);
}

export default async function OrdersPage() {
  // Page check verifies identity before rendering screen
  const user = await getSession();
  if (!user) {
    redirect("/signin?next=/orders");
  }

  // QUERY SCOPING: Uses user.id from verified session, never an ID from request params
  const orders = await getOrdersForUser(user.id); //To get list of orders for current logged in user

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
        Orders for {user.name}
      </h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Order #{order.id}</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {order.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Items: {order.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}