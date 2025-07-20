import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wand2, BookOpen, Crown, Shield } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { HOUSES } from '../utils/constants';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black/30 to-blue-900/50"></div>
        
        {/* Animated magical elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-70"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-glow">
              WizardKart
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Welcome to the most enchanted marketplace in the wizarding world. 
              Discover magical artifacts, potions, and treasures beyond your wildest dreams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/shop"
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Begin Your Quest</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
            
            <Link
              to="/profile"
              className="px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Choose Your House
            </Link>
          </div>
        </div>
      </section>

      {/* House Selection */}
      <section className="py-20 bg-gradient-to-b from-black/80 to-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="text-yellow-400">House</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each Hogwarts house offers unique magical items tailored to their values and traditions. 
              Discover items that resonate with your inner wizard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(HOUSES).map(([key, house]) => (
              <Link
                key={key}
                to={`/shop?house=${key}`}
                className="group relative p-6 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-4">
                    {key === 'GRYFFINDOR' && <Crown className="h-12 w-12 text-red-500 mx-auto" />}
                    {key === 'SLYTHERIN' && <Shield className="h-12 w-12 text-green-500 mx-auto" />}
                    {key === 'RAVENCLAW' && <BookOpen className="h-12 w-12 text-blue-500 mx-auto" />}
                    {key === 'HUFFLEPUFF' && <Sparkles className="h-12 w-12 text-yellow-500 mx-auto" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200">
                    {house.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm">
                    {key === 'GRYFFINDOR' && 'Courage, bravery, and determination'}
                    {key === 'SLYTHERIN' && 'Ambition, cunning, and resourcefulness'}
                    {key === 'RAVENCLAW' && 'Intelligence, wisdom, and creativity'}
                    {key === 'HUFFLEPUFF' && 'Loyalty, patience, and kindness'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-purple-900/40 to-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="text-yellow-400">Magical Items</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Handpicked artifacts from the finest magical craftsmen. Each item is enchanted with 
              powerful spells and guaranteed to enhance your magical abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              Explore All Magical Items
            </Link>
          </div>
        </div>
      </section>

      {/* Magical Stats */}
      <section className="py-20 bg-gradient-to-b from-black/80 to-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-300">Magical Items</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-300">Happy Wizards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-gray-300">Hogwarts Houses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Owl Delivery</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;