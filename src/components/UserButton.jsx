import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { showToast } from "../redux/toastSlice"; // <-- IMPORTANTE
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function UserButton({ mobileFaixa = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    dispatch(
      showToast({
        message: "Logout realizado com sucesso!",
        iconType: "logout",
      })
    );
    navigate("/login");
  };

  const handleMenu = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className={`relative ${mobileFaixa ? "h-[25px]" : ""}`} ref={ref}>
      <button
        className={`flex items-center gap-2 px-2 py-1 rounded-full transition cursor-pointer focus:outline-none
          ${
            mobileFaixa
              ? "bg-transparent text-gray-700 text-xs font-medium"
              : " text-[#7a4fcf]"
          }
        `}
        style={mobileFaixa ? { height: 22, minHeight: 0 } : {}}
        onClick={() => (isLoggedIn ? setOpen((o) => !o) : navigate("/login"))}
        type="button"
      >
        {/* Ícone de usuário */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 -mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ minWidth: 16, minHeight: 16 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
          />
        </svg>
        {isLoggedIn ? (
          <>
            <span className="font-medium -mr-2.5">{`Olá, ${
              user?.nome?.split(" ")[0] || "Usuário"
            }`}</span>
            <svg
              className={`h-3 w-3 ml-1 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </>
        ) : (
          <span className="font-semibold -mr-2 text-gray-700">Entrar</span>
        )}
      </button>
      {isLoggedIn && open && (
        <AnimatePresence>
          <motion.div
            key="user-dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="
        absolute right-2 top-6.5 z-50
        bg-[#f9e7f6]
        rounded-sm
        shadow-xl
        border border-[#f9e7f6]/80
        flex flex-col items-start
        min-w-[200px]
        max-w-[40vw]
        md:min-w-[200px] md:max-w-[48vw]
      "
          >
            <button
              className="flex items-center gap-3 w-full text-left uppercase text-lg font-light cursor-pointer text-[#616161] py-5 px-8 rounded-t-sm"
              onClick={() => handleMenu("/minha-conta")}
            >
              <span className="text-xl" aria-label="Perfil" role="img">
                👤
              </span>
              MINHA CONTA
            </button>
            <button
              className="flex items-center gap-3 w-full text-left uppercase text-lg cursor-pointer font-light text-[#616161] py-5 px-8"
              onClick={() => handleMenu("/meus-pedidos")}
            >
              <span className="text-xl" aria-label="Pedidos" role="img">
                📦
              </span>
              MEUS PEDIDOS
            </button>
            <button
              className="flex items-center gap-3 w-full text-left uppercase text-lg cursor-pointer font-light text-red-600 py-5 px-8"
              onClick={handleLogout}
            >
              <span
                className="inline-flex items-center justify-center rounded-full bg-white"
                style={{ width: "1.5em", height: "1.5em" }}
              >
                {/* SVG logout */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[1em] w-[1em]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
              </span>
              SAIR
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}