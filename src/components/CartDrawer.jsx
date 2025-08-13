import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../redux/cartSlice";
import { showToast } from "../redux/toastSlice";
import { CartHeader } from "./cart/CartHeader";
import { CartItems } from "./cart/CartItems";
import { FreightSection } from "./cart/FreightSection";
import { CartSummary } from "./cart/CartSummary";
import { useCartImages } from "../hooks/useCartImages";
import { useFrete } from "../hooks/useFrete";
import { createOrderAndCheckout } from "../services/orderCheckout";
import { useNavigate } from "react-router-dom";
import MercadoPagoIcon from "../assets/icons/mercadopago2.png"

export default function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const token = useSelector((s) => s.auth.token);
  const navigate = useNavigate();

  const [numeroCasa, setNumeroCasa] = useState("");
  const [complemento, setComplemento] = useState("");
  const [touched, setTouched] = useState(false);

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
    enderecoCep,
  } = useFrete(items);

  const canCheckout =
    !!freteSelecionado &&
    numeroCasa.trim().length > 0; // complemento agora opcional

  const handleQuantity = useCallback(
    (id, quantity) => {
      dispatch(setQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleRemoveOne = useCallback(
    (item) => {
      if (item.quantity > 1) {
        dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeFromCart(item.id));
      }
      dispatch(
        showToast({
          type: "cart",
          data: {
            product: { ...item, img: images[item.slug] },
            quantity: item.quantity,
            total: subtotal,
            totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
          },
        })
      );
    },
    [dispatch, images, subtotal, items]
  );

  const handleCreateOrderAndCheckout = useCallback(async () => {
    setTouched(true);
    if (!canCheckout) {
      dispatch(
        showToast({
          type: "error",
          message: "Preencha o número da casa para continuar.",
        })
      );
      return;
    }

    const result = await createOrderAndCheckout({
      token,
      items,
      freteSelecionado,
      subtotal,
      dispatch,
      address: {
        cep: enderecoCep?.cep || cepInput || cep,
        logradouro: enderecoCep?.logradouro || "",
        bairro: enderecoCep?.bairro || "",
        cidade: enderecoCep?.localidade || "",
        uf: enderecoCep?.uf || "",
        numero: numeroCasa,
        complemento, // opcional
      },
    });

    if (result.ok && result.order?._id) {
      onClose?.();
      navigate(`/pedido/${result.order._id}`);
    }
  }, [
    token,
    items,
    freteSelecionado,
    subtotal,
    dispatch,
    numeroCasa,
    complemento,
    cepInput,
    cep,
    enderecoCep,
    canCheckout,
    onClose,
    navigate,
  ]);

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
                  onDec={(item) =>
                    handleQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  onInc={(item) => handleQuantity(item.id, item.quantity + 1)}
                  onRemove={handleRemoveOne}
                />
                {/* Só mostra frete/endereço se houver itens */}
                {items.length > 0 && (
                  <div className="mt-4">
                    <FreightSection
                      fullWidth
                      cepInput={cepInput}
                      onCepChange={handleCepInputChange}
                      onCalcular={calcularFrete}
                      loadingFrete={loadingFrete}
                      erroFrete={erroFrete}
                      opcoesFrete={fretes || []}
                      freteSelecionado={freteSelecionado}
                      onSelectFrete={handleFreteChange}
                      endereco={enderecoCep}
                      showCepInput={!cep || cep.length !== 8}
                    />
                  </div>
                )}

                {items.length > 0 && enderecoCep && (
                  <section className="mt-6">
                    <h3 className="text-sm font-semibold mb-2">
                      Dados da entrega
                    </h3>
                    <div className="border border-gray-300 rounded bg-[#f9e7f6] px-3 py-2 text-xs mb-3 leading-snug">
                      <div>{enderecoCep.logradouro}</div>
                      <div>
                        {enderecoCep.bairro} - {enderecoCep.localidade}/{enderecoCep.uf}
                      </div>
                      <div>CEP: {enderecoCep.cep}</div>
                    </div>
                    {/* inputs de número e complemento */}
                    <div className="grid gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Número *
                        </label>
                        <input
                          className={`w-full border rounded px-3 py-2 text-xs ${
                            touched && !numeroCasa.trim()
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={numeroCasa}
                          onChange={(e) => setNumeroCasa(e.target.value)}
                          placeholder="Ex: 123"
                        />
                        {touched && !canCheckout && (
                          <p className="text-[11px] text-red-600 mt-2">
                            Preencha o número da casa.
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Complemento
                        </label>
                        <input
                          className="w-full border border-gray-300 rounded px-3 py-2 text-xs"
                          value={complemento}
                          onChange={(e) => setComplemento(e.target.value)}
                          placeholder="Ex: Apto 01 / Bloco B"
                        />
                        {/* Nenhum aviso de erro aqui! */}
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {items.length > 0 && (
                <CartSummary
                  subtotal={subtotal}
                  freteSelecionado={freteSelecionado}
                  onCheckout={handleCreateOrderAndCheckout}
                  disabled={false} // <-- sempre habilitado!
                  checkoutLabel={
                    canCheckout
                      ? (
                        <span className="flex items-center justify-center gap-2">
                          Prosseguir para o Mercado Pago
                          <img
                            src={MercadoPagoIcon}
                            alt="Mercado Pago"
                            className="h-6 w-auto"
                            style={{
                              display: "inline-block",
                              verticalAlign: "middle",
                              background: "transparent",
                            }}
                          />
                        </span>
                      )
                      : "Iniciar Compra"
                  }
                  showMercadoPagoInfo={canCheckout}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
