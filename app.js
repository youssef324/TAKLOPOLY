document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements) - (مجموعة كاملة)
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

    // عناصر الصورة
    const avatarUploadInput = document.getElementById("avatar-upload-input"); 
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label"); 
    const signupAvatarFile = document.getElementById("signup-avatar-file"); 
    let loggedInUserProfile = null;

    // --- بيانات Cloudinary ---
    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    // --- عناصر لوحة الأدمن ---
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const backToStoreBtn = document.getElementById("back-to-store-btn"); 

    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");
    const showQrBtn = document.getElementById("show-qr-btn");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const logoutBtnGuest = document.getElementById("logout-btn-guest"); 
    const guestDetailsModal = document.getElementById("guest-details-modal"); 
    const guestContainer = document.getElementById("guest-container"); 

    // 🛑 عناصر الـ Modals والـ QR
    const editModalOverlay = document.getElementById("edit-modal-overlay");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const inlineQrDisplayContainer = document.getElementById("inline-qr-display-container");
    const inlineQrCodeArea = document.getElementById("inline-qr-code-area");
    const inlineQrEmailDisplayArea = document.getElementById("inline-qr-email-display-area");
    
    // (بقية المتغيرات: adminSearchForm, adminViews, menuButtons, html5QrCode, etc.)
    const adminViews = document.querySelectorAll('.admin-section-view'); 
    const menuButtons = document.querySelectorAll('.admin-menu-btn'); 
    const closeSectionButtons = document.querySelectorAll('.close-section-btn'); 
    
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
        if(guestContainer) guestContainer.style.display = "none"; 
        if(logoutBtnGuest) logoutBtnGuest.style.display = "none";

        // إخفاء عناصر المستخدم
        hideUserSections();
        if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
        if(showQrBtn) showQrBtn.style.display = "none";
        if(avatarOverlayLabel) avatarOverlayLabel.style.display = "none";

        // 🛑🛑 إخفاء النوافذ المنبثقة والـ Inline بشكل قسري 🛑🛑
        if(editModalOverlay) editModalOverlay.style.display = "none";
        if(guestDetailsModal) guestDetailsModal.style.display = "none";
        if(inlineQrDisplayContainer) inlineQrDisplayContainer.style.display = "none";
        if(qrModalOverlay) qrModalOverlay.style.display = "none"; 

        // إخفاء نوافذ الأدمن الجديدة (يفترض تعريفها)
        const adminMenu = document.getElementById('admin-main-menu');
        const adminViews = document.querySelectorAll('.admin-section-view');

        if(adminMenu) adminMenu.style.display = 'grid';
        if(adminViews) adminViews.forEach(view => view.style.display = 'none');

        // تصفير البيانات
        loggedInUserProfile = null;
        if(document.getElementById("transaction-list")) document.getElementById("transaction-list").innerHTML = "";
        // ... (بقية منطق تصفير الماسح والبيانات) ...
    };
    
    resetUI(); 
    
    // دالة لتحديث بيانات الكارت
    function updateUserCardUI(user) {
        if(userNameP) userNameP.textContent = `الاسم: ${user.name}`;
        if(userFamilyP) userFamilyP.textContent = `العائلة: ${user.family}`;
        if(userBalanceP) userBalanceP.textContent = `الرصيد: $${user.balance}`;
        if(userLevelP) userLevelP.textContent = `المستوى: ${user.level || 1}`; 
        if(userAvatarImg) userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;
        loadTransactionHistory(user.email);
    }

    // 🛑🛑 الدوال التي تستخدم fetch (يجب أن تكون معرفة) 🛑🛑
    async function loadLeaderboards() { /* ... existing logic ... */ }
    async function loadActiveQuiz(email) { /* ... existing logic ... */ }
    async function loadStoreItems() { /* ... existing logic ... */ }
    async function loadTransactionHistory(email) { /* ... existing logic ... */ }
    async function loadAdminStoreItems() { /* ... existing logic ... */ }
    async function loadAnnouncement() { /* ... existing logic ... */ }


    // 🛑 دالة loadMainDashboard (لضمان تشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections(); 

        try { await loadLeaderboards(); } catch(e) { console.error("Load Failed: Leaderboard", e); leaderboardContainer.style.display = "none"; }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) { console.error("Load Failed: Quiz", e); quizContainer.style.display = "none"; }
        try { await loadStoreItems(); } catch(e) { console.error("Load Failed: Store", e); storeContainer.style.display = "none"; }
    }


    // 🛑 [FIX: BUTTONS] تحديث البيانات (لضمان ظهور أزرار اليوزر)
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        if(refreshDataBtn) refreshDataBtn.textContent = "جاري التحديث...";
        
        try {
            const response = await fetch(`/get-user-profile`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });
            if (!response.ok) throw new Error("فشل الحصول على بيانات المستخدم");
            const data = await response.json();
            const user = data.user;
            loggedInUserProfile = user;

            updateUserCardUI(user);

            // 🛑 ضمان ظهور الأزرار لليوزر العادي
            if (user.role !== 'admin') {
                if(unlockedItemsBtn) unlockedItemsBtn.style.display = "block";
                if(showQrBtn) showQrBtn.style.display = "block"; 
            } else {
                if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
                if(showQrBtn) showQrBtn.style.display = "none"; 
            }
            
            await loadMainDashboard();
            await loadAnnouncement();
            if (user.role === 'admin') await loadAdminStoreItems();

        } catch(err) {
            console.error("REFRESH ERROR (API FAILURE):", err); // 🛑 تسجيل تفصيلي للخطأ
        }
        if(refreshDataBtn) refreshDataBtn.textContent = "تحديث البيانات";
    }
    
    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login Logic) - (تحصين catch block)
    // -----------------------------------------------------
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        messageDiv.textContent = "جاري تسجيل الدخول...";
        messageDiv.style.color = "blue";
        
        adminPanelDiv.style.display = "none";
        hideUserSections();
        userAnnouncementBox.style.display = "none";

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`/login`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json().catch(() => ({error: 'رد سيرفر غير صالح'}));

            if (response.ok) {
                // 🛑 تسجيل الدخول ناجح، نبدأ تحديث الواجهة
                messageDiv.textContent = "تم تسجيل الدخول بنجاح!";
                messageDiv.style.color = "green";
                const user = data.user;
                loggedInUserProfile = user;

                updateUserCardUI(user); 

                formContainer.style.display = "none";
                cardContainer.style.display = "flex";
                logoutBtn.style.display = "block";
                refreshDataBtn.style.display = "block";

                if (user.role === 'admin') {
                    adminPanelDiv.style.display = "block";
                } else if (user.role === 'guest') {
                    guestContainer.style.display = "block";
                    cardContainer.style.display = "none";
                    logoutBtn.style.display = "none";
                    logoutBtnGuest.style.display = "block";
                } 
                
                // 🛑🛑 تحصين مرحلة التحميل بعد الدخول 🛑🛑
                // إذا فشل هذا الجزء، لن يتم تسجيل الخروج، بل ستظهر رسالة خطأ التحميل
                try {
                    await refreshUserData(); 
                } catch(loadErr) {
                    console.error("CRITICAL LOAD FAILURE AFTER LOGIN:", loadErr);
                    messageDiv.textContent = `تم تسجيل الدخول بنجاح، لكن فشل تحميل البيانات (يرجى الضغط على تحديث البيانات).`;
                    messageDiv.style.color = "orange";
                }

            } else {
                messageDiv.textContent = `فشل: ${data.error || "خطأ في بيانات الدخول"}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            // 🛑 هذا الكاتش خاص بفشل اتصال API /login نفسه
            messageDiv.textContent = "حدث خطأ في الاتصال بالشبكة أو فشل غير متوقع. (فشل API /login)";
            messageDiv.style.color = "red";
            console.error("LOGIN FETCH API ERROR:", err);
        }
    });

    // ... (بقية الملف كما تم إرساله مسبقاً) ...
});
