import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "AED";
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const addToCart = async (productId, size, quantity, selectedAddOns = [], deliveryDate, deliveryTime, message, sumTotal) => {
    console.log('Adding to cart:', productId, size, quantity, selectedAddOns, deliveryDate, deliveryTime, message, sumTotal);
    if (!deliveryDate || !deliveryTime) {
      alert("Please select a delivery date and time before adding to cart.");
      document.getElementById("deliveryDate")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
  
    const product = products.find((item) => item._id === productId);
    if (product) {
      setCartItems((prevCart) => {
        const cartArray = Array.isArray(prevCart) ? prevCart : [];
  
        const existingItemIndex = cartArray.findIndex(
          (item) => item._id === productId && item.size === size
        );
  
        if (existingItemIndex !== -1) {
          const updatedCart = [...cartArray];
          updatedCart[existingItemIndex].quantity += quantity;
  
          updatedCart[existingItemIndex].selectedAddOns = updatedCart[existingItemIndex].selectedAddOns || [];
  
          selectedAddOns.forEach((addOn) => {
            const index = updatedCart[existingItemIndex].selectedAddOns.findIndex((item) => item._id === addOn._id);
            if (index !== -1) {
              updatedCart[existingItemIndex].selectedAddOns[index].quantity += 1;
            } else {
              addOn.quantity = 1;
              updatedCart[existingItemIndex].selectedAddOns.push(addOn);
            }
          });
  
          updatedCart[existingItemIndex].deliveryDate = deliveryDate;
          updatedCart[existingItemIndex].deliveryTime = deliveryTime;
          updatedCart[existingItemIndex].message = message;
          updatedCart[existingItemIndex].sumTotal = sumTotal;
  
          return updatedCart;
        } else {
          selectedAddOns.forEach((addOn) => (addOn.quantity = 1));
          return [
            ...cartArray,
            { ...product, size, quantity, selectedAddOns: [...selectedAddOns], deliveryDate, deliveryTime, message },
          ];
        }
      });
    }
  
    if (token) {
      try {
        // This is the fixed part - adding the token in the headers
        await axios.post(
          `${backendUrl}/api/cart/add`, 
          {productId, size, quantity, deliveryDate, deliveryTime, selectedAddOns, message, sumTotal},
          { headers: { token } } // Add token to headers
        );
        console.log('Cart request sent with token:', token);
      } catch (error) {
        console.log('Error adding to cart:', error);
        toast.error(error.message);
      }
    } else {
      console.log('No token available, skipping backend cart update');
    }
  };

  const updateQuantity = (productId, size, newQuantity) => {
    setCartItems((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const updateAddOnQuantity = (productId, addOnId, newQuantity) => {
    setCartItems((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.map((item) =>
        item._id === productId
          ? {
            ...item,
            selectedAddOns: item.selectedAddOns.map((addOn) =>
              addOn._id === addOnId ? { ...addOn, quantity: newQuantity } : addOn
            ),
          }
          : item
      );
    });
  };

  const removeProductFromCart = (productId, size) => {
    setCartItems((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.filter((item) => !(item._id === productId && item.size === size));
    });
  };

  const removeAddOnFromCart = (productId, addOnId) => {
    setCartItems((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.map((item) =>
        item._id === productId
          ? {
            ...item,
            selectedAddOns: item.selectedAddOns.filter((addOn) => addOn._id !== addOnId),
          }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((totalCount, item) => {
      let itemCount = item.quantity;
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        itemCount += item.selectedAddOns.reduce((addOnCount, addOn) => addOnCount + addOn.quantity, 0);
      }
      return totalCount + itemCount;
    }, 0);
  };
  
  const getCartAmount = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return 0;
    }
  
    return cartItems.reduce((totalAmount, item) => {
      let itemInfo = products.find((product) => product._id === item._id);
      if (!itemInfo) {
        console.log('Product not found for:', item._id);
        return totalAmount;
      }
      let itemTotal = itemInfo.price * item.quantity;
  
      // Include add-on prices
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        item.selectedAddOns.forEach(addOn => {
          itemTotal += addOn.price * addOn.quantity;
        });
      }
  
      return totalAmount + itemTotal;
    }, 0);
  };

 const getProductsData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };

  useEffect(() => {
    getProductsData();
    console.log('Products:', products); // Verify products are fetched
  }, []);

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
        console.log('Cart data fetched:', response.data.cartData); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token || localStorage.getItem('token')) {
      const userToken = token || localStorage.getItem('token');
      setToken(userToken);
      getUserCart(userToken);
    }
  }, [token]);

  useEffect(() => {
    console.log('CartItems state updated:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => ({
        ...item,
        message, // update each item with the current global message
      }))
    );
  }, [message]);

  useEffect(() => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => ({
        ...item,
        sumTotal, // update each item with the current sum total
      }))
    );
  }, [sumTotal]);

  useEffect(() => {
    console.log('ShopContext updated:', {
      cartItems,
      products,
      message,
      sumTotal
    });
  }, [cartItems, products, message, sumTotal]);

  const value = {
    products,
    setProducts,
    currency,
    cartItems,
    deliveryDate,
    deliveryTime,
    delivery_fee,
    setDeliveryDate,
    setDeliveryTime,
    addToCart,
    updateQuantity,
    updateAddOnQuantity,
    removeProductFromCart,
    removeAddOnFromCart,
    clearCart,
    getCartAmount,
    navigate,
    message,
    setMessage,
    token,
    setToken,
    backendUrl,
    getCartCount,
    setCartItems,
    sumTotal,
    setSumTotal,
    loading
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;