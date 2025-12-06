/*
 * API Endpoint: /get-top-champions
 * (مُعدل لاستثناء الأدمن والجيست)
 */
export async function onRequestPost(context) {
    try {
        const db = context.env.DB; 

        // 🛑🛑 التعديل هنا 🛑🛑
        // أضفنا "WHERE role = 'user'" للـ query
        const { results } = await db.prepare(
            `SELECT u.name, u.balance, u.profile_image_url, COUNT(uui.item_id) AS unlocked_count
             FROM users u
             JOIN user_unlocked_items uui on uui.user_email = u.email
             WHERE u.role = 'user' 
             GROUP BY u.email
             ORDER BY unlocked_count DESC, u.balance DESC
             LIMIT 3`
        ).all();

        return new Response(JSON.stringify({ champions: results }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (e) {
        console.error("Get Top Champions Error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
