/*
 * API Endpoint: /get-announcement
 * (نسخة KV - لقراءة الرسالتين)
 */
export async function onRequestPost(context) {
  try {
    // جلب القيمة من KV
    const value = await context.env.KIROPAY_KV.get('current_announcement');
    
    // القيم الافتراضية
    let data = { message: "", ticker_message: "" };

    if (value) {
      try {
        // 🛑 محاولة قراءة البيانات كـ JSON
        const parsed = JSON.parse(value);
        
        // لو نجح التحليل، نستخدم البيانات المحفوظة
        if (typeof parsed === 'object' && parsed !== null) {
           data = parsed;
        } else {
           // دعم قديم: لو كان نص عادي محفوظ من زمان
           data.message = value;
        }
      } catch (e) {
        // لو فشل التحليل (يعني كان نص عادي مش JSON)، نعرضه في الرسالة الثابتة
        data.message = value;
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
