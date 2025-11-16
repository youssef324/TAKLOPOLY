document.addEventListener("DOMContentLoaded", () => {
    // --- مسك العناصر الأساسية ---
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    // --- 🛑🛑 عناصر واجهة الزائر (جديدة) 🛑🛑 ---
    const guestContainer = document.getElementById("guest-container");
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const logoutBtnGuest = document.getElementById("logout-btn-guest"); // زر اللوج أوت الخاص بالزائر


    // --- عناصر كارت المستخدم (اللي عامل لوجن) ---
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const DEFAULT_AVATAR_URL = "/default-avatar.png";

    // --- عناصر السجل واللوحات ---
    const transactionList = document.getElementById("transaction-list");

    // --- عناصر تغيير الصورة ---
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
    
    // 🛑 عناصر التحكم في المستوى (الأدمن)
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
    const massUpdateMessage = document.getElementById("admin-mass-update-message");
    let selectedUsersForMassUpdate = [];

    // --- عناصر المتجر (جديدة) ---
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    // --- عناصر إدارة المتجر (جديدة) ---
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminStoreMessage = document.getElementById("admin-store-message");
    const storeItemImageFile = document.getElementById("store-item-image-file");
    const storeItemRequiredLevel = document.getElementById("store-item-required-level");

    // --- عناصر المشتريات (جديدة) ---
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const backToStoreBtn = document.getElementById("back-to-store-btn");
    // --- نهاية عناصر المشتريات ---

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
    
    // 🛑 عناصر نافذة التعديل (Modal) 🛑
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

    // 🛑🛑 عناصر كود QR الجديدة 🛑🛑
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");
    
    // 🛑🛑 عناصر مسح الأدمن (المعدلة) 🛑🛑
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    // 🛑🛑 العناصر الجديدة للقائمة المؤقتة 🛑🛑
    const scannedUsersList = document.getElementById("scanned-users-list");
    const processScansBtn = document.getElementById("process-scans-btn");
    let html5QrCode = null; // للمكتبة
    let scannedEmailsQueue = []; // 🛑 المصفوفة التي تخزن الإيميلات الممسوحة

    // 🛑🛑 عناصر طباعة الـ QR (مُعدلة) 🛑🛑
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results"); // Textarea (مخفي)
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn"); // 🛑 زر التوليد
    const printableCardsContainer = document.getElementById("admin-printable-cards-container"); // 🛑 حاوية الكروت
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn"); // 🛑 زر التحميل

    // 🛑🛑 زر عرض QR للأدمن (جديد) 🛑🛑
    const adminShowUserQrBtn = document.getElementById("admin-show-user-qr-btn");


    // 🛑 فرض الحالة الأولية الصحيحة عند فتح الصفحة 🛑
    const resetUI = () => {
        // 🛑🛑 تم حذف أسطر الإخفاء المكررة هنا، مع الاعتماد على الـ CSS/HTML القاطع 🛑🛑
        formContainer.style.display = "flex";
        cardContainer.style.display = "none";
        logoutBtn.style.display = "none";
        logoutBtnGuest.style.display = "none"; // 🛑 إخفاء زر خروج الزائر
        guestContainer.style.display = "none"; // 🛑 إخفاء واجهة الزائر
        refreshDataBtn.style.display = "none";
        unlockedItemsBtn.style.display = "none";
        if (showQrBtn) showQrBtn.style.display = "none";
        avatarOverlayLabel.style.display = "none";
        massUpdateControls.style.display = "none";
        userAnnouncementBox.style.display = "none";
        loggedInUserProfile = null;
        transactionList.innerHTML = "";
        if (userLevelP) userLevelP.textContent = "";
        if (editModalOverlay) editModalOverlay.style.display = "none";
        if (qrModalOverlay) qrModalOverlay.style.display = "none"; // 🛑 إخفاء مودال الـ QR
        // 🛑 إيقاف الماسح إذا كان يعمل عند تسجيل الخروج
        if (html5QrCode && html5QrCode.isScanning) {
            try {
                html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
            } catch (e) {
                console.warn("Scanner stop failed on reset:", e);
            }
        }
        html5QrCode = null;
        // 🛑🛑 تفريغ قائمة انتظار المسح الجماعي 🛑🛑
        scannedEmailsQueue = [];
        if (scannedUsersList) scannedUsersList.innerHTML = '';
        if (processScansBtn) processScansBtn.disabled = true;

        // 🛑 إعادة تعيين حالة إخفاء/إظهار لوحة الأدمن (لتجاوز أي حالة غير مرئية)
        adminPanelDiv.style.display = "none"; 
        adminPanelDiv.style.visibility = "hidden"; // 🛑 لإجبار الإخفاء
        leaderboardContainer.style.display = "none"; 
        quizContainer.style.display = "none";
        storeContainer.style.display = "none";
        unlockedItemsContainer.style.display = "none";
    };

    resetUI();


    // 🛑🛑 فانكشن مساعدة لضغط الصور (مطلوبة لرفع صور المنتجات) 🛑🛑
    function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                            width = width < 1 ? 1 : width; // التأكد من أن العرض لا يصبح صفر
                            height = height < 1 ? 1 : height; // التأكد من أن الارتفاع لا يصبح صفر
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', quality);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    // 🛑🛑 دالة لإخفاء أقسام المستخدم جميعها 🛑🛑
    function hideUserSections() {
        leaderboardContainer.style.display = "none";
        quizContainer.style.display = "none";
        storeContainer.style.display = "none";
        unlockedItemsContainer.style.display = "none";
    }
    
    // 🛑🛑 دالة العودة للصفحة الرئيسية (المتجر + الكويز + الصدارة) 🛑🛑
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        
        hideUserSections();
        
        // 🛑🛑 تحميل الأقسام بشكل تسلسلي ومحمي ضد الانهيار 🛑🛑
        try { await loadLeaderboards(); } catch(e) { console.error("Load Failed: Leaderboard", e); leaderboardContainer.style.display = "none"; }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) { console.error("Load Failed: Quiz", e); quizContainer.style.display = "none"; }
        try { await loadStoreItems(); } catch(e) { console.error("Load Failed: Store", e); storeContainer.style.display = "none"; }
        
        // هذه الدوال ستقوم بضبط display: block للعناصر الخاصة بها
    }


    // 🛑🛑 فانكشن جلب وعرض مشتريات المستخدم 🛑🛑
    async function loadUserUnlockedItems() {
        if (!loggedInUserProfile) return;

        hideUserSections();
        unlockedItemsContainer.style.display = "block";
        unlockedItemsList.innerHTML = '<p style="text-align: center;">جاري تحميل المشتريات...</p>';
        unlockedItemsMessage.textContent = '';

        try {
            const response = await fetch(`/get-unlocked-items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });
            
            const data = await response.json();

            unlockedItemsList.innerHTML = '';
            if (response.ok && data.success && data.items.length > 0) {
                data.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'store-item-card';
                    const purchaseDate = new Date(item.purchased_at).toLocaleDateString('ar-EG');
                    
                    const itemName = item.name || 'منتج غير معروف';

                    card.innerHTML = `
                        <img src="${item.image_url || '/default-item.png'}" alt="${itemName}">
                        <h5>${itemName}</h5>
                        <p style="color: #28a745;">تم الشراء مقابل ${item.price} نقطة</p>
                        <small>في: ${purchaseDate}</small>
                    `;
                    unlockedItemsList.appendChild(card);
                });
            } else {
                unlockedItemsList.innerHTML = `<p style="text-align: center;">لم تقم بأي مشتريات سابقة.</p>`;
            }
        } catch(err) {
            unlockedItemsMessage.textContent = `خطأ في تحميل المشتريات: ${err.message}`;
            unlockedItemsMessage.style.color = 'red';
            console.error("Unlocked Items Error:", err);
        }
    }


    // 🛑🛑 فانكشن تحديث البيانات (Refresh) 🛑🛑
    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        refreshDataBtn.textContent = "جاري التحديث...";
        try {
            const response = await fetch(`/get-user-profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });
            if (!response.ok) throw new Error("فشل الحصول على بيانات المستخدم");
            const data = await response.json();
            const user = data.user;
            loggedInUserProfile = user;

            userNameP.textContent = `الاسم: ${user.name}`;
            userFamilyP.textContent = `العائلة: ${user.family}`;
            userBalanceP.textContent = `الرصيد: $${user.balance}`;
            userLevelP.textContent = `المستوى: ${user.level || 1}`; // 🛑 تحديث المستوى
            userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;
            
            await loadTransactionHistory(user.email);
            if (user.role !== 'admin') {
                unlockedItemsBtn.style.display = "block"; // 🛑 إظهار الزر
                if (showQrBtn) showQrBtn.style.display = "block"; // 🛑 إظهار زرار الـ QR
                
                // 🛑🛑 نستخدم loadMainDashboard لتهيئة الواجهة بعد التحديث 🛑🛑
                await loadMainDashboard();
                await loadAnnouncement(); // 🛑🛑 تم الإصلاح: تحميل الإعلان للمستخدم
            } else {
                unlockedItemsBtn.style.display = "none";
                if (showQrBtn) showQrBtn.style.display = "none"; // 🛑 إخفاء زرار الـ QR للأدمن
                await loadAnnouncement();
                await loadAdminStoreItems();
            }
            refreshDataBtn.textContent = "تحديث البيانات";
        } catch(err) {
            refreshDataBtn.textContent = "فشل التحديث";
            console.error("Refresh Error:", err);
        }
    }

    // --- فورم اللوجن ---
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        messageDiv.textContent = "جاري تسجيل الدخول...";
        messageDiv.style.color = "blue";
        
        // إعادة الإخفاء قبل المعالجة
        adminPanelDiv.style.display = "none";
        adminPanelDiv.style.visibility = "hidden"; // 🛑 إعادة تعيين حالة الرؤية
        transactionList.innerHTML = "";
        hideUserSections();
        userAnnouncementBox.style.display = "none";

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json().catch(() => ({error: 'رد سيرفر غير صالح'}));

            if (response.ok) {
                messageDiv.textContent = "تم تسجيل الدخول بنجاح!";
                messageDiv.style.color = "green";
                const user = data.user;
                loggedInUserProfile = user;

                // 🛑🛑🛑 --- التحقق من نوع المستخدم (Role) --- 🛑🛑🛑
                if (user.role === 'admin') {
                    // 1. عرض لوحة الأدمن (ADMIN VIEW)
                    messageDiv.textContent = "مرحباً أيها الأدمن! تم تسجيل الدخول بنجاح.";
                    
                    // 🛑🛑 الإظهار القاطع للوحة الأدمن 🛑🛑
                    adminPanelDiv.style.display = "block";
                    adminPanelDiv.style.visibility = "visible";
                    
                    cardContainer.style.display = "flex"; // الأدمن يرى الكارت الخاص به
                    avatarOverlayLabel.style.display = "flex";
                    
                    // ملء بيانات كارت الأدمن (نفس بيانات اليوزر العادي)
                    userNameP.textContent = `الاسم: ${user.name}`;
                    userFamilyP.textContent = `العائلة: ${user.family}`;
                    userBalanceP.textContent = `الرصيد: $${user.balance}`;
                    userLevelP.textContent = `المستوى: ${user.level || 1}`;
                    userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;
                    
                    await loadTransactionHistory(user.email);
                    await loadAnnouncement();
                    await loadAdminStoreItems();

                    // إخفاء أشياء اليوزر العادي
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    unlockedItemsBtn.style.display = "none";
                    if (showQrBtn) showQrBtn.style.display = "none";
                    hideUserSections();

                } else if (user.role === 'guest') {
                    // 2. عرض لوحة الزائر (GUEST VIEW)
                    messageDiv.textContent = "مرحباً أيها الزائر!";
                    guestContainer.style.display = "block"; // 🛑 إظهار واجهة الزائر
                    logoutBtnGuest.style.display = "block"; // 🛑 إظهار زر خروج الزائر
                    
                    // 🛑 إخفاء كل شيء آخر
                    cardContainer.style.display = "none";
                    formContainer.style.display = "none";
                    avatarOverlayLabel.style.display = "none";
                    refreshDataBtn.style.display = "none";
                    unlockedItemsBtn.style.display = "none";
                    if (showQrBtn) showQrBtn.style.display = "none";
                    hideUserSections();
                    leaderboardContainer.style.display = "none";
                    adminPanelDiv.style.display = "none"; // 🛑 تأكيد الإخفاء للـ Guest
                    adminPanelDiv.style.visibility = "hidden";

                } else {
                    // 3. عرض لوحة المستخدم العادي (USER VIEW)
                    userNameP.textContent = `الاسم: ${user.name}`;
                    userFamilyP.textContent = `العائلة: ${user.family}`;
                    userBalanceP.textContent = `الرصيد: $${user.balance}`;
                    userLevelP.textContent = `المستوى: ${user.level || 1}`;
                    userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;
                    
                    cardContainer.style.display = "flex";
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    avatarOverlayLabel.style.display = "flex";

                    await loadTransactionHistory(user.email);
                    
                    unlockedItemsBtn.style.display = "block";
                    if (showQrBtn) showQrBtn.style.display = "block";
                    await loadMainDashboard();
                    await loadAnnouncement();
                    // 🛑 الإظهار للمستخدم العادي 🛑
                    leaderboardContainer.style.display = "block";
                    quizContainer.style.display = "block";
                    storeContainer.style.display = "block";
                    // 🛑 الإخفاء للمستخدم العادي 🛑
                    adminPanelDiv.style.display = "none";
                    adminPanelDiv.style.visibility = "hidden";
                }
                // 🛑🛑🛑 --- نهاية التحقق من نوع المستخدم --- 🛑🛑🛑

            } else {
                messageDiv.textContent = `فشل: ${data.error || "خطأ في بيانات الدخول"}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "حدث خطأ في الاتصال بالشبكة أو فشل غير متوقع.";
            messageDiv.style.color = "red";
        }
    });
});
// ... (بقية app.js كما أرسلتها في المراجعة الأخيرة) ...
// (بقية الدوال مثل loadAdminStoreItems, loadLeaderboards, loadActiveQuiz, الخ)
// (بقية logic الأدمن بما في ذلك وظيفة المسح الجماعي الجديدة)
// ...
// 🛑🛑 دالة تحديث قائمة العرض (الجديدة) 🛑🛑
// ... (دالة updateScannedUsersList) ...
// 🛑🛑 دالة معالجة المسح (المعدلة للمسح المستمر) 🛑🛑
// ... (دالة onScanSuccess) ...
// 🛑🛑 معالج الإضافة الجماعية (لزر processScansBtn) 🛑🛑
// ... (processScansBtn.addEventListener) ...
// ...
// (نهاية ملف app.js)
