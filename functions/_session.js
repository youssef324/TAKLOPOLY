/*
 * TAKLOPOLY — Server-side Session Utilities (Cloudflare Pages Functions)
 * Pure Web Crypto implementation (zero external dependencies)
 */

const DEFAULT_SECRET = "taklopoly_church_secret_key_2024_secure";

async function hmacSha256(data, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret || DEFAULT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str) {
  let b = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b.length % 4) b += "=";
  return decodeURIComponent(escape(atob(b)));
}

export async function createSessionToken(email, secret = DEFAULT_SECRET) {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  const data = `${email}:${exp}`;
  const sig = await hmacSha256(data, secret);
  const payload = toBase64Url(data);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token, secret = DEFAULT_SECRET) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;

  let raw = "";
  try {
    raw = fromBase64Url(payload);
  } catch (e) {
    return null;
  }

  const [email, expStr] = raw.split(":");
  const exp = parseInt(expStr, 10);
  if (!email || !exp || isNaN(exp) || exp < Date.now()) {
    return null;
  }

  const expectedSig = await hmacSha256(raw, secret);
  if (sig !== expectedSig) {
    return null;
  }

  return email;
}

export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx !== -1) {
      const key = pair.slice(0, idx).trim();
      const val = pair.slice(idx + 1).trim();
      cookies[key] = val;
    }
  }
  return cookies;
}

export function buildSessionCookie(token) {
  // HttpOnly, Lax, 30 days max-age, Path=/
  return `taklopoly_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}

export function buildClearCookie() {
  return `taklopoly_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
