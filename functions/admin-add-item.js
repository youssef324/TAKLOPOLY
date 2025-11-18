// File: functions/admin-add-item.js
export async function onRequestPost(context) {
    try {
        const db = context.env.DB; 
        const request = context.request;

        const { name, price, image_url, required_level, allow_multiple } = await request.json();

        const itemPrice = parseInt(price);
        const itemLevel = parseInt(required_level) || 1; 
        const isMultiple = parseInt(allow_multiple) || 0; // القيمة الجديدة

        if (!name || isNaN(itemPrice) || itemPrice <= 0 || isNaN(itemLevel) || itemLevel < 1) {
            return new Response(JSON.stringify({ error: 'بيانات العنصر غير كاملة.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

        try {
            // إضافة العمود الجديد
            const result = await db.prepare(
                'INSERT INTO store_items (name, price, image_url, required_level, allow_multiple) VALUES (?, ?, ?, ?, ?)'
            )
            .bind(name, itemPrice, image_url || '', itemLevel, isMultiple)
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
