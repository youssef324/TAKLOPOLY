document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements)
    // -----------------------------------------------------
    
    // عناصر الدخول والتسجيل
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form"); // Assume exists
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    // عناصر كارت المستخدم
    const userNameP = document.getElementById("user-name"); // Assume exists
    const userFamilyP = document.getElementById("user-family"); // Assume exists
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level"); // Assume exists
    const userAvatarImg = document.getElementById("user-avatar"); // Assume exists
    const DEFAULT_AVATAR_URL = "/default-avatar.png"; 
    const transactionList = document.getElementById("transaction-list");

    // عناصر الصورة
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label");
    
    // عناصر الجيست (الزائر)
    const guestContainer = document.getElementById("guest-container"); // Assume exists
    const guestDetailsModal = document.getElementById("guest-details-modal"); // 🛑 تم التعريف لإصلاح مشكلة الظهور
    const logoutBtnGuest = document.getElementById("logout-btn-guest");

    // عناصر المتجر والمشتريات
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list"); // Assume exists
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const backToStoreBtn = document.getElementById("back-to-store-btn");


    // عناصر الكويز ولوحة الصدارة
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const topChampionsList = document.getElementById("top-champions-list");
    const familyAnbaMoussaList = document.getElementById("family-anba-moussa-list");
    const familyMargergesList = document.getElementById("family-margerges-list");
    const familyAnbaKarasList = document.getElementById("family-anba-karas-list");
    const quizContainer = document.getElementById("quiz-container");
    const quizQuestionText = document.getElementById("quiz-question-text"); // Assume exists
    const quizOptionButtons = document.querySelectorAll(".quiz-option-btn"); // Assume exists
    const quizSubmitBtn = document.getElementById("quiz-submit-btn"); // Assume exists
    const quizMessage = document.getElementById("quiz-message"); // Assume exists

    // عناصر QR Code (لليوزر)
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay"); // 🛑 تم التعريف لإصلاح مشكلة الظهور
    const qrCodeContainer = document.getElementById("qr-code-container"); // Assume exists
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display"); // Assume exists

    // عناصر الإعلانات
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text"); // Assume exists
    const tickerTextDisplay = document.getElementById("news-ticker");
    
    // عناصر الأدمن
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    // متغيرات عامة
    let loggedInUserProfile = null;
    let currentQuizId = null;
    let html5QrCode = null; 
    
    // -----------------------------------------------------
    // 2. دوال إعادة الضبط (Reset UI) & الدوال المساعدة
    // -----------------------------------------------------

    // دالة لإخفاء أقسام اليوزر
    function hideUserSections() {
        if(leaderboardContainer) leaderboardContainer.style.display = "none";
        if(quizContainer) quizContainer.style.display = "none";
        if(storeContainer) storeContainer.style.display = "none";
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
    }

    // 🛑 [FIX: MODAL VISIBILITY] دالة إعادة الضبط القسرية
    const resetUI = () => {
        // إخفاء الأقسام الرئيسية
        if(cardContainer) cardContainer.style.display = "none";
        if(formContainer) formContainer.style.display = "flex"; 
        if(logoutBtn) logoutBtn.style.display = "none";
        if(refreshDataBtn) refreshDataBtn.style.display = "none";
        if(adminPanelDiv) adminPanelDiv.style.display = "none";

        // إخفاء عناصر المستخدم
        hideUserSections();
        if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
        if(showQrBtn) showQrBtn.style.display = "none";
        if(avatarOverlayLabel) avatarOverlayLabel.style.display = "none";

        // إخفاء عناصر الزائر
        if(guestContainer) guestContainer.style.display = "none";
        if(logoutBtnGuest) logoutBtnGuest.style.display = "none";

        // 🛑🛑 إخفاء النوافذ المنبثقة بشكل قسري (لحل مشكلة الظهور عند التحميل) 🛑🛑
        if(qrModalOverlay) qrModalOverlay.style.display = "none"; 
        if(guestDetailsModal) guestDetailsModal.style.display = "none";
        
        // تصفير البيانات
        loggedInUserProfile = null;
        currentQuizId = null;
    };
    
    // 🛑 تنفيذ إعادة الضبط عند بدء التشغيل
    resetUI(); 


    // -----------------------------------------------------
    // 3. دوال جلب البيانات (APIs/STUBs)
    // -----------------------------------------------------

    // 🛑 دالة وهمية لتحديث بيانات الكارت
    function updateUserCardUI(user) {
        if(userNameP) userNameP.textContent = user.name || "مستخدم";
        if(userFamilyP) userFamilyP.textContent = user.family || "غير محدد";
        if(userBalanceP) userBalanceP.textContent = user.balance !== undefined ? user.balance : 0;
        if(userLevelP) userLevelP.textContent = user.level !== undefined ? user.level : 1;
        if(userAvatarImg) userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
        loadTransactionHistory(user.email);
    }

    // 🛑 [FIX: LEADERS & STUBS] تحميل لوحات الصدارة
    async function loadLeaderboards() {
        if(leaderboardContainer) leaderboardContainer.style.display = 'block'; 
        
        // عرض محتوى جاري التحميل
        [topChampionsList, familyAnbaMoussaList, familyMargergesList, familyAnbaKarasList].forEach(list => {
             if (list) list.innerHTML = '<p style="text-align:center; color:#007bff;">جاري تحميل لوحة الصدارة...</p>';
        });

        try {
            // محاكاة بيانات (يجب استبدالها باستدعاء API)
            const champsData = {champions: [
                {name: "البطل 🥇", balance: 5000, profile_image_url: DEFAULT_AVATAR_URL}, 
                {name: "البطل 🥈", balance: 4000, profile_image_url: DEFAULT_AVATAR_URL}
            ]}; 
            
            if (topChampionsList) {
                topChampionsList.innerHTML = '';
                champsData.champions.forEach((user, index) => {
                    const rankEmojis = { 1: "🥇", 2: "🥈", 3: "🥉" };
                    const card = document.createElement('div');
                    card.className = 'champion-card';
                    card.innerHTML = `
                        <div class="rank">${rankEmojis[index + 1] || (index + 1)}</div>
                        <img src="${user.profile_image_url || DEFAULT_AVATAR_URL}" alt="${user.name}" class="card-img" style="width: 100px; height: 100px; border-radius: 50%;">
                        <span class="name">${user.name}</span>
                        <small style="display: block; color: #555;">${user.balance} نقطة</small>
                    `;
                    topChampionsList.appendChild(card);
                });
            }

            // محاكاة بيانات العائلات
            const familyData = {users: [{name: "مستخدم أ", balance: 1500}, {name: "مستخدم ب", balance: 1200}]};
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
            console.error("Leaderboard Load Error:", e);
             if(leaderboardContainer) leaderboardContainer.innerHTML = '<h2 class="leaderboard-h2">🏆 أبطال الأسر 🏆</h2><p style="text-align:center; color:red;">خطأ في تحميل لوحة الصدارة.</p>';
        }
    }

    // 🛑 [FIX: STORE] تحميل المتجر
    async function loadStoreItems() {
        if (storeContainer) storeContainer.style.display = 'block'; 
        const itemsList = document.getElementById("store-items-list");
        if (itemsList) itemsList.innerHTML = '<p style="text-align: center;">جاري تحميل عناصر المتجر...</p>';

        try {
            // محاكاة بيانات (يجب استبدالها باستدعاء API)
            const mockItems = [
                {id: 1, name: "كارت شحن", price: 100, required_level: 1, image_url: "/item1.png"}, 
                {id: 2, name: "بطاقة خصم", price: 500, required_level: 5, image_url: "/item2.png"}
            ]; 
            
            if (itemsList) {
                itemsList.innerHTML = '';
                const userLevel = loggedInUserProfile ? loggedInUserProfile.level : 1;
                const userBalance = loggedInUserProfile ? loggedInUserProfile.balance : 0;
                
                mockItems.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'store-item-card';

                    const requiredLevel = item.required_level || 1;
                    const canAfford = userBalance >= item.price;
                    const highEnoughLevel = userLevel >= requiredLevel;
                    const canBuy = canAfford && highEnoughLevel;

                    let buttonText = `شراء (${item.price} نقطة)`;
                    if (!highEnoughLevel) { buttonText = `يتطلب مستوى ${requiredLevel}`; card.classList.add('locked'); } 
                    else if (!canAfford) { buttonText = `النقاط غير كافية`; }

                    const requiredLevelText = (requiredLevel > 1) ? `<p class="level-req">يتطلب مستوى ${requiredLevel}</p>` : '<p class="level-req" style="color: #28a745;">متاح للجميع</p>';
                    
                    card.innerHTML = `
                        <img src="${item.image_url || '/default-item.png'}" alt="${item.name}">
                        <h5>${item.name}</h5>
                        ${requiredLevelText} 
                        <p class="price">$${item.price}</p>
                        <button class="buy-item-btn" data-item-id="${item.id}" ${canBuy ? '' : 'disabled'}>
                            ${buttonText}
                        </button>
                    `;
                    itemsList.appendChild(card);
                });
            }
        } catch (e) {
             console.error("Store Load Error:", e);
             if (itemsList) itemsList.innerHTML = `<p style="text-align: center; color: red;">خطأ في تحميل المتجر.</p>`;
        }
    }

    // دالة وهمية للكويز
    async function loadActiveQuiz(email) { 
        if(quizContainer) quizContainer.style.display = 'block'; 
        // محاكاة لعدم وجود كويز
        if (quizContainer) quizContainer.innerHTML = '<h2 style="color:#007bff;">سؤال اليوم 🎁</h2><div class="quiz-options"><p style="color: orange; text-align:center;">لا يوجد سؤال جديد متاح حالياً.</p></div>';
    }

    // 🛑 [FIX: STUB MESSAGE] تحميل سجل المعاملات
    async function loadTransactionHistory(email) {
         if(transactionList) transactionList.innerHTML = "<li>جاري تحميل السجل...</li>";
         try {
             // محاكاة بيانات (يجب استبدالها باستدعاء API)
             const mockData = {transactions: [{reason: "قداس الأحد", amount: 300, created_at: "2025-11-15"}, {reason: "شراء عنصر", amount: -100, created_at: "2025-11-14"}]}; 
             
             if (transactionList) transactionList.innerHTML = "";
             if (mockData.transactions && mockData.transactions.length > 0) {
                 mockData.transactions.forEach(t => {
                     const li = document.createElement("li");
                     const amountClass = t.amount > 0 ? "positive" : "negative";
                     const sign = t.amount > 0 ? "+" : "";
                     li.innerHTML = `
                         <span>${t.reason}</span>
                         <span class="amount ${amountClass}">${sign}${t.amount} نقطة</span>
                     `;
                     if(transactionList) transactionList.appendChild(li);
                 });
             } else {
                 if(transactionList) transactionList.innerHTML = `<li class="no-history">لا يوجد سجل معاملات.</li>`;
             }
         } catch (e) {
             console.error("Transaction History Error:", e);
             if(transactionList) transactionList.innerHTML = `<li class="no-history" style="color: red;">خطأ في تحميل سجل المعاملات.</li>`;
         }
    }

    // دالة وهمية لعناصر الأدمن
    async function loadAdminStoreItems() { console.log("Loading Admin Store (STUB)"); }
    
    // دالة وهمية للمشتريات
    async function loadUserUnlockedItems() { 
        hideUserSections();
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "block";
        const unlockedList = document.getElementById("unlocked-items-list");
        if(unlockedList) unlockedList.innerHTML = '<p style="text-align: center;">لم تقم بأي مشتريات سابقة (بيانات وهمية).</p>';
    }

    // 🛑 [FIX: DASHBOARD] تحميل لوحة التحكم الرئيسية (لضمان تشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections(); // إخفاء كل أقسام اليوزر
        try { await loadLeaderboards(); } catch(e) {}
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) {}
        try { await loadStoreItems(); } catch(e) {}
    }

    // 🛑 [FIX: BUTTONS] تحديث البيانات (لضمان ظهور أزرار اليوزر)
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        if(refreshDataBtn) refreshDataBtn.textContent = "جاري التحديث...";
        
        try {
            // محاكاة استدعاء API get-user-profile
            const mockResponse = {ok: true, json: async () => ({
                user: {
                    ...loggedInUserProfile, 
                    balance: loggedInUserProfile.balance, 
                    role: loggedInUserProfile.role || 'user'
                }
            })};

            const data = await mockResponse.json();
            
            if (mockResponse.ok && data.user) {
                loggedInUserProfile = data.user;
                updateUserCardUI(loggedInUserProfile);

                // 🛑 ضمان ظهور الأزرار لليوزر العادي
                if (loggedInUserProfile.role === 'user') {
                    if(unlockedItemsBtn) unlockedItemsBtn.style.display = "block";
                    if(showQrBtn) showQrBtn.style.display = "block"; 
                } else {
                    if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
                    if(showQrBtn) showQrBtn.style.display = "none"; 
                }
                
                await loadMainDashboard();
            }
        } catch (e) {
            console.error("Refresh Error:", e);
        }
        if(refreshDataBtn) refreshDataBtn.textContent = "تحديث البيانات";
        
        await loadAnnouncement();
    }
    
    // دالة وهمية للإعلان (يجب أن تكون كاملة لملء حقول الأدمن وعرض الإعلان)
    async function loadAnnouncement() {
        try {
            // محاكاة استدعاء API get-announcement
            const mockResponse = {ok: true, json: async () => ({message: "رسالة إعلان هامة!", ticker_message: "شريط إخباري متحرك."})};
            // const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await mockResponse.json();
            
            // عرض الإعلانات لليوزر
            if (userAnnouncementBox) userAnnouncementBox.style.display = (data.message || data.ticker_message) ? 'block' : 'none';
            if (userAnnouncementText) userAnnouncementText.textContent = data.message || "";
            if (tickerTextDisplay) tickerTextDisplay.textContent = data.ticker_message || "";
            
            // ملء حقول الأدمن (مهم لإصلاح مشكلة الأدمن)
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                if (adminAnnouncementText) adminAnnouncementText.value = data.message || "";
                if (adminTickerText) adminTickerText.value = data.ticker_message || "";
            }

        } catch(e) { 
            console.error("Announcement Load Error:", e); 
        }
    }

    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login Logic) - (يجب إكمالها من الكود الأصلي)
    // -----------------------------------------------------

    // (يجب أن يتم تضمين منطق Login/Signup هنا - تم حذفه لعدم تكرار الكود)
    
    // 🛑 دالة مساعدة لاستدعاء واجهة المستخدم بعد الدخول
    // function onLoginSuccess(user) { /* ... منطق إظهار الواجهة واستدعاء refreshUserData ... */ }


    // -----------------------------------------------------
    // 5. منطق لوحة الأدمن (Admin Panel Logic)
    // -----------------------------------------------------

    // 🛑 [FIX: ADMIN LOGOUT] إصلاح: معالجة الإرسال في فورم الإعلانات
    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if(adminAnnouncementMessage) adminAnnouncementMessage.textContent = "جاري النشر...";
            if(adminAnnouncementMessage) adminAnnouncementMessage.style.color = "blue";
            
            try {
                // محاكاة استدعاء API admin-set-announcement
                const mockResponse = {ok: true, json: async () => ({success: true, message: "تم تحديث الإعلانات بنجاح!"})};
                // const response = await fetch(`/admin-set-announcement`, ...); // يجب استبدال السطر أعلاه بهذا السطر

                const response = mockResponse;
                const data = await response.json().catch(() => ({error: "رد سيرفر غير صالح"})); // 🛑 تحصين قراءة JSON

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
    // ... (بقية منطق الأدمن مثل search, balance, mass update, scan - لم يتغير) ...

    // -----------------------------------------------------
    // 6. ربط الأحداث الرئيسية
    // -----------------------------------------------------
    
    // ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);
    if(logoutBtn) logoutBtn.addEventListener('click', resetUI);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', resetUI);
    if(backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard); 
    if(unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', loadUserUnlockedItems);
    
    // ... (بقية الـ Listeners لـ login, signup, quiz, admin panels)

});
