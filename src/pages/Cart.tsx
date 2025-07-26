import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import emptyAnimation from "./assets/empty-cart.json"; // ✅ Make sure this exists
import cartBackground from "../assets/harry-bg.jpg"; // ✅ Make sure this exists
import { ShoppingBag } from "lucide-react"; // ✅ Only importing what's used
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <>
        {/* 🔮 Magical Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/magical-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cartBackground})` }}
        >
          <div className="bg-black/60 min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <Lottie
                animationData={emptyAnimation}
                loop
                className="w-64 h-64 mx-auto mb-6"
              />
              <h1 className="text-3xl font-bold text-white mb-4">
                Your Spellbook is Empty
              </h1>
              <p className="text-gray-300 mb-8">
                No magical items have been added to your enchanted cart yet.
                Start your quest and discover amazing artifacts!
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Begin Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const total = getCartTotal();
  const tax = total * 0.08;
  const shipping = total > 100 ? 0 : 15;
  const finalTotal = total + tax + shipping;

  return (
    <>
      {/* 🔮 Magical Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/magical-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cartBackground})` }}
      >
        <div className="bg-black/60 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart</h1>
            <p className="text-gray-300 mb-8">
              You have {cartItems.length} magical item{cartItems.length > 1 ? "s" : ""} in your spellbook!
            </p>
            {/* You can map cart items here */}
            <div className="text-white">
              <p>Total: ${total.toFixed(2)}</p>
              <p>Tax (8%): ${tax.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p className="font-bold text-xl">Final Total: ${finalTotal.toFixed(2)}</p>
            </div>
            {/* Add Checkout button or cart management UI */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
