import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQuantity, clearCart } from "../redux/cartSlice";
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
import LoginPreview from "./LoginPreview"; // importe o componente
import { login } from "../redux/authSlice"; // ajuste o caminho se necessário
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'pt-BR' });

export default function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const token = useSelector((s) => s.auth.token);
  const navigate = useNavigate();

  const [numeroCasa, setNumeroCasa] = useState("");
  const [complemento, setComplemento] = useState("");
  const [touched, setTouched] = useState(false);
  const [showLoginPreview, setShowLoginPreview] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

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
    if (!canCheckout) return;
    if (!token) {
      dispatch(showToast({ type: "error", message: "Você precisa estar logado para finalizar a compra." }));
      setShowLoginPreview(true);
      return;
    }

    setLoadingCheckout(true);

    // 1. Crie o pedido normalmente
    const orderResult = await createOrderAndCheckout({
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
        complemento,
      },
    });

    // 2. Gere a preferência Mercado Pago usando o pedido criado
    if (orderResult.ok && orderResult.order?._id) {
      const prefRes = await fetch(
        "https://atelie-juliabrandao-backend-production.up.railway.app/api/checkout/preference",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderResult.order._id,
            items: orderResult.order.items.map(i => ({
              title: i.title,
              quantity: i.quantity,
              unit_price: i.price
            })),
            freight: {
              title: freteSelecionado?.title || freteSelecionado?.service || "Frete",
              value: Number(freteSelecionado?.price) || 0
            },
            payer: {
              email: orderResult.order.payer?.email,
              name: orderResult.order.payer?.name,
              cpf: orderResult.order.payer?.cpf
            }
          }),
        }
      );
      const prefData = await prefRes.json();
      setPreferenceId(prefData.preferenceId); // Agora renderiza o Wallet!
    }

    setLoadingCheckout(false);
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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CartHeader onClose={onClose} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto px-3 md:px-6 py-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItems
                    items={items}
                    images={images}
                    onDec={(item) =>
                      handleQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    onInc={(item) => handleQuantity(item.id, item.quantity + 1)}
                    onRemove={handleRemoveOne}
                  />
                </motion.div>
                {items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
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
                  </motion.div>
                )}

                {items.length > 0 && enderecoCep && (
                  <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
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
                  </motion.section>
                )}
              </motion.div>

              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="sticky bottom-0 left-0 right-0 bg-[#f9e7f6] px-3 md:px-6 py-4 z-10"
                >
                  {/* Bloco do total */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Subtotal</span>
                      <span>
                        {subtotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    {freteSelecionado && (
                      <div className="flex justify-between text-sm mb-1">
                        <span>Frete</span>
                        <span>
                          {Number(freteSelecionado.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-base mt-2">
                      <span>Total</span>
                      <span>
                        {(
                          subtotal +
                          (freteSelecionado ? Number(freteSelecionado.price) : 0)
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  </div>
                  {/* Bloco fixo Mercado Pago */}
                  <div className="flex items-center gap-2 border border-[#ae95d9] bg-[#f9e7f6] rounded px-3 py-2 mb-3">
                    <img
                      src={MercadoPagoIcon}
                      alt="Mercado Pago"
                      className="h-8 w-auto"
                      style={{
                        background: "transparent",
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                    <div>
                      <div className="text-sm text-gray-700">
                        Vamos te redirecionar para o Mercado Pago
                      </div>
                      <div className="text-xs text-gray-500">
                        Se não tiver conta Mercado Pago, use seu e-mail.
                      </div>
                    </div>
                  </div>
                  {/* Botão Mercado Pago */}
                  {!preferenceId ? (
                    <button
                      className="w-full rounded-full py-3 font-medium transition flex items-center justify-center gap-2 bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
                      onClick={handleCreateOrderAndCheckout}
                      disabled={loadingCheckout}
                    >
                      {loadingCheckout ? "Carregando..." : "Prosseguir para o Mercado Pago"}
                    </button>
                  ) : (
                    <div style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
                      <Wallet initialization={{ preferenceId }} />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
          <LoginPreview
            open={showLoginPreview}
            onClose={() => setShowLoginPreview(false)}
            onLogin={async ({ user, token }) => {
              dispatch(login({ user, token }));
              setShowLoginPreview(false);
              dispatch(
                showToast({
                  message: "Login realizado com sucesso!",
                  iconType: "success",
                })
              );
            }}
            onCreateAccount={() => {
              setShowLoginPreview(false); // fecha o preview de login
              onClose?.(); // minimiza/retrai o carrinho
              navigate("/register"); // mostra a página de cadastro
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
