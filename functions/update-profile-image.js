/*
 * API Endpoint: /update-profile-image
 * وظيفته: تحديث لينك صورة المستخدم في الداتا بيز
 */
export async function onRequestPost(context) {
  try {
    const db = context.env.DB;
    const data = await context.request.json();
    
    // 🛑🛑 التعديل هنا 🛑🛑
    // نستقبل 'image_url' ليتطابق مع ما ترسله الواجهة الأمامية
    const { email, image_url } = data; 

    // ملاحظة: يمكن أيضاً استقبال old_image_url هنا للحذف لاحقاً
    // const { email, image_url, old_image_url } = data; 

    if (!email || !image_url) {
      return new Response(JSON.stringify({ error: "بيانات ناقصة (الإيميل أو رابط الصورة)" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const ps = db.prepare(
      "UPDATE users SET profile_image_url = ? WHERE email = ?"
    );
    
    // 🛑 التعديل: نستخدم المتغير image_url
    await ps.bind(image_url, email).run();

    // رجّع رسالة نجاح
    return new Response(JSON.stringify({ 
        success: true, 
        message: "تم تحديث الصورة!", 
        newUrl: image_url // 🛑 التعديل: نرجع image_url
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("DB Update Error:", e.message);
    return new Response(JSON.stringify({ error: `خطأ في تحديث قاعدة البيانات: ${e.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
