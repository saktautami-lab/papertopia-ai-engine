const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_BODY_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers }
  });
}

function corsHeaders(origin, env) {
  const allowed = env.ALLOWED_ORIGIN || "";
  if (allowed && origin !== allowed) return {};
  return {
    "access-control-allow-origin": allowed || origin || "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "Content-Type",
    "vary": "Origin"
  };
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== "/api/generate") {
      return env.ASSETS.fetch(request);
    }
    if (request.method !== "POST") return json({ error: "Gunakan POST." }, 405, cors);
    if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) {
      return json({ error: "Origin tidak diizinkan." }, 403);
    }
    if (!env.AI) {
      return json({ error: "Workers AI binding belum terpasang. Tambahkan binding AI di Settings > Bindings." }, 503, cors);
    }

    const length = Number(request.headers.get("content-length") || 0);
    if (length > MAX_BODY_BYTES) return json({ error: "Permintaan terlalu besar. Kecilkan ukuran gambar referensi." }, 413, cors);

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Format JSON tidak valid." }, 400, cors); }

    const prompt = String(body.prompt || "").trim();
    if (!prompt || prompt.length > 12000) return json({ error: "Prompt kosong atau terlalu panjang." }, 400, cors);

    // FLUX.1 Schnell supports text-to-image. It does not accept image reference inputs.
    if (body.reference_image) {
      return json({
        error: "Gambar referensi sudah tersimpan pada proyek, tetapi model FLUX Schnell ini belum bisa membaca gambar referensi secara langsung. Untuk generasi berbasis gambar contoh, dibutuhkan model image-to-image/vision tambahan."
      }, 422, cors);
    }

    try {
      const result = await env.AI.run(MODEL, {
        prompt,
        steps: 4
      });
      if (!result || !result.image) {
        return json({ error: "Model tidak mengembalikan gambar." }, 502, cors);
      }
      return json({
        image: { data: result.image, mime_type: "image/jpeg" },
        model: MODEL
      }, 200, cors);
    } catch {
      return json({ error: "Tidak dapat menghubungi layanan AI. Coba lagi nanti." }, 502, cors);
    }
  }
};
