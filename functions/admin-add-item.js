// File: functions/admin-add-item.js
// 🛑 تم التعديل: إضافة "allow_multiple" لتحديد نوع الشراء
export async function onRequestPost(context) {
    try {
        const db = context.env.DB; 
        const request = context.request;

        // استقبال البيانات (بما فيها allow_multiple الجديد)
        const { name, price, image_url, required_level, allow_multiple } = await request.json();

        // تحويل الأرقام للتأكد
        const itemPrice = parseInt(price);
        const itemLevel = parseInt(required_level) || 1; // الافتراضي 1
        // 🛑 تحويل allow_multiple لرقم (0 أو 1)
        const isMultiple = parseInt(allow_multiple) || 0; 

        // التحقق من البيانات الأساسية
        if (!name || isNaN(itemPrice) || itemPrice <= 0 || isNaN(itemLevel) || itemLevel < 1) {
            return new Response(JSON.stringify({ error: 'بيانات العنصر غير كاملة.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

        try {
            // 🛑🛑 التعديل: إضافة العمود "allow_multiple" في جملة الإدخال 🛑🛑
            const result = await db.prepare(
                'INSERT INTO store_items (name, price, image_url, required_level, allow_multiple) VALUES (?, ?, ?, ?, ?)'
            )
            .bind(name, itemPrice, image_url || '', itemLevel, isMultiple) // ربط القيمة الجديدة
            .run();

            return new Response(JSON.stringify({ success: true, message: `تم إضافة العنصر بنجاح.`, itemId: result.lastRowId }), { 
                status: 200, 
                headers: { 'Content-Type': 'application/json' } 
            });

        } catch (dbError) {
            console.error('Admin DB Error:', dbError);
            return new Response(JSON.stringify({ error: `فشل في قاعدة البيانات: ${dbError.message}` }), { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: `فشل إداري: ${error.message}` }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
