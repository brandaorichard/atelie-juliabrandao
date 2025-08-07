import React from "react";
import { useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock"; // seu mock de bebês

const mockOrders = [
  {
    id: "20250807-001",
    date: "2025-08-01",
    status: "Em processamento",
    total: 4599.98,
    items: [babies[0], babies[1]],
    paymentMethod: "Cartão de crédito",
    deliveryAddress: "Rua Exemplo, 123, São Paulo",
  },
  {
    id: "20250807-002",
    date: "2025-07-25",
    status: "Enviado",
    total: 2399.99,
    items: [babies[4]],
    paymentMethod: "Boleto bancário",
    deliveryAddress: "Av. Paulista, 1000, São Paulo",
  },
];

export default function OrdersPage() {
  const navigate = useNavigate();

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
        &gt; <span className="font-light underline ">Meus Pedidos</span>
      </nav>

      <h1 className="text-2xl font-light mb-4">Meus Pedidos</h1>

      {mockOrders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="shadow-md border border-gray-200 p-6 flex flex-col gap-4"
              style={{ borderRadius: 0 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div>
                  <span className="px-3 py-1 rounded text-white bg-purple-600">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                {order.items.slice(0, 3).map((item, i) => (
                  <img
                    key={i}
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                ))}
                {order.items.length > 3 && (
                  <span className="text-sm text-gray-600">
                    +{order.items.length - 3} itens
                  </span>
                )}
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
                onClick={() => navigate(`/pedido/${order.id}`)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}