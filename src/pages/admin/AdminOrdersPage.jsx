import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchOrdersAdmin,
  updateOrderStatus
} from "../../services/adminOrderService";
import { useBabies } from "../../hooks/useBabies"; // Importa os bebês para buscar imagens
import { fetchUserById } from "../../services/adminUserService"; // novo import
import AdminBreadcrumb from "../../components/AdminBreadcrumb";

const STATUS_OPTIONS = [
  { value: "pendente", label: "Pendente" },
  { value: "pronto/enviado", label: "Pronto/Enviado" },
  { value: "finalizado", label: "Finalizado" },
];

export default function AdminOrdersPage() {
  const token = useSelector(s => s.auth.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [usersById, setUsersById] = useState({}); // novo estado

  // Busca todos os bebês para mapear slug -> imagem
  const { babies } = useBabies();
  const babiesBySlug = babies.reduce((acc, baby) => {
    acc[baby.slug] = baby;
    return acc;
  }, {});

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      try {
        const data = await fetchOrdersAdmin(token);
        setOrders(data);

        // Buscar dados dos usuários
        const uniqueUserIds = [...new Set(data.map(o => o.userId))];
        const userMap = {};
        await Promise.all(
          uniqueUserIds.map(async (id) => {
            try {
              const user = await fetchUserById(token, id);
              userMap[id] = user;
            } catch {
              userMap[id] = { nome: "Desconhecido", email: "" };
            }
          })
        );
        setUsersById(userMap);
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    }
    if (token) loadOrders();
  }, [token]);

  async function handleStatusUpdate(id) {
    await updateOrderStatus(token, id, editStatus);
    setEditId(null);
    setSelectedOrder(null);
    const data = await fetchOrdersAdmin(token);
    setOrders(data);
  }

  const breadcrumbItems = [
    { label: "Início", to: "/admin/produtos" },
    { label: "Pedidos" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <AdminBreadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-light mb-4 text-neutral-900">Pedidos</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="border border-[#e0d6f7] rounded-xl bg-[#f7f3fa] shadow-sm p-6 flex flex-col gap-4 max-w-md mx-auto relative"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    Pedido <span className="break-all">#{order._id}</span>
                  </span>
                  <span className="text-sm text-neutral-600">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className="absolute top-4 right-6 text-xs font-semibold text-[#7a4fcf] underline cursor-pointer hover:text-[#ae95d9] transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  Ver detalhes
                </span>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  {editId === order._id ? (
                    <>
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value)}
                        className="border border-[#e0d6f7] rounded px-3 py-1 text-xs font-medium"
                        style={{
                          minWidth: 110,
                          background: "#f7f3fa", // fundo igual ao card
                          color: "#7a4fcf",
                        }}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(order._id)}
                          className="px-3 py-1 rounded bg-[#7a4fcf] text-white text-xs"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => { setEditId(null); setEditStatus(""); }}
                          className="px-3 py-1 rounded border border-[#e0d6f7] text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className={`px-3 py-1 rounded text-white text-xs font-medium bg-[#7a4fcf]`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => { setEditId(order._id); setEditStatus(order.status); }}
                        className="px-3 py-1 rounded border border-[#e0d6f7] text-xs ml-2"
                      >
                        Editar Status
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3 items-center mt-2">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex flex-col items-center w-20">
                    <img
                      src={babiesBySlug[item.slug]?.images?.[0] || ""}
                      alt={item.slug}
                      className="w-16 h-16 object-cover rounded border border-[#e0d6f7] mb-1"
                    />
                    <span className="text-[11px] text-neutral-700 text-center truncate w-full">{item.slug}</span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <span className="text-sm text-neutral-600 self-center">
                    +{order.items.length - 3} itens
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div>
                  <span className="font-medium">Cliente:</span>{" "}
                  <span className="text-neutral-700 break-all">
                    {usersById[order.userId]?.nome || order.userId}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Entrega:</span>{" "}
                  <span className="text-neutral-700 break-all">{order.deliveryAddress}</span>
                </div>
                {order.shippingValue && (
                  <div>
                    <span className="font-medium">Frete:</span>{" "}
                    <span className="text-neutral-700">
                      {Number(order.shippingValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Total:</span>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {Number(order.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalhes do pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white border border-[#e0d6f7] rounded-xl p-6 w-full max-w-xl shadow-lg overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900">
              Pedido #{selectedOrder._id}
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              Data: {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
            <div className="mb-4">
              <span className="font-medium">Cliente:</span>{" "}
              <span className="text-neutral-700 break-all">
                {usersById[selectedOrder.userId]?.nome || selectedOrder.userId}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span>{" "}
              <span className="text-neutral-700 break-all">
                {usersById[selectedOrder.userId]?.email || "-"}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium">CPF:</span>{" "}
              <span className="text-neutral-700 break-all">
                {usersById[selectedOrder.userId]?.cpf || "-"}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Telefone:</span>{" "}
              <span className="text-neutral-700 break-all">
                {usersById[selectedOrder.userId]?.telefone || "-"}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Endereço de entrega:</span>{" "}
              <span className="text-neutral-700 break-all">{selectedOrder.deliveryAddress}</span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Pagamento:</span>{" "}
              <span className="text-neutral-700">{selectedOrder.paymentMethod}</span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Status:</span>{" "}
              <span className="px-3 py-1 rounded text-white bg-[#7a4fcf] text-xs">
                {selectedOrder.status}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Itens do pedido:</span>
              <div className="flex flex-col gap-3 mt-2">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border border-[#e0d6f7] rounded p-2 bg-[#f7f3fa]">
                    <img
                      src={babiesBySlug[item.slug]?.images?.[0] || ""}
                      alt={item.slug}
                      className="w-16 h-16 object-cover rounded border border-[#e0d6f7]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.slug}</div>
                      <div className="text-sm text-neutral-600">
                        Valor unitário: R${item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-neutral-600">Quantidade: {item.quantity}</div>
                      <div className="text-sm font-semibold mt-1">
                        Subtotal: R${(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedOrder.shippingValue && (
              <div className="mb-4">
                <span className="font-medium">Frete:</span>{" "}
                <span className="text-neutral-700">
                  {Number(selectedOrder.shippingValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
            )}
            <div className="mb-4">
              <span className="font-medium">Total:</span>{" "}
              <span className="text-neutral-900 font-semibold">
                {Number(selectedOrder.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <button
              className="mt-2 px-4 py-2 rounded border border-[#e0d6f7] text-[#7a4fcf] text-sm"
              onClick={() => setSelectedOrder(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}