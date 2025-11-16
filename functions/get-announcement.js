/*
 * API Endpoint: /get-announcement
 * (نسخة KV المُحدثة - تدعم الشريط المتحرك)
 */
export async function onRequestPost(context) {
  try {
    // جلب القيمة من KV
    const value = await context.env.KIROPAY_KV.get('current_announcement');
    
    let data = { message: "", ticker_message: "" };

    if (value) {
      try {
        // 🛑 محاولة قراءة البيانات كـ JSON (للنسخة الجديدة)
        const parsed = JSON.parse(value);
        
        // لو نجح التحليل وكان كائن، ناخده كما هو
        if (typeof parsed === 'object' && parsed !== null) {
           data = parsed;
        } else {
           // 🛑 دعم قديم: لو القيمة كانت نص عادي (من النظام القديم) نعتبرها الرسالة الثابتة
           data.message = value;
        }
      } catch (e) {
        // لو فشل التحليل كـ JSON، نعتبره نص عادي
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
