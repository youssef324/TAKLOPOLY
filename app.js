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
    const adminSearchForm = document.getElementById("admin-search-form");
    const adminSearchInput = document.getElementById("admin-search-name");
    const adminSearchMessage = document.getElementById("admin-search-message");
    const adminResultsListDiv = document.getElementById("admin-results-list");
    const adminSelectUser = document.getElementById("admin-select-user");
    const searchedUserCard = document.getElementById("admin-searched-user-card");
    const searchedUserName = document.getElementById("searched-user-name");
    const searchedUserFamily = document.getElementById("searched-user-family");
    const searchedUserEmail = document.getElementById("searched-user-email");
    const searchedUserBalance = document.getElementById("searched-user-balance");
    const searchedUserLevel = document.getElementById("searched-user-level"); 
    const balanceAmountInput = document.getElementById("admin-balance-amount");
    const addBalanceBtn = document.getElementById("admin-add-balance-btn");
    const subtractBalanceBtn = document.getElementById("admin-subtract-balance-btn");
    const balanceMessage = document.getElementById("admin-balance-message");
    const adminLevelAmount = document.getElementById("admin-level-amount");
    const adminUpdateLevelBtn = document.getElementById("admin-update-level-btn");
    const adminLevelMessage = document.getElementById("admin-level-message"); 
    const deleteUserBtn = document.getElementById("admin-delete-user-btn");
    const deleteMessage = document.getElementById("admin-delete-message");
    const familyButtons = document.querySelectorAll(".family-btn");
    const adminFamilyResultsDiv = document.getElementById("admin-family-results");
    const adminFamilyMessage = document.getElementById("admin-family-message");
    const adminQuizForm = document.getElementById("admin-quiz-form");
    const adminQuizMessage = document.getElementById("admin-quiz-message");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    const massUpdateControls = document.getElementById("mass-update-controls");
    const selectedUsersCount = document.getElementById("selected-users-count");
    const massUpdateAmount = document.getElementById("mass-update-amount");
    const massUpdateAddBtn = document.getElementById("mass-update-add-btn");
    const massUpdateSubtractBtn = document.getElementById("mass-update-subtract-btn");
    const massUpdateMessage = document.getElementById("mass-update-message");
    let selectedUsersForMassUpdate = [];

    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminStoreMessage = document.getElementById("admin-store-message");
    const storeItemImageFile = document.getElementById("store-item-image-file"); 
    const storeItemRequiredLevel = document.getElementById("store-item-required-level"); 

    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");
    const backToStoreBtn = document.getElementById("back-to-store-btn"); 

    const leaderboardContainer = document.getElementById("leaderboard-container");
    const topChampionsList = document.getElementById("top-champions-list");
    const familyAnbaMoussaList = document.getElementById("family-anba-moussa-list");
    const familyMargergesList = document.getElementById("family-margerges-list");
    const familyAnbaKarasList = document.getElementById("family-anba-karas-list");

    const quizContainer = document.getElementById("quiz-container");
    const quizQuestionText = document.getElementById("quiz-question-text");
    const quizBtnA = document.getElementById("quiz-btn-a");
    const quizBtnB = document.getElementById("quiz-btn-b");
    const quizBtnC = document.getElementById("quiz-btn-c");
    const quizOptionButtons = document.querySelectorAll(".quiz-option-btn");
    const quizSubmitBtn = document.getElementById("quiz-submit-btn");
    const quizMessage = document.getElementById("quiz-message"); 

    let currentSearchResults = [];
    let currentSearchedUser = null; 
    let currentQuizId = null;
    let selectedOption = null;
    
    const editModalOverlay = document.getElementById("edit-modal-overlay");
    const closeEditModal = document.getElementById("close-edit-modal");
    const editItemForm = document.getElementById("edit-item-form");
    // ... (rest of edit modal consts) ...

    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");
    
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    let html5QrCode = null; 
    
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    // ... (rest of print qr consts) ...

    const adminShowUserQrBtn = document.getElementById("admin-show-user-qr-btn");
    const adminMenu = document.getElementById('admin-main-menu'); 
    const adminViews = document.querySelectorAll('.admin-section-view'); 
    const menuButtons = document.querySelectorAll('.admin-menu-btn'); 
    const closeSectionButtons = document.querySelectorAll('.close-section-btn'); 
    const guestDetailsModal = document.getElementById("guest-details-modal"); 

    // 🛑🛑 عناصر العرض المباشر الجديدة 🛑🛑
    const inlineQrDisplayContainer = document.getElementById("inline-qr-display-container");
    const inlineQrCodeArea = document.getElementById("inline-qr-code-area");
    const inlineQrEmailDisplayArea = document.getElementById("inline-qr-email-display-area");
    
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

    // 🛑 [FINAL FIX] دالة إعادة الضبط القسرية (لحماية من ظهور المودلز)
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

        // 🛑🛑 إخفاء النوافذ المنبثقة بشكل قسري (الحل القاطع للمشكلة المتكررة) 🛑🛑
        if(qrModalOverlay) qrModalOverlay.style.display = "none"; 
        if(guestDetailsModal) guestDetailsModal.style.display = "none";
        if(editModalOverlay) editModalOverlay.style.display = "none";
        if(inlineQrDisplayContainer) inlineQrDisplayContainer.style.display = "none";
        
        // تصفير البيانات
        loggedInUserProfile = null;
        if(transactionList) transactionList.innerHTML = "";
        // ... (stop scanner logic) ...
    };
    
    resetUI(); 

    // -----------------------------------------------------
    // 3. دوال جلب البيانات (APIs/STUBs) - تم تحصينها
    // -----------------------------------------------------
    
    // ... (loadLeaderboards, loadActiveQuiz, loadStoreItems, loadTransactionHistory - Functions must be defined and will fetch data or show loading state) ...

    // 🛑 دالة تحديث البيانات (لضمان ظهور أزرار اليوزر)
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

            // ... (تحديث كارت المستخدم) ...
            
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
            console.error("Refresh Error:", err);
        }
        if(refreshDataBtn) refreshDataBtn.textContent = "تحديث البيانات";
    }

    // 🛑 دالة loadMainDashboard (لضمان تشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections(); 

        try { await loadLeaderboards(); } catch(e) { console.error("Load Failed: Leaderboard", e); leaderboardContainer.style.display = "none"; }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) { console.error("Load Failed: Quiz", e); quizContainer.style.display = "none"; }
        try { await loadStoreItems(); } catch(e) { console.error("Load Failed: Store", e); storeContainer.style.display = "none"; }
    }


    // -----------------------------------------------------
    // 4. منطق الأزرار المعطلة (Admin/Guest Fix)
    // -----------------------------------------------------
    
    // 🛑 [ADMIN FIX] منطق التنقل بين أقسام الأدمن (Admin Menu)
    if (menuButtons) {
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                
                if(adminMenu) adminMenu.style.display = 'none';
                if(adminViews) adminViews.forEach(view => view.style.display = 'none');
                
                const targetSection = document.getElementById(targetId);
                if(targetSection) targetSection.style.display = 'block';

                if (targetId !== 'admin-scan-view' && html5QrCode && html5QrCode.isScanning) {
                     html5QrCode.stop().catch(() => {});
                }
            });
        });
    }

    // 🛑 [ADMIN FIX] منطق إغلاق أقسام الأدمن (X Button)
    if (closeSectionButtons) {
        closeSectionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const parentSection = btn.closest('.admin-section-view');
                if(parentSection) parentSection.style.display = 'none';
                
                if(adminMenu) adminMenu.style.display = 'grid'; 
                
                if (html5QrCode && html5QrCode.isScanning) {
                     html5QrCode.stop().catch(() => {});
                }
            });
        });
    }

    // 🛑 [GUEST FIX] منطق أزرار الجيست (Guest Family Buttons)
    if(guestFamilyButtons) {
        guestFamilyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const familyName = button.dataset.family;
                if(guestMessage) guestMessage.textContent = `جاري تحميل أسرة ${familyName}...`;
                // ... (existing logic to fetch family data and populate guestResultsList) ...
            });
        });
    }
    
    // 🛑 [FIX: INLINE QR] منطق توليد وعرض QR Code (Inline)
    if (showQrBtn) {
        showQrBtn.addEventListener('click', () => {
            if (!loggedInUserProfile || !loggedInUserProfile.email || !inlineQrDisplayContainer) return;

            // إذا كان معروضاً، قم بإخفائه (Toggle)
            if (inlineQrDisplayContainer.style.display === 'block') {
                inlineQrDisplayContainer.style.display = 'none';
                return;
            }

            // 1. تفريغ الحاوية للتوليد الجديد
            if (inlineQrCodeArea) inlineQrCodeArea.innerHTML = '';

            // 2. المحتوى المشفر: نستخدم الإيميل كمعرّف
            const qrData = loggedInUserProfile.email;

            // 3. توليد كود QR في الحاوية الداخلية (150x150)
            new QRCode(inlineQrCodeArea, {
                text: qrData,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // 4. عرض الإيميل تحت الكود (للتأكد)
            if (inlineQrEmailDisplayArea) inlineQrEmailDisplayArea.textContent = loggedInUserProfile.email;

            // 5. إظهار الحاوية المباشرة
            inlineQrDisplayContainer.style.display = 'block';
        });
    }
    // -----------------------------------------------------
    // 6. ربط الأحداث العامة
    // -----------------------------------------------------
    
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);
    if(logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', handleLogout);
    if(unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', loadUserUnlockedItems);
    if(backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard);
    if(closeQrBtn) closeQrBtn.addEventListener('click', () => { if(qrModalOverlay) qrModalOverlay.style.display = 'none'; });
    
    // ... (rest of the listeners and other complex functions like handleBuyItem, setupAdminPanel, etc.) ...
});
