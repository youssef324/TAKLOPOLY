/*
 * API Endpoint: /login
 * Sets secure HttpOnly session cookie and returns user profile
 */
import { createSessionToken, buildSessionCookie } from "./_session.js";

export async function onRequestPost(context) {
  try {
    const db = context.env.DB;
    const data = await context.request.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "الرجاء إدخال الإيميل والباسورد" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ps = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = await ps.bind(email).first();

    if (user && user.password === password) {
      const userData = {
        name: user.name,
        family: user.family,
        email: user.email,
        balance: user.balance,
        role: user.role, 
        profile_image_url: user.profile_image_url,
        level: user.level || 1
      };

      const sessionToken = await createSessionToken(user.email, context.env.SESSION_SECRET);
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      headers.append("Set-Cookie", buildSessionCookie(sessionToken));
      
      return new Response(JSON.stringify({ success: true, user: userData }), {
        status: 200,
        headers: headers,
      });
    } else {
      return new Response(JSON.stringify({ error: "الإيميل أو الباسورد خطأ" }), {
        status: 401, 
        headers: { "Content-Type": "application/json" },
      });
    }

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
