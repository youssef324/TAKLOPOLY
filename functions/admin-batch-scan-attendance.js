async function getAuthUser(email, db) {
    if (!email) return null;
    try {
        const ps = db.prepare('SELECT role FROM users WHERE email = ?');
        const user = await ps.bind(email).first();
        return user || null;
    } catch (e) { 
        return null; 
    }
}
function unauthorizedResponse() {
    return new Response(JSON.stringify({ 
        success: false, 
        error: "غير مصرح لك بتنفيذ هذا الإجراء.",
        auth_error: true
    }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
    });
}
export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const { emails, rewardAmount, reason, adminEmail } = await context.request.json();
        const authUser = await getAuthUser(adminEmail, db);
        if (!authUser || authUser.role !== 'admin') {
            return unauthorizedResponse();
        }
        if (!emails || !Array.isArray(emails) || emails.length === 0 || isNaN(rewardAmount) || rewardAmount <= 0) {
            return new Response(JSON.stringify({ success: false, error: 'بيانات غير كاملة أو غير صالحة.' }), { status: 400 });
        }
        const updateStmts = emails.map(email => 
            db.prepare('UPDATE users SET balance = balance + ? WHERE email = ?')
              .bind(rewardAmount, email)
        );
        const reasonText = reason || 'مكافأة مسح مجمع';
        const transactionStmts = emails.map(email =>
            db.prepare('INSERT INTO transactions (user_email, amount, reason) VALUES (?, ?, ?)')
              .bind(email, rewardAmount, reasonText)
        );
        await db.batch([...updateStmts, ...transactionStmts]);
        return new Response(JSON.stringify({ success: true, updated_count: emails.length, message: `تم تحديث رصيد ${emails.length} مستخدم.` }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    } catch (e) {
        console.error("Batch Scan Error:", e);
        return new Response(JSON.stringify({ success: false, error: e.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
