// File: functions/buy-store-item.js
export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const { email, itemId } = await context.request.json();

        // 1. جلب تفاصيل المنتج (بما فيها allow_multiple)
        const item = await db.prepare('SELECT * FROM store_items WHERE id = ?').bind(itemId).first();
        
        if (!item) return new Response(JSON.stringify({ success: false, error: 'العنصر غير موجود.' }), { status: 404 });

        // 🛑🛑 الشرط الذكي: لو المنتج "مرة واحدة" (allow_multiple = 0)، نتأكد إنه مش معاه 🛑🛑
        // لاحظ: نستخدم item.allow_multiple === 0 كقيمة افتراضية إذا كانت null أو undefined
        if ((item.allow_multiple === 0) || (item.allow_multiple === null)) { 
            const checkPurchase = await db.prepare(
                "SELECT id FROM user_unlocked_items WHERE user_email = ? AND item_id = ?"
            ).bind(email, itemId).first();

            if (checkPurchase) {
                return new Response(JSON.stringify({ success: false, error: "هذا المنتج للشراء مرة واحدة فقط وقد امتلكته بالفعل!" }), { status: 400 });
            }
        }

        // 2. جلب بيانات المستخدم للتحقق من الرصيد والمستوى
        const user = await db.prepare('SELECT balance, level FROM users WHERE email = ?').bind(email).first();
        
        // التحقق من المستوى
        if ((user.level || 1) < (item.required_level || 1)) {
             return new Response(JSON.stringify({ success: false, error: `يتطلب مستوى ${item.required_level}.` }), { status: 403 });
        }

        // التحقق من الرصيد
        if (user.balance < item.price) {
            return new Response(JSON.stringify({ success: false, error: 'نقاطك غير كافية.' }), { status: 403 });
        }

        // 3. التنفيذ
        const newBalance = user.balance - item.price;
        await db.batch([
            db.prepare('INSERT INTO user_unlocked_items (user_email, item_id) VALUES (?, ?)').bind(email, itemId),
            db.prepare('UPDATE users SET balance = ? WHERE email = ?').bind(newBalance, email),
            db.prepare('INSERT INTO transactions (user_email, amount, reason) VALUES (?, ?, ?)').bind(email, -item.price, `شراء: ${item.name}`)
        ]);

        return new Response(JSON.stringify({ success: true, message: `تم شراء ${item.name} بنجاح.`, new_balance: newBalance }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
