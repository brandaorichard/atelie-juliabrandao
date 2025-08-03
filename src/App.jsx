import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SocialMediasSection from "./components/SocialMediasSection";
import ProductPage from "./components/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import ToastContainer from "./components/ToastContainer";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

// Importe as páginas
import HomePage from "./pages/HomePage";
import Category1Page from "./pages/Category1Page";
import Category2Page from "./pages/Category2Page";
import Category3Page from "./pages/Category3Page";

import "./index.css";

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <ToastContainer onViewCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria1" element={<Category1Page />} />
        <Route path="/categoria2" element={<Category2Page />} />
        <Route path="/categoria3" element={<Category3Page />} />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
      {/* Seção de redes sociais */}
      <SocialMediasSection />
    </BrowserRouter>
  );
}

export default App;