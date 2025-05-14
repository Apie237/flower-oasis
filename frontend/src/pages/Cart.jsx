import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const Cart = () => {
  const { products, currency, navigate, message, setMessage, cartItems, removeProductFromCart, updateQuantity, removeAddOnFromCart, updateAddOnQuantity } = useContext(ShopContext);
  
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(Array.isArray(cartItems) ? cartItems : []);
  }, [cartItems]);

  return (
    <div className="border-t pt-12 bg-gray-50 min-h-screen">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {cartData?.length === 0 ? (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    ) : (
      cartData.map((item, index) => {
        const productData = products.find((product) => product._id === item._id) || {};

        return (
          <div key={index} className="my-6 bg-white rounded-2xl shadow-md p-6">
            {/* Product Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-6">
              <div className="flex items-center gap-5">
                <img className="w-24 h-24 object-cover rounded-lg" src={productData?.image?.[0]} alt={productData?.name} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{productData?.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-700 text-sm">
                      {currency}
                      {productData?.price}
                    </p>
                    <span className="px-3 py-1 text-sm bg-gray-100 rounded-lg border border-gray-300">{item?.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                  className="w-16 h-10 border text-center rounded-md shadow-sm"
                />
                <button
                  onClick={() => removeProductFromCart(item._id, item.size)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  title="Remove from cart"
                >
                  <img src={assets.binIcon} alt="Remove" className="w-5" />
                </button>
              </div>
            </div>

            {/* Add-ons */}
            {item?.selectedAddOns?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800 mb-2">Add-ons:</h4>
                {item.selectedAddOns.map((addOn, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-100 rounded-xl p-4 my-2 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img className="w-16 h-16 object-cover rounded-md" src={addOn?.image?.[0]} alt={addOn?.name} />
                      <div>
                        <p className="font-medium text-gray-700">{addOn?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {currency}
                          {addOn?.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min={1}
                        defaultValue={addOn.quantity}
                        onChange={(e) => updateAddOnQuantity(item._id, addOn._id, Number(e.target.value))}
                        className="w-14 h-9 text-center border rounded-md"
                      />
                      <button
                        onClick={() => removeAddOnFromCart(item._id, addOn._id)}
                        className="text-gray-500 hover:text-red-500"
                        title="Remove add-on"
                      >
                        <img src={assets.binIcon} alt="Remove add-on" className="w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })
    )}

    {/* Message Box */}
    <div className="mt-10">
      <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
        Write a message for the gift receiver:
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message..."
        className="w-full h-28 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />
    </div>

    {/* Checkout Section */}
    <div className="flex justify-end mt-12">
      <div className="w-full sm:w-96 bg-white rounded-2xl shadow-lg p-6">
        <CartTotal />
        <div className="mt-6 text-end">
          <button
            onClick={() => navigate("/placeorder")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform hover:scale-105"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;