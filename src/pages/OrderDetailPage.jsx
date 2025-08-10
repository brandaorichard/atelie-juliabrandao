import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import babies from "../mocks/babiesMock";

const babiesBySlug = babies.reduce((acc, baby) => {
  acc[baby.slug] = baby;
  return acc;
}, {});

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`https://atelie-juliabrandao-backend-production.up.railway.app/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Erro ao buscar pedido");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, token, navigate]);

  if (loading) return <p>Carregando detalhes do pedido...</p>;
  if (error)
    return (
      <div className="p-6 max-w-5xl mx-auto text-center text-red-600">
        <p>{error}</p>
        <button
          className="mt-4 text-purple-700 hover:underline"
          onClick={() => navigate("/meus-pedidos")}
        >
          Voltar para Meus Pedidos
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex mb-4 text-sm mt-5 items-center gap-2 text-[#7a4fcf] cursor-pointer">
        <span
          className="cursor-pointer hover:underline underline"
          onClick={() => navigate("/")}
        >
          Início
        </span>{" "}
        &gt;{" "}
        <span
          className="cursor-pointer hover:underline underline"
          onClick={() => navigate("/meus-pedidos")}
        >
          Meus Pedidos
        </span>{" "}
        &gt; <span className="font-light underline ">Pedido #{order._id}</span>
      </nav>

      <h1 className="text-2xl font-light mb-4">Detalhes do Pedido</h1>

      <div className="shadow-md border border-gray-200 p-6 flex flex-col gap-6" style={{ borderRadius: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Pedido #{order._id}</p>
            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="px-3 py-1 rounded text-white bg-purple-600">{order.status}</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Itens do Pedido</h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item, i) => {
              const baby = babiesBySlug[item.slug];
              return (
                <div key={i} className="flex items-center gap-4 border border-neutral-300 rounded-lg p-3 bg-[#f9e7f6]">
                  <img
                    src={baby ? baby.img : ""}
                    alt={baby ? baby.name : item.slug}
                    className="w-20 h-22 rounded object-cover border border-neutral-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{baby ? baby.name : item.slug}</div>
                    <div className="text-sm text-gray-600">
                      Valor unitário: R${item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-600">Quantidade: {item.quantity}</div>
                    <div className="text-sm font-semibold mt-1">
                      Subtotal: R${(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p>
          <strong>Total:</strong> R$ {order.total.toFixed(2)}
        </p>
        <p>
          <strong>Pagamento:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Entrega:</strong> {order.deliveryAddress}
        </p>

        <button
          className="self-start text-purple-700 hover:underline"
          onClick={() => navigate("/meus-pedidos")}
        >
          Voltar para Meus Pedidos
        </button>
      </div>
    </div>
  );
}