import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQuantity, clearCart } from "../redux/cartSlice";
import { showToast } from "../redux/toastSlice";
import { CartHeader } from "./cart/CartHeader";
import { CartItems } from "./cart/CartItems";
import { FreightSection } from "./cart/FreightSection";
import { CartSummary } from "./cart/CartSummary";
import { useCartImages } from "../hooks/useCartImages";
import { useEnderecoCep } from "../hooks/useEnderecoCep";
import { useFrete } from "../hooks/useFrete";

export default function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart.items);
  const token = useSelector(s => s.auth.token);

  const images = useCartImages(items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const {
    cep,
    fretes,
    freteSelecionado,
    cepInput,
    loadingFrete,
    erroFrete,
    handleCepInputChange,
    calcularFrete,
    handleFreteChange,
  } = useFrete(items);

  const { enderecos } = useEnderecoCep(cep);

  const opcoesFrete = fretes || [];

  const handleQuantity = useCallback((id, quantity) => {
    dispatch(setQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveOne = useCallback((item) => {
    if (item.quantity > 1) {
      dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
    dispatch(showToast({
      type: "cart",
      data: {
        product: { ...item, img: images[item.slug] },
        quantity: item.quantity,
        total: subtotal,
        totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
      }
    }));
  }, [dispatch, images, subtotal, items]);

  const handleCreateOrderAndCheckout = useCallback(async () => {
    if (!token) {
      dispatch(showToast({ type: "error", message: "Você precisa estar logado para finalizar a compra." }));
      return;
    }
    if (!items.length) {
      dispatch(showToast({ type: "error", message: "Seu carrinho está vazio." }));
      return;
    }
    if (!freteSelecionado) {
      dispatch(showToast({ type: "error", message: "Selecione uma opção de frete para continuar." }));
      return;
    }

    const orderPayload = {
      items: items.map(({ slug, quantity, price }) => ({ slug, quantity, price })),
      total: subtotal,
      paymentMethod: "MercadoPago",
      deliveryAddress: "Coletar do usuário",
    };

    try {
      const res = await fetch("https://atelie-juliabrandao-backend-production.up.railway.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) {
        const err = await res.json();
        dispatch(showToast({ type: "error", message: err.message || "Erro ao criar pedido." }));
        return;
      }
      dispatch(clearCart());
      dispatch(showToast({ type: "success", message: "Pedido criado! Pagamento Mercado Pago em breve." }));
    } catch {
      dispatch(showToast({ type: "error", message: "Erro ao conectar com o servidor." }));
    }
  }, [token, items, freteSelecionado, subtotal, dispatch]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar carrinho"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full z-60 cart-drawer-custom bg-[#f9e7f6] shadow-[ -4px_0_16px_0_rgba(174,149,217,0.18)]"
          >
            <style>
              {`
               .cart-drawer-custom { width:100vw;max-width:100vw;}
               @media (min-width:768px){
                 .cart-drawer-custom { width:30vw!important;min-width:320px!important;max-width:420px!important;}
               }
              `}
            </style>
            <div className="h-full flex flex-col">
              <CartHeader onClose={onClose} />
              <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">
                <CartItems
                  items={items}
                  images={images}
                  onDec={(item) => handleQuantity(item.id, Math.max(1, item.quantity - 1))}
                  onInc={(item) => handleQuantity(item.id, item.quantity + 1)}
                  onRemove={handleRemoveOne}
                />
              </div>
              {items.length > 0 && (
                <>
                  <FreightSection
                    cepInput={cepInput}
                    onCepChange={handleCepInputChange}
                    onCalcular={calcularFrete}
                    loadingFrete={loadingFrete}
                    erroFrete={erroFrete}
                    opcoesFrete={opcoesFrete}
                    freteSelecionado={freteSelecionado}
                    onSelectFrete={handleFreteChange}
                    endereco={cepInput.length === 8 ? enderecos?.[cepInput] : null}
                  />
                  <CartSummary
                    subtotal={subtotal}
                    freteSelecionado={freteSelecionado}
                    onCheckout={handleCreateOrderAndCheckout}
                    disabled={!freteSelecionado}
                  />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
