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

    // --- 🛑🛑 إضافات جديدة (من الملف الثاني) 🛑🛑 ---
    const newsTicker = document.getElementById("news-ticker"); // 1. الشريط الإخباري
    const adminTickerText = document.getElementById("admin-ticker-text"); // 2. حقل تحكم الأدمن بالشريط

    const massUpdateControls = document.getElementById("mass-update-controls");
    const selectedUsersCount = document.getElementById("selected-users-count");
    const massUpdateAmount = document.getElementById("mass-update-amount");
    const massUpdateAddBtn = document.getElementById("mass-update-add-btn");
    const massUpdateSubtractBtn = document.getElementById("admin-subtract-balance-btn");
    const massUpdateMessage = document.getElementById("mass-update-message");
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
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");
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
    const closeQrBtn = document.querySelector(".close-qr-btn"); // 🏆 هذا هو زر الإغلاق (X)
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");

    // 🛑🛑 عناصر مسح الأدمن 🛑🛑
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    let html5QrCode = null; // للمكتبة

    // --- 🛑🛑 إضافات جديدة (من الملف الثاني) 🛑🛑 ---
    // 3. عناصر المسح الجماعي
    const scannedListContainer = document.getElementById("scanned-list-container");
    const scannedUsersList = document.getElementById("scanned-users-list");
    const batchAddPointsBtn = document.getElementById("batch-add-points-btn");
    let scannedBatch = []; // 4. مصفوفة المسح الجماعي

    // 🛑🛑 عناصر طباعة الـ QR (مُعدلة) 🛑🛑
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results"); // Textarea (مخفي)
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn"); // 🛑 زر التوليد
    const printableCardsContainer = document.getElementById("admin-printable-cards-container"); // 🛑 حاوية الكروت
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn"); // 🛑 زر التحميل

    // 🛑🛑 زر عرض QR للأدمن (جديد) 🛑🛑
    const adminShowUserQrBtn = document.getElementById("admin-show-user-qr-btn");

    // --- 🛑🛑 إضافات جديدة (من الملف الثاني) 🛑🛑 ---
    // 5. عناصر نافذة تفاصيل الزائر
    const guestDetailsModal = document.getElementById("guest-details-modal");
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");

    // 🛑🛑 عناصر مودال الأدمن الجديد 🛑🛑
    const adminModalOverlay = document.getElementById("admin-modal-overlay");
    const closeAdminModal = document.getElementById("close-admin-modal");

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
        
        // 🏆🏆 الحل النهائي لعدم الظهور التلقائي 🏆🏆
        if (adminModalOverlay) adminModalOverlay.style.cssText = "display: none !important;"; 
        if (qrModalOverlay) qrModalOverlay.style.cssText = "display: none !important;"; 

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
        
        if (guestDetailsModal) guestDetailsModal.style.display = "none"; // 🛑 إخفاء مودال الزائر

        // 🛑 إيقاف الماسح إذا كان يعمل عند تسجيل الخروج
        if (html5QrCode && html5QrCode.isScanning) {
            try {
                html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
            } catch (e) {
                console.warn("Scanner stop failed on reset:", e);
            }
        }
        html5QrCode = null;
        
        // 🛑 إفراغ قائمة المسح الجماعي عند الخروج
        scannedBatch = [];
        if(scannedListContainer) scannedListContainer.style.display = "none";
        if(scannedUsersList) scannedUsersList.innerHTML = "";
        if(batchAddPointsBtn) batchAddPointsBtn.style.display = "none";
    };

    resetUI();
    
    // --- 🛑🛑 إضافة جديدة: منطق الأكورديون (Accordion) 🛑🛑 ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            // إغلاق جميع الأقسام الأخرى
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.display = 'none';
                }
            });
            // فتح/إغلاق القسم الحالي
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });


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
        try { await loadLeaderboards(); } catch (e) { console.error("Load Failed: Leaderboard", e); leaderboardContainer.style.display = "none"; }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch (e) { console.error("Load Failed: Quiz", e); quizContainer.style.display = "none"; }
        try { await loadStoreItems(); } catch (e) { console.error("Load Failed: Store", e); storeContainer.style.display = "none"; }

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
        } catch (err) {
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
                await loadAnnouncements(); // 🛑🛑 تعديل: استدعاء الدالة الجديدة
            } else {
                unlockedItemsBtn.style.display = "none";
                if (showQrBtn) showQrBtn.style.display = "none"; // 🛑 إخفاء زرار الـ QR للأدمن
                await loadAnnouncements(); // 🛑🛑 تعديل: استدعاء الدالة الجديدة
                await loadAdminStoreItems();
            }
            refreshDataBtn.textContent = "تحديث البيانات";
        } catch (err) {
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

        // إخفاء الأقسام
        adminPanelDiv.style.display = "none";
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
            const data = await response.json().catch(() => ({ error: 'رد سيرفر غير صالح' }));

            if (response.ok) {
                messageDiv.textContent = "تم تسجيل الدخول بنجاح!";
                messageDiv.style.color = "green";
                const user = data.user;
                loggedInUserProfile = user;

                // 🛑🛑🛑 --- التحقق من نوع المستخدم (Role) --- 🛑🛑🛑
                if (user.role === 'admin') {
                    // 1. عرض لوحة الأدمن (ADMIN VIEW)
                    messageDiv.textContent = "مرحباً أيها الأدمن! تم تسجيل الدخول بنجاح.";
                    adminPanelDiv.style.display = "block";
                    cardContainer.style.display = "flex"; // الأدمن يرى الكارت الخاص به
                    avatarOverlayLabel.style.display = "flex";

                    // ملء بيانات كارت الأدمن (نفس بيانات اليوزر العادي)
                    userNameP.textContent = `الاسم: ${user.name}`;
                    userFamilyP.textContent = `العائلة: ${user.family}`;
                    userBalanceP.textContent = `الرصيد: $${user.balance}`;
                    userLevelP.textContent = `المستوى: ${user.level || 1}`;
                    userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;

                    await loadTransactionHistory(user.email);
                    await loadAnnouncements(); // 🛑🛑 تعديل: استدعاء الدالة الجديدة
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
                    adminPanelDiv.style.display = "none";

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
                    await loadAnnouncements(); // 🛑🛑 تعديل: استدعاء الدالة الجديدة
                    leaderboardContainer.style.display = "block";
                    adminPanelDiv.style.display = "none";
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

    // 🛑🛑 معالجة ضغط زر مشترياتي 🛑🛑
    if (unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', loadUserUnlockedItems);
    // 🛑🛑 معالجة ضغط زر العودة للمتجر 🛑🛑
    if (backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard);
    // --- فانكشن سجل المعاملات (مُحصنة) ---
    async function loadTransactionHistory(email) {
        transactionList.innerHTML = "<li>جاري تحميل السجل...</li>";
        try {
            const response = await fetch(`/get-transactions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error("فشل جلب السجل");
            const data = await response.json();
            transactionList.innerHTML = "";
            if (data.transactions && data.transactions.length > 0) {
                data.transactions.forEach(t => {
                    const li = document.createElement("li");
                    const amountClass = t.amount > 0 ? "positive" : "negative";
                    const sign = t.amount > 0 ? "+" : "";
                    li.innerHTML = `
                        <span>${t.reason}</span>
                        <span class="amount ${amountClass}">${sign}${t.amount} نقطة</span>
                    `;
                    transactionList.appendChild(li);
                });
            } else {
                transactionList.innerHTML = `<li class="no-history">لا يوجد معاملات سابقة.</li>`;
            }
        } catch (err) {
            transactionList.innerHTML = `<li class="no-history" style="color: red;">خطأ في تحميل السجل.</li>`;
            console.error("Transaction History Error:", err);
        }
    }


    // 🛑🛑 فانكشن لوحة الصدارة (مُصححة نهائياً) 🛑🛑
    async function loadLeaderboards() {
        leaderboardContainer.style.display = "block"; // 🛑 الإظهار أولاً
        topChampionsList.innerHTML = '<p style="text-align: center;">جاري التحميل...</p>';
        familyAnbaMoussaList.innerHTML = "<li>جاري التحميل...</li>";
        familyMargergesList.innerHTML = "<li>جاري التحميل...</li>";
        familyAnbaKarasList.innerHTML = "<li>جاري التحميل...</li>";
        const rankEmojis = { 1: "🥇", 2: "🥈", 3: "🥉" };

        try {
            // 🛑🛑 استخدام Promise.allSettled لضمان أن فشل طلب واحد لا يوقف البقية 🛑🛑
            const results = await Promise.allSettled([
                fetch('/get-top-champions', { method: "POST" }),
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة الانبا موسي الاسود" }) }),
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة مارجرس" }) }),
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة الانبا كاراس" }) }),
            ]);

            const [championsResponse, anbaMoussaResponse, margergesResponse, karasResponse] = results;

            // 1. الأبطال (Top 3)
            if (championsResponse.status === 'fulfilled' && championsResponse.value.ok) {
                const championsData = await championsResponse.value.json();
                topChampionsList.innerHTML = "";
                if (championsData.champions && championsData.champions.length > 0) {
                    championsData.champions.forEach((user, index) => {
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
                } else {
                    topChampionsList.innerHTML = '<p style="text-align: center; color: #888;">لا توجد بيانات كافية لعرض الأبطال.</p>';
                }
            } else {
                topChampionsList.innerHTML = '<p style="text-align: center; color: orange;">فشل تحميل أبطال الصدارة.</p>';
            }

            // 2. القوائم التفصيلية (Top 10 لكل عائلة)
            const familyResponses = [
                { list: familyAnbaMoussaList, response: anbaMoussaResponse, name: "اسرة الانبا موسي الاسود" },
                { list: familyMargergesList, response: margergesResponse, name: "اسرة مارجرس" },
                { list: familyAnbaKarasList, response: karasResponse, name: "اسرة الانبا كاراس" }
            ];

            for (const item of familyResponses) {
                if (item.response.status === 'fulfilled' && item.response.value.ok) {
                    const data = await item.response.value.json();
                    item.list.innerHTML = '';
                    if (data.users && data.users.length > 0) {
                        data.users.forEach((user, index) => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span>${index + 1}. ${user.name}</span> <strong>${user.balance} نقطة</strong>`;
                            item.list.appendChild(li);
                        });
                    } else {
                        item.list.innerHTML = `<li><small>لا يوجد مستخدمين.</small></li>`;
                    }
                } else {
                    item.list.innerHTML = `<li style="color: orange;">فشل في تحميل القائمة.</li>`;
                }
            }

        } catch (err) {
            console.error("Leaderboard Major Error:", err);
            topChampionsList.innerHTML = '<p style="text-align: center; color: red;">خطأ كارثي في تحميل لوحة الصدارة.</p>';
        }
    }

    // --- 🛑🛑 إضافة جديدة: دالة فتح تفاصيل الزائر 🛑🛑 ---
    async function openGuestDetails(user) {
        if (!guestDetailsModal) return;
        guestDetailsModal.style.display = "flex";
        guestDetailsTitle.textContent = user.name;
        // قائمة بكل IDs الموجودة في نافذة الزائر
        const ids = ["val-mass", "val-sunday", "val-deacon", "val-vespers", "val-book", "val-praise", "val-psalm", "val-extra-mass", "val-extra-mass-nt", "val-mass-nt", "val-extra-vespers", "val-confession", "val-competition", "val-other"];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.textContent = "0";
        });

        try {
            const response = await fetch(`/get-transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: user.email }) });
            const data = await response.json();
            if (data.transactions) {
                // مطابقة أسباب المعاملات مع الـ IDs
                const counts = { "القداس": "val-mass", "مدارس الاحد": "val-sunday", "مدرسة شمامسة": "val-deacon", "عشية": "val-vespers", "درس كتاب": "val-book", "تسبحة": "val-praise", "تسميع مزمور": "val-psalm", "قداس اضافي": "val-extra-mass", "قداس اضافي بدون تونية": "val-extra-mass-nt", "قداس بدون تونية": "val-mass-nt", "عشية او تسبحة(زيادة)": "val-extra-vespers", "اعتراف": "val-confession", "مسابقة": "val-competition" };
                let otherCount = 0;
                
                data.transactions.forEach(t => {
                    let matched = false;
                    for (const key in counts) {
                        if (t.reason && t.reason.includes(key) && t.amount > 0) {
                            const el = document.getElementById(counts[key]);
                            if(el) el.textContent = parseInt(el.textContent) + 1;
                            matched = true;
                            break; 
                        }
                    }
                    if (!matched && t.amount > 0) otherCount++;
                });
                const otherEl = document.getElementById("val-other");
                if(otherEl) otherEl.textContent = otherCount;
            }
        } catch (e) {
            console.error("Failed to get guest transaction details:", e);
        }
    }
    if (closeGuestDetails) closeGuestDetails.onclick = () => guestDetailsModal.style.display = "none";
    // --- 🛑🛑 نهاية الإضافة 🛑🛑 ---


    // 🛑🛑 فانكشن جلب الكويز (تمت استعادتها بالكامل) 🛑🛑
    async function loadActiveQuiz(email) {
        quizContainer.style.display = "block"; // 🛑 الإظهار أولاً

        try {
            const response = await fetch(`/get-active-quiz`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.log("لا يوجد سؤال جديد متاح.");
                    quizContainer.innerHTML = '<div class="quiz-options"><p style="color: orange;">لا يوجد سؤال جديد متاح حالياً.</p></div>';
                } else {
                    throw new Error("فشل جلب الكويز");
                }
                return;
            }

            const data = await response.json();

            const quiz = data.quiz;
            quizQuestionText.textContent = `${quiz.question_text} (+${quiz.points} نقطة)`;
            quizBtnA.textContent = quiz.option_a;
            quizBtnB.textContent = quiz.option_b;
            quizBtnC.textContent = quiz.option_c;
            currentQuizId = quiz.id;

            quizMessage.textContent = "";
            selectedOption = null;
            quizOptionButtons.forEach(btn => btn.classList.remove('selected'));
            quizSubmitBtn.disabled = false;

            quizContainer.style.display = "block";

        } catch (err) {
            console.error("فشل جلب الكويز:", err);
            // لا نستخدم display = "none" هنا بل نعرض رسالة خطأ داخل الحاوية المرئية
            quizContainer.innerHTML = '<div class="quiz-options"><p style="color: red;">خطأ في تحميل بيانات الكويز.</p></div>';
        }
    }

    // --- 🛑🛑 استبدال: دالة جلب الإعلانات (لتشمل الشريط الإخباري) 🛑🛑 ---
    async function loadAnnouncements() {
        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await response.json();
            
            // معالجة الرد سواء كان نصاً قديماً أو JSON جديد
            let cleanMessage = data.message || "";
            let cleanTicker = data.ticker_message || "";
            if (typeof data.message === 'string' && data.message.startsWith('{') && data.message.includes('ticker_message')) {
                try {
                    const parsed = JSON.parse(data.message);
                    cleanMessage = parsed.message;
                    cleanTicker = parsed.ticker_message;
                } catch (e) {}
            }

            // تحديث الشريط الإخباري
            if (newsTicker) {
                if (cleanTicker) {
                    newsTicker.textContent = cleanTicker;
                    // إعادة تشغيل الأنيميشن
                    newsTicker.style.animation = 'none';
                    newsTicker.offsetHeight; //
                    newsTicker.style.animation = null; 
                } else {
                    newsTicker.textContent = "أهلاً بكم في TAKLOPOLY!"; // نص افتراضي
                }
            }

            // تحديث الإعلان الرئيسي
            if (userAnnouncementText && userAnnouncementBox) {
                if (cleanMessage) {
                    userAnnouncementText.textContent = cleanMessage;
                    userAnnouncementBox.style.display = "block";
                } else {
                    userAnnouncementBox.style.display = "none";
                }
            }

            // ملء بيانات الأدمن
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                if(adminTickerText) adminTickerText.value = cleanTicker;
                if(adminAnnouncementText) adminAnnouncementText.value = cleanMessage;
            }
        } catch (e) { console.error("Announcement Load Error", e); }
    }
    // --- 🛑🛑 نهاية الاستبدال 🛑🛑 ---


    // 🛑🛑 فانكشن جلب وعرض عناصر المتجر (للمستخدم) 🛑🛑
    async function loadStoreItems() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;

        storeContainer.style.display = "block"; // 🛑 الإظهار أولاً
        storeLoadingMessage.style.display = 'block';
        storeItemsList.innerHTML = '';
        storeMessage.textContent = "";

        try {
            // 🛑🛑 تم تعديلها إلى GET 🛑🛑
            const response = await fetch(`/get-store-items`);

            if (!response.ok) throw new Error("فشل جلب عناصر المتجر");
            const data = await response.json();

            storeLoadingMessage.style.display = 'none';
            storeItemsList.innerHTML = ''; // تفريغ القائمة قبل الملء

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'store-item-card';

                    // 🛑🛑 منطق التحقق الجديد (الرصيد + المستوى) 🛑🛑
                    const userLevel = loggedInUserProfile ? loggedInUserProfile.level : 1;
                    const userBalance = loggedInUserProfile ? loggedInUserProfile.balance : 0;
                    const requiredLevel = item.required_level || 1;

                    const canAfford = userBalance >= item.price;
                    const highEnoughLevel = userLevel >= requiredLevel;
                    const canBuy = canAfford && highEnoughLevel;

                    let buttonText = `شراء (${item.price} نقطة)`;

                    if (!highEnoughLevel) {
                        buttonText = `يتطلب مستوى ${requiredLevel}`;
                        card.classList.add('locked'); // 🛑 إضافة كلاس للقفل
                    } else if (!canAfford) {
                        buttonText = `النقاط غير كافية`;
                    }
                    // 🛑🛑 نهاية منطق التحقق الجديد 🛑🛑

                    const itemName = item.name || item.namel || 'منتج غير معروف';

                    // 🛑 إضافة نص المستوى المطلوب
                    const requiredLevelText = (requiredLevel > 1)
                        ? `<p class="level-req">يتطلب مستوى ${requiredLevel}</p>`
                        : '<p class="level-req" style="color: #28a745;">متاح للجميع</p>';

                    card.innerHTML = `
                        <img src="${item.image_url || '/default-item.png'}" alt="${itemName}">
                        <h5>${itemName}</h5>
                        ${requiredLevelText} 
                        <p class="price">$${item.price}</p>
                        <button class="buy-item-btn" data-item-id="${item.id}" ${canBuy ? '' : 'disabled'}>
                            ${buttonText}
                        </button>
                    `;
                    storeItemsList.appendChild(card);
                });

                // إضافة مُستمعي الأحداث لأزرار الشراء
                document.querySelectorAll('.buy-item-btn').forEach(btn => {
                    btn.addEventListener('click', handleBuyItem);
                });

            } else {
                storeItemsList.innerHTML = `<p style="text-align: center; color: #888;">لا توجد عناصر متاحة حالياً في المتجر.</p>`;
            }
        } catch (err) {
            storeLoadingMessage.style.display = 'none';
            storeItemsList.innerHTML = `<li style="color: red;">خطأ في تحميل المتجر: ${err.message}.</li>`;
            console.error("Store Load Error:", err);
        }
    }

    // 🛑🛑 فانكشن شراء عنصر (إصلاح الخطأ الوهمي) 🛑🛑
    async function handleBuyItem(event) {
        const itemId = event.target.dataset.itemId;
        event.target.disabled = true;
        storeMessage.textContent = "جاري إتمام عملية الشراء...";
        storeMessage.style.color = "blue";

        try {
            const response = await fetch(`/buy-store-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loggedInUserProfile.email,
                    itemId: itemId
                }),
            });

            // 🛑🛑 التعديل لحل مشكلة الخطأ الوهمي 🛑🛑
            const data = await response.json();

            if (data.success || response.ok) {
                // 1. إظهار رسالة النجاح الفورية
                storeMessage.textContent = data.message || "تمت العملية بنجاح! جاري التحديث...";
                storeMessage.style.color = "green";

                // 2. تحديث الواجهة بشكل منفصل لتجنب انهيار الرسالة الخضراء
                try {
                    await refreshUserData(); // 🛑 تحديث الرصيد والعناصر والسجل
                } catch (refreshErr) {
                    console.error("Failed to refresh UI after purchase:", refreshErr);
                    storeMessage.textContent += " (لكن حدث خطأ في تحديث الواجهة. يرجى التحديث يدوياً.)";
                    storeMessage.style.color = "orange";
                }

            } else {
                storeMessage.textContent = data.error || "فشل عملية الشراء.";
                storeMessage.style.color = "red";
            }
        } catch (err) {
            // سنعرض رسالة الخطأ العامة، لكن بما أن الخصم حدث، هذا غالباً خطأ وهمي في الـ JSON
            storeMessage.textContent = "حدث خطأ أثناء إتمام العملية. (الرجاء التحقق من الرصيد والسجل).";
            storeMessage.style.color = "orange";
            console.error("Buy Item Error:", err);
        } finally {
            // لا نعيد تفعيل الزر هنا، لأن refreshUserData سيعيد تحميل المتجر
        }
    }

    // 🛑🛑 دالة معالجة تعديل عنصر المتجر (جديدة) 🛑🛑
    async function handleEditItem(itemId, name, price, imageUrl, requiredLevel) { // 🛑 إضافة المستوى
        if (!loggedInUserProfile || loggedInUserProfile.role !== 'admin') {
            adminStoreMessage.textContent = "غير مصرح لك بالتعديل.";
            adminStoreMessage.style.color = 'red';
            return;
        }

        // 1. ملء النموذج وعرضه
        editItemId.value = itemId;
        editItemName.value = name;
        editItemPrice.value = price;
        editItemRequiredLevel.value = requiredLevel || 1; // 🛑 ملء المستوى
        editItemCurrentUrl.value = imageUrl;
        editCurrentImage.src = imageUrl || DEFAULT_AVATAR_URL;
        editItemNewFile.value = null; // تفريغ حقل الملف
        editUploadStatusMessage.textContent = '';

        editModalOverlay.style.display = 'flex'; // إظهار النافذة

        // 2. معالج إغلاق النافذة
        closeEditModal.onclick = () => {
            editModalOverlay.style.display = 'none';
            adminStoreMessage.textContent = ''; // مسح الرسائل بعد الإغلاق
        };

        // 3. معالج إرسال النموذج
        editItemForm.onsubmit = async (event) => {
            event.preventDefault();

            const newName = editItemName.value.trim();
            const newPrice = parseInt(editItemPrice.value);
            const newRequiredLevel = parseInt(editItemRequiredLevel.value); // 🛑 جلب المستوى
            const fileToUpload = editItemNewFile.files[0];

            // التحقق من صلاحية البيانات الأساسية
            if (!newName || isNaN(newPrice) || newPrice <= 0 || isNaN(newRequiredLevel) || newRequiredLevel < 1) { // 🛑 إضافة التحقق
                editUploadStatusMessage.textContent = "الرجاء إدخال اسم وسعر ومستوى صالحين.";
                editUploadStatusMessage.style.color = 'red';
                return;
            }

            editUploadStatusMessage.textContent = "جاري معالجة التعديلات...";
            editUploadStatusMessage.style.color = 'blue';

            let finalImageUrl = editItemCurrentUrl.value; // القيمة الافتراضية: الرابط القديم

            try {
                if (fileToUpload) {
                    editUploadStatusMessage.textContent = "جاري رفع الصورة وضغطها...";
                    // 🛑 منطق رفع الصورة إلى Cloudinary 🛑
                    const resizedBlob = await resizeImage(fileToUpload, 400, 400, 0.8);
                    const formData = new FormData();
                    formData.append('file', resizedBlob);
                    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                    const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                        method: 'POST',
                        body: formData
                    });

                    if (!cloudinaryResponse.ok) throw new Error("فشل رفع الصورة لـ Cloudinary");

                    const cloudinaryData = await cloudinaryResponse.json();
                    finalImageUrl = cloudinaryData.secure_url;
                }

                editUploadStatusMessage.textContent = "جاري حفظ التعديلات في قاعدة البيانات...";

                // 4. إرسال التعديلات إلى الدالة الخلفية
                const response = await fetch(`/admin-update-item`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        itemId: itemId,
                        name: newName,
                        price: newPrice,
                        required_level: newRequiredLevel, // 🛑 إرسال المستوى
                        image_url: finalImageUrl,
                        adminEmail: loggedInUserProfile.email
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    editUploadStatusMessage.textContent = `تم تحديث المنتج بنجاح!`;
                    editUploadStatusMessage.style.color = "green";

                    // إغلاق النموذج وتحديث القائمة
                    setTimeout(() => {
                        editModalOverlay.style.display = 'none';
                        loadAdminStoreItems();
                    }, 1000);
                } else {
                    editUploadStatusMessage.textContent = `فشل التعديل: ${data.error || "خطأ غير محدد"}`;
                    editUploadStatusMessage.style.color = "red";
                }
            } catch (err) {
                editUploadStatusMessage.textContent = `خطأ: فشل أثناء الرفع/الاتصال.`;
                editUploadStatusMessage.style.color = "red";
                console.error("Edit Submit Error:", err);
            }
        };
    }

    // 🛑🛑 فانكشن تحميل عناصر المتجر للأدمن (مع زر التعديل الجديد) ---
    async function loadAdminStoreItems() {
        if (!loggedInUserProfile || loggedInUserProfile.role !== 'admin') return;

        adminStoreItemsList.innerHTML = '<li>جاري تحميل العناصر...</li>';
        adminStoreMessage.textContent = "";

        try {
            const response = await fetch(`/admin-get-items`);

            if (!response.ok) throw new Error("فشل جلب عناصر المتجر للأدمن");

            const text = await response.text();
            if (!text) throw new Error("استجابة فارغة من الخادم. (DB Binding Error?)");

            const data = JSON.parse(text);
            adminStoreItemsList.innerHTML = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const itemName = item.name || item.namel || 'غير معروف';
                    const itemLevel = item.required_level || 1; // 🛑 جلب المستوى

                    const li = document.createElement('li');
                    li.className = 'admin-item-card'; // 🛑 تطبيق كلاس الكارت الجديد
                    li.innerHTML = `
                        <div class="admin-item-info">
                            <strong>${itemName}</strong>
                            <small>السعر: $${item.price} | المستوى: ${itemLevel} | ID: ${item.id}</small>
                            <small>صورة: ${item.image_url ? 'مرفوعة' : 'لا يوجد'}</small>
                        </div>
                        <div class="admin-item-actions">
                            <button class="edit-item-btn" 
                                data-item-id="${item.id}" 
                                data-item-name="${itemName}" 
                                data-item-price="${item.price}" 
                                data-item-url="${item.image_url || ''}"
                                data-item-level="${itemLevel}" 
                                style="background-color: #ffc107; color: #333; margin-left: 10px; padding: 10px 15px; border-radius: 6px; font-weight: bold;">
                                تعديل
                            </button>
                            <button class="delete-store-item-btn" data-item-id="${item.id}" style="padding: 10px 15px; border-radius: 6px; font-weight: bold;">حذف</button>
                        </div>
                    `;
                    adminStoreItemsList.appendChild(li);
                });

                document.querySelectorAll('.delete-store-item-btn').forEach(btn => {
                    btn.addEventListener('click', handleDeleteItem);
                });

                // 🛑 إضافة مُستمعي الأحداث لأزرار التعديل 🛑
                document.querySelectorAll('.edit-item-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const itemId = e.currentTarget.dataset.itemId;
                        const itemName = e.currentTarget.dataset.itemName;
                        const itemPrice = e.currentTarget.dataset.itemPrice;
                        const imageUrl = e.currentTarget.dataset.itemUrl;
                        const itemLevel = e.currentTarget.dataset.itemLevel; // 🛑 جلب المستوى

                        // 🛑 استدعاء دالة التعديل (لفتح النموذج) 🛑
                        handleEditItem(itemId, itemName, itemPrice, imageUrl, itemLevel);
                    });
                });
            } else {
                adminStoreItemsList.innerHTML = `<li style="text-align: center;">لا توجد عناصر مضافة حالياً.</li>`;
            }
        } catch (err) {
            adminStoreItemsList.innerHTML = `<li style="color: red; text-align: center;">خطأ في تحميل العناصر: ${err.message}.</li>`;
            console.error("Admin Store Load Error:", err);
        }
    }

    // --- فانكشن حذف عنصر ---
    async function handleDeleteItem(event) {
        const itemId = event.target.dataset.itemId;
        if (!confirm(`هل أنت متأكد من حذف العنصر ذو ID: ${itemId} نهائياً؟`)) return;

        adminStoreMessage.textContent = "جاري حذف العنصر...";
        adminStoreMessage.style.color = "blue";

        try {
            const response = await fetch(`/admin-delete-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId }),
            });

            const data = await response.json();

            if (response.ok) {
                adminStoreMessage.textContent = `تم حذف العنصر بنجاح.`;
                adminStoreMessage.style.color = "green";
                await loadAdminStoreItems(); // تحديث القائمة بعد الحذف
                await refreshUserData(); // لتحديث واجهة المستخدمين إذا كان مفتوحاً
            } else {
                adminStoreMessage.textContent = `فشل الحذف: ${data.error || "خطأ غير محدد"}`;
                deleteMessage.style.color = "red";
            }
        } catch (err) {
            adminStoreMessage.textContent = "خطأ في الاتصال بالـ API لحذف العنصر.";
            adminStoreMessage.style.color = "red";
            console.error("Delete Item Error:", err);
        }
    }


    // 🛑🛑 فورم التسجيل (Signup) 🛑🛑
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        messageDiv.textContent = "جاري إنشاء الحساب...";
        messageDiv.style.color = "blue";

        const name = document.getElementById("name").value;
        const family = document.getElementById("family").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const avatarFile = document.getElementById("signup-avatar-file").files[0];

        if (!name || !family || !email || !password) {
            messageDiv.textContent = "الرجاء ملء جميع الحقول المطلوبة.";
            messageDiv.style.color = "red";
            return;
        }

        let profile_image_url = DEFAULT_AVATAR_URL;

        try {
            if (avatarFile) {
                messageDiv.textContent = "جاري ضغط ورفع الصورة...";
                const resizedBlob = await resizeImage(avatarFile, 150, 150, 0.7);
                const formData = new FormData();
                formData.append('file', resizedBlob);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData
                });

                if (!cloudinaryResponse.ok) throw new Error("فشل رفع الصورة لـ Cloudinary");

                const cloudinaryData = await cloudinaryResponse.json();
                profile_image_url = cloudinaryData.secure_url;
            }

            messageDiv.textContent = "جاري إرسال بيانات التسجيل...";

            const dataToFunctions = new FormData();
            dataToFunctions.append('name', name);
            dataToFunctions.append('family', family);
            dataToFunctions.append('email', email);
            dataToFunctions.append('password', password);
            dataToFunctions.append('profile_image_url', profile_image_url);

            const response = await fetch(`/signup`, {
                method: "POST",
                body: dataToFunctions,
            });

            const data = await response.json().catch(() => ({ error: 'رد سيرفر غير صالح' }));

            if (response.ok) {
                messageDiv.textContent = "تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.";
                messageDiv.style.color = "green";
                signupForm.reset();
                loginForm.scrollIntoView({ behavior: 'smooth' });
            } else {
                messageDiv.textContent = `فشل التسجيل: ${data.error || "خطأ غير محدد"}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = `حدث خطأ: ${err.message || "فشل غير متوقع."}`;
            messageDiv.style.color = "red";
            console.error("Signup Error:", err);
        }
    });


    // 🛑🛑 زرار تسجيل الخروج (مُصحح ليشمل الزر الجديد) 🛑🛑
    function handleLogout() {
        resetUI();
        loginForm.reset();
        messageDiv.textContent = "تم تسجيل الخروج.";
        messageDiv.style.color = "blue";
    }
    logoutBtn.addEventListener("click", handleLogout);
    logoutBtnGuest.addEventListener("click", handleLogout); // 🛑 ربط الزر الجديد


    // --- كود "تغيير الصورة" ---
    avatarUploadInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file || !loggedInUserProfile) return;
        
        // 🛑 إغلاق مودال الأدمن
        if (closeAdminModal) {
            closeAdminModal.addEventListener('click', () => {
                if (adminModalOverlay) adminModalOverlay.style.display = 'none';
            });
        }

        // إظهار رسالة "جاري الرفع"
        const originalText = userNameP.textContent;
        userNameP.textContent = "جاري رفع الصورة الجديدة...";
        
        try {
            const resizedBlob = await resizeImage(file, 150, 150, 0.7);
            const formData = new FormData();
            formData.append('file', resizedBlob);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryResponse.ok) throw new Error("فشل رفع الصورة لـ Cloudinary");

            const cloudinaryData = await cloudinaryResponse.json();
            const newImageUrl = cloudinaryData.secure_url;

            // الآن، تحديث الرابط في قاعدة البيانات
            const updateResponse = await fetch('/update-profile-image', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loggedInUserProfile.email,
                    image_url: newImageUrl
                })
            });

            if (!updateResponse.ok) throw new Error("فشل تحديث الرابط في قاعدة البيانات");

            const updateData = await updateResponse.json();

            if (updateData.success) {
                userAvatarImg.src = newImageUrl;
                loggedInUserProfile.profile_image_url = newImageUrl;
                userNameP.textContent = originalText; // استعادة النص الأصلي
            } else {
                throw new Error(updateData.error || "خطأ غير معروف من السيرفر");
            }

        } catch (err) {
            console.error("Avatar Upload Error:", err);
            userNameP.textContent = "فشل رفع الصورة. حاول مجدداً.";
            setTimeout(() => {
                userNameP.textContent = originalText; // استعادة النص الأصلي بعد فترة
            }, 3000);
        }
    });

    // 🛑🛑 أكواد الكويز (تمت استعادتها بالكامل) 🛑🛑
    quizOptionButtons.forEach(button => {
        button.addEventListener("click", () => {
            quizOptionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = button.dataset.value;
        });
    });

    quizSubmitBtn.addEventListener("click", async () => {
        if (!selectedOption) {
            quizMessage.textContent = "الرجاء اختيار إجابة أولاً";
            quizMessage.style.color = "red";
            return;
        }

        quizMessage.textContent = "جاري التأكد من الإجابة...";
        quizMessage.style.color = "blue";
        quizSubmitBtn.disabled = true;

        try {
            const response = await fetch(`/submit-quiz-answer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loggedInUserProfile.email,
                    quizId: currentQuizId,
                    selectedOption: selectedOption
                })
            });

            const data = await response.json();

            if (data.success) {
                quizMessage.textContent = data.message;
                quizMessage.style.color = "green";
                await refreshUserData(); // 🛑 تحديث الرصيد والسجل
            } else {
                quizMessage.textContent = data.message;
                quizMessage.style.color = "red";
            }

            setTimeout(() => {
                quizContainer.style.display = "block";
                loadActiveQuiz(loggedInUserProfile.email); // تحميل السؤال التالي
            }, 3000);

        } catch (err) {
            quizMessage.textContent = "حدث خطأ في الاتصال بالـ API.";
            quizMessage.style.color = "red";
            quizSubmitBtn.disabled = false;
        }
    });

    // 🛑 ربط زرار الريفرش 🛑
    refreshDataBtn.addEventListener('click', refreshUserData);
// -----------------------------------------------------
// 🛑🛑🛑 منطق توليد وعرض QR Code (لليوزر) 🛑🛑🛑
// -----------------------------------------------------

if(showQrBtn) {
    showQrBtn.addEventListener('click', () => {
        if (!loggedInUserProfile || !loggedInUserProfile.email) return;

        // 1. تفريغ الحاوية للتوليد الجديد (مهم)
        qrCodeContainer.innerHTML = ''; 

        // 2. المحتوى المشفر
        const qrData = loggedInUserProfile.email;

        // 3. توليد كود QR (ضمان وجود مكتبة QRCode.js)
        // نستخدم setTimeout لضمان أن الـ DOM قد تم عرضه قبل التوليد (حل شائع للمشاكل)
        setTimeout(() => {
            if (typeof QRCode !== 'undefined' && qrCodeContainer) {
                new QRCode(qrCodeContainer, {
                    text: qrData,
                    width: 250,
                    height: 250,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            } else {
                console.error("QRCode library not loaded or container missing.");
            }
        }, 50); // تأخير بسيط جداً

        // 4. عرض الإيميل تحت الكود
        if (qrUserEmailDisplay) qrUserEmailDisplay.textContent = loggedInUserProfile.email;

        // 5. إظهار النافذة
        // 🛑 نستخدم 'flex' لإظهار المودال (الذي تم إخفاؤه في resetUI)
        if (qrModalOverlay) qrModalOverlay.style.display = 'flex';
    });
}

// 6. 🏆 كود ربط زر الإغلاق (X) - يجب أن يظهر مرة واحدة 🏆
if(closeQrBtn) {
    // 🏆🏆 إصلاح عمل زر الإغلاق (X) باستخدام onclick 🏆🏆
    closeQrBtn.onclick = () => {
        if (qrModalOverlay) qrModalOverlay.style.display = 'none';
        if (qrCodeContainer) qrCodeContainer.innerHTML = ''; // تنظيف المحتوى
    };
}


    // 🛑🛑 معالج فورم إضافة عنصر للمتجر (جديد) 🛑🛑
    adminAddItemForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("store-item-name").value.trim();
        const price = parseInt(document.getElementById("store-item-price").value);
        const requiredLevel = parseInt(storeItemRequiredLevel.value);
        const imageFile = storeItemImageFile.files[0];

        if (!name || isNaN(price) || price <= 0 || !imageFile) {
            adminStoreMessage.textContent = "الرجاء ملء الاسم والسعر وإرفاق صورة.";
            adminStoreMessage.style.color = "red";
            return;
        }

        adminStoreMessage.textContent = "جاري رفع الصورة وإضافة العنصر...";
        adminStoreMessage.style.color = "blue";

        let imageUrl = null;
        try {
            // 1. رفع الصورة إلى Cloudinary
            const resizedBlob = await resizeImage(imageFile, 400, 400, 0.8);
            const formData = new FormData();
            formData.append('file', resizedBlob);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryResponse.ok) throw new Error("فشل رفع الصورة لـ Cloudinary");

            const cloudinaryData = await cloudinaryResponse.json();
            imageUrl = cloudinaryData.secure_url;

            // 2. إرسال بيانات العنصر إلى الـ API
            const response = await fetch(`/admin-add-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    required_level: requiredLevel,
                    image_url: imageUrl,
                    adminEmail: loggedInUserProfile.email 
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                adminStoreMessage.textContent = `تم إضافة العنصر (${name}) بنجاح.`;
                adminStoreMessage.style.color = "green";
                adminAddItemForm.reset();
                await loadAdminStoreItems(); // تحديث القائمة
            } else {
                adminStoreMessage.textContent = `فشل الإضافة: ${data.error || "خطأ غير محدد"}`;
                adminStoreMessage.style.color = "red";
            }
        } catch (err) {
            adminStoreMessage.textContent = `خطأ: ${err.message || "فشل غير متوقع أثناء الإضافة."}`;
            adminStoreMessage.style.color = "red";
            console.error("Add Item Error:", err);
        }
    });

    // -----------------------------------------------------
    // 🛑🛑🛑 منطق لوحة الأدمن (البحث، التعديل، التحكم) 🛑🛑🛑
    // -----------------------------------------------------

    // --- بحث المستخدم ---
    adminSearchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = adminSearchInput.value.trim();
        if (!name) return;

        adminSearchMessage.textContent = "جاري البحث...";
        adminSearchMessage.style.color = "blue";
        adminResultsListDiv.style.display = "none";
        searchedUserCard.style.display = "none";
        adminSelectUser.innerHTML = "";
        currentSearchResults = [];

        try {
            const response = await fetch(`/admin-search-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();

            if (response.ok && data.users && data.users.length > 0) {
                currentSearchResults = data.users;
                adminSearchMessage.textContent = `تم العثور على ${data.users.length} مستخدم.`;
                adminSearchMessage.style.color = "green";
                
                // ملء قائمة الاختيار
                adminSelectUser.innerHTML = '<option value="" disabled selected>-- اختر مستخدماً --</option>';
                data.users.forEach((user, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.textContent = `${user.name} (${user.email}) - ${user.family}`;
                    adminSelectUser.appendChild(option);
                });
                adminResultsListDiv.style.display = "block";
            } else {
                adminSearchMessage.textContent = `لم يتم العثور على مستخدم بالاسم "${name}".`;
                adminSearchMessage.style.color = "orange";
            }
        } catch (err) {
            adminSearchMessage.textContent = "حدث خطأ في البحث.";
            adminSearchMessage.style.color = "red";
            console.error("Admin Search Error:", err);
        }
    });

    // --- عرض بيانات المستخدم المختار ---
    adminSelectUser.addEventListener("change", (event) => {
        const index = event.target.value;
        if (index === "") {
            searchedUserCard.style.display = "none";
            currentSearchedUser = null;
            return;
        }

        const user = currentSearchResults[index];
        currentSearchedUser = user;

        searchedUserName.textContent = user.name;
        searchedUserFamily.textContent = user.family;
        searchedUserBalance.textContent = `$${user.balance}`;
        searchedUserLevel.textContent = user.level || 1; 

        searchedUserCard.style.display = "block";
        balanceMessage.textContent = "";
        adminLevelMessage.textContent = ""; 
        deleteMessage.textContent = ""; 

        // 🛑 عرض الـ QR الخاص بالمستخدم المختار
        adminShowUserQrBtn.onclick = () => {
            if (currentSearchedUser && qrModalOverlay) {
                // نفس منطق عرض الـ QR لليوزر العادي
                qrCodeContainer.innerHTML = '';
                const qrData = currentSearchedUser.email;
                setTimeout(() => {
                    if (typeof QRCode !== 'undefined' && qrCodeContainer) {
                        new QRCode(qrCodeContainer, {
                            text: qrData,
                            width: 250,
                            height: 250,
                            colorDark : "#000000",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        });
                        qrUserEmailDisplay.textContent = currentSearchedUser.email;
                        qrModalOverlay.style.display = 'flex';
                    }
                }, 50);
            }
        };
    });

    // --- تحديث الرصيد (إضافة/خصم) ---
    async function updateBalance(amount, type) {
        if (!currentSearchedUser) return;
        const reason = prompt(`الرجاء إدخال سبب ${type === 'add' ? 'الإضافة' : 'الخصم'} (${amount} نقطة):`);
        if (!reason) return;

        balanceMessage.textContent = "جاري تحديث الرصيد...";
        balanceMessage.style.color = "blue";
        
        try {
            const response = await fetch(`/admin-update-balance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: currentSearchedUser.email,
                    amount: type === 'add' ? amount : -amount,
                    reason: reason,
                    adminEmail: loggedInUserProfile.email
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                balanceMessage.textContent = `تم التحديث بنجاح. الرصيد الجديد: $${data.user.balance}`;
                balanceMessage.style.color = "green";
                searchedUserBalance.textContent = `$${data.user.balance}`;
                currentSearchedUser.balance = data.user.balance;
                await loadTransactionHistory(currentSearchedUser.email);
            } else {
                balanceMessage.textContent = `فشل التحديث: ${data.error || "خطأ غير محدد"}`;
                balanceMessage.style.color = "red";
            }
        } catch (err) {
            balanceMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
            balanceMessage.style.color = "red";
            console.error("Update Balance Error:", err);
        }
    }

    addBalanceBtn.addEventListener("click", () => {
        const amount = parseInt(balanceAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            balanceMessage.textContent = "الرجاء إدخال كمية صحيحة موجبة.";
            balanceMessage.style.color = "red";
            return;
        }
        updateBalance(amount, 'add');
    });

    subtractBalanceBtn.addEventListener("click", () => {
        const amount = parseInt(balanceAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            balanceMessage.textContent = "الرجاء إدخال كمية صحيحة موجبة.";
            balanceMessage.style.color = "red";
            return;
        }
        updateBalance(amount, 'subtract');
    });

    // --- تحديث المستوى ---
    adminUpdateLevelBtn.addEventListener("click", async () => {
        if (!currentSearchedUser) return;
        const newLevel = parseInt(adminLevelAmount.value);
        if (isNaN(newLevel) || newLevel < 1) {
            adminLevelMessage.textContent = "الرجاء إدخال مستوى صحيح (1 أو أعلى).";
            adminLevelMessage.style.color = "red";
            return;
        }

        adminLevelMessage.textContent = "جاري تحديث المستوى...";
        adminLevelMessage.style.color = "blue";

        try {
            const response = await fetch(`/admin-update-level`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: currentSearchedUser.email,
                    level: newLevel,
                    adminEmail: loggedInUserProfile.email
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                adminLevelMessage.textContent = `تم تحديث المستوى بنجاح. المستوى الجديد: ${data.user.level}`;
                adminLevelMessage.style.color = "green";
                searchedUserLevel.textContent = data.user.level;
                currentSearchedUser.level = data.user.level;
            } else {
                adminLevelMessage.textContent = `فشل التحديث: ${data.error || "خطأ غير محدد"}`;
                adminLevelMessage.style.color = "red";
            }
        } catch (err) {
            adminLevelMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
            adminLevelMessage.style.color = "red";
            console.error("Update Level Error:", err);
        }
    });

    // --- حذف المستخدم ---
    deleteUserBtn.addEventListener("click", async () => {
        if (!currentSearchedUser) return;
        if (!confirm(`هل أنت متأكد من حذف المستخدم ${currentSearchedUser.name} نهائياً؟ لا يمكن التراجع عن هذا الإجراء.`)) return;

        deleteMessage.textContent = "جاري الحذف...";
        deleteMessage.style.color = "blue";

        try {
            const response = await fetch(`/admin-delete-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: currentSearchedUser.email }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                deleteMessage.textContent = `تم حذف المستخدم ${currentSearchedUser.name} بنجاح.`;
                deleteMessage.style.color = "green";
                searchedUserCard.style.display = "none";
                currentSearchedUser = null;
                adminSelectUser.innerHTML = ""; // إفراغ القائمة
                adminResultsListDiv.style.display = "none";
            } else {
                deleteMessage.textContent = `فشل الحذف: ${data.error || "خطأ غير محدد"}`;
                deleteMessage.style.color = "red";
            }
        } catch (err) {
            deleteMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
            deleteMessage.style.color = "red";
            console.error("Delete User Error:", err);
        }
    });

    // --- عرض قائمة عائلة معينة ---
    familyButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const family = event.target.dataset.family;
            adminFamilyResultsDiv.innerHTML = "جاري التحميل...";
            adminFamilyMessage.textContent = "";
            massUpdateControls.style.display = "none";
            selectedUsersForMassUpdate = [];
            selectedUsersCount.textContent = "0";

            try {
                const response = await fetch(`/admin-get-family`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ family }),
                });
                const data = await response.json();

                if (response.ok && data.users) {
                    adminFamilyMessage.textContent = `عرض مستخدمي: ${family} (${data.users.length} مستخدم)`;
                    adminFamilyMessage.style.color = "blue";
                    adminFamilyResultsDiv.innerHTML = `<ul id="family-user-list"></ul>`;
                    const ul = document.getElementById("family-user-list");

                    data.users.forEach(user => {
                        const li = document.createElement("li");
                        li.className = "family-user-item";
                        li.innerHTML = `
                            <input type="checkbox" data-email="${user.email}" data-name="${user.name}">
                            <span>${user.name}</span>
                            <strong>($${user.balance})</strong>
                        `;
                        ul.appendChild(li);
                    });

                    // إضافة معالج لعمليات التحديد
                    ul.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                        checkbox.addEventListener('change', (e) => {
                            const email = e.target.dataset.email;
                            const name = e.target.dataset.name;
                            if (e.target.checked) {
                                selectedUsersForMassUpdate.push({ email, name });
                            } else {
                                selectedUsersForMassUpdate = selectedUsersForMassUpdate.filter(u => u.email !== email);
                            }
                            selectedUsersCount.textContent = selectedUsersForMassUpdate.length;
                            massUpdateControls.style.display = selectedUsersForMassUpdate.length > 0 ? "block" : "none";
                        });
                    });

                } else {
                    adminFamilyMessage.textContent = `فشل جلب بيانات العائلة: ${data.error || "خطأ غير محدد"}`;
                    adminFamilyMessage.style.color = "red";
                    adminFamilyResultsDiv.innerHTML = "";
                }
            } catch (err) {
                adminFamilyMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
                adminFamilyMessage.style.color = "red";
                adminFamilyResultsDiv.innerHTML = "";
                console.error("Admin Get Family Error:", err);
            }
        });
    });

    // --- تحديث الرصيد الجماعي ---
    async function massUpdateBalance(type) {
        if (selectedUsersForMassUpdate.length === 0) return;
        const amount = parseInt(massUpdateAmount.value);
        if (isNaN(amount) || amount === 0) {
            massUpdateMessage.textContent = "الرجاء إدخال كمية صحيحة (موجبة أو سالبة).";
            massUpdateMessage.style.color = "red";
            return;
        }

        const reason = prompt(`الرجاء إدخال سبب التعديل الجماعي (${selectedUsersForMassUpdate.length} مستخدم):`);
        if (!reason) return;

        massUpdateMessage.textContent = `جاري تعديل رصيد ${selectedUsersForMassUpdate.length} مستخدم...`;
        massUpdateMessage.style.color = "blue";

        const finalAmount = type === 'add' ? amount : -amount;
        const emails = selectedUsersForMassUpdate.map(u => u.email);

        try {
            const response = await fetch(`/admin-mass-update-balance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emails: emails,
                    amount: finalAmount,
                    reason: reason,
                    adminEmail: loggedInUserProfile.email
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                massUpdateMessage.textContent = `تم تعديل رصيد ${data.successful_updates} مستخدم بنجاح. (${data.failed_updates} فشل)`;
                massUpdateMessage.style.color = "green";
                massUpdateAmount.value = "";
                
                // إعادة تحميل القائمة بعد 3 ثوانٍ
                setTimeout(() => {
                    const lastFamilyButton = document.querySelector(`.family-btn[data-family="${currentSearchedUser ? currentSearchedUser.family : ''}"]`);
                    if (lastFamilyButton) lastFamilyButton.click();
                    else loadLeaderboards(); // تحديث لوحة الصدارة إذا لم يتم اختيار عائلة
                }, 3000);
            } else {
                massUpdateMessage.textContent = `فشل التحديث الجماعي: ${data.error || "خطأ غير محدد"}`;
                massUpdateMessage.style.color = "red";
            }
        } catch (err) {
            massUpdateMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
            massUpdateMessage.style.color = "red";
            console.error("Mass Update Error:", err);
        }
    }

    massUpdateAddBtn.addEventListener("click", () => massUpdateBalance('add'));
    massUpdateSubtractBtn.addEventListener("click", () => massUpdateBalance('subtract'));


    // --- 🛑🛑 منطق المسح الجماعي QR (Admin Scan) 🛑🛑 ---
    startScanBtn.addEventListener('click', async () => {
        if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            
            // طلب إذن الكاميرا وتحديد الكاميرا الأمامية/الخلفية
            Html5Qrcode.getCameras().then(devices => {
                if (devices && devices.length) {
                    // اختيار الكاميرا الخلفية (غالباً ما تكون الأخيرة)
                    const cameraId = devices[devices.length - 1].id;
                    
                    html5QrCode.start(
                        cameraId, 
                        config, 
                        (decodedText) => {
                            handleScanSuccess(decodedText);
                        },
                        (errorMessage) => {
                            // يتم استدعاؤها بشكل مستمر ولا تحتاج إلى إظهارها
                        }
                    )
                    .then(() => {
                        scanStatusMessage.textContent = "الكاميرا قيد التشغيل. ابدأ المسح...";
                        scanStatusMessage.style.color = "green";
                        startScanBtn.textContent = "إيقاف المسح";
                        startScanBtn.style.backgroundColor = "#dc3545";
                        scannedListContainer.style.display = "block";
                        batchAddPointsBtn.style.display = "block";
                    })
                    .catch(err => {
                        scanStatusMessage.textContent = `خطأ في تشغيل الكاميرا: ${err}`;
                        scanStatusMessage.style.color = "red";
                        html5QrCode = null;
                    });
                } else {
                    scanStatusMessage.textContent = "لم يتم العثور على كاميرا.";
                    scanStatusMessage.style.color = "red";
                    html5QrCode = null;
                }
            }).catch(err => {
                scanStatusMessage.textContent = "خطأ في الوصول إلى الكاميرات. تأكد من إعطاء الإذن.";
                scanStatusMessage.style.color = "red";
                html5QrCode = null;
            });
        } else {
            // إيقاف الماسح
            try {
                await html5QrCode.stop();
            } catch(e) {
                console.warn("Scanner stop failed:", e);
            }
            html5QrCode = null;
            scanStatusMessage.textContent = "تم إيقاف الماسح.";
            scanStatusMessage.style.color = "blue";
            startScanBtn.textContent = "تشغيل الكاميرا والمسح";
            startScanBtn.style.backgroundColor = "#f472b6";
            
        }
    });

    async function handleScanSuccess(email) {
        // التحقق من تكرار الإيميل في الجلسة الحالية
        if (scannedBatch.find(u => u.email === email)) {
            scanStatusMessage.textContent = `تم مسح الإيميل ${email} مسبقاً في هذه الجلسة.`;
            scanStatusMessage.style.color = "orange";
            return;
        }

        // جلب بيانات المستخدم للتأكد من وجوده وعرض اسمه
        try {
            const response = await fetch(`/get-user-profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok && data.user) {
                const user = data.user;
                scannedBatch.push({ email: user.email, name: user.name });

                const li = document.createElement("li");
                li.innerHTML = `✅ ${user.name} (${user.email})`;
                scannedUsersList.appendChild(li);

                scanStatusMessage.textContent = `تم مسح ${user.name}. (الإجمالي: ${scannedBatch.length})`;
                scanStatusMessage.style.color = "green";

            } else {
                scanStatusMessage.textContent = `فشل مسح: لم يتم العثور على مستخدم لهذا الإيميل: ${email}`;
                scanStatusMessage.style.color = "red";
            }
        } catch (e) {
            scanStatusMessage.textContent = `خطأ في الاتصال بالخادم عند المسح.`;
            scanStatusMessage.style.color = "red";
            console.error("Scan API Error:", e);
        }
    }

    // --- إضافة النقاط المجمعة (Batch Add) ---
    batchAddPointsBtn.addEventListener('click', async () => {
        if (scannedBatch.length === 0) {
            scanStatusMessage.textContent = "الرجاء مسح بعض الأكواد أولاً.";
            scanStatusMessage.style.color = "orange";
            return;
        }

        if (!confirm(`هل أنت متأكد من إضافة نقاط لـ ${scannedBatch.length} مستخدم؟`)) return;

        const [amountStr, reason] = rewardReasonSelect.value.split(':');
        const amount = parseInt(amountStr);
        const emails = scannedBatch.map(u => u.email);

        scanStatusMessage.textContent = `جاري إضافة نقاط ${amount} لـ ${scannedBatch.length} مستخدم بسبب: ${reason}...`;
        scanStatusMessage.style.color = "blue";
        batchAddPointsBtn.disabled = true;

        try {
            const response = await fetch(`/admin-mass-update-balance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emails: emails,
                    amount: amount,
                    reason: reason,
                    adminEmail: loggedInUserProfile.email
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                scanStatusMessage.textContent = `✅ تم إضافة نقاط لـ ${data.successful_updates} مستخدم بنجاح.`;
                scanStatusMessage.style.color = "green";

                // إعادة تعيين القائمة
                scannedBatch = [];
                scannedUsersList.innerHTML = "";
                scannedListContainer.style.display = "none";
                batchAddPointsBtn.style.display = "none";

            } else {
                scanStatusMessage.textContent = `فشل الإضافة: ${data.error || "خطأ غير محدد"}`;
                scanStatusMessage.style.color = "red";
            }
        } catch (e) {
            scanStatusMessage.textContent = "خطأ في الاتصال بالشبكة أثناء إضافة النقاط.";
            scanStatusMessage.style.color = "red";
            console.error("Batch Add Error:", e);
        } finally {
            batchAddPointsBtn.disabled = false;
        }
    });

    // --- 🛑🛑 منطق طباعة أكواد QR (Admin Print) 🛑🛑 ---

    // 1. جلب القائمة
    fetchQrListBtn.addEventListener('click', async () => {
        qrListMessage.textContent = "جاري جلب قائمة المستخدمين...";
        qrListMessage.style.color = "blue";
        qrListResults.style.display = "none";
        printableCardsContainer.innerHTML = "";
        generatePrintCardsBtn.style.display = "none";
        downloadCardsAsImageBtn.style.display = "none";

        try {
            const response = await fetch(`/admin-get-all-users-for-qr`, { method: "POST" });
            const data = await response.json();

            if (response.ok && data.users && data.users.length > 0) {
                const listText = data.users.map(u => `${u.name} | ${u.family} | ${u.email}`).join('\n');
                qrListResults.value = listText;
                qrListResults.style.display = "block";
                qrListMessage.textContent = `تم جلب ${data.users.length} مستخدم. اضغط "توليد الكروت".`;
                qrListMessage.style.color = "green";
                generatePrintCardsBtn.style.display = "block";
            } else {
                qrListMessage.textContent = `لم يتم العثور على مستخدمين للطباعة.`;
                qrListMessage.style.color = "orange";
            }
        } catch (e) {
            qrListMessage.textContent = "خطأ في جلب القائمة من الخادم.";
            qrListMessage.style.color = "red";
            console.error("Fetch QR List Error:", e);
        }
    });

    // 2. توليد الكروت (QR Codes)
    generatePrintCardsBtn.addEventListener('click', () => {
        const userList = qrListResults.value.trim().split('\n').filter(line => line);
        if (userList.length === 0) {
            qrListMessage.textContent = "الرجاء جلب القائمة أولاً.";
            qrListMessage.style.color = "orange";
            return;
        }

        qrListMessage.textContent = `جاري توليد ${userList.length} كرت...`;
        qrListMessage.style.color = "blue";
        printableCardsContainer.innerHTML = "";
        downloadCardsAsImageBtn.style.display = "none";

        // تأجيل التوليد قليلاً لضمان عرض الرسالة
        setTimeout(() => {
            try {
                userList.forEach(line => {
                    const parts = line.split(' | ');
                    if (parts.length < 3) return;

                    const name = parts[0].trim();
                    const family = parts[1].trim();
                    const email = parts[2].trim();
                    const qrData = email;

                    const card = document.createElement('div');
                    card.className = 'print-qr-card'; // كلاس للتنسيق في CSS
                    const qrDivId = `qr-print-${email.replace(/[^a-zA-Z0-9]/g, '')}`;
                    
                    card.innerHTML = `
                        <div class="qr-info-text">
                            <h4 style="margin: 0;">${name}</h4>
                            <p style="margin: 5px 0 10px;">أسرة: ${family}</p>
                        </div>
                        <div id="${qrDivId}" class="qr-code-print-area"></div>
                    `;
                    printableCardsContainer.appendChild(card);

                    // توليد QR Code داخل العنصر المخصص
                    if (typeof QRCode !== 'undefined') {
                        new QRCode(document.getElementById(qrDivId), {
                            text: qrData,
                            width: 150,
                            height: 150,
                            colorDark : "#000000",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        });
                    }
                });

                qrListMessage.textContent = `تم توليد ${userList.length} كرت بنجاح. يمكنك الآن الطباعة أو التحميل.`;
                qrListMessage.style.color = "green";
                downloadCardsAsImageBtn.style.display = "block";
                
            } catch (e) {
                qrListMessage.textContent = "خطأ أثناء توليد الأكواد.";
                qrListMessage.style.color = "red";
                console.error("QR Generation Error:", e);
            }
        }, 100);
    });

    // 3. تحميل كصورة (PNG)
    downloadCardsAsImageBtn.addEventListener('click', () => {
        if (printableCardsContainer.children.length === 0) {
            qrListMessage.textContent = "الرجاء توليد الكروت أولاً.";
            qrListMessage.style.color = "orange";
            return;
        }

        qrListMessage.textContent = "جاري تحويل الكروت إلى صورة (قد يستغرق وقتاً)...";
        qrListMessage.style.color = "blue";

        // استخدام html2canvas لتحويل الحاوية بالكامل إلى صورة
        html2canvas(printableCardsContainer, {
            scale: 2, // لزيادة الجودة
            useCORS: true 
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'Taklopoly_QR_Codes.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            qrListMessage.textContent = "تم تحميل الكروت بنجاح.";
            qrListMessage.style.color = "green";
        }).catch(err => {
            qrListMessage.textContent = "فشل التحميل كصورة. (تأكد أن كل الموارد قد حملت).";
            qrListMessage.style.color = "red";
            console.error("Download Image Error:", err);
        });
    });

    // --- 🛑🛑 منطق التحكم في الإعلانات (Admin Announcement) 🛑🛑 ---
    adminAnnouncementForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const tickerText = adminTickerText.value.trim();
        const announcementText = adminAnnouncementText.value.trim();

        if (!tickerText && !announcementText) {
            adminAnnouncementMessage.textContent = "الرجاء إدخال نص واحد على الأقل.";
            adminAnnouncementMessage.style.color = "orange";
            return;
        }

        adminAnnouncementMessage.textContent = "جاري النشر...";
        adminAnnouncementMessage.style.color = "blue";

        try {
            const response = await fetch(`/admin-post-announcement`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ticker_message: tickerText,
                    message: announcementText,
                    adminEmail: loggedInUserProfile.email 
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                adminAnnouncementMessage.textContent = "تم نشر الإعلانات بنجاح!";
                adminAnnouncementMessage.style.color = "green";
                await loadAnnouncements(); // تحديث شريط الأخبار والإعلان فوراً
            } else {
                adminAnnouncementMessage.textContent = `فشل النشر: ${data.error || "خطأ غير محدد"}`;
                adminAnnouncementMessage.style.color = "red";
            }
        } catch (e) {
            adminAnnouncementMessage.textContent = "خطأ في الاتصال بالشبكة.";
            adminAnnouncementMessage.style.color = "red";
        }
    });

    // --- 🛑🛑 منطق إضافة سؤال (Admin Quiz) 🛑🛑 ---
    adminQuizForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const question_text = document.getElementById("quiz-question").value.trim();
        const option_a = document.getElementById("quiz-opt-a").value.trim();
        const option_b = document.getElementById("quiz-opt-b").value.trim();
        const option_c = document.getElementById("quiz-opt-c").value.trim();
        const correct_option = document.getElementById("quiz-correct-opt").value;
        const points = parseInt(document.getElementById("quiz-points").value);

        if (!question_text || !option_a || !option_b || !option_c || !correct_option || isNaN(points) || points <= 0) {
            adminQuizMessage.textContent = "الرجاء ملء جميع الحقول بشكل صحيح.";
            adminQuizMessage.style.color = "red";
            return;
        }

        adminQuizMessage.textContent = "جاري إضافة السؤال...";
        adminQuizMessage.style.color = "blue";

        try {
            const response = await fetch(`/admin-add-quiz`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question_text,
                    option_a,
                    option_b,
                    option_c,
                    correct_option,
                    points,
                    adminEmail: loggedInUserProfile.email
                }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                adminQuizMessage.textContent = "تم إضافة السؤال وتفعيله بنجاح!";
                adminQuizMessage.style.color = "green";
                adminQuizForm.reset();
            } else {
                adminQuizMessage.textContent = `فشل الإضافة: ${data.error || "خطأ غير محدد"}`;
                adminQuizMessage.style.color = "red";
            }
        } catch (e) {
            adminQuizMessage.textContent = "خطأ في الاتصال بالشبكة.";
            adminQuizMessage.style.color = "red";
        }
    });

    // --- 🛑🛑 منطق واجهة الزائر (Guest View) 🛑🛑 ---

    // جلب قائمة المستخدمين لعائلة معينة
    guestFamilyButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const family = event.target.dataset.family;
            guestResultsList.innerHTML = "<li>جاري التحميل...</li>";
            guestMessage.textContent = `قائمة مستخدمي: ${family}`;

            try {
                const response = await fetch(`/admin-get-family`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ family }),
                });
                const data = await response.json();

                if (response.ok && data.users) {
                    guestResultsList.innerHTML = "";
                    data.users.sort((a, b) => b.balance - a.balance).forEach((user, index) => {
                        const li = document.createElement("li");
                        li.className = "guest-user-item";
                        li.innerHTML = `
                            <span>${index + 1}. ${user.name}</span>
                            <strong>$${user.balance}</strong>
                        `;
                        // إضافة معالج لفتح تفاصيل الحضور
                        li.addEventListener('click', () => openGuestDetails(user));
                        guestResultsList.appendChild(li);
                    });
                } else {
                    guestMessage.textContent = `فشل جلب البيانات: ${data.error || "خطأ غير محدد"}`;
                    guestMessage.style.color = "red";
                    guestResultsList.innerHTML = "";
                }
            } catch (err) {
                guestMessage.textContent = "حدث خطأ في الاتصال بالشبكة.";
                guestMessage.style.color = "red";
                guestResultsList.innerHTML = "";
                console.error("Guest Get Family Error:", err);
            }
        });
    });

    // 🛑 تشغيل دالة loadLeaderboards مباشرة عند التحميل لأي مستخدم (بما أن الزائر يراها أيضاً)
    loadLeaderboards(); 
});
