import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialMediasSection from "./components/SocialMediasSection";
import ProductPage from "./components/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import ToastContainer from "./components/ToastContainer";
import CartDrawer from "./components/CartDrawer";

// Importe as páginas das categorias
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
        <Route
          path="/"
          element={
            <>
              <Hero />
              {/* Por enquanto, não exibe preview das categorias aqui */}
            </>
          }
        />
        <Route path="/categoria1" element={<Category1Page />} />
        <Route path="/categoria2" element={<Category2Page />} />
        <Route path="/categoria3" element={<Category3Page />} />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
      <SocialMediasSection />
    </BrowserRouter>
  );
}

export default App;