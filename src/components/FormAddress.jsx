import React from "react";
import { motion } from "framer-motion";

function onlyDigits(value = "") {
  return value.replace(/\D/g, ""); // Remove tudo que não for dígito
}

function onlyLetters(value = "") {
  return value.replace(/[^a-zA-Z]/g, ""); // Remove tudo que não for letra
}

// Função para formatar o CEP no padrão 00000-000
function formatCep(value = "") {
  const digits = onlyDigits(value).slice(0, 8); // Limita a 8 dígitos
  return digits.replace(/^(\d{5})(\d)/, "$1-$2"); // Formata como 00000-000
}

export default function FormAddress({ endereco, setEndereco, onSubmit, onCancel, handleCepChange }) {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label className="block mb-1">CEP *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.cep}
          onChange={(e) => {
            const formattedCep = formatCep(e.target.value);
            setEndereco({ ...endereco, cep: formattedCep });
            handleCepChange(formattedCep, endereco, setEndereco); // Passa o valor formatado diretamente
          }}
          maxLength={9} // Limita o CEP a 9 caracteres (incluindo o "-")
          placeholder="00000-000"
          inputMode="numeric" // Exibe teclado numérico em dispositivos móveis
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block mb-1">Logradouro *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.logradouro}
          onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Número *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.numero}
          onChange={(e) =>
            setEndereco({ ...endereco, numero: onlyDigits(e.target.value) })
          }
          placeholder="Número da casa"
          inputMode="numeric" // Exibe teclado numérico em dispositivos móveis
          required
        />
      </div>
      <div>
        <label className="block mb-1">Complemento</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.complemento}
          onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
        />
      </div>
      <div>
        <label className="block mb-1">Bairro *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.bairro}
          onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Cidade *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.cidade}
          onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">UF *</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.uf}
          onChange={(e) =>
            setEndereco({
              ...endereco,
              uf: onlyLetters(e.target.value.toUpperCase()).slice(0, 2), // Limita a 2 caracteres
            })
          }
          maxLength={2} // Limita o campo a 2 caracteres
          placeholder="UF"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block mb-1">Referência</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={endereco.referencia}
          onChange={(e) => setEndereco({ ...endereco, referencia: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2 flex gap-3 pt-2">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded text-sm">
          Salvar endereço
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm underline text-gray-600"
        >
          Cancelar
        </button>
      </div>
    </motion.form>
  );
}