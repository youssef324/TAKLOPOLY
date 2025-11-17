/*
 * API Endpoint: /admin-set-announcement
 * الوظيفة: حفظ إعلان المربع الأصفر وشريط الأخبار في KV
 */
export async function onRequestPost(context) {
  try {
    // 1. استقبال البيانات
    // بنستخدم let عشان نقدر نعدل عليهم لو جم فاضيين
    let { message, ticker_message } = await context.request.json();

    // 2. تنظيف البيانات (Validation)
    // لو القيمة undefined او null خليها نص فاضي عشان متبوظش الدنيا
    message = message ? String(message) : "";
    ticker_message = ticker_message ? String(ticker_message) : "";

    // 3. تجهيز الكائن للحفظ
    const dataToSave = {
      message: message,          // الصندوق الأصفر
      ticker_message: ticker_message // الشريط المتحرك
    };

    // 4. الحفظ في KV
    // اسم المفتاح: 'current_announcement'
    await context.env.KIROPAY_KV.put('current_announcement', JSON.stringify(dataToSave));

    return new Response(JSON.stringify({ 
        success: true, 
        message: "تم تحديث الإعلانات بنجاح!" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
