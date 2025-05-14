import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, sumTotal, setSumTotal } = useContext(ShopContext);

  useEffect(() => {
    const cartAmount = getCartAmount();
    const totalAmount = cartAmount + delivery_fee;
    setSumTotal(totalAmount);
  }, [getCartAmount, delivery_fee, setSumTotal]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mt-2 text-xl">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount().toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {sumTotal.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
