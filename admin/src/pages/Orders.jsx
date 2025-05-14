import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App"; // Update the import paths as needed
import { assets } from "../assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      console.log("API Response:", response.data); // Debug log

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders.reverse());
      } else {
        console.warn("No orders found in API response!");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);

  return (
    <div className="border-t pt-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Admin Order Page</h3>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">Order #{order._id}</p>
                  <div className={`px-3 py-1 rounded-md text-sm font-semibold 
                      ${order.status === "Delivered" ? "bg-green-500 text-white"
                      : order.status === "Shipped" ? "bg-blue-500 text-white"
                      : "bg-yellow-500 text-black"}`}>
                    {order.status}
                  </div>
                </div>

                {/* Order Items */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="border-b py-4 flex items-start gap-4">
                    {item.image && item.image[0] && (
                      <img className="w-16 h-16 rounded-md object-cover" src={item.image[0]} alt={item.name} />
                    )}
                    <div>
                      <p className="text-gray-900 font-medium">{item.name} x {item.quantity}</p>
                      <p className="text-sm text-gray-600">{currency} {item.price}</p>
                    </div>
                  </div>
                ))}

                {/* Add-ons */}
                {order.items.map((item) =>
                  item.selectedAddOns?.length > 0 ? (
                    <div key={item._id} className="mt-4">
                      <p className="font-medium text-gray-800">Add-ons:</p>
                      {item.selectedAddOns.map((addOn, addOnIdx) => (
                        <div key={addOnIdx} className="flex items-start gap-4 bg-gray-100 p-3 rounded-md mt-2">
                          {addOn.image && addOn.image[0] && (
                            <img className="w-12 h-12 rounded-md object-cover" src={addOn.image[0]} alt={addOn.name} />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-700">{addOn.name}</p>
                            <p className="text-xs text-gray-600">{currency} {addOn.price}</p>
                            <p className="text-xs text-gray-600">Quantity: {addOn.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null
                )}

                {/* Customer Details */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-sm text-gray-600">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                  <p className="text-sm text-gray-600">Phone: {order.address.phone}</p>
                </div>

                {/* Message & Order Amount */}
                {order.message && (
                  <p className="mt-2 font-semibold">Message: <span className="font-normal text-gray-700">{order.message}</span></p>
                )}
                <p className="mt-2 font-semibold">Total Amount: <span className="font-normal">{currency} {order.amount}</span></p>

                {/* Status Dropdown */}
                <div className="mt-4 flex justify-between items-center">
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;