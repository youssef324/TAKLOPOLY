/*
 * API Endpoint: /scan-attendance
 * الوظيفة: تحديث رصيد مستخدم بناءً على مسح كود QR (الأدمن)
 */
export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const request = context.request;

        // نستقبل البيانات: إيميل المستخدم (من الـ QR)، وإيميل الأدمن (للتأكد من الصلاحيات)، وقيمة المكافأة
        const { scannedEmail, rewardAmount, reason, adminEmail } = await request.json();

        // 1. التحقق من البيانات الأساسية
        if (!adminEmail || !scannedEmail || isNaN(rewardAmount) || rewardAmount <= 0) {
            return new Response(JSON.stringify({ success: false, error: 'بيانات المكافأة غير كاملة أو غير صالحة.' }), { status: 400 });
        }

        // 🛑🛑 2. خطوة التحقق من دور المستخدم (Admin/Scanner) 🛑🛑
        const adminCheck = await db.prepare(
            'SELECT role FROM users WHERE email = ?'
        )
        .bind(adminEmail)
        .first(); // نستخدم .first() لأننا نتوقع صفاً واحداً

        if (!adminCheck) {
            return new Response(JSON.stringify({ success: false, error: 'إيميل الأدمن غير موجود.' }), { status: 403 });
        }

        const adminRole = adminCheck.role;

        // نتحقق مما إذا كان الدور هو 'admin' أو 'scanner'
        if (adminRole !== 'admin' && adminRole !== 'scanner') {
            return new Response(JSON.stringify({ success: false, error: 'ليس لديك صلاحية لإجراء عملية المسح هذه.' }), { status: 403 });
        }
        // 🛑🛑 نهاية التحقق من الصلاحيات 🛑🛑
        
        // 3. البدء في المعاملة لتحديث الرصيد وتسجيل المعاملة (الخطوة الحالية في كودك)
        const updateResult = await db.prepare(
            'UPDATE users SET balance = balance + ? WHERE email = ? RETURNING balance'
        )
        .bind(rewardAmount, scannedEmail)
        .all();

        if (updateResult.results.length === 0) {
            return new Response(JSON.stringify({ success: false, error: 'لم يتم العثور على المستخدم المراد مكافأته.' }), { status: 404 });
        }

        const newBalance = updateResult.results[0].balance;

        // 4. تسجيل المعاملة (Attendance Transaction)
        await db.prepare(
            'INSERT INTO transactions (user_email, amount, reason) VALUES (?, ?, ?)'
        )
        .bind(scannedEmail, rewardAmount, reason || 'مكافأة مسح كود الحضور')
        .run();

        return new Response(JSON.stringify({
            success: true,
            message: `تم إضافة ${rewardAmount} نقطة لـ ${scannedEmail} بنجاح. رصيده الجديد: ${newBalance}.`,
            new_balance: newBalance
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Scan Attendance Error:', error);
        return new Response(JSON.stringify({ success: false, error: `فشل داخلي في الخادم: ${error.message}` }), { status: 500 });
    }
}
