import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Sparkles, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const cartItemsCount = getCartItemsCount();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-8 w-8 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              WizardKart
            </span>
          </Link>

          {/* Navigation Right */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/shop" className={`text-white ${isActive("/shop") && "text-yellow-400"}`}>
                    Shop
                  </Link>
                  <Link to="/profile" className={`text-white ${isActive("/profile") && "text-yellow-400"}`}>
                    Profile
                  </Link>
                  <Link to="/cart" className="relative text-white">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-medium hover:text-yellow-400">
                    Logout
                  </button>
                </div>

                {/* Mobile menu button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-white hover:text-yellow-400">
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {user && isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm rounded-b-lg border-b border-yellow-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/shop" className="block px-3 py-2 text-white hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/profile" className="block px-3 py-2 text-white hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/cart" className="block px-3 py-2 text-white hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
                Cart
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-white hover:text-yellow-400">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
