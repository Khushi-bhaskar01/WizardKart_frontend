import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Sparkles, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-black/40 to-purple-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <Link to={`/product/${product.id}`} className="block relative z-10">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Magical overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-yellow-300 text-sm font-medium italic">
                ✨ {product.magicalPower}
              </p>
            </div>
          </div>

          {/* Stock status */}
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}

          {/* Quick view button */}
          <div className={`absolute top-2 left-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}>
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Floating sparkles */}
          <Sparkles className={`absolute top-4 right-4 h-5 w-5 text-yellow-400 transition-all duration-500 ${
            isHovered ? 'opacity-100 rotate-12' : 'opacity-0'
          }`} />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-yellow-400">
              ${product.price}
            </span>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                product.inStock
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">
                {product.inStock ? 'Add to Cart' : 'Unavailable'}
              </span>
            </button>
          </div>

          {/* Category tag */}
          <div className="mt-3">
            <span className="inline-block bg-purple-600/50 text-purple-200 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;