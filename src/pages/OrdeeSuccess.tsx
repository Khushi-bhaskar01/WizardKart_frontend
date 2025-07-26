"use client";

import React from "react";
import { CheckCircle, Wand } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your magical items will be delivered soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
          >
            <Wand className="h-5 w-5" />
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;