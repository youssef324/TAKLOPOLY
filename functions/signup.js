/*
 * API Endpoint: /signup
 * Validates against central family configuration and creates user account
 */
import { COMPETITION_FAMILIES } from "./_config.js";

export async function onRequestPost(context) {
  try {
    const db = context.env.DB;

    // 1. اقرأ البيانات كـ FormData
    const formData = await context.request.formData();

    // 2. اسحب البيانات
    const name = formData.get("name");
    const family = formData.get("family");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileImageUrl = formData.get("profile_image_url");

    if (!name || !email || !password || !family) {
      return new Response(JSON.stringify({ error: "الرجاء ملء جميع الحقول المطلوبة" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // التحقق من أن الأسرة المختارة تابعة للمسابقة المعتمدة
    if (!COMPETITION_FAMILIES.includes(family)) {
      return new Response(JSON.stringify({ error: "الأسرة المختارة غير مسجلة في المسابقة الحالية" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // 3. اتأكد إن الصورة موجودة (لو لأ، استخدم الافتراضية)
    const imageUrlToSave = profileImageUrl || "/default-avatar.png";
    
    // 4. حضّر أمر الإدخال للداتا بيز
    const ps = db.prepare(
      "INSERT INTO users (name, family, email, password, profile_image_url) VALUES (?, ?, ?, ?, ?)"
    );
    
    // 5. نفذ الأمر بالبيانات الجديدة
    await ps.bind(name, family, email, password, imageUrlToSave).run();

    // 6. رجّع رسالة نجاح
    return new Response(JSON.stringify({ success: true, message: "تم إنشاء الحساب بنجاح!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    if (e.message && e.message.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({ error: "هذا الإيميل مسجل من قبل" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
