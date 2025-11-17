export async function onRequestPost(context) {
  try {
    const db = context.env.DB; // الاتصال بـ D1
    let { message, ticker_message } = await context.request.json();

    // تنظيف البيانات
    message = message ? String(message) : "";
    ticker_message = ticker_message ? String(ticker_message) : "";

    // تحديث الصف رقم 1
    const result = await db.prepare(
      "UPDATE announcements SET box_message = ?, ticker_message = ? WHERE id = 1"
    ).bind(message, ticker_message).run();

    // لو الجدول كان فاضي، ننشئ الصف
    if (result.meta.changes === 0) {
        await db.prepare(
            "INSERT INTO announcements (id, box_message, ticker_message) VALUES (1, ?, ?)"
        ).bind(message, ticker_message).run();
    }

    return new Response(JSON.stringify({ success: true, message: "تم الحفظ في قاعدة البيانات!" }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
  }
}
