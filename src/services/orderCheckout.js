// Serviço responsável por criar o pedido a partir do carrinho.
// Ajustado para compatibilizar com o schema Mongoose:
//  - deliveryAddress: String (antes enviava objeto -> causava 500)
//  - items: [{ slug, quantity, price }] (removido campo extra 'total')
//  - paymentMethod: obrigatório (enviamos uma string válida)
//  - total: Number (inclui frete, se houver)
// Se quiser salvar detalhes de frete, embutimos no texto do deliveryAddress.

import { showToast } from "../redux/toastSlice";
import { clearCart } from "../redux/cartSlice";

export async function createOrderAndCheckout({
  token,
  items,
  freteSelecionado,
  subtotal,
  dispatch,
  address, // {cep, logradouro, bairro, cidade, uf, numero, complemento}
  paymentMethod = "pendente", // ajuste para 'pix' ou 'mercado-pago' quando implementar
}) {
  if (!token) {
    dispatch(showToast({ type: "error", message: "É necessário estar logado." }));
    return { ok: false };
  }
  if (!items.length) {
    dispatch(showToast({ type: "error", message: "Carrinho vazio." }));
    return { ok: false };
  }
  if (!freteSelecionado) {
    dispatch(showToast({ type: "error", message: "Selecione um frete." }));
    return { ok: false };
  }
  if (!address || !address.numero?.trim()) {
    dispatch(showToast({ type: "error", message: "Insira o número da casa." }));
    return { ok: false };
  }

  const freteValor = freteSelecionado.price ?? freteSelecionado.valor ?? 0;
  const total = +(subtotal + freteValor).toFixed(2);

  // Monta string única para deliveryAddress (schema exige String)
  const freteServico = freteSelecionado.name || freteSelecionado.nome || "Frete";
  const prazo =
    freteSelecionado.prazoTexto ||
    (freteSelecionado.deadline && `${freteSelecionado.deadline} dias úteis`) ||
    "Prazo não informado";

  const deliveryAddressString =
    `${address.logradouro}, ${address.numero} - ${address.bairro} - ` +
    `${address.cidade}/${address.uf} - CEP: ${address.cep} - ` +
    `Compl.: ${address.complemento} | Frete: ${freteServico} (${prazo}) ` +
    `Valor Frete: ${freteValor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

  const orderPayload = {
    items: items.map(i => ({
      slug: i.slug,
      quantity: i.quantity,
      price: i.price,
    })),
    total,
    paymentMethod,        // string obrigatória
    deliveryAddress: deliveryAddressString, // string conforme schema
  };

  try {
    console.log("DEBUG orderPayload =>", orderPayload);

    const res = await fetch(
      "https://atelie-juliabrandao-backend-production.up.railway.app/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      }
    );

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("ORDER ERROR:", res.status, json);
      dispatch(
        showToast({
          type: "error",
            message: json.message || "Erro ao criar pedido.",
        })
      );
      return { ok: false, error: json };
    }

    dispatch(showToast({ type: "success", message: "Pedido criado!" }));
    return { ok: true, order: json };
  } catch (e) {
    console.error("ORDER FETCH FAIL:", e);
    dispatch(
      showToast({
        type: "error",
        message: "Falha de conexão com servidor.",
      })
    );
    return { ok: false, error: e };
  }
}