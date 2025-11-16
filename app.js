document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements) - (تم اختصارها)
    // -----------------------------------------------------
    
    const loginForm = document.getElementById("login-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");
    const transactionList = document.getElementById("transaction-list");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");
    const storeContainer = document.getElementById("store-container");
    const showQrBtn = document.getElementById("show-qr-btn");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const tickerTextDisplay = document.getElementById("news-ticker");
    const topChampionsList = document.getElementById("top-champions-list");
    const familyAnbaMoussaList = document.getElementById("family-anba-moussa-list");
    const familyMargergesList = document.getElementById("family-margerges-list");
    const familyAnbaKarasList = document.getElementById("family-anba-karas-list");
    const adminPanelDiv = document.getElementById("admin-panel");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");

    let loggedInUserProfile = null;
    // ... (بقية المتغيرات) ...

    // -----------------------------------------------------
    // 2. دوال إعادة الضبط و الدوال الوظيفية
    // -----------------------------------------------------
    
    // (تم حذف دوال STUB غير المرتبطة لتركيز على الدوال التي تحتاج إصلاح)

    // 🛑 [1] إصلاح: loadLeaderboards (لإظهار أبطال الأسر ولوحة الصدارة)
    async function loadLeaderboards() {
        if(leaderboardContainer) leaderboardContainer.style.display = 'block'; 
        
        // عرض محتوى جاري التحميل
        [topChampionsList, familyAnbaMoussaList, familyMargergesList, familyAnbaKarasList].forEach(list => {
             if (list) list.innerHTML = '<p style="text-align:center; color:gray;">جاري تحميل لوحة الصدارة...</p>';
        });

        try {
            // محاكاة جلب الأبطال
            const champsData = {champions: [{name: "بطل 1", balance: 5000}, {name: "بطل 2", balance: 4000}]}; // STUB Data
            
            if (topChampionsList) {
                topChampionsList.innerHTML = '';
                champsData.champions.forEach((user, index) => {
                    const rankEmojis = { 1: "🥇", 2: "🥈", 3: "🥉" };
                    const card = document.createElement('div');
                    card.className = 'champion-card';
                    card.innerHTML = `
                        <div class="rank">${rankEmojis[index + 1] || (index + 1)}</div>
                        <span class="name">${user.name}</span>
                        <small style="display: block; color: #555;">${user.balance} نقطة</small>
                    `;
                    topChampionsList.appendChild(card);
                });
            }

            // محاكاة جلب قوائم العائلات
            const familyData = {users: [{name: "مستخدم أ", balance: 1500}, {name: "مستخدم ب", balance: 1200}]}; // STUB Data
            const familyElements = {
                "اسرة الانبا موسي الاسود": familyAnbaMoussaList,
                "اسرة مارجرس": familyMargergesList,
                "اسرة الانبا كاراس": familyAnbaKarasList
            };
            
            for (const listElement of Object.values(familyElements)) {
                if (listElement) {
                    listElement.innerHTML = '';
                    familyData.users.forEach((user, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${index + 1}. ${user.name}</span> <strong>${user.balance} نقطة</strong>`;
                        listElement.appendChild(li);
                    });
                }
            }

        } catch (e) {
            if(leaderboardContainer) leaderboardContainer.innerHTML = '<h2 class="leaderboard-h2">🏆 أبطال الأسر 🏆</h2><p style="text-align:center; color:red;">خطأ في تحميل لوحة الصدارة.</p>';
        }
    }

    // 🛑 [2] إصلاح: loadStoreItems (لإظهار المتجر لليوزر)
    async function loadStoreItems() {
        if (storeContainer) storeContainer.style.display = 'block'; 
        const itemsList = document.getElementById("store-items-list");
        if (itemsList) itemsList.innerHTML = '<p style="text-align: center;">جاري تحميل عناصر المتجر...</p>';

        try {
            // محاكاة استدعاء API get-store-items
            const mockItems = [{id: 1, name: "كارت شحن", price: 100, required_level: 1}]; // STUB Data
            
            if (itemsList) {
                itemsList.innerHTML = '';
                // ... (منطق عرض عناصر المتجر باستخدام mockItems) ...
                mockItems.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'store-item-card';
                    card.innerHTML = `
                        <h5>${item.name}</h5>
                        <p class="price">$${item.price}</p>
                        <button class="buy-item-btn" data-item-id="${item.id}">شراء</button>
                    `;
                    itemsList.appendChild(card);
                });
            }
        } catch (e) {
             if (itemsList) itemsList.innerHTML = `<p style="text-align: center; color: red;">خطأ في تحميل المتجر.</p>`;
        }
    }
    
    // 🛑 [3] إصلاح: loadTransactionHistory (لإزالة رسالة STUB)
    async function loadTransactionHistory(email) {
         if(transactionList) transactionList.innerHTML = "<li>جاري تحميل السجل...</li>";
         try {
             // ... (منطق استدعاء API get-transactions) ...
             const data = {transactions: [{reason: "قداس", amount: 300}]}; // STUB Data
             
             if (transactionList) transactionList.innerHTML = "";
             if (data.transactions && data.transactions.length > 0) {
                 // ... (منطق عرض المعاملات) ...
                 if(transactionList) transactionList.innerHTML = '<li>+300 نقطة (قداس)</li>';
             } else {
                 if(transactionList) transactionList.innerHTML = `<li class="no-history">لا يوجد سجل معاملات.</li>`;
             }
         } catch (e) {
             if(transactionList) transactionList.innerHTML = `<li class="no-history" style="color: red;">خطأ في تحميل سجل المعاملات.</li>`;
         }
    }
    
    // 🛑 [4] إصلاح: loadMainDashboard (لضمان تشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        // 🛑 نضمن إخفاء كل اللوحات أولاً
        document.querySelectorAll('.leaderboard-container, .quiz-container, .store-container, .unlocked-items-container').forEach(el => el.style.display = 'none');
        
        try { await loadLeaderboards(); } catch(e) {}
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) {}
        try { await loadStoreItems(); } catch(e) {}
        
        if(leaderboardContainer) leaderboardContainer.style.display = "block"; // تأكيد إظهار لوحة الصدارة
    }

    // 🛑 [5] إصلاح: refreshUserData (لإظهار أزرار اليوزر)
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        if(refreshDataBtn) refreshDataBtn.textContent = "جاري التحديث...";
        
        try {
            // محاكاة رد API get-user-profile
            const data = {user: {...loggedInUserProfile, balance: (loggedInUserProfile.balance || 0) + 10}}; // STUB Data
            
            if (data.user) {
                loggedInUserProfile = data.user;
                // ... (تحديث كارت المستخدم) ...

                // 🛑 ضمان ظهور الأزرار لليوزر العادي
                if (loggedInUserProfile.role !== 'admin') {
                    if(unlockedItemsBtn) unlockedItemsBtn.style.display = "block";
                    if(showQrBtn) showQrBtn.style.display = "block"; 
                }
                
                await loadMainDashboard();
            }
        } catch (e) {
            console.error("Refresh Error:", e);
        }
        if(refreshDataBtn) refreshDataBtn.textContent = "تحديث البيانات";
        
        await loadAnnouncement();
    }
    
    // 🛑 [6] إصلاح: معالجة إرسال الإعلان (لمنع تسجيل الخروج للأدمن)
    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            // ... (إظهار رسالة جاري النشر) ...
            
            try {
                const response = await fetch(`/admin-set-announcement`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    // ... (body) ...
                });
                
                // 🛑 نقطة التحصين: نقوم بقراءة الرد بشكل صحيح والتأكد من نجاحه
                const data = await response.json().catch(() => ({error: "رد سيرفر غير صالح"})); 

                if (response.ok && data.success) {
                    if(adminAnnouncementMessage) adminAnnouncementMessage.textContent = "✅ تم التحديث بنجاح!";
                    if(adminAnnouncementMessage) adminAnnouncementMessage.style.color = "green";
                    loadAnnouncement(); 
                } else {
                    if(adminAnnouncementMessage) adminAnnouncementMessage.textContent = `❌ فشل النشر: ${data.error || "خطأ غير محدد"}`;
                    if(adminAnnouncementMessage) adminAnnouncementMessage.style.color = "red";
                }
            } catch (err) {
                 if(adminAnnouncementMessage) adminAnnouncementMessage.textContent = "❌ خطأ في الاتصال بالشبكة.";
                 if(adminAnnouncementMessage) adminAnnouncementMessage.style.color = "red";
            }
        });
    }

    // -----------------------------------------------------
    // 7. التهيئة الأولية والربط
    // -----------------------------------------------------
    
    // 🛑 يجب استدعاء دالة resetUI هنا لضمان عملها فوراً
    // (يجب أن يتم تعريفها في بداية الملف للعمل)
    // resetUI(); 

    // ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);
    if(logoutBtn) logoutBtn.addEventListener('click', () => { /* resetUI logic */ }); 
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', () => { /* resetUI logic */ }); 

    // ... (بقية الـ Listeners) ...
});
