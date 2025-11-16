document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements)
    // -----------------------------------------------------
    
    // عناصر الدخول والتسجيل
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    // عناصر كارت المستخدم
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const DEFAULT_AVATAR_URL = "/default-avatar.png";
    const transactionList = document.getElementById("transaction-list");

    // عناصر الصورة (تم اختصارها)
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label");
    // const signupAvatarFile = document.getElementById("signup-avatar-file"); 

    // عناصر الجيست (الزائر)
    const guestContainer = document.getElementById("guest-container");
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");
    const guestDetailsModal = document.getElementById("guest-details-modal"); 
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");
    const guestStatsContent = document.getElementById("guest-stats-content"); 

    // عناصر المتجر والمشتريات
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const backToStoreBtn = document.getElementById("back-to-store-btn");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");


    // عناصر الكويز ولوحة الصدارة
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const topChampionsList = document.getElementById("top-champions-list");
    const familyAnbaMoussaList = document.getElementById("family-anba-moussa-list");
    const familyMargergesList = document.getElementById("family-margerges-list");
    const familyAnbaKarasList = document.getElementById("family-anba-karas-list");
    const quizContainer = document.getElementById("quiz-container");
    const quizQuestionText = document.getElementById("quiz-question-text");
    const quizOptionButtons = document.querySelectorAll(".quiz-option-btn");
    const quizSubmitBtn = document.getElementById("quiz-submit-btn");
    const quizMessage = document.getElementById("quiz-message");

    // عناصر QR Code (لليوزر)
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");

    // عناصر الإعلانات
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const tickerTextDisplay = document.getElementById("news-ticker");
    
    // عناصر الأدمن (تم اختصارها لعدم تكرار المنطق)
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    // متغيرات عامة
    let loggedInUserProfile = null;
    let currentQuizId = null;
    // ... (بقية المتغيرات الخاصة بالـ Admin لم تتغير) ...
    
    // -----------------------------------------------------
    // 2. دوال إعادة الضبط (Reset UI) & الدوال الوهمية (STUBs)
    // -----------------------------------------------------
    
    const resetUI = () => {
        // ... (بقية منطق resetUI) ...
    };
    
    // 🛑 تنفيذ إعادة الضبط عند بدء التشغيل
    // resetUI(); // لا نحتاج لتعريفها هنا (موجودة في نهاية الكود)

    // -----------------------------------------------------
    // 3. الدوال المساعدة العامة (تابع) - وظائف الـ API
    // -----------------------------------------------------

    function hideUserSections() {
        if(leaderboardContainer) leaderboardContainer.style.display = "none";
        if(quizContainer) quizContainer.style.display = "none";
        if(storeContainer) storeContainer.style.display = "none";
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
    }

    // 🛑 1. تحميل لوحات الصدارة
    async function loadLeaderboards() {
        if(leaderboardContainer) leaderboardContainer.style.display = 'block'; 
        // عرض محتوى جاري التحميل
        [topChampionsList, familyAnbaMoussaList, familyMargergesList, familyAnbaKarasList].forEach(list => {
             if (list) list.innerHTML = '<p style="text-align:center;">جاري التحميل...</p>';
        });

        try {
            // جلب الأبطال (Top Champions)
            const champsRes = await fetch('/get-top-champions', { method: "POST" });
            const champsData = await champsRes.json();

            if (champsRes.ok && champsData.champions && topChampionsList) {
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
            } else if (topChampionsList) {
                topChampionsList.innerHTML = '<p style="text-align:center; color:gray;">لا توجد بيانات كافية لعرض الأبطال.</p>';
            }

            // جلب قوائم العائلات (Top 10)
            const families = {
                "اسرة الانبا موسي الاسود": familyAnbaMoussaList,
                "اسرة مارجرس": familyMargergesList,
                "اسرة الانبا كاراس": familyAnbaKarasList
            };
            
            for (const [family, listElement] of Object.entries(families)) {
                const res = await fetch('/get-family-top-10', {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ family })
                });
                const data = await res.json();
                
                if (res.ok && data.users && listElement) {
                    listElement.innerHTML = '';
                    data.users.forEach((user, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${index + 1}. ${user.name}</span> <strong>${user.balance} نقطة</strong>`;
                        listElement.appendChild(li);
                    });
                } else if (listElement) {
                    listElement.innerHTML = `<li><small>فشل تحميل القائمة أو لا يوجد مستخدمين.</small></li>`;
                }
            }

        } catch (e) {
            console.error("Leaderboard Load Error:", e);
        }
    }

    // 🛑 2. تحميل المتجر
    async function loadStoreItems() {
        if (storeContainer) storeContainer.style.display = 'block'; 
        if (storeItemsList) storeItemsList.innerHTML = '<p style="text-align: center;">جاري تحميل عناصر المتجر...</p>';

        try {
            const response = await fetch(`/get-store-items`); // تم تحويلها إلى GET في الـ API
            const data = await response.json();
            
            if (response.ok && data.items && storeItemsList) {
                storeItemsList.innerHTML = '';
                const userLevel = loggedInUserProfile ? loggedInUserProfile.level : 1;
                const userBalance = loggedInUserProfile ? loggedInUserProfile.balance : 0;

                data.items.forEach(item => {
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
                    if(storeItemsList) storeItemsList.appendChild(card);
                });
                // ربط حدث الشراء (يجب أن تكون دالة handleBuyItem مُعرفة)
                document.querySelectorAll('.buy-item-btn').forEach(btn => btn.addEventListener('click', handleBuyItem));

            } else if (storeItemsList) {
                storeItemsList.innerHTML = `<p style="text-align: center; color: #888;">لا توجد عناصر متاحة حالياً في المتجر.</p>`;
            }

        } catch (e) {
            console.error("Store Load Error:", e);
             if (storeItemsList) storeItemsList.innerHTML = `<p style="text-align: center; color: red;">خطأ في تحميل المتجر.</p>`;
        }
    }
    
    // 🛑 3. تحميل الكويز
    async function loadActiveQuiz(email) {
        if (quizContainer) quizContainer.style.display = 'block'; 

        try {
            const response = await fetch(`/get-active-quiz`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            
            if (response.status === 404) {
                 if (quizContainer) quizContainer.innerHTML = '<h2 style="color:#007bff;">سؤال اليوم 🎁</h2><div class="quiz-options"><p style="color: orange; text-align:center;">لا يوجد سؤال جديد متاح حالياً أو تم الإجابة عليه.</p></div>';
                return;
            }

            const data = await response.json();
            
            if (response.ok && data.quiz) {
                 const quiz = data.quiz;
                 if (quizQuestionText) quizQuestionText.textContent = `${quiz.question_text} (+${quiz.points} نقطة)`;
                 // ... (ملء الخيارات) ...
                 currentQuizId = quiz.id;
            }
        } catch (err) {
             console.error("Quiz Load Error:", err);
             if (quizContainer) quizContainer.innerHTML = '<h2 style="color:#007bff;">سؤال اليوم 🎁</h2><div class="quiz-options"><p style="color: red; text-align:center;">خطأ في تحميل بيانات الكويز.</p></div>';
        }
    }

    // 🛑 4. تحميل سجل المعاملات
    async function loadTransactionHistory(email) {
         if(transactionList) transactionList.innerHTML = "<li>جاري تحميل السجل...</li>";
         try {
             const response = await fetch(`/get-transactions`, {
                 method: "POST", headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ email }),
             });
             
             const data = await response.json();
             
             if (response.ok && data.transactions) {
                 if(transactionList) transactionList.innerHTML = "";
                 if (data.transactions.length > 0) {
                     data.transactions.forEach(t => {
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
                     if(transactionList) transactionList.innerHTML = `<li class="no-history">لا يوجد معاملات سابقة.</li>`;
                 }
             } else {
                 throw new Error(data.error || "فشل جلب السجل");
             }
         } catch (err) {
             console.error("Transaction History Error:", err);
             if(transactionList) transactionList.innerHTML = `<li class="no-history" style="color: red;">خطأ في تحميل السجل.</li>`;
         }
    }

    // 🛑 5. تحميل المشتريات
    async function loadUserUnlockedItems() {
        if (!loggedInUserProfile) return;
        hideUserSections();
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "block";
        if(unlockedItemsList) unlockedItemsList.innerHTML = '<p style="text-align: center;">جاري تحميل المشتريات...</p>';
        if(unlockedItemsMessage) unlockedItemsMessage.textContent = '';

        try {
            const response = await fetch(`/get-unlocked-items`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });

            const data = await response.json();

            if (response.ok && data.success && data.items.length > 0) {
                if(unlockedItemsList) unlockedItemsList.innerHTML = '';
                data.items.forEach(item => {
                    // ... (عرض تفاصيل المشتريات) ...
                    const card = document.createElement('div');
                    card.className = 'store-item-card';
                    card.innerHTML = `...`; // Placeholder for display
                    if(unlockedItemsList) unlockedItemsList.appendChild(card);
                });
            } else {
                 if(unlockedItemsList) unlockedItemsList.innerHTML = `<p style="text-align: center;">لم تقم بأي مشتريات سابقة.</p>`;
            }
        } catch (err) {
            console.error("Unlocked Items Error:", err);
            if(unlockedItemsMessage) unlockedItemsMessage.textContent = `خطأ في تحميل المشتريات.`;
        }
    }
    
    // 🛑 6. تحديث البيانات (لظهور أزرار اليوزر)
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        if(refreshDataBtn) refreshDataBtn.textContent = "جاري التحديث...";
        
        try {
            const response = await fetch(`/get-user-profile`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });
            const data = await response.json();
            
            if (response.ok && data.user) {
                loggedInUserProfile = data.user;
                updateUserCardUI(loggedInUserProfile);

                // 🛑 ضمان ظهور الأزرار لليوزر العادي فقط
                if (loggedInUserProfile.role !== 'admin') {
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


    // -----------------------------------------------------
    // 7. ربط الأحداث الرئيسية
    // -----------------------------------------------------
    
    // 🛑 ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);
    if(logoutBtn) logoutBtn.addEventListener('click', resetUI);
    if(unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', loadUserUnlockedItems);
    if(backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard);
    if(logoutBtn) logoutBtn.addEventListener('click', resetUI);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', resetUI);
    // ... (بقية الـ Listeners لـ login, signup, quiz, admin panels)
    
    // 🛑 منطق الشراء (Placeholder)
    function handleBuyItem(event) {
        // ... (منطق الشراء الذي سيعيد استدعاء refreshUserData و loadStoreItems) ...
        alert("تم إرسال طلب الشراء (تحتاج إلى API buy-store-item)");
    }
    
    // 🛑 يجب تعريف الدوال المتبقية هنا أو في نطاقها الخاص لضمان عملها
    // ... (مثل handleEditItem, loadAdminStoreItems, إلخ)
    
});
