import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, BookOpen, Crown, Shield } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { HOUSES } from "../utils/constants";

const Home: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      {/* 🔮 Global Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="magical-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔮 Optional Audio */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        muted={isMuted}
        className="hidden"
      >
        <source src="public\magical-ambience.mp3" type="audio/mpeg" />
      </audio>

      {/* 🔮 Overlay (darkens the video for text readability) */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-10 pointer-events-none"></div>

      {/* 🔮 Page Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center text-center px-4">
          <div>
            <FlaskConical className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6">
              WizardKart
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
              Welcome to the most enchanted marketplace in the wizarding world.
              Discover magical artifacts, potions, and treasures beyond your wildest dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
              >
                <FlaskConical className="inline-block mr-2" />
                Begin Your Quest
              </Link>
              <Link
                to="/profile"
                className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition"
              >
                Choose Your House
              </Link>
            </div>
          </div>
        </section>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleMute}
          className="fixed bottom-5 right-5 z-30 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full shadow-lg"
        >
          {isMuted ? "Unmute Audio" : "Mute Audio"}
        </button>

        {/* House Selection */}
        <section className="py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="text-yellow-400">House</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each Hogwarts house offers unique magical items tailored to their values and traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Object.entries(HOUSES).map(([key, house]) => (
              <Link
                key={key}
                to={`/shop?house=${key}`}
                className="bg-black/40 border border-yellow-500/20 backdrop-blur-md rounded-xl p-6 hover:scale-105 transform transition"
              >
                <div className="text-center">
                  {key === "GRYFFINDOR" && <Crown className="h-10 w-10 text-red-500 mx-auto mb-2" />}
                  {key === "SLYTHERIN" && <Shield className="h-10 w-10 text-green-500 mx-auto mb-2" />}
                  {key === "RAVENCLAW" && <BookOpen className="h-10 w-10 text-blue-500 mx-auto mb-2" />}
                  {key === "HUFFLEPUFF" && <FlaskConical className="h-10 w-10 text-yellow-400 mx-auto mb-2" />}
                  <h3 className="text-xl font-bold text-white">{house.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Featured <span className="text-yellow-400">Magical Items</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Handpicked artifacts from the finest magical craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition"
            >
              Explore All Magical Items
            </Link>
          </div>
        </section>

        {/* Magical Stats */}
        <section className="py-20 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-300">Magical Items</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-300">Happy Wizards</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-gray-300">Hogwarts Houses</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Owl Delivery</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
