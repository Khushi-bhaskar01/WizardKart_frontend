// "use client";

// import React from "react";
// import { CheckCircle, ShoppingBag } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const OrderConfirmation: React.FC = () => {
//   const navigate = useNavigate();
//   const orderNumber = Math.floor(Math.random() * 1000000);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//         <div className="text-green-500 flex justify-center mb-4">
//           <CheckCircle size={48} />
//         </div>
//         <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your magical items will be on their way soon!
//         </p>
        
//         <div className="bg-gray-50 p-4 rounded-lg mb-6">
//           <div className="flex justify-center mb-3">
//             <ShoppingBag size={32} className="text-purple-600" />
//           </div>
//           <p className="font-semibold">Order #{orderNumber}</p>
//           <p className="text-sm text-gray-500 mt-1">
//             A confirmation has been sent to your email
//           </p>
//         </div>
        
//         <button
//           onClick={() => navigate('/shop')}
//           className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;
// // "use client";
// // import React from "react";
// // import { Link } from "react-router-dom";

// // const OrderConfirmation: React.FC = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
// //       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
// //         <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
// //         <Link to="/shop" className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg">
// //           Continue Shopping
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };
// // export default OrderConfirmation;
// src/pages/OrderConfirmation.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your magical items will be delivered soon!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
