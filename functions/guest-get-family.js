export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        // هنستقبل نوع الطلب (mode) أو نحدد بناء على البيانات
        const { family, targetEmail } = await context.request.json();

        // 🛑 السيناريو الأول: طلب إحصائيات مستخدم معين (لو مبعوت إيميل)
        if (targetEmail) {
            // جلب المعاملات الإيجابية (الحضور)
            const { results } = await db.prepare(
                "SELECT reason FROM transactions WHERE user_email = ? AND amount > 0"
            ).bind(targetEmail).all();

            // تصفير العدادات
            const stats = {
                "القداس": 0,
                "مدارس الاحد": 0,
                "مدرسة شمامسة": 0,
                "عشية": 0,
                "درس كتاب": 0,
                "تسبحة": 0,
                "اعتراف": 0,
                "مسابقة": 0,
                "تسميع مزمور": 0,
                "قداس اضافي": 0,
                "قداس اضافي بدون تونية": 0,                
                "قداس بدون تونية": 0,
                "عشية او تسبحة(زيادة)": 0,
                "عشية (زيادة)": 0,
                "تسبحة (زيادة)": 0,
                "اخرى": 0
            };

            // حساب التكرار
            results.forEach(tx => {
                const r = tx.reason || "";
                if (r.includes("القداس") && !r.includes("اضافي") && !r.includes("تونية")) stats["القداس"]++;
                else if (r.includes("مدارس الاحد")) stats["مدارس الاحد"]++;
                else if (r.includes("مدرسة شمامسة")) stats["مدرسة شمامسة"]++;
                else if (r.includes("عشية") && !r.includes("زيادة")) stats["عشية"]++;
                else if (r.includes("درس كتاب")) stats["درس كتاب"]++;
                else if (r.includes("تسبحة") && !r.includes("زيادة")) stats["تسبحة"]++;
                else if (r.includes("اعتراف")) stats["اعتراف"]++;
                else if (r.includes("مسابقة")) stats["مسابقة"]++;
                else if (r.includes("تسميع مزمور") || r.includes("مزمور")) stats["تسميع مزمور"]++;
                else if (r.includes("قداس اضافي بدون تونية")) stats["قداس اضافي بدون تونية"]++;
                else if (r.includes("قداس اضافي")) stats["قداس اضافي"]++;
                else if (r.includes("قداس بدون تونية")) stats["قداس بدون تونية"]++;
                else if (r.includes("عشية او تسبحة(زيادة)")) stats["عشية او تسبحة(زيادة)"]++;
                else if (r.includes("عشية (زيادة)")) stats["عشية (زيادة)"]++;
                else if (r.includes("تسبحة (زيادة)")) stats["تسبحة (زيادة)"]++;
                else stats["اخرى"]++;
            });

            const citiesQuery = `
                SELECT si.name
                FROM user_unlocked_items uui
                JOIN store_items si ON uui.item_id = si.id
                WHERE uui.user_email = ?
                ORDER BY si.required_level ASC, si.name ASC
            `;

            const citiesResults = await db.prepare(citiesQuery).bind(targetEmail).all();

            // get the ctities array
            let cities = citiesResults.results.map(item => item.name);

            const currentLevelQuery = `
                SELECT u.level
                FROM users u
                WHERE u.email = ?
            `;

            const currentLevelResult = await db.prepare(currentLevelQuery).bind(targetEmail).first();
            let currentLevel = currentLevelResult.level;

            return new Response(JSON.stringify({ success: true, mode: 'stats', stats, currentLevel, cities }), {
                status: 200, headers: { "Content-Type": "application/json" }
            });
        }

        // 🛑 السيناريو الثاني: طلب قائمة الأسرة (لو مبعوت اسم الأسرة)
        if (family) {
            // 🛑🛑 مهم جداً: لازم نجيب الإيميل هنا عشان نعرف نطلبه في السيناريو الأول
            const { results } = await db.prepare(`
                SELECT u.name, u.balance, u.email, COUNT(uui.item_id) AS unlocked_count
                FROM users u
                LEFT JOIN user_unlocked_items uui on uui.user_email = u.email
                WHERE u.family = ? AND u.role = 'user' 
                GROUP BY u.email
                ORDER BY unlocked_count DESC, u.balance DESC`
            ).bind(family).all();

            return new Response(JSON.stringify({ success: true, mode: 'list', users: results }), {
                status: 200, headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ error: 'بيانات غير كافية (مطلوب family أو targetEmail)' }), { status: 400 });

    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
