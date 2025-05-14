import userModel from "../models/userModel.js";

// Updated addToCart in cartController.js
const addToCart = async (req, res) => {
    try {
      console.log('🚀 addToCart controller triggered');
      console.log('📦 Request body received:', req.body);
      console.log('🔑 Request headers:', req.headers); // Debug headers
      
      const {
        userId, // This should be set by middleware
        productId,
        size,
        quantity,
        deliveryDate,
        deliveryTime,
        sumTotal,
        message,
        selectedAddOns = [],
      } = req.body;
  
      // Debug user ID specifically
      console.log('👤 Extracted userId from request:', userId);
      console.log('👤 User ID from token middleware:', req.body.userId);
  
      // Validate request data
      console.log('🔍 Validating required fields');
      if (
        !userId ||
        !productId ||
        !size ||
        !quantity ||
        !deliveryDate ||
        !deliveryTime ||
        !sumTotal
      ) {
        console.log('❌ Validation failed - Missing required fields:', { 
          hasUserId: !!userId,
          hasProductId: !!productId,
          hasSize: !!size,
          hasQuantity: !!quantity,
          hasDeliveryDate: !!deliveryDate,
          hasDeliveryTime: !!deliveryTime,
          hasSumTotal: !!sumTotal
        });
        return res.status(400).json({ success: false, message: "Invalid request data" });
      }
  
      console.log('🔍 Looking up user data for ID:', userId);
      const userData = await userModel.findById(userId);
      if (!userData) {
        console.log('❌ User not found with ID:', userId);
        return res.status(404).json({ success: false, message: "User not found" });
      }
      console.log('✅ User found:', userData._id);
  
      let cartData = Array.isArray(userData.cartData) ? userData.cartData : [];
      console.log('🛒 Current cart data:', cartData);
  
      const productIndex = cartData.findIndex(
        (item) => item.productId === productId && item.size === size
      );
      console.log(`🔍 Checking if product exists in cart - Index: ${productIndex}`);
  
      if (productIndex !== -1) {
        console.log('📝 Updating existing cart item');
        cartData[productIndex].quantity += quantity;
        cartData[productIndex].deliveryDate = deliveryDate;
        cartData[productIndex].deliveryTime = deliveryTime;
        cartData[productIndex].message = message;
        cartData[productIndex].sumTotal = sumTotal;
  
        if (selectedAddOns.length > 0) {
          cartData[productIndex].selectedAddOns =
            cartData[productIndex].selectedAddOns || [];
  
          selectedAddOns.forEach((addOn) => {
            const addOnIndex = cartData[productIndex].selectedAddOns.findIndex(
              (item) => item._id === addOn._id
            );
  
            if (addOnIndex !== -1) {
              cartData[productIndex].selectedAddOns[addOnIndex].quantity += 1;
            } else {
              addOn.quantity = 1;
              cartData[productIndex].selectedAddOns.push(addOn);
            }
          });
        }
      } else {
        console.log('📝 Adding new item to cart');
        cartData.push({
          productId,
          size,
          quantity,
          deliveryDate,
          deliveryTime,
          selectedAddOns,
          sumTotal,
          message,
        });
      }
  
      console.log('💾 Updating user cart in database');
      await userModel.findByIdAndUpdate(userId, { cartData });
      console.log('✅ Cart updated successfully');
      
      res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
      console.log('❌ Error in addToCart:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

const updateCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      size,
      quantity,
      deliveryDate,
      deliveryTime,
      sumTotal,
      message,
      selectedAddOns,
    } = req.body;

    console.log("Received update cart request:", {
      userId,
      productId,
      size,
      quantity,
      deliveryDate,
      deliveryTime,
    });

    if (
      !userId ||
      !productId ||
      !size ||
      quantity === undefined ||
      !deliveryDate ||
      !deliveryTime ||
      !sumTotal
    ) {
      return res.json({ success: false, message: "Invalid request data" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = Array.isArray(userData.cartData) ? userData.cartData : [];

    const productIndex = cartData.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (quantity <= 0) {
      cartData = cartData.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
    } else if (productIndex !== -1) {
      cartData[productIndex].quantity = quantity;
      cartData[productIndex].deliveryDate = deliveryDate;
      cartData[productIndex].deliveryTime = deliveryTime;
      cartData[productIndex].message = message;
      cartData[productIndex].sumTotal = sumTotal;

      if (selectedAddOns) {
        cartData[productIndex].selectedAddOns = selectedAddOns;
      }
    } else {
      cartData.push({
        productId,
        size,
        quantity,
        deliveryDate,
        deliveryTime,
        selectedAddOns: selectedAddOns || [],
        sumTotal,
        message,
      });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body; // This is set by the middleware

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = Array.isArray(userData.cartData)
      ? userData.cartData
      : [];

    res.json({
      success: true,
      message: cartData, // Return the cart data directly
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
