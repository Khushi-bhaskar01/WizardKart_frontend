// src/pages/MyProducts.tsx
"use client";

import { useEffect, useState } from "react";
import api,{  Product } from "../lib/api";

export default function MyProducts() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    try {
      const res = await api.getMyProducts();
      setMyProducts(res);
    } catch (err) {
      console.error("Failed to load seller products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {loading ? (
        <p>Loading your products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-xl shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
              {/* You can also add buttons here for update/delete using api.updateProduct or api.deleteProduct */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
