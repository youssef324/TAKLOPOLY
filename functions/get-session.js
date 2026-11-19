/*
 * API Endpoint: /get-session
 * Server-verified session check using HttpOnly cookie and Cloudflare D1
 */
import { verifySessionToken, parseCookies } from "./_session.js";

export async function onRequestGet(context) {
  return handleSessionCheck(context);
}

export async function onRequestPost(context) {
  return handleSessionCheck(context);
}

async function handleSessionCheck(context) {
  try {
    const db = context.env.DB;
    const cookieHeader = context.request.headers.get("Cookie");
    const cookies = parseCookies(cookieHeader);
    const sessionToken = cookies["taklopoly_session"];

    if (!sessionToken) {
      return new Response(JSON.stringify({ authenticated: false, message: "No session" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const email = await verifySessionToken(sessionToken, context.env.SESSION_SECRET);
    if (!email) {
      return new Response(JSON.stringify({ authenticated: false, message: "Invalid session token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ps = db.prepare("SELECT name, family, email, balance, role, profile_image_url, level FROM users WHERE email = ?");
    const user = await ps.bind(email).first();

    if (!user) {
      return new Response(JSON.stringify({ authenticated: false, message: "User not found" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userData = {
      name: user.name,
      family: user.family,
      email: user.email,
      balance: user.balance,
      role: user.role,
      profile_image_url: user.profile_image_url,
      level: user.level || 1,
    };

    return new Response(JSON.stringify({ authenticated: true, user: userData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ authenticated: false, error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
