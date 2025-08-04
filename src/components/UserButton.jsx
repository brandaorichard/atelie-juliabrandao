import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

export default function UserButton() {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    setIsLogged(!!token);
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!isLogged) {
    // Não logado: botão simples
    return (
      <button
        onClick={() => navigate("/login")}
        className="flex items-center justify-center cursor-pointer p-2 ml-4 rounded-full transition"
        aria-label="Entrar ou acessar conta"
      >
        <FaRegUser size={21} className="text-[#ae95d9]" />
      </button>
    );
  }

  // Logado: botão com badge verde e dropdown
  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        className="flex items-center justify-center cursor-pointer p-2 rounded-full transition relative"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu do usuário"
        style={{ minWidth: 36, minHeight: 36 }} // Garante área mínima para o badge não invadir o lado
      >
        <FaRegUser size={21} className="text-[#ae95d9]" />
        <span
          className="absolute"
          style={{
            top: -4, // Ajuste fino para alinhar ao canto superior
            right: -4,
            background: "#22c55e",
            borderRadius: "9999px",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 2px #f9e7f6", // Borda para destacar do fundo
          }}
        >
          <FaCheck size={10} className="text-white" />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-[#e5d3e9] rounded-xl shadow-lg z-50 py-2">
          <div className="px-4 py-2 text-xs text-gray-500 border-b border-[#e5d3e9]">
            Olá, {user?.nome?.split(" ")[0] || "usuário"}!
          </div>
          <button
            className="w-full text-left px-4 py-2 hover:bg-[#f9e7f6] text-gray-800 text-sm"
            onClick={() => {
              setOpen(false);
              navigate("/minha-conta");
            }}
          >
            Minha conta
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-[#f9e7f6] text-gray-800 text-sm"
            onClick={() => {
              setOpen(false);
              navigate("/meus-pedidos");
            }}
          >
            Pedidos
          </button>
        </div>
      )}
    </div>
  );
}