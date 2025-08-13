// Serviço responsável por criar o pedido a partir do carrinho.
// Mantém a mesma lógica existente no CartDrawer.
import { showToast } from "../redux/toastSlice";
import { clearCart } from "../redux/cartSlice";

export async function createOrderAndCheckout({
  token,
  items,
  freteSelecionado,
  subtotal,
  dispatch,
}) {
  if (!token) {
    dispatch(
      showToast({
        type: "error",
        message: "Você precisa estar logado para finalizar a compra.",
      })
    );
    return { ok: false };
  }
  if (!items.length) {
    dispatch(
      showToast({ type: "error", message: "Seu carrinho está vazio." })
    );
    return { ok: false };
  }
  if (!freteSelecionado) {
    dispatch(
      showToast({
        type: "error",
        message: "Selecione uma opção de frete para continuar.",
      })
    );
    return { ok: false };
  }

  const orderPayload = {
    items: items.map(({ slug, quantity, price }) => ({
      slug,
      quantity,
      price,
    })),
    total: subtotal,
    paymentMethod: "MercadoPago",
    deliveryAddress: "Coletar do usuário",
  };

  try {
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

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      dispatch(
        showToast({
          type: "error",
          message: err.message || "Erro ao criar pedido.",
        })
      );
      return { ok: false };
    }

    const created = await res.json();

    // Limpa carrinho (mantido igual à lógica atual)
    dispatch(clearCart());

    dispatch(
      showToast({
        type: "success",
        message: "Pedido criado! Pagamento Mercado Pago em breve.",
      })
    );

    return { ok: true, order: created };
  } catch {
    dispatch(
      showToast({
        type: "error",
        message: "Erro ao conectar com o servidor.",
      })
    );
    return { ok: false };
  }
}