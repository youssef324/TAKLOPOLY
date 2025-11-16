document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements)
    // -----------------------------------------------------
    
    // ... (تعريف العناصر كما هي في الكود الأصلي) ...
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form"); 
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    const userNameP = document.getElementById("user-name"); 
    const userFamilyP = document.getElementById("user-family"); 
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level"); 
    const userAvatarImg = document.getElementById("user-avatar"); 
    const DEFAULT_AVATAR_URL = "/default-avatar.png"; 
    const transactionList = document.getElementById("transaction-list");

    const avatarUploadInput = document.getElementById("avatar-upload-input"); 
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label"); 
    const signupAvatarFile = document.getElementById("signup-avatar-file"); 
    let loggedInUserProfile = null;

    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

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
    const editItemId = document.getElementById("edit-item-id");
    const editItemCurrentUrl = document.getElementById("edit-item-current-url");
    const editItemName = document.getElementById("edit-item-name");
    const editItemPrice = document.getElementById("edit-item-price");
    const editItemRequiredLevel = document.getElementById("edit-item-required-level"); 
    const editItemNewFile = document.getElementById("edit-item-new-file");
    const editCurrentImage = document.getElementById("edit-current-image");
    const editUploadStatusMessage = document.getElementById("edit-upload-status-message");

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
    // ... (في بداية ملف app.js بعد تعريف كل العناصر)

// 🛑 فرض الحالة الأولية الصحيحة عند فتح الصفحة 🛑
const resetUI = () => {
    cardContainer.style.display = "none";
    formContainer.style.display = "flex";
    logoutBtn.style.display = "none";
    logoutBtnGuest.style.display = "none"; // 🛑 إخفاء زر خروج الزائر
    guestContainer.style.display = "none"; // 🛑 إخفاء واجهة الزائر
    refreshDataBtn.style.display = "none";
    unlockedItemsBtn.style.display = "none"; 
    if (showQrBtn) showQrBtn.style.display = "none";
    adminPanelDiv.style.display = "none";
    leaderboardContainer.style.display = "none";
    quizContainer.style.display = "none";
    storeContainer.style.display = "none";
    unlockedItemsContainer.style.display = "none"; 
    avatarOverlayLabel.style.display = "none";
    massUpdateControls.style.display = "none";
    userAnnouncementBox.style.display = "none";
    loggedInUserProfile = null; 
    transactionList.innerHTML = "";
    if (userLevelP) userLevelP.textContent = ""; 
    if (editModalOverlay) editModalOverlay.style.display = "none"; 
    
    // 🛑🛑🛑 الحل القسري لمشكلة الظهور 🛑🛑🛑
    if (qrModalOverlay) qrModalOverlay.style.display = "none"; 
    if (guestDetailsModal) guestDetailsModal.style.display = "none"; 
    // 🛑🛑🛑 نهاية الحل القسري 🛑🛑🛑

    // 🛑 إيقاف الماسح إذا كان يعمل عند تسجيل الخروج
    if (html5QrCode && html5QrCode.isScanning) {
        try {
            html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
        } catch (e) {
            console.warn("Scanner stop failed on reset:", e);
        }
    }
    html5QrCode = null;
};

