import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Sparkles, Zap } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-3xl font-bold text-white mb-4">Magical Item Not Found</h1>
          <p className="text-gray-300 mb-6">This item seems to have vanished into thin air!</p>
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Magical glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating sparkles */}
              <Sparkles className="absolute top-4 right-4 h-8 w-8 text-yellow-400 animate-pulse" />
              <Zap className="absolute bottom-4 left-4 h-6 w-6 text-purple-400 animate-bounce" />
            </div>

            {/* Stock status */}
            <div className="mt-4">
              {product.inStock ? (
                <span className="inline-flex items-center space-x-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>In Stock</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-2 text-red-400 text-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Out of Stock</span>
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-purple-600/50 text-purple-200 text-sm rounded-full">
                  {product.category}
                </span>
                {product.house && (
                  <span className="px-3 py-1 bg-yellow-600/50 text-yellow-200 text-sm rounded-full">
                    {product.house.charAt(0) + product.house.slice(1).toLowerCase()}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
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

            <div className="text-5xl font-bold text-yellow-400">
              ${product.price}
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-yellow-500/30 p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Magical Properties</span>
              </h3>
              <p className="text-purple-300 text-lg italic mb-4">
                ✨ {product.magicalPower}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-white font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

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
                      : 'Out of Stock'
                    }
                  </span>
                </button>

                <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>

                <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
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
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-black/40 backdrop-blur-sm rounded-lg border border-yellow-500/30 overflow-hidden hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-yellow-400 font-bold">${relatedProduct.price}</p>
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