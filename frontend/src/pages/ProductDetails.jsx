import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    setDeliveryDate,
    setDeliveryTime,
    deliveryDate,
    deliveryTime
  } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [message, setMessage] = useState('');
  const [filterCategory, setFilterCategory] = useState(''); // For category filter

  const addOnContainerRef = useRef(null);

  // Find product data from products array
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  // Loading state with more detailed feedback
  if (!productData) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-600 mb-2">Loading product details...</div>
        <div className="text-sm text-gray-500">
          {!products || products.length === 0
            ? "No products available. Please check your product data."
            : `Looking for product ID: ${productId}`}
        </div>
      </div>
    );
  }

  // Filter add-ons from products
  const addOns = products.filter((product) => product.category.includes('add-ons'));

  // Filter add-ons based on selected category
  const filteredAddOns = filterCategory
    ? addOns.filter(item => item.category.includes(filterCategory) && item.category.includes("add-ons"))
    : addOns;

  // Toggle add-on selection
  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn]
    );
  };

  // Scroll add-ons container - adjusted for responsive behavior
  const scrollLeft = () => {
    if (addOnContainerRef.current) {
      // Adjust scroll amount based on container width
      const scrollAmount = addOnContainerRef.current.clientWidth * 0.8;
      addOnContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (addOnContainerRef.current) {
      // Adjust scroll amount based on container width
      const scrollAmount = addOnContainerRef.current.clientWidth * 0.8;
      addOnContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle size change
  const handleSizeChange = (action) => {
    if (action === 'increase') {
      setSize((prevSize) => (prevSize < productData.sizes.length ? prevSize + 1 : prevSize));
    } else if (action === 'decrease') {
      setSize((prevSize) => (prevSize > 1 ? prevSize - 1 : prevSize));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (action === 'decrease') {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Product Images - Responsive */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4">
          <div className="flex flex-row md:flex-col gap-2 md:w-16 overflow-x-auto md:overflow-y-auto max-h-96 mb-2 md:mb-0">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="min-w-16 w-16 h-16 object-cover rounded-md border cursor-pointer hover:scale-105 transition-transform duration-300"
                alt={`${productData.name} thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              className="w-full h-auto md:h-[400px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              src={image}
              alt={productData.name}
            />
          </div>
        </div>

        {/* Product Info - Responsive */}
        <div className="w-full lg:w-1/2 space-y-4 mt-4 lg:mt-0">
          <h1 className="text-xl md:text-2xl font-semibold">{productData.name}</h1>
          <div className="flex items-center space-x-1 text-yellow-500">
            {Array(4)
              .fill()
              .map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 text-xs pl-2">(122 reviews)</span>
          </div>
          <p className="text-xl font-bold text-pink-600">
            {currency} {productData.price}
          </p>
          <p className="text-gray-500 text-sm">{productData.description}</p>

          {/* Size Selection */}
          <div>
            <p className="font-medium text-sm">Select Size</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSizeChange('decrease')}
                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{productData.sizes[size - 1]}</span>
              <button
                onClick={() => handleSizeChange('increase')}
                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <p className="font-medium text-sm">Select Quantity</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Category Filter Buttons - Responsive */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mt-4">Select Add-Ons</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory('')}
                className={`px-3 py-1 text-sm md:px-4 md:py-2 rounded-full border ${filterCategory === '' ? 'bg-pink-700 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                All
              </button>
              {['topper', 'greeting-card', 'toys', 'chocolates', 'teddy-bear', 'balloon'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category === filterCategory ? '' : category)}
                  className={`px-3 py-1 text-sm md:px-4 md:py-2 rounded-full border ${filterCategory === category ? 'bg-pink-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {category.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Add-Ons Section - Improved Responsiveness */}
          <div className="border rounded-lg p-2 md:p-4 mt-4 shadow-sm relative w-full">
            <div className="flex items-center">
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 bg-gray-200 px-1 py-2 md:px-2 md:py-1 rounded-md shadow-md hover:bg-gray-300 transition duration-300"
                aria-label="Scroll left"
              >
                ◀
              </button>

              <div 
                ref={addOnContainerRef} 
                className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth px-6 md:px-8 py-2 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredAddOns.length === 0 ? (
                  <p className="text-gray-500 py-4 text-center w-full">No add-ons available for this category.</p>
                ) : (
                  filteredAddOns.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAddOns.includes(item) ? 'border-pink-700 bg-pink-100 scale-105' : 'border-gray-300 hover:border-pink-300'
                        }`}
                      onClick={() => toggleAddOn(item)}
                      style={{ 
                        minWidth: '120px', 
                        width: '130px',
                        height: '180px',
                        flexShrink: 0
                      }}
                    >
                      <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-lg">
                        <img
                          src={item?.image?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs md:text-sm font-medium text-center line-clamp-2">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-700">{currency} {item.price}</p>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-0 z-10 bg-gray-200 px-1 py-2 md:px-2 md:py-1 rounded-md shadow-md hover:bg-gray-300 transition duration-300"
                aria-label="Scroll right"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block font-medium text-sm mb-2">Add a Message (Optional)</label>
            <textarea
              id="message"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700 resize-none"
              placeholder="Add a special message for the recipient..."
            ></textarea>
          </div>

          {/* Delivery Details Section - Responsive */}
          <div className="space-y-4 mt-6">
            {/* Deliver To Dropdown */}
            <div>
              <label htmlFor="deliveryLocation" className="block font-medium text-sm mb-2">Deliver To</label>
              <select
                id="deliveryLocation"
                className="w-full md:w-64 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              >
                <option value="">Select Location</option>
                <option value="dubai">Dubai</option>
                <option value="abu-dhabi">Abu Dhabi</option>
                <option value="ras-al-khor">Ras Al Khor</option>
                <option value="sharjah">Sharjah</option>
                <option value="ajman">Ajman</option>
              </select>
            </div>

            {/* Select Date Input */}
            <div>
              <label htmlFor="deliveryDate" className="block font-medium text-sm mb-2">Select Date</label>
              <input
                id="deliveryDate"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full md:w-64 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Select Time Input */}
            <div>
              <label htmlFor="deliveryTime" className="block font-medium text-sm mb-2">Select Time</label>
              <select
                id="deliveryTime"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full md:w-64 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              >
                <option value="">Select Time</option>
                <option value="9am-3pm">9 am to 3 pm</option>
                <option value="3pm-9pm">3 pm to 9 pm</option>
              </select>
            </div>
          </div>

          {/* Add to Cart Button - Responsive */}
          <button
            onClick={() => {
              console.log("Adding to cart:", {
                productId: productData._id,
                size: productData.sizes[size - 1],
                quantity: quantity,
                selectedAddOns: selectedAddOns,
                deliveryDate: deliveryDate,
                deliveryTime: deliveryTime,
                message: message
              });

              addToCart(
                productData._id,
                productData.sizes[size - 1],
                quantity,
                selectedAddOns,
                deliveryDate,
                deliveryTime,
                message
              );
            }}
            className="w-full md:w-72 py-3 md:py-4 bg-pink-700 text-white text-base md:text-lg font-semibold rounded-md shadow-md hover:bg-pink-800 transition-transform transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;