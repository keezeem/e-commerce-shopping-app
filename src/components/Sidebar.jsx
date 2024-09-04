import React, { useContext } from "react";

import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

import { Link } from "react-router-dom";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);

  const config = {
    public_key: 'FLWPUBK_TEST-f71da35bcc326eaa904536d327f5534d-X',
    tx_ref: Date.now().toString(), 
    amount: parseFloat(total).toFixed(2),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'azeemolajide@gmail.com',
      phone_number: '07012345678', // Specify a complete phone number
      name: 'Azeem Olajide', // Capitalize the name for consistency
    },
    customizations: {
      title: 'My Store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      if (response.status !== "completed") {
        console.log("Transaction Failed");
      } else {
        console.log("Successful");
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      console.log("Payment closed");
    },
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* Total */}
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ₦ {parseFloat(total).toFixed(2)}
          </div>
          {/* Clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
        >
          <FlutterWaveButton {...fwConfig} />
        </Link>
        <Link
          to={"/"}
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
