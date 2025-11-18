// 🛑 وظيفة تعديل عنصر المتجر (مُعدلة لإضافة المستوى والشراء المتعدد) 🛑

// 🛑🛑 الدوال المساعدة (كما هي) 🛑🛑
async function getAuthUser(email, db) {
    if (!email) return null;
    try {
        const { results } = await db.prepare('SELECT role FROM users WHERE email = ?').bind(email).all();
        return results[0] || null;
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
// 🛑🛑 نهاية الدوال المساعدة 🛑🛑


export async function onRequestPost(context) {
    try {
        const db = context.env.DB; 
        const request = context.request;

        const data = await request.json();
        
        // 🛑 التعديل الأول: استقبال allow_multiple 🛑
        const { itemId, name, price, image_url, required_level, allow_multiple, adminEmail } = data;

        // 1. التحقق من الصلاحيات (Authorization)
        const authUser = await getAuthUser(adminEmail, db);
        if (!authUser || authUser.role !== 'admin') {
            return unauthorizedResponse();
        }

        const itemPrice = parseInt(price);
        const itemLevel = parseInt(required_level) || 1;
        const isMultiple = parseInt(allow_multiple) || 0; // تحويلها إلى رقم (0 أو 1)

        // 🛑 التحقق من البيانات 🛑
        if (!itemId || !name || isNaN(itemPrice) || itemPrice <= 0 || isNaN(itemLevel) || itemLevel < 1) {
            return new Response(JSON.stringify({ success: false, error: 'بيانات التعديل غير كاملة أو غير صالحة.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        
        // 🛑 التعديل الثاني: إضافة "allow_multiple" للـ UPDATE 🛑
        const result = await db.prepare(
            'UPDATE store_items SET name = ?, price = ?, image_url = ?, required_level = ?, allow_multiple = ? WHERE id = ?'
        )
        // 🛑 التعديل الثالث: ربط القيمة الجديدة (isMultiple) 🛑
        .bind(name, itemPrice, image_url, itemLevel, isMultiple, itemId)
        .run();

        if (result.changes === 0) {
             return new Response(JSON.stringify({ success: false, error: 'فشل التعديل: لم يتم العثور على العنصر.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ success: true, message: `تم تحديث العنصر #${itemId} بنجاح.` }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        console.error('Admin update item error:', error);
        return new Response(JSON.stringify({ success: false, error: `فشل إداري في تحديث العنصر: ${error.message}` }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
