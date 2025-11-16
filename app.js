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
    
    // عناصر الأدمن
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    // متغيرات عامة (تم حذفها للاختصار)
    // ...
    let loggedInUserProfile = null;
    let html5QrCode = null;
    let scannedUsersBatch = [];
    
    // -----------------------------------------------------
    // 2. دوال إعادة الضبط (Reset UI) & الدوال الوهمية (STUB)
    // -----------------------------------------------------
    
    // 🛑 الدوال الوهمية (لضمان عمل الواجهة) - مع الحفاظ على منطق ظهورها
    async function loadLeaderboards() { 
        if(leaderboardContainer) leaderboardContainer.style.display = 'block'; 
        if(topChampionsList) topChampionsList.innerHTML = '<p style="text-align:center; color:gray;">(أبطال الأسر: محتوى وهمي)</p>';
        console.log("Loading Leaderboards (STUB)"); 
    }
    
    async function loadStoreItems() { 
        if(storeContainer) storeContainer.style.display = 'block'; 
        if(document.getElementById("store-items-list")) document.getElementById("store-items-list").innerHTML = '<p style="text-align:center; color:gray;">(عناصر المتجر: محتوى وهمي)</p>';
        console.log("Loading Store (STUB)"); 
    }
    
    async function loadTransactionHistory(email) { 
         if(transactionList) transactionList.innerHTML = "<li>جاري تحميل السجل...</li>";
         try {
             // (محاكاة استدعاء API get-transactions)
             const response = await fetch(`/get-transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
             const data = await response.json();
             
             if (response.ok && data.transactions && data.transactions.length > 0) {
                  // ... (منطق عرض السجل الفعلي) ...
             } else {
                 if(transactionList) transactionList.innerHTML = '<li>لا يوجد سجل معاملات.</li>'; 
             }
         } catch (e) {
             if(transactionList) transactionList.innerHTML = `<li class="no-history" style="color: red;">خطأ في تحميل السجل.</li>`;
         }
    }
    
    async function refreshUserData() {
        // ... (منطق تحديث بيانات المستخدم والأزرار) ...
    }
    
    async function loadActiveQuiz(email) { 
        if(quizContainer) quizContainer.style.display = 'block'; 
        // ... (منطق عرض محتوى الكويز) ...
    }
    async function loadUserUnlockedItems() { 
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "block";
        // ... (منطق عرض المشتريات) ...
    }
    async function loadAdminStoreItems() { 
        // ... (منطق عرض عناصر الأدمن) ...
    }
    
    // 🛑 دالة resetUI الأصلية (تم حذف التهيئة المبكرة للـ Modals)
    const resetUI = () => {
        // ... (منطق إخفاء عناصر المستخدم العادي) ...
        // ...
        
        // 🛑 تم إزالة محاولات إخفاء الـ Modals من هنا، 
        // والاعتماد على أن الـ HTML (style="display: none;") هو من يخفيها
        // ...
        
        // إعادة واجهة الأدمن الافتراضية
        // ...
    };
    
    // -----------------------------------------------------
    // 3. الدوال المساعدة العامة (تابع)
    // -----------------------------------------------------
    
    // 🛑 دالة loadAnnouncement (مطلوبة لإصلاح مشكلة شريط الأخبار)
    async function loadAnnouncement() {
        // ... (منطق loadAnnouncement) ...
    }

    // 🛑 دالة loadMainDashboard (مطلوبة لتشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        // ... (منطق loadMainDashboard) ...
    }
    
    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login)
    // -----------------------------------------------------
    // ... (منطق loginForm.addEventListener) ...
    
    // -----------------------------------------------------
    // 5. منطق لوحة الأدمن (Admin Panel)
    // -----------------------------------------------------
    // ... (منطق Admin Modals, search, balance, update, delete, إلخ) ...
    
    // -----------------------------------------------------
    // 6. منطق الجيست (الزائر)
    // -----------------------------------------------------
    // ... (منطق Guest family buttons و showUserStats) ...
    
    // -----------------------------------------------------
    // 7. ربط الأحداث الرئيسية
    // -----------------------------------------------------
    
    // ربط الأزرار العامة
    // ...

});