resetUI(); // 🛑 تنفيذ الإخفاء فوراً
// ... (بقية ملف app.js)
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results"); 
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn"); 
    const printableCardsContainer = document.getElementById("admin-printable-cards-container"); 
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn"); 

    const adminShowUserQrBtn = document.getElementById("admin-show-user-qr-btn");
    const adminMenu = document.getElementById('admin-main-menu'); // New Admin Menu ID
    const adminViews = document.querySelectorAll('.admin-section-view'); // New Admin Sections Class
    const menuButtons = document.querySelectorAll('.admin-menu-btn'); // New Admin Menu Buttons Class
    const closeSectionButtons = document.querySelectorAll('.close-section-btn'); // New Admin Close Buttons Class
    const guestDetailsModal = document.getElementById("guest-details-modal"); // Assuming this exists

    // ... (Constants for Cloudinary) ...

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
        
        // إخفاء نوافذ الأدمن الجديدة
        if(adminMenu) adminMenu.style.display = 'grid';
        if(adminViews) adminViews.forEach(view => view.style.display = 'none');


        // تصفير البيانات
        loggedInUserProfile = null;
        if (html5QrCode && html5QrCode.isScanning) {
            try { html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err)); } catch (e) { console.warn("Scanner stop failed on reset:", e); }
        }
    };
    
    resetUI(); 
    // ... (resizeImage function and other helper functions) ...


    // -----------------------------------------------------
    // 3. دوال جلب البيانات (APIs/STUBs) - تم تحصينها
    // -----------------------------------------------------

    // 🛑 [FIX: UI GAP] دالة تحديث البيانات (لضمان ظهور أزرار اليوزر)
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        if(refreshDataBtn) refreshDataBtn.textContent = "جاري التحديث...";
        
        try {
             // محاكاة استدعاء API get-user-profile
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

    // 🛑 [FIX: UI GAP] دالة loadMainDashboard (لضمان تشغيل لوحات المستخدم)
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections(); 

        try { await loadLeaderboards(); } catch(e) { console.error("Load Failed: Leaderboard", e); leaderboardContainer.style.display = "none"; }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) { console.error("Load Failed: Quiz", e); quizContainer.style.display = "none"; }
        try { await loadStoreItems(); } catch(e) { console.error("Load Failed: Store", e); storeContainer.style.display = "none"; }
    }

    // ... (loadLeaderboards, loadActiveQuiz, loadStoreItems, loadTransactionHistory - Functions must be defined and will fetch data or show loading state) ...


    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login Logic)
    // -----------------------------------------------------
    loginForm.addEventListener("submit", async (event) => {
        // ... (existing login logic which calls refreshUserData and loadMainDashboard) ...
    });

    // -----------------------------------------------------
    // 5. منطق الأزرار المعطلة (Admin/Guest Fix)
    // -----------------------------------------------------
    
    // 🛑 [FIX 1] منطق التنقل بين أقسام الأدمن (Admin Menu) - لتشغيل الأزرار
    if (menuButtons) {
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                
                // 1. إخفاء القائمة الرئيسية وإغلاق كل النوافذ الأخرى
                if(adminMenu) adminMenu.style.display = 'none';
                if(adminViews) adminViews.forEach(view => view.style.display = 'none');
                
                // 2. إظهار النافذة المطلوبة
                const targetSection = document.getElementById(targetId);
                if(targetSection) targetSection.style.display = 'block';

                // Stop scanner if moving away from scan view
                if (targetId !== 'admin-scan-view' && html5QrCode && html5QrCode.isScanning) {
                     html5QrCode.stop().catch(() => {});
                }
            });
        });
    }

    // 🛑 [FIX 2] منطق إغلاق أقسام الأدمن (X Button) - لتشغيل زر الإغلاق
    if (closeSectionButtons) {
        closeSectionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const parentSection = btn.closest('.admin-section-view');
                if(parentSection) parentSection.style.display = 'none';
                
                // إعادة إظهار القائمة الرئيسية
                if(adminMenu) adminMenu.style.display = 'grid'; 
                
                // Stop scanner when closing
                if (html5QrCode && html5QrCode.isScanning) {
                     html5QrCode.stop().catch(() => {});
                }
            });
        });
    }

    // 🛑 [FIX 3] منطق أزرار الجيست (Guest Family Buttons) - لتشغيل أزرار الجيست
    if(guestFamilyButtons) {
        guestFamilyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const familyName = button.dataset.family;
                if(guestMessage) guestMessage.textContent = `جاري تحميل أسرة ${familyName}...`;
                // ... (existing logic to fetch family data and populate guestResultsList) ...
            });
        });
    }

    // 🛑 [FIX 4] إصلاح: معالجة الإرسال في فورم الإعلانات (لمنع تسجيل الخروج للأدمن)
    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (e) => {
            // ... (Logic remains the same as previous fix - checks response.ok and prevents crash) ...
        });
    }


    // -----------------------------------------------------
    // 6. ربط الأحداث العامة
    // -----------------------------------------------------
    
    // ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);
    if(logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', handleLogout);
    if(unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', loadUserUnlockedItems);
    if(backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard);

    // ... (All other event listeners must be defined in the complete code) ...
});
