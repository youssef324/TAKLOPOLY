/*
 * API Endpoint: /admin-set-announcement
 * (نسخة KV المُصححة - لحفظ الرسالتين معاً)
 */
export async function onRequestPost(context) {
  try {
    // 🛑 استقبال الرسالتين من الـ Request
    const { message, ticker_message } = await context.request.json();

    // 🛑 تجميعهم في كائن واحد (Object)
    const announcementData = {
      message: message || "",          // رسالة الصندوق الأصفر
      ticker_message: ticker_message || "" // رسالة الشريط المتحرك
    };

    // 🛑 حفظ الكائن كنص JSON في KV
    await context.env.KIROPAY_KV.put('current_announcement', JSON.stringify(announcementData));

    return new Response(JSON.stringify({ success: true, message: "تم تحديث الإعلانات بنجاح!" }), {
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
