import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RebornCardsSection from "./components/RebornCardsSection";
import SocialMediasSection from "./components/SocialMediasSection";
import ProductPage from "./components/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import ToastContainer from "./components/ToastContainer";
import CartDrawer from "./components/CartDrawer";

import "./index.css";

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Adicione aqui */}
      <Header />
      <ToastContainer onViewCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Hero /> */}
              <RebornCardsSection />
            </>
          }
        />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
      <SocialMediasSection />
    </BrowserRouter>
  );
}

export default App;
