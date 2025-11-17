/*
 * API Endpoint: /get-announcement
 * الوظيفة: قراءة الإعلانات من KV وعرضها للمستخدم
 */
export async function onRequestPost(context) {
  try {
    // 1. محاولة قراءة البيانات المخزنة
    const rawData = await context.env.KIROPAY_KV.get('current_announcement');
    
    let data;

    if (!rawData) {
        // 🛑 لو مفيش أي حاجة محفوظة قبل كده، نرجع كائن فاضي
        // عشان الفرونت إند مايضربش error
        data = { message: "", ticker_message: "" };
    } else {
        // 🛑 لو فيه داتا، نحولها من نص لـ Object
        try {
            data = JSON.parse(rawData);
        } catch (parseError) {
            // لو الملف المحفوظ بايظ، نرجع فاضي برضه للأمان
            data = { message: "", ticker_message: "" };
        }
    }

    // 2. إرسال الرد
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    // لو حصل خطأ في الاتصال بالـ KV نفسه
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
