/*
 * API Endpoint: /logout
 * Clears the session cookie
 */
import { buildClearCookie } from "./_session.js";

export async function onRequestPost() {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("Set-Cookie", buildClearCookie());
  return new Response(JSON.stringify({ success: true, message: "Logged out" }), {
    status: 200,
    headers: headers,
  });
}

export async function onRequestGet() {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("Set-Cookie", buildClearCookie());
  return new Response(JSON.stringify({ success: true, message: "Logged out" }), {
    status: 200,
    headers: headers,
  });
}
