import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">📜</div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Spellbook is Empty</h1>
          <p className="text-gray-300 mb-8">
            No magical items have been added to your enchanted cart yet. 
            Start your quest and discover amazing artifacts!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Begin Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const tax = total * 0.08; // 8% magical tax
  const shipping = total > 100 ? 0 : 15; // Free owl delivery over $100
  const finalTotal = total + tax + shipping;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center space-x-3">
            <span>Your Magical</span>
            <span className="text-yellow-400">Spellbook</span>
            <Sparkles className="h-10 w-10 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-300">
            Review your enchanted items and prepare for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Cart Items ({cartItems.length})</h2>
                <button
                  onClick={clearCart}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-yellow-500/20"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg hover:scale-110 transition-transform duration-200"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="block font-bold text-white hover:text-yellow-400 transition-colors duration-200 mb-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-purple-300 text-sm italic mb-2">
                        ✨ {item.magicalPower}
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="px-2 py-1 bg-purple-600/50 text-purple-200 rounded">
                          {item.category}
                        </span>
                        {item.house && (
                          <span className="px-2 py-1 bg-yellow-600/50 text-yellow-200 rounded">
                            {item.house.charAt(0) + item.house.slice(1).toLowerCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        ${item.price} each
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-black/80 to-purple-900/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-yellow-400" />
                <span>Order Summary</span>
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Magical Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Owl Delivery:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-purple-300 italic">
                    Free owl delivery on orders over $100
                  </p>
                )}
                <div className="border-t border-yellow-500/30 pt-4">
                  <div className="flex justify-between text-xl font-bold text-yellow-400">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block w-full text-center py-3 px-6 border-2 border-yellow-500 text-yellow-400 font-medium rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-200"
              >
                Continue Shopping
              </Link>

              {/* Magical Guarantee */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/30">
                <h3 className="text-sm font-bold text-purple-300 mb-2">🛡️ Magical Guarantee</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 30-day enchantment warranty</li>
                  <li>• Free owl delivery & returns</li>
                  <li>• Authentic magical certification</li>
                  <li>• 24/7 wizard support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;