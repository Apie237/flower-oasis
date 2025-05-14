import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');

  // Fetch user orders
  const fetchUserOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`, 
        { userId: token }, 
        { headers: { token } }
      );

      if (response.data.success) {
        // Process and organize the order data
        const processedOrders = response.data.orders.map(order => ({
          ...order,
          date: new Date(order.date),
          deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : null,
          // Process items to calculate totals
          items: order.items.map(item => ({
            ...item,
            itemTotal: item.price * item.quantity,
            addOnsTotal: item.selectedAddOns?.reduce((sum, addOn) => sum + (addOn.price * addOn.quantity), 0) || 0
          }))
        }));
        
        setOrders(processedOrders.reverse()); // Newest first
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading order data:', error);
      toast.error(error.message || 'Error fetching your orders');
    } finally {
      setLoading(false);
    }
  };

  // Load orders when component mounts or token changes
  useEffect(() => {
    fetchUserOrders();
  }, [token]);

  // Format date
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderIds(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Filter orders based on selected tab
  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'processing') {
      return ['Order Placed', 'Packing', 'Shipped'].includes(order.status);
    }
    if (selectedTab === 'delivered') {
      return order.status === 'Delivered';
    }
    if (selectedTab === 'outForDelivery') {
      return order.status === 'Out for delivery';
    }
    return true;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-blue-500';
      case 'Packing': return 'bg-yellow-500';
      case 'Shipped': return 'bg-purple-500';
      case 'Out for delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Calculate total number of items in an order
  const getTotalItems = (items) => {
    return items.reduce((total, item) => {
      const addOnCount = item.selectedAddOns?.reduce((count, addon) => count + addon.quantity, 0) || 0;
      return total + item.quantity + addOnCount;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      
      {/* Order status tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button 
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTab === 'all' 
              ? 'bg-pink-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Orders
          </button>
          <button 
            onClick={() => setSelectedTab('processing')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTab === 'processing' 
              ? 'bg-pink-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Processing
          </button>
          <button 
            onClick={() => setSelectedTab('outForDelivery')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTab === 'outForDelivery' 
              ? 'bg-pink-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Out for Delivery
          </button>
          <button 
            onClick={() => setSelectedTab('delivered')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTab === 'delivered' 
              ? 'bg-pink-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No orders found</h2>
          <p className="text-gray-500 mb-6">You don't have any {selectedTab !== 'all' ? selectedTab : ''} orders yet.</p>
          <button
            onClick={() => window.location.href = '/collections'}
            className="px-8 py-3 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition-colors shadow-md"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                    <span className="text-sm font-medium text-gray-700">{order.status}</span>
                  </div>
                  <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">{getTotalItems(order.items)} items</span>
                  <span className="font-medium text-gray-900">{currency} {order.amount}</span>
                  <button 
                    onClick={() => toggleOrderExpansion(order._id)} 
                    className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transform transition-transform ${expandedOrderIds.includes(order._id) ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Order Details (expandable) */}
              {expandedOrderIds.includes(order._id) && (
                <div className="px-4 py-3 border-b border-gray-200">
                  {/* Delivery Information */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p><span className="font-medium">Delivery Date:</span> {order.deliveryDate ? formatDate(order.deliveryDate) : 'Not specified'}</p>
                        <p><span className="font-medium">Delivery Time:</span> {order.deliveryTime || 'Not specified'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Address:</span> {order.address?.street}, {order.address?.city}, {order.address?.state}</p>
                        <p><span className="font-medium">Recipient:</span> {order.address?.firstName} {order.address?.lastName}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Custom Message */}
                  {order.message && (
                    <div className="mb-4 p-3 bg-pink-50 rounded-md border border-pink-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Gift Message</h4>
                      <p className="text-sm italic text-gray-600">"{order.message}"</p>
                    </div>
                  )}
                  
                  {/* Payment Information */}
                  <div className="mb-4 flex flex-wrap gap-4 text-sm">
                    <div className="px-3 py-1 bg-gray-100 rounded-md">
                      <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-md">
                      <span className="font-medium">Payment Status:</span> {order.payment ? 'Paid' : 'Pending'}
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
                    <div className="divide-y divide-gray-200">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex gap-4">
                            {/* Item Image */}
                            {item.image && item.image[0] && (
                              <img 
                                src={item.image[0]} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}
                            
                            {/* Item Details */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-gray-800">{item.name}</h5>
                                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                                    <span className="px-2 py-0.5 bg-gray-100 rounded">Size: {item.size}</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded">Qty: {item.quantity}</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded">Price: {currency} {item.price}</span>
                                  </div>
                                </div>
                                <span className="font-medium text-gray-700">{currency} {item.itemTotal}</span>
                              </div>
                              
                              {/* Add-ons */}
                              {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                <div className="mt-3 pl-2 border-l-2 border-gray-200">
                                  <p className="text-xs font-medium text-gray-500 mb-1">Add-ons:</p>
                                  <div className="space-y-2">
                                    {item.selectedAddOns.map((addOn, addOnIndex) => (
                                      <div key={addOnIndex} className="flex items-center gap-2">
                                        {addOn.image && addOn.image[0] && (
                                          <img 
                                            src={addOn.image[0]} 
                                            alt={addOn.name} 
                                            className="w-8 h-8 object-cover rounded-md"
                                          />
                                        )}
                                        <div className="flex-1 flex justify-between items-center">
                                          <span className="text-xs text-gray-600">{addOn.name} × {addOn.quantity}</span>
                                          <span className="text-xs font-medium">{currency} {addOn.price * addOn.quantity}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm">{currency} {(order.amount - 20).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Delivery Fee</span>
                      <span className="text-sm">{currency} 20.00</span>
                    </div>
                    <div className="flex justify-between items-center font-medium text-gray-900 pt-2 border-t border-gray-200 mt-2">
                      <span>Total</span>
                      <span>{currency} {order.amount}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Order Footer */}
              <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center">
                  <div className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                  <p className="text-sm font-medium text-gray-700">{order.status}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleOrderExpansion(order._id)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    {expandedOrderIds.includes(order._id) ? 'Hide Details' : 'View Details'}
                  </button>
                  <button 
                    className="px-4 py-2 text-sm bg-pink-700 text-white rounded hover:bg-pink-800 transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;