"use client";

import React from "react";
import { Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Your Magical Cart</h1>
        </div>

        {cartCount === 0 ? (
          <div className="bg-emerald-50 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700">Your cart is empty</h2>
            <p className="text-gray-900 mt-2">Continue your magical shopping journey</p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 px-6 py-2 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map(item => (
                  <div key={item.product.id} className="p-4 border-b last:border-b-0 flex items-center">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.product.category}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-1 border rounded-l-lg hover:bg-gray-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-y bg-gray-500">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 border rounded-r-lg hover:bg-gray-500 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-red-500 hover:text-red-700 flex items-center gap-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} /> Clear Cart
                </button>
              </div>
            </div>
            
            <div className="bg-cyan-950 rounded-lg shadow-md p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-purple-500 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-900">Pay securely with your card</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-purple-500 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-900">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <button
                onClick={() => {
                 clearCart(); // Clear the cart after placing order
                 navigate('/order-confirmation');
     }}

                className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
"use client";
// import React from "react";
// import { Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Cart: React.FC = () => {
//   const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//   const tax = subtotal * 0.08;
//   const shipping = subtotal > 100 ? 0 : 15;
//   const total = subtotal + tax + shipping;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* ... existing cart UI ... */}
//       <button
//         onClick={() => navigate('/checkout')}
//         className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };
// export default Cart;