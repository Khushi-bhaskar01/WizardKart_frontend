import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Product } from '../lib/api';
import ProductCard from '../components/ProductCard';

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getMyProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Your Magical Products</h1>
      {/* Product listing */}
    </div>
  );
};

export default SellerDashboard;