import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// Inicializa SDK do front (usar sua public key de produção)
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'pt-BR' });

// Endpoints de produção
const PREF_ENDPOINT = "https://atelie-juliabrandao-backend-production.up.railway.app/api/checkout/preference";
const WEBHOOK_URL  = "https://atelie-juliabrandao-backend-production.up.railway.app/api/webhook/mercadopago";

// (Opcional) Segredo para assinatura de teste do webhook (evite expor em produção real)
const SECRET_SIGNATURE = import.meta.env.VITE_MP_WEBHOOK_SECRET;

// Gera HMAC SHA256 (simulação de assinatura Mercado Pago)
async function generateHmacSHA256(secret, manifest) {
  if (!secret) throw new Error("Falta VITE_MP_WEBHOOK_SECRET para teste local.");
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await window.crypto.subtle.sign("HMAC", key, enc.encode(manifest));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function TestWebhookButton() {
  const [creatingPref, setCreatingPref] = useState(false);
  const [sendingWebhook, setSendingWebhook] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [prefResponse, setPrefResponse] = useState(null);
  const [webhookResponse, setWebhookResponse] = useState(null);

  async function handleCreatePreference() {
    setCreatingPref(true);
    setPrefResponse(null);
    try {
      const order = {
        items: [
          { title: 'Bebê Reborn Maria', quantity: 1, unit_price: 1250.00 }
        ],
        freight: { title: "Frete", value: 0 },
        orderId: crypto.randomUUID(),
        payer: { email: 'cliente+teste@example.com', name: "Cliente Teste", cpf: "12345678900" }
      };

      const res = await fetch(PREF_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Falha preference (${res.status}): ${errBody}`);
      }

      const data = await res.json(); // { preferenceId, initPoint }
      setPreferenceId(data.preferenceId);
      setPrefResponse(data);
    } catch (e) {
      console.error(e);
      setPrefResponse({ error: e.message });
      alert(e.message);
    } finally {
      setCreatingPref(false);
    }
  }

  async function handleTestWebhook() {
    setSendingWebhook(true);
    setWebhookResponse(null);
    try {
      const body = {
        id: 12345,
        live_mode: false,
        type: "payment",
        date_created: new Date().toISOString(),
        user_id: 44444,
        api_version: "v1",
        action: "payment.created",
        data: { id: "TESTEID99999" }
      };

      const xRequestId = "test-req-id-frontend";
      const ts = Math.floor(Date.now() / 1000).toString();
      const manifest = `id:${body.data.id.toLowerCase()};request-id:${xRequestId};ts:${ts};`;
      const hmac = await generateHmacSHA256(SECRET_SIGNATURE, manifest);
      const xSignature = `ts=${ts},v1=${hmac}`;

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-signature": xSignature,
          "x-request-id": xRequestId
        },
        body: JSON.stringify(body)
      });

      let parsed;
      try { parsed = await res.json(); } catch { parsed = {}; }

      setWebhookResponse({ status: res.status, body: parsed });
    } catch (e) {
      console.error(e);
      setWebhookResponse({ error: e.message });
    } finally {
      setSendingWebhook(false);
    }
  }

  return (
    <div style={{ margin: "2rem 0", maxWidth: 600 }}>
      <h3>Teste Checkout & Webhook Mercado Pago</h3>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={handleCreatePreference} disabled={creatingPref}>
          {creatingPref ? 'Gerando preference...' : 'Criar Preference'}
        </button>
        <button onClick={handleTestWebhook} disabled={sendingWebhook}>
          {sendingWebhook ? 'Enviando webhook...' : 'Testar Webhook'}
        </button>
      </div>

      {preferenceId && (
        <div style={{ width: 320, margin: '16px 0' }}>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}

      {prefResponse && (
        <div style={{ marginTop: 16 }}>
          <strong>Resposta Preference:</strong>
          <pre style={{ background:'#f5f5f5', padding:10, fontSize:12 }}>
            {JSON.stringify(prefResponse, null, 2)}
          </pre>
        </div>
      )}

      {webhookResponse && (
        <div style={{ marginTop: 16 }}>
          <strong>Resposta Webhook (Simulado):</strong>
          <pre style={{ background:'#f5f5f5', padding:10, fontSize:12 }}>
            {JSON.stringify(webhookResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}