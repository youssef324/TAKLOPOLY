/*
 * API Endpoint: /get-family-top-10
 * (مُعدل لاستثناء الأدمن والجيست)
 */
export async function onRequestPost(context) {
    try {
        const db = context.env.DB; 
        const { family } = await context.request.json();

        if (!family) {
            return new Response(JSON.stringify({ error: 'اسم العائلة مطلوب.' }), { status: 400 });
        }

        // 🛑🛑 التعديل هنا 🛑🛑
        // أضفنا "AND role = 'user'" للـ query
        const { results } = await db.prepare(
            `SELECT u.name, u.balance, COUNT(uui.item_id) AS unlocked_count
             FROM users u
             LEFT JOIN user_unlocked_items uui on uui.user_email = u.email
             WHERE u.family = ? AND u.role = 'user' 
             GROUP BY u.email
             ORDER BY unlocked_count DESC, u.balance DESC
             LIMIT 10`
        ).bind(family).all();

        return new Response(JSON.stringify({ users: results }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (e) {
        console.error("Get Family Top 10 Error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
