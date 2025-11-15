export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const request = context.request;

        // استقبال البيانات
        const { emails, rewardAmount, reason, adminEmail } = await request.json();

        // 1. التحقق من صلاحيات الأدمن (بنفس نمط باقي الفانكشنز)
        if (!adminEmail) {
             return new Response(JSON.stringify({ success: false, error: "بيانات الاعتماد مفقودة." }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // التأكد من أن الإيميل المرسل هو لأدمن
        const adminCheck = await db.prepare('SELECT role FROM users WHERE email = ?').bind(adminEmail).first();
        if (!adminCheck || adminCheck.role !== 'admin') {
             return new Response(JSON.stringify({ success: false, error: "غير مصرح لك بتنفيذ هذا الإجراء." }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 2. التحقق من صحة البيانات المرسلة
        if (!emails || !Array.isArray(emails) || emails.length === 0 || isNaN(rewardAmount) || rewardAmount <= 0) {
            return new Response(JSON.stringify({ success: false, error: 'بيانات غير كاملة (قائمة الإيميلات أو قيمة المكافأة غير صحيحة).' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 3. تجهيز أوامر التحديث (Batch Update)
        // تجهيز جمل SQL لتحديث الرصيد لكل مستخدم
        const updateStmts = emails.map(email => 
            db.prepare('UPDATE users SET balance = balance + ? WHERE email = ?')
              .bind(rewardAmount, email)
        );

        // تجهيز جمل SQL لتسجيل المعاملة في السجل
        const reasonText = reason || 'مكافأة مسح مجمع';
        const transactionStmts = emails.map(email =>
            db.prepare('INSERT INTO transactions (user_email, amount, reason) VALUES (?, ?, ?)')
              .bind(email, rewardAmount, reasonText)
        );

        // 4. تنفيذ كل الأوامر دفعة واحدة (Batch Execution)
        // ندمج المصفوفتين (التحديث + السجل) وننفذهم مرة واحدة
        await db.batch([...updateStmts, ...transactionStmts]);

        // 5. إرسال رد النجاح
        return new Response(JSON.stringify({ 
            success: true, 
            updated_count: emails.length, 
            message: `تم تحديث رصيد ${emails.length} مستخدم بنجاح.` 
        }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        // التعامل مع الأخطاء بنفس نمط باقي الفانكشنز
        return new Response(JSON.stringify({ success: false, error: `فشل العملية: ${error.message}` }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
