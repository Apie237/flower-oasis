import React, { useContext, useState, useEffect } from 'react';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { 
    navigate, 
    token, 
    cartItems, 
    setCartItems, 
    getCartAmount, 
    delivery_fee, 
    products, 
    backendUrl, 
    deliveryDate, 
    deliveryTime, 
    message, 
    sumTotal 
  } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check connection to backend on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        // Simple health check
        await axios.get(`${backendUrl}/api/health-check`);
      } catch (error) {
        console.log("Backend connection check failed:", error);
        toast.warning("Backend service may be unavailable. Please try again later.", {
          autoClose: 5000,
        });
      }
    };
    
    checkBackendConnection();
  }, [backendUrl]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`, 
            response, 
            { 
              headers: { 
                token,
                'Content-Type': 'application/json'
              } 
            }
          );
          
          if (data.success) {
            setCartItems([]);
            toast.success("Payment successful!");
            navigate('/orders');
          }
        } catch (error) {
          console.error("Razorpay verification error:", error);
          toast.error(error.response?.data?.message || error.message || "Payment verification failed");
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Validate token
      if (!token) {
        toast.error("You must be logged in to place an order");
        navigate('/login');
        return;
      }

      // Validate cart has items
      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        navigate('/cart');
        return;
      }

      let orderItems = [];

      for (const item of cartItems) {
        const itemInfo = structuredClone(products.find(product => product._id === item._id));
        if (itemInfo) {
          itemInfo.size = item.size;
          itemInfo.quantity = item.quantity;
          itemInfo.selectedAddOns = item.selectedAddOns;
          itemInfo.deliveryDate = deliveryDate;
          itemInfo.deliveryTime = deliveryTime;
          itemInfo.message = message;
          itemInfo.sumTotal = sumTotal;
          orderItems.push(itemInfo);
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        deliveryDate: deliveryDate,
        deliveryTime: deliveryTime,
        message: message,
        sumTotal: sumTotal
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(
            `${backendUrl}/api/order/place`, 
            orderData, 
            { 
              headers: { 
                token,
                'Content-Type': 'application/json'
              },
              timeout: 10000 // 10 second timeout
            }
          );
          
          if (response.data.success) {
            console.log('Order placed successfully:', response.data);
            setCartItems([]);
            toast.success("Order placed successfully!");
            navigate('/orders');
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`, 
            orderData, 
            { 
              headers: { 
                token,
                'Content-Type': 'application/json'
              },
              timeout: 10000
            }
          );
          
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message || "Failed to initialize Stripe payment");
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`, 
            orderData, 
            { 
              headers: { 
                token,
                'Content-Type': 'application/json'
              },
              timeout: 10000
            }
          );
          
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message || "Failed to initialize Razorpay payment");
          }
          break;

        default:
          toast.error("Invalid payment method");
          break;
      }
    } catch (error) {
      console.log('Error placing order:', error);
      
      // Better error handling with specific messages
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network error: Cannot connect to the server. Please check your internet connection.");
      } else if (error.response?.status === 401) {
        toast.error("Authentication error: Please login again");
        // Redirect to login page
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || error.message || "Error placing order");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* Left Side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
          </div>
          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
        </div>

        {/* Right Side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <h2>Payment Method</h2>
            {/* Payment Method Selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className='mx-4 h-8' src={assets.stripe_logo} alt="Stripe" />
              </div>
              <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className='mx-4 h-8' src={assets.razorpay_logo} alt="Razorpay" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button 
                type='submit' 
                className={`bg-black text-white px-16 py-3 text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;