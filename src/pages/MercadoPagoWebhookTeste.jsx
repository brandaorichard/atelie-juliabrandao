import React, { useState } from "react";

// URL do seu backend para o webhook
const WEBHOOK_URL = "https://atelie-juliabrandao-backend-production.up.railway.app/api/webhook/mercadopago";

// Função utilitária para gerar o hash HMAC SHA256
async function generateHmacSHA256(secret, manifest) {
  // Usa Web Crypto API disponível no navegador moderno
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  const signature = await window.crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(manifest)
  );
  // Converte para hexadecimal
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function TestWebhookButton() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Defina seu segredo de teste (use variável de ambiente no Vercel se possível)
  const SECRET_SIGNATURE = import.meta.env.VITE_MP_WEBHOOK_SECRET;

  const handleTestWebhook = async () => {
    setLoading(true);
    setResponse(null);

    // Dados simulados da notificação do Mercado Pago (corpo)
    const body = {
      id: 12345,
      live_mode: false,
      type: "payment",
      date_created: new Date().toISOString(),
      user_id: 44444,
      api_version: "v1",
      action: "payment.created",
      data: {
        id: "TESTEID99999"
      }
    };

    // Simula x-request-id
    const xRequestId = "test-req-id-frontend";

    // Simula ts (timestamp em segundos)
    const ts = Math.floor(Date.now() / 1000).toString();

    // Monta o manifesto conforme backend
    let manifest = `id:${body.data.id.toLowerCase()};request-id:${xRequestId};ts:${ts};`;

    // Gera o hash HMAC SHA256 do manifesto com o segredo
    const hmac = await generateHmacSHA256(SECRET_SIGNATURE, manifest);

    // Monta o header x-signature conforme Mercado Pago
    const xSignature = `ts=${ts},v1=${hmac}`;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-signature": xSignature,
          "x-request-id": xRequestId
        },
        body: JSON.stringify(body),
      });

      // Tenta extrair o json da resposta
      let resBody;
      try {
        resBody = await res.json();
      } catch {
        resBody = {};
      }
      setResponse({ status: res.status, body: resBody });
    } catch (err) {
      setResponse({ error: err.message });
    }

    setLoading(false);
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <button onClick={handleTestWebhook} disabled={loading}>
        {loading ? "Enviando..." : "Testar Webhook Mercado Pago"}
      </button>
      {response && (
        <pre style={{ background: "#eee", padding: 10, marginTop: 10 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}