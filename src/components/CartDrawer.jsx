import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../redux/cartSlice";

export default function CartDrawer({ open, onClose }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Remove uma unidade ou o item inteiro se só houver uma
  const handleRemoveOne = (item) => {
    if (item.quantity > 1) {
      dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleQuantity = (id, quantity) =>
    dispatch(setQuantity({ id, quantity }));

  // Função para abrir o WhatsApp com o resumo do pedido
  function handleWhatsAppCheckout() {
    const phone = "SEUNUMERO"; // Exemplo: 5511999999999
    const itemsText = items
      .map(
        (item) =>
          `• ${item.name} (Qtd: ${
            item.quantity
          }) - R$${item.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`
      )
      .join("\n");
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar meu pedido:\n\n${itemsText}\n\nTotal: R$${total.toLocaleString(
        "pt-BR",
        { minimumFractionDigits: 2 }
      )}\n\nAguardo instruções de pagamento.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar carrinho"
          />
          {/* Drawer lateral direita */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full z-60 cart-drawer-custom"
            style={{
              minWidth: 0,
              background: "#f9e7f6",
              boxShadow: "-4px 0 16px 0 rgba(174,149,217,0.18)",
            }}
          >
            <style>
              {`
                .cart-drawer-custom {
                  width: 100vw;
                  max-width: 100vw;
                }
                @media (min-width: 768px) {
                  .cart-drawer-custom {
                    width: 30vw !important;
                    min-width: 320px !important;
                    max-width: 420px !important;
                  }
                }
              `}
            </style>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-3 md:px-6 py-5 border-b border-[#e5d3e9]">
                <span className="text-lg font-light text-[#616161]">
                  Carrinho de compras
                </span>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="text-[#616161] text-xl cursor-pointer"
                  style={{
                    lineHeight: 1,
                    padding: 0,
                    background: "none",
                    border: "none",
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">
                {items.length === 0 ? (
                  <div className="text-center text-[#616161] mt-10">
                    Seu carrinho está vazio.
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border rounded-lg p-3 mb-4 bg-[#f9e7f6]"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover border"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          R$
                          {item.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              handleQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60 cursor-pointer"
                            aria-label="Diminuir"
                            disabled={item.quantity === 1}
                          >
                            –
                          </button>
                          <span className="mx-2 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60 cursor-pointer"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveOne(item)}
                          className="text-xs text-[#7a4fcf] underline mt-2 cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Total, aviso e botão de finalizar */}
              {items.length > 0 && (
                <div className="px-3 md:px-6 py-4 border-t border-[#e5d3e9] bg-[#f9e7f6]">
                  {/* Aviso WhatsApp */}
                  <div className="mb-3 p-3 rounded bg-[#fffbe7] border border-[#ffe066]">
                    <span className="text-sm text-[#616161]">
                      <b>Atenção:</b> Ao clicar em <b>“Iniciar Compra”</b>, você
                      será direcionado para o WhatsApp para finalizar seu pedido
                      com nossa equipe. O pagamento será feito via link Mercado
                      Pago, Pix ou boleto.
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg">
                      R$
                      {items
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <button
                    className="w-full bg-[#7a4fcf] hover:bg-[#ae95d9] text-white rounded-full py-3 font-medium transition"
                    onClick={handleWhatsAppCheckout}
                  >
                    Iniciar Compra
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
