import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Star, ShoppingCart, Heart, Share2, Sparkles, Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, getProductById, getRelatedProducts } from '../lib/api';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productData } = await getProductById(id!);
        setProduct(productData);

        const { data: related } = await getRelatedProducts(
          productData.category,
          productData._id
        );
        setRelatedProducts(related);
        setError('');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleAddToCart = () => {
  if (!product) return; // Defensive check

  for (let i = 0; i < quantity; i++) {
    addToCart(Product._id); // product is guaranteed to be non-null
  }

  setIsAddedToCart(true);
  setTimeout(() => setIsAddedToCart(false), 2000);
};


  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-white">
        Loading magical item...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧙‍♂️</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {error || 'Magical Item Not Found'}
          </h1>
          <p className="text-gray-300 mb-6">
            This item seems to have vanished into thin air!
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors duration-200"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Sparkles className="absolute top-4 right-4 h-8 w-8 text-yellow-400 animate-pulse" />
              <Zap className="absolute bottom-4 left-4 h-6 w-6 text-purple-400 animate-bounce" />
            </div>
            <div className="mt-4">
              {product.inStock ? (
                <span className="inline-flex items-center space-x-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>In Stock</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-2 text-red-400 text-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span>Out of Stock</span>
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-purple-600/50 text-purple-200 text-sm rounded-full">
                  {product.category}
                </span>
                {product.house && (
                  <span className="px-3 py-1 bg-yellow-600/50 text-yellow-200 text-sm rounded-full">
                    {product.house.charAt(0).toUpperCase() + product.house.slice(1).toLowerCase()}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="text-gray-300 ml-2">({product.rating})</span>
                </div>
              </div>
            </div>

            <div className="text-5xl font-bold text-yellow-400">${product.price}</div>

            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-yellow-500/30 p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Magical Properties</span>
              </h3>
              {product.magicalPower && (
                <p className="text-purple-300 text-lg italic mb-4">
                  ✨ {product.magicalPower}
                </p>
              )}
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              {/* Quantity */}
              <div className="flex items-center space-x-4">
                <label className="text-white font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  } ${isAddedToCart ? 'animate-pulse' : ''}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {isAddedToCart
                      ? 'Added to Cart!'
                      : product.inStock
                      ? 'Add to Cart'
                      : 'Out of Stock'}
                  </span>
                </button>

                <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  <Heart className="h-5 w-5" />
                </button>

                <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              Related <span className="text-yellow-400">Magical Items</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related._id}
                  to={`/product/${related._id}`}
                  className="group bg-black/40 backdrop-blur-sm rounded-lg border border-yellow-500/30 overflow-hidden hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 mb-2">
                      {related.name}
                    </h3>
                    <p className="text-yellow-400 font-bold">${related.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
