// functions/get-store-items.js
// 🛑🛑 التعديل الضروري هنا: إضافة "allow_multiple" 🛑🛑
export async function onRequestGet(context) {
    try {
        const db = context.env.DB;

        const { results: items } = await db.prepare(
            'SELECT id, name, price, image_url, required_level, allow_multiple FROM store_items' // 👈 تم إضافة allow_multiple
        ).all();

        return new Response(JSON.stringify({ items }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Error fetching store items:', error);
        return new Response(JSON.stringify({ error: `فشل في جلب عناصر المتجر: ${error.message}` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
