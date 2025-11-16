// admin-delete-user.js (تعديل مؤقت لتصحيح الأخطاء)

// ... (بعد السطر: const user = await ps.bind(email).first();)

// 🛑🛑 إضافة هذا السطر لفحص الكلمات المخزنة (مؤقت) 🛑🛑
// هذا سيسجل القيمة المخزنة والمقترحة في سجلات الخادم
console.log(`DB Password: ${user ? user.password : 'N/A'}`);
console.log(`Input Password: ${password}`);

// (دي مقارنة غير آمنة بس للتجربة)
// 🛑🛑 استخدام .trim() للتخلص من المسافات الزائدة (تحسين) 🛑🛑
if (user && user.password === password.trim()) {
    
// ... (بقية الكود)
