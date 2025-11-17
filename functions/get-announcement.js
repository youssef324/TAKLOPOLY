export async function onRequestPost(context) {
  try {
    const db = context.env.DB;
    
    // قراءة الصف رقم 1
    const result = await db.prepare("SELECT box_message, ticker_message FROM announcements WHERE id = 1").first();

    if (!result) {
        return new Response(JSON.stringify({ message: "", ticker_message: "" }), { 
            headers: { "Content-Type": "application/json" } 
        });
    }

    // إرجاع البيانات
    return new Response(JSON.stringify({
        message: result.box_message || "",          
        ticker_message: result.ticker_message || "" 
    }), { 
        status: 200, headers: { "Content-Type": "application/json" } 
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
