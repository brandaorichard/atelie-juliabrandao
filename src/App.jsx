import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import SocialMediasSection from "./components/SocialMediasSection";
import ProductPage from "./components/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import ToastContainer from "./components/ToastContainer";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Category1Page from "./pages/Category1Page";
import Category2Page from "./pages/Category2Page";
import Category3Page from "./pages/Category3Page";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmEmailInstructionPage from "./pages/ConfirmEmailInstructionPage";
import OrdersPage from "./pages/OrdersPage";
import MinhaContaPage from "./pages/MinhaContaPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import PedidoSucessoRedirect from "./pages/PedidoSucessoRedirect"; // importando o redirecionamento

import "./index.css";

import ConfirmEmailPage from "./pages/ConfirmEmailPage"; // importe o componente

// Página de redirecionamento
function PedidoRedirect() {
  const { id } = useParams();
  return <Navigate to={`/pedido/${id}`} replace />;
}

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Rota para confirmação de email */}
        <Route path="/confirm-email/:token" element={<ConfirmEmailPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailInstructionPage />} />
        <Route path="/meus-pedidos" element={<OrdersPage />} />
        <Route path="/minha-conta" element={<MinhaContaPage />} />
        <Route path="/pedido/:id" element={<OrderDetailPage />} />
        <Route path="/produto/:slug" element={<ProductPage />} />
        <Route path="/pedido/:id/pendente" element={<PedidoSucessoRedirect />} />
        <Route path="/pedido/:id/sucesso" element={<PedidoSucessoRedirect />} />
        <Route path="/pedido/:id/erro" element={<PedidoSucessoRedirect />} />
      </Routes>
      <Footer />
      <SocialMediasSection />
    </BrowserRouter>
  );
}

export default App;