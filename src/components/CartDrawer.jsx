import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQuantity, clearCart } from "../redux/cartSlice";
import { showToast } from "../redux/toastSlice";
import { setFreteSelecionado } from "../redux/freteSlice";
import { FaExclamationTriangle } from "react-icons/fa";

export default function CartDrawer({ open, onClose }) {
  const items = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // Estado global do frete
  const cep = useSelector(state => state.frete.cep);
  const freteSelecionado = useSelector(state => state.frete.freteSelecionado);
  const fretes = useSelector(state => state.frete.fretes);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Estado local para imagens dos itens do carrinho
  const [images, setImages] = useState({}); // { slug: url }
  const [enderecos, setEnderecos] = useState({}); // { cep: endereco }

  // Estado local para CEP digitado no carrinho (independente do Redux)
  const [cepInput, setCepInput] = useState("");
  const [fretesLocal, setFretesLocal] = useState([]);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState("");

  // Buscar imagens dos produtos do carrinho pelo slug
  useEffect(() => {
    async function fetchImages() {
      const newImages = {};
      for (const item of items) {
        if (!images[item.slug]) {
          try {
            const res = await fetch(
              `https://atelie-juliabrandao-backend-production.up.railway.app/api/babies/slug/${item.slug}`
            );
            if (res.ok) {
              const data = await res.json();
              const validImg =
                Array.isArray(data.images) &&
                typeof data.images[0] === "string" &&
                data.images[0].startsWith("http")
                  ? data.images[0]
                  : "";
              newImages[item.slug] = validImg;
            }
          } catch (e) {
            newImages[item.slug] = "";
          }
        }
      }
      if (Object.keys(newImages).length > 0) {
        setImages(prev => ({ ...prev, ...newImages }));
      }
    }
    if (items.length > 0) fetchImages();
    // eslint-disable-next-line
  }, [items]);

  // Buscar endereço do CEP (ViaCEP)
  useEffect(() => {
    async function fetchEndereco() {
      if (cep && !enderecos[cep]) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          if (res.ok) {
            const data = await res.json();
            if (!data.erro) {
              setEnderecos(prev => ({
                ...prev,
                [cep]: `${data.logradouro ? data.logradouro + ", " : ""}${data.bairro ? data.bairro + ", " : ""}${data.localidade ? data.localidade + " - " : ""}${data.uf || ""}`
              }));
            }
          }
        } catch (e) {
          // ignora erro
        }
      }
    }
    fetchEndereco();
    // eslint-disable-next-line
  }, [cep]);

  // Remove uma unidade ou o item inteiro se só houver uma
  const handleRemoveOne = (item) => {
    if (item.quantity > 1) {
      dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
    dispatch(showToast({
      type: "cart",
      data: {
        product: { ...item, img: images[item.slug] }, // <-- aqui está o segredo!
        quantity: item.quantity,
        total: subtotal,
        totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
      }
    }));
  };

  const handleQuantity = (id, quantity) =>
    dispatch(setQuantity({ id, quantity }));

  // Selecionar/desmarcar frete
  function handleFreteChange(frete) {
    if (freteSelecionado && freteSelecionado.name === frete.name) {
      dispatch(setFreteSelecionado(null));
    } else {
      dispatch(setFreteSelecionado({ ...frete, cep: cepInput || freteSelecionado?.cep || cep }));
    }
  }

  // Função para calcular frete no carrinho
  async function calcularFreteCarrinho() {
    if (cepInput.length !== 8) {
      setErroFrete("Digite um CEP válido com 8 dígitos.");
      return;
    }
    setLoadingFrete(true);
    setErroFrete("");
    setFretesLocal([]);
    try {
      const res = await fetch("http://localhost:4000/api/frete/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cepDestino: cepInput,
          items: items.map(item => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });
      const data = await res.json();
      const services = (Array.isArray(data) ? data : data.services || [])
        .filter(s => !s.has_error && s.price)
        .map(s => ({
          name: s.name,
          price: s.price,
          deadline: s.delivery_time || (s.delivery_range && s.delivery_range.max) || null,
          company: s.company?.name,
          logo: s.company?.picture,
        }));
      setFretesLocal(services);
      if (services.length === 0) setErroFrete("Nenhuma opção de frete encontrada para este CEP.");
    } catch (err) {
      setErroFrete("Não foi possível calcular o frete. Verifique o CEP.");
    } finally {
      setLoadingFrete(false);
    }
  }

  // Função para criar pedido e abrir WhatsApp
  async function handleCreateOrderAndCheckout() {
    if (!token) {
      dispatch(
        showToast({
          type: "error",
          message: "Você precisa estar logado para finalizar a compra.",
        })
      );
      return;
    }

    if (items.length === 0) {
      dispatch(
        showToast({
          type: "error",
          message: "Seu carrinho está vazio.",
        })
      );
      return;
    }

    if (!freteSelecionado) {
      dispatch(
        showToast({
          type: "error",
          message: "Selecione uma opção de frete para continuar.",
        })
      );
      return;
    }

    const orderPayload = {
      items: items.map(({ id, slug, quantity, price }) => ({
        slug,
        quantity,
        price,
      })),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      paymentMethod: "WhatsApp",
      deliveryAddress: "Endereço padrão ou coletar do usuário",
    };

    try {
      const response = await fetch("https://atelie-juliabrandao-backend-production.up.railway.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(
          showToast({
            type: "error",
            message: errorData.message || "Erro ao criar pedido.",
          })
        );
        return;
      }

      dispatch(clearCart());

      // abrir WhatsApp
      const phone = 5567992654151;
      const itemsText = items
        .map(
          (item) =>
            `• Modelo: ${item.name}\n  Valor unitário: R$${item.price.toLocaleString(
              "pt-BR",
              {
                minimumFractionDigits: 2,
              }
            )}\n  Quantidade: ${item.quantity}\n  Subtotal: R$${(
              item.price * item.quantity
            ).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
        )
        .join("\n\n");
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const freteText = freteSelecionado
        ? `\nFrete (${freteSelecionado.name}): R$${Number(freteSelecionado.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
        : "";
      const message = encodeURIComponent(
        `Olá! Estou interessado(a) em finalizar minha compra pelo site Atelie Júlia Brandão:\n\n${itemsText}${freteText}\n\nTotal do pedido: R$${(total + (freteSelecionado ? Number(freteSelecionado.price) : 0)).toLocaleString(
          "pt-BR",
          { minimumFractionDigits: 2 }
        )}\n\nAguardo as instruções para pagamento e envio.`
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message: "Erro ao conectar com o servidor.",
        })
      );
    }
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
                  className="text-[#616161] text-4xl cursor-pointer"
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
                      className="flex items-center gap-3 border border-neutral-300 rounded-lg p-3 mb-4 bg-[#f9e7f6]"
                    >
                      <img
                        src={images[item.slug] || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-20 h-22 rounded object-cover border border-neutral-300"
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
              {/* Footer do carrinho */}
              {items.length > 0 && (
                <>
                  {/* Bloco de cálculo de frete e seleção */}
                  <div className="px-3 md:px-6 mb-2">
                    <div className="mb-2 text-sm text-[#616161]">
                      <span>Calcule o frete para sua região:</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Digite seu CEP"
                        value={cepInput}
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                          setCepInput(value);
                          // Limpa endereço e frete selecionado se o usuário apagar o CEP
                          if (value.length < 8) {
                            setEnderecos(prev => ({ ...prev, [cepInput]: undefined }));
                            setFretesLocal([]);
                            dispatch(setFreteSelecionado(null));
                          }
                        }}
                        className="border border-[#616161] rounded-3xl px-3 py-2 w-32"
                      />
                      <button
                        onClick={calcularFreteCarrinho}
                        disabled={loadingFrete || cepInput.length !== 8}
                        className="bg-[#7a4fcf] text-white px-4 py-2 rounded-3xl disabled:opacity-50 cursor-pointer"
                      >
                        {loadingFrete ? "Calculando..." : "Calcular frete"}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 border border-[#e6a04e] rounded px-3 py-2 text-[#e6a04e] text-sm mb-2">
                      <FaExclamationTriangle className="mr-1" />
                      O prazo da sua entrega deve ser somado com o prazo da confecção do bebê + o envio dos correios.
                    </div>
                    {erroFrete && <div className="text-red-500 mb-2">{erroFrete}</div>}

                    {/* Opções de frete */}
                    {fretesLocal.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {fretesLocal.map(frete => (
                          <label key={frete.name} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="frete"
                              checked={freteSelecionado?.name === frete.name}
                              onChange={() => handleFreteChange(frete)}
                            />
                            <span>
                              {frete.name} - {frete.deadline} dias úteis -{" "}
                              <strong>
                                {Number(frete.price).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </strong>
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bloco visual do frete selecionado (agora com endereço acima) */}
                  {freteSelecionado && (
                    <div className="mb-3 px-3 md:px-6 py-3 rounded bg-[#f3e6f3] border border-[#e5d3e9]">
                      {cepInput.length === 8 && enderecos[cepInput] && (
                        <div className="text-sm text-[#616161] mb-2">
                          <b>Endereço:</b> {enderecos[cepInput]}
                        </div>
                      )}
                      <div className="text-sm text-[#616161] mb-1">
                        <b>Frete selecionado:</b> {freteSelecionado.name} - {freteSelecionado.deadline} dias úteis -{" "}
                        <strong>
                          {Number(freteSelecionado.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </strong>
                      </div>
                      <div className="text-sm text-[#616161]">
                        <b>CEP:</b>{" "}
                        {cepInput.length === 8
                          ? freteSelecionado.cep || cepInput || cep
                          : ""}
                      </div>
                    </div>
                  )}
                  {/* Footer do carrinho */}
                  <div className="px-3 md:px-6 py-4 border-t border-[#e5d3e9] bg-[#f9e7f6]">
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Subtotal:</span>
                        <span>
                          R$
                          {subtotal.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Frete:</span>
                        <span>
                          {freteSelecionado
                            ? Number(freteSelecionado.price).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })
                            : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">
                          R$
                          {(subtotal + (freteSelecionado ? Number(freteSelecionado.price) : 0)).toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 }
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`w-full rounded-full py-3 font-medium transition ${
                        freteSelecionado
                          ? "bg-[#7a4fcf] hover:bg-[#ae95d9] text-white cursor-pointer"
                          : "bg-[#ae95d9] text-white opacity-50 cursor-not-allowed"
                      }`}
                      onClick={handleCreateOrderAndCheckout}
                      disabled={!freteSelecionado}
                    >
                      Iniciar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
