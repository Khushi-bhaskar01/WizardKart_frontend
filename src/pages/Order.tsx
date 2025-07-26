"use client";

import React, { useState } from "react";
import { Wand } from "lucide-react"; // Removed unused ScrollText import
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useCart } from "../context/CartContext";

// Define types for better type safety
type PaymentMethod = "online" | "cod";
type PaymentMode = "Online" | "Cash On Delivery";

interface OrderItem {
  product: string; // product ID
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  totalAmount: number;
  paymentMode: PaymentMode;
}

const Order: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Calculate order totals
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = total * 0.08;
  const shipping = total > 100 ? 0 : 15;
  const finalTotal = total + tax + shipping;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData: OrderData = {
        items: cartItems.map(item => ({
          product: item.product.id, // Changed from _id to id
          quantity: item.quantity
        })),
        totalAmount: finalTotal,
        paymentMode: paymentMethod === "online" ? "Online" : "Cash On Delivery"
      };

      await api.placeOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
      console.error("Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Wand className="text-yellow-400" /> Complete Your Order
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-400">Your cart is empty</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between py-2 border-b border-gray-700"> {/* Changed from _id to id */}
                    <div>
                      <p>{item.product.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="form-radio text-yellow-500"
                  />
                  <span>Online Payment</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="form-radio text-yellow-500"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800/50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Total</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-3 rounded-lg font-bold ${
                  loading ? 'bg-gray-600' : 'bg-yellow-600 hover:bg-yellow-700'
                } transition-colors`}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>

              {error && (
                <p className="text-red-400 mt-4 text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;