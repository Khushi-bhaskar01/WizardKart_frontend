import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black/90 backdrop-blur-sm text-white border-t border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                WizardKart
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for authentic magical items, enchanted artifacts, and wizarding essentials from the finest magical craftsmen.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">All Products</a></li>
              <li><a href="/shop?category=Wands" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Wands</a></li>
              <li><a href="/shop?category=Potions" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Potions</a></li>
              <li><a href="/shop?category=Brooms" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Flying Brooms</a></li>
            </ul>
          </div>

          {/* Houses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Houses</h3>
            <ul className="space-y-2">
              <li><a href="/shop?house=GRYFFINDOR" className="text-red-400 hover:text-red-300 transition-colors duration-200">Gryffindor</a></li>
              <li><a href="/shop?house=SLYTHERIN" className="text-green-400 hover:text-green-300 transition-colors duration-200">Slytherin</a></li>
              <li><a href="/shop?house=RAVENCLAW" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Ravenclaw</a></li>
              <li><a href="/shop?house=HUFFLEPUFF" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">Hufflepuff</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-full transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Magical Quote */}
        <div className="mt-12 pt-8 border-t border-yellow-500/30 text-center">
          <p className="text-lg font-medium text-yellow-400 italic mb-4">
            "It does not do to dwell on dreams and forget to live."
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 WizardKart. All magical rights reserved. | Enchanted with ❤️ by wizards
          </p>
        </div>
      </div>

      {/* Floating magical orbs */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-12 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
    </footer>
  );
};

export default Footer;