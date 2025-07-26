// src/pages/AllProducts.tsx
"use client";

import { useEffect, useState } from "react";
import api, {  Product } from "../lib/api";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.error("Fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-xl shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
