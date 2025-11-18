//functions/buy-store-item.js
export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const { email, itemId } = await context.request.json();

        if (!email || !itemId) {
            return new Response(JSON.stringify({ success: false, error: 'بيانات غير كاملة.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // 🛑🛑 1. التحقق: هل المستخدم اشترى العنصر ده قبل كده؟ 🛑🛑
        const checkPurchase = await db.prepare(
            "SELECT id FROM user_unlocked_items WHERE user_email = ? AND item_id = ?"
        ).bind(email, itemId).first();

        if (checkPurchase) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "لقد قمت بشراء هذا العنصر بالفعل!" 
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // 2. جلب بيانات المستخدم والعنصر (للتحقق من الرصيد والمستوى)
        const transactionResult = await db.batch([
            db.prepare('SELECT balance, level FROM users WHERE email = ?').bind(email),
            db.prepare('SELECT id, price, name, required_level FROM store_items WHERE id = ?').bind(itemId)
        ]);

        const user = transactionResult[0].results[0];
        const item = transactionResult[1].results[0];
        
        if (!user) return new Response(JSON.stringify({ success: false, error: 'المستخدم غير موجود.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        if (!item) return new Response(JSON.stringify({ success: false, error: 'العنصر غير موجود.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

        // التحقق من المستوى
        const userLevel = user.level || 1;
        const requiredLevel = item.required_level || 1;
        if (userLevel < requiredLevel) {
             return new Response(JSON.stringify({ success: false, error: `يتطلب مستوى ${requiredLevel} للشراء.` }), { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        // التحقق من الرصيد
        if (user.balance < item.price) {
            return new Response(JSON.stringify({ success: false, error: 'نقاطك غير كافية.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        // 3. إتمام عملية الشراء (خصم وإضافة)
        const newBalance = user.balance - item.price;
        
        await db.batch([
            db.prepare('INSERT INTO user_unlocked_items (user_email, item_id) VALUES (?, ?)').bind(email, itemId),
            db.prepare('UPDATE users SET balance = ? WHERE email = ?').bind(newBalance, email),
            db.prepare('INSERT INTO transactions (user_email, amount, reason) VALUES (?, ?, ?)').bind(email, -item.price, `شراء: ${item.name}`)
        ]);

        return new Response(JSON.stringify({ 
            success: true, 
            message: `مبروك! تم شراء ${item.name} بنجاح.`, 
            new_balance: newBalance 
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
