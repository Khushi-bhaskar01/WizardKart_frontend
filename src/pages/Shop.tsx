import React, { useState, useMemo } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { products } from "../data/products";
import { PRODUCT_CATEGORIES, HOUSES } from "../utils/constants";
import ProductCard from "../components/ProductCard";

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesHouse = !selectedHouse || product.house === selectedHouse;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesHouse && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedHouse, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedHouse("");
    setPriceRange({ min: 0, max: 2000 });
    setSortBy("name");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔮 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/magical-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔮 Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* 🧙 Main Content */}
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
          {/* Search, Filters, View Mode Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 flex-1">
              <Search className="text-white" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search magical products..."
                className="bg-white/20 text-white placeholder-white px-4 py-2 rounded-lg w-full focus:outline-none"
              />
            </div>

            <div className="flex gap-2 items-center">
              <button
                className="text-white flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter /> Filters
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white text-black" : "text-white"
                }`}
              >
                <Grid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white text-black" : "text-white"
                }`}
              >
                <List />
              </button>
            </div>
          </div>

          {/* Product Grid/List */}
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
