"use client";

import React, { useState } from "react";
import { Wand, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/order-success');
      }, 2000);
    }, 3000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-300">Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Wand className="text-yellow-400" /> Payment
        </h1>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full bg-gray-700 text-white rounded p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-gray-700 text-white rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
              processing ? 'bg-gray-600' : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            {processing ? 'Processing...' : (
              <>
                <Wand className="h-5 w-5" />
                Complete Payment
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p>This is a demo payment page. No real transactions will be processed.</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
// "use client";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Payment: React.FC = () => {
//   const { clearCart } = useCart();
//   const [processing, setProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     setProcessing(true);
//     setTimeout(() => {
//       clearCart();
//       navigate('/order-confirmation');
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
//       {/* ... payment form ... */}
//       <button 
//         onClick={handlePayment}
//         disabled={processing}
//         className="w-full py-3 bg-yellow-600 text-black rounded-lg"
//       >
//         {processing ? "Processing..." : "Complete Payment"}
//       </button>
//     </div>
//   );
// };
// export default Payment;