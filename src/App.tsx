import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import StarField from "./components/StarField";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound.js"));

// Optional Helmet Setup (if using react-helmet-async)
// import { HelmetProvider } from 'react-helmet-async';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <StarField />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Suspense
              fallback={
                <div className="p-10 text-center">✨ Loading Magic... ✨</div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      {/* <HelmetProvider> */}
      <Router>
        <AppContent />
      </Router>
      {/* </HelmetProvider> */}
    </CartProvider>
  );
}

export default App;
