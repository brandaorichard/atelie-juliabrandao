import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

export default function PedidoSucessoRedirect() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Redireciona para o detalhe do pedido
  return <Navigate to={`/pedido/${id}`} replace />;
}