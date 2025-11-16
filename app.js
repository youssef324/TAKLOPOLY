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
    
    // عناصر الجيست (الزائر)
    const guestContainer = document.getElementById("guest-container");
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");
    const guestDetailsModal = document.getElementById("guest-details-modal"); 
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");
    const guestStatsContent = document.getElementById("guest-stats-content"); // 🛑 تم تصحيح ID هنا

    // عناصر المتجر والمشتريات
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");
    const backToStoreBtn = document.getElementById("back-to-store-btn");

    // عناصر الكويز ولوحة الصدارة
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

    // عناصر QR Code (لليوزر)
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");

    // عناصر الإعلانات (لليوزر)
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const tickerTextDisplay = document.getElementById("news-ticker"); // 🛑 تم تصحيح ID الشريط الإخباري

    // عناصر لوحة الأدمن (الأزرار والقوائم)
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminMenu = document.getElementById('admin-main-menu');
    const adminViews = document.querySelectorAll('.admin-section-view');
    const menuButtons = document.querySelectorAll('.admin-menu-btn');
    const closeSectionButtons = document.querySelectorAll('.close-section-btn');

    // عناصر وظائف الأدمن (البحث، التعديل، الحذف)
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
    const adminShowUserQrBtn = document.getElementById("admin-show-user-qr-btn");

    // عناصر وظائف الأدمن (الأسر، السكان، الطباعة، الكويز، الإعلانات، المتجر)
    const familyButtons = document.querySelectorAll(".family-btn");
    const adminFamilyResultsDiv = document.getElementById("admin-family-results");
    const adminFamilyMessage = document.getElementById("admin-family-message");
    const massUpdateControls = document.getElementById("mass-update-controls");
    const selectedUsersCount = document.getElementById("selected-users-count");
    const massUpdateAmount = document.getElementById("mass-update-amount");
    const massUpdateAddBtn = document.getElementById("mass-update-add-btn");
    const massUpdateSubtractBtn = document.getElementById("mass-update-subtract-btn");
    const massUpdateMessage = document.getElementById("mass-update-message");
    
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    const scannedBatchListContainer = document.getElementById("scanned-list-container");
    const scanBatchCount = document.getElementById("scan-batch-count");
    const scannedBatchList = document.getElementById("scanned-users-list");
    const submitScanBatchBtn = document.getElementById("batch-add-points-btn");
    const scanBatchMessage = document.getElementById("scan-batch-message");

    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results");
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn");
    const printableCardsContainer = document.getElementById("admin-printable-cards-container");
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn");

    const adminQuizForm = document.getElementById("admin-quiz-form");
    const adminQuizMessage = document.getElementById("admin-quiz-message");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");
    
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminStoreMessage = document.getElementById("admin-store-message");
    const storeItemImageFile = document.getElementById("store-item-image-file");
    const storeItemRequiredLevel = document.getElementById("store-item-required-level");

    // عناصر التعديل (Modal)
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


    // متغيرات عامة
    let loggedInUserProfile = null;
    let currentSearchResults = [];
    let currentSearchedUser = null;
    let currentQuizId = null;
    let selectedOption = null;
    let html5QrCode = null;
    let scannedUsersBatch = [];
    
    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


    // -----------------------------------------------------
    // 2. دوال إعادة الضبط (Reset UI) & دوال وهمية (STUB)
    // -----------------------------------------------------
    
    // 🛑 الدوال الوهمية لضمان عدم انهيار الكود (يجب تعبئتها بمنطق API حقيقي)
    async function loadLeaderboards() { if(leaderboardContainer) leaderboardContainer.style.display = 'block'; console.log("Loading Leaderboards (STUB)"); }
    async function loadActiveQuiz(email) { if(quizContainer) quizContainer.style.display = 'block'; console.log("Loading Quiz (STUB)"); }
    async function loadStoreItems() { if(storeContainer) storeContainer.style.display = 'block'; console.log("Loading Store (STUB)"); }
    async function loadTransactionHistory(email) { if(transactionList) transactionList.innerHTML = '<li>سجل المعاملات (STUB)</li>'; console.log("Loading Transactions (STUB)"); }
    async function refreshUserData() { console.log("Refreshing User Data (STUB)"); }
    async function loadUserUnlockedItems() { console.log("Loading Unlocked Items (STUB)"); }
    async function loadAdminStoreItems() { console.log("Loading Admin Store (STUB)"); }
    function handleBuyItem() { console.log("Handle Buy Item (STUB)"); }
    function handleDeleteItem() { console.log("Handle Delete Item (STUB)"); }
    function handleEditItem() { console.log("Handle Edit Item (STUB)"); }
    
    // ... (بقية دوال resetUI و resizeImage) ...
    const resetUI = () => {
        if(cardContainer) cardContainer.style.display = "none";
        if(formContainer) formContainer.style.display = "flex";
        if(logoutBtn) logoutBtn.style.display = "none";
        if(logoutBtnGuest) logoutBtnGuest.style.display = "none";
        if(guestContainer) guestContainer.style.display = "none";
        if(refreshDataBtn) refreshDataBtn.style.display = "none";
        if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
        if(showQrBtn) showQrBtn.style.display = "none";
        if(adminPanelDiv) adminPanelDiv.style.display = "none";
        if(leaderboardContainer) leaderboardContainer.style.display = "none";
        if(quizContainer) quizContainer.style.display = "none";
        if(storeContainer) storeContainer.style.display = "none";
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
        if(avatarOverlayLabel) avatarOverlayLabel.style.display = "none";
        if(massUpdateControls) massUpdateControls.style.display = "none";
        if(userAnnouncementBox) userAnnouncementBox.style.display = "none";
        
        loggedInUserProfile = null;
        if(transactionList) transactionList.innerHTML = "";
        if(userLevelP) userLevelP.textContent = "";
        
        if(editModalOverlay) editModalOverlay.style.display = "none";
        if(qrModalOverlay) qrModalOverlay.style.display = "none";
        if(guestDetailsModal) guestDetailsModal.style.display = "none";
        
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().then(() => { html5QrCode = null; }).catch(err => { html5QrCode = null; });
        } else {
            html5QrCode = null;
        }

        if(scannedBatchListContainer) scannedBatchListContainer.style.display = "none";
        scannedUsersBatch = [];
        if(scannedBatchList) scannedBatchList.innerHTML = "";
        if(scanBatchCount) scanBatchCount.textContent = "0";
        
        // إعادة واجهة الأدمن الافتراضية
        if(adminMenu) adminMenu.style.display = 'grid';
        if(adminViews) adminViews.forEach(view => view.style.display = 'none');
        
        // إعادة تعيين محتوى شريط الأخبار الافتراضي
        if (tickerTextDisplay) tickerTextDisplay.textContent = "أهلاً بكم في TAKLOPOLY! ...";
    };
    
    function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width; let height = img.height;
                    if (width > height) {
                        if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
                    } else {
                        if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
                    }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => { resolve(blob); }, 'image/jpeg', quality);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    // تنفيذ إعادة الضبط عند بدء التشغيل
    resetUI();


    // -----------------------------------------------------
    // 3. الدوال المساعدة العامة (تابع)
    // -----------------------------------------------------
    function hideUserSections() {
        if(leaderboardContainer) leaderboardContainer.style.display = "none";
        if(quizContainer) quizContainer.style.display = "none";
        if(storeContainer) storeContainer.style.display = "none";
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
    }
    
    // 🛑 دالة الإعلانات (المفصولة نهائياً)
    async function loadAnnouncement() {
        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await response.json();
            
            // 1. الإعلان الثابت (الصندوق)
            if (data.message && data.message.trim()) {
                if(userAnnouncementText) userAnnouncementText.textContent = data.message;
                if(userAnnouncementBox) userAnnouncementBox.style.display = "block";
            } else {
                if(userAnnouncementBox) userAnnouncementBox.style.display = "none";
            }

            // 2. شريط الأخبار (المتحرك) - مستقل تماماً
            if (tickerTextDisplay) {
                const rawTicker = data.ticker_message || "";
                const tickerContainer = document.querySelector('.news-ticker-container');
                if(rawTicker) {
                    // إضافة فاصلة خاصة (نجمة أو نقطة)
                    tickerTextDisplay.innerHTML = rawTicker.replace(/\|/g, '<span style="margin:0 20px; color:#b22222">✦</span>');
                    
                    if(tickerContainer) tickerContainer.style.display = 'flex';
                    
                    // إعادة تشغيل الأنيميشن
                    const tickerMove = document.querySelector('.ticker-move');
                    if(tickerMove) {
                        // تعديل مدة الأنيميشن حسب طول النص لسرعة ثابتة
                        const duration = Math.max(10, rawTicker.length / 5); 
                        tickerMove.style.animation = `ticker-scroll ${duration}s linear infinite`;
                    }
                } else {
                    if(tickerContainer) tickerContainer.style.display = 'none';
                    tickerTextDisplay.textContent = "أهلاً بكم في TAKLOPOLY! ..."; // نص افتراضي
                }
            }
            
            // ملء حقول الأدمن
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                if (adminAnnouncementText) adminAnnouncementText.value = data.message || "";
                if (adminTickerText) adminTickerText.value = data.ticker_message || "";
            }

        } catch(e) { console.error("Announcement Load Error:", e); }
    }


    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login)
    // -----------------------------------------------------
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = "جاري تسجيل الدخول...";
        messageDiv.style.color = "blue";
        
        if(adminPanelDiv) adminPanelDiv.style.display = "none";
        hideUserSections();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`/login`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = "تم الدخول بنجاح!";
                messageDiv.style.color = "green";
                const user = data.user;
                loggedInUserProfile = user;

                // التوجيه حسب الدور
                if (user.role === 'admin') {
                    adminPanelDiv.style.display = "block";
                    cardContainer.style.display = "flex";
                    if(avatarOverlayLabel) avatarOverlayLabel.style.display = "flex";
                    updateUserCardUI(user);
                    
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    
                    await loadAdminStoreItems(); 
                    
                } else if (user.role === 'guest') {
                    guestContainer.style.display = "block";
                    logoutBtnGuest.style.display = "block";
                    
                    cardContainer.style.display = "none";
                    formContainer.style.display = "none";
                    
                } else {
                    cardContainer.style.display = "flex";
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    if(avatarOverlayLabel) avatarOverlayLabel.style.display = "flex";
                    
                    updateUserCardUI(user);

                    if(unlockedItemsBtn) unlockedItemsBtn.style.display = "block";
                    if(showQrBtn) showQrBtn.style.display = "block";
                    
                    await loadMainDashboard();
                    if(leaderboardContainer) leaderboardContainer.style.display = "block";
                }
                
                await loadAnnouncement();

            } else {
                messageDiv.textContent = data.error || "خطأ في الدخول";
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال بالشبكة";
            messageDiv.style.color = "red";
        }
    });

    function updateUserCardUI(user) {
        if(userNameP) userNameP.textContent = `الاسم: ${user.name}`;
        if(userFamilyP) userFamilyP.textContent = `العائلة: ${user.family}`;
        if(userBalanceP) userBalanceP.textContent = `الرصيد: $${user.balance}`;
        if(userLevelP) userLevelP.textContent = `المستوى: ${user.level || 1}`;
        if(userAvatarImg) userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
        
        loadTransactionHistory(user.email);
    }

    // -----------------------------------------------------
    // 5. منطق لوحة الأدمن (النظام الجديد - Dashboard)
    // -----------------------------------------------------
    (function setupAdminPanel() {
        // 🛑 دالة مساعدة لملء كارت المستخدم الذي تم البحث عنه
        function populateAdminCard(user) {
            currentSearchedUser = user;
            if(searchedUserName) searchedUserName.textContent = user.name;
            if(searchedUserFamily) searchedUserFamily.textContent = user.family;
            if(searchedUserEmail) searchedUserEmail.textContent = user.email;
            if(searchedUserBalance) searchedUserBalance.textContent = user.balance;
            if(searchedUserLevel) searchedUserLevel.textContent = user.level || 1;
            if(searchedUserCard) searchedUserCard.style.display = "block";
            if(adminLevelAmount) adminLevelAmount.value = user.level || 1; // ملء حقل المستوى
            
            // زر عرض QR للأدمن
            if(adminShowUserQrBtn) {
                adminShowUserQrBtn.onclick = () => {
                    if (!user || !user.email) return;
                    if(qrCodeContainer) qrCodeContainer.innerHTML = '';
                    new QRCode(qrCodeContainer, { text: user.email, width: 250, height: 250 });
                    if(qrUserEmailDisplay) qrUserEmailDisplay.textContent = user.email;
                    if(qrModalOverlay) qrModalOverlay.style.display = 'flex';
                }
            }
        }
        
        // 🛑 منطق التنقل بين الأقسام (أزرار القائمة و X)
        if (menuButtons) {
            menuButtons.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    const targetId = btn.dataset.target;
                    
                    if(adminMenu) adminMenu.style.display = 'none';
                    if(adminViews) adminViews.forEach(view => view.style.display = 'none');
                    
                    const targetSection = document.getElementById(targetId);
                    if(targetSection) targetSection.style.display = 'block';
                    
                    // إعادة تهيئة بعض الحقول عند الفتح
                    if (targetId === 'admin-search-view' && searchedUserCard) searchedUserCard.style.display = "none";
                    if (targetId === 'admin-scan-view' && html5QrCode && html5QrCode.isScanning) {
                        html5QrCode.stop().then(() => { html5QrCode = null; startScanBtn.textContent = "تشغيل الكاميرا"; }).catch(() => {});
                    }
                }
            });
        }

        if (closeSectionButtons) {
            closeSectionButtons.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    const parentSection = btn.closest('.admin-section-view');
                    if(parentSection) parentSection.style.display = 'none';
                    
                    if(adminMenu) adminMenu.style.display = 'grid';
                    
                    if (html5QrCode && html5QrCode.isScanning) {
                        html5QrCode.stop().then(() => { html5QrCode = null; startScanBtn.textContent = "تشغيل الكاميرا"; }).catch(() => {});
                    }
                }
            });
        }
        
        // --- أ. البحث عن مستخدم ---
        if(adminSearchForm) {
            adminSearchForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const name = adminSearchInput.value.trim();
                adminSearchMessage.textContent = "جاري البحث...";
                adminSearchMessage.style.color = 'blue';
                if(searchedUserCard) searchedUserCard.style.display = "none";

                try {
                    const response = await fetch(`/admin-search`, {
                        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name })
                    });
                    const data = await response.json();
                    
                    if(response.ok && data.users.length > 0) {
                        currentSearchResults = data.users;
                        adminSearchMessage.textContent = `تم العثور على ${data.users.length} مستخدم.`;
                        adminSearchMessage.style.color = 'green';

                        if(data.users.length === 1) {
                            populateAdminCard(data.users[0]);
                            adminResultsListDiv.style.display = 'none';
                        } else {
                            adminSelectUser.innerHTML = '<option value="">اختر مستخدم...</option>';
                            data.users.forEach(u => {
                                const opt = document.createElement('option');
                                opt.value = u.email;
                                opt.textContent = `${u.name} (${u.family})`;
                                adminSelectUser.appendChild(opt);
                            });
                            adminResultsListDiv.style.display = 'block';
                            populateAdminCard(data.users[0]); // عرض الأول افتراضيا
                        }
                    } else {
                        adminSearchMessage.textContent = "لم يتم العثور على مستخدم.";
                        adminSearchMessage.style.color = 'red';
                        if(searchedUserCard) searchedUserCard.style.display = "none";
                    }
                } catch(e) { adminSearchMessage.textContent = "خطأ في البحث"; adminSearchMessage.style.color = 'red'; }
            });
        }
        
        if(adminSelectUser) {
            adminSelectUser.onchange = () => {
                const user = currentSearchResults.find(u => u.email === adminSelectUser.value);
                if(user) populateAdminCard(user);
            }
        }

        // --- ب. تعديل الرصيد والمستوى والحذف (نفس المنطق) --- 
        async function updateBalance(amount, reason) {
            if (!currentSearchedUser || isNaN(amount)) return;
             if(balanceMessage) balanceMessage.textContent = "جاري التحديث...";
             if(balanceMessage) balanceMessage.style.color = 'blue';

            try {
                const res = await fetch(`/admin-update-balance`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: currentSearchedUser.email, amount, reason })
                });
                const d = await res.json();
                if(res.ok) {
                    currentSearchedUser.balance = d.new_balance;
                    if(searchedUserBalance) searchedUserBalance.textContent = d.new_balance;
                    if(balanceAmountInput) balanceAmountInput.value = "";
                    if(balanceMessage) balanceMessage.textContent = `تم التحديث. الرصيد الجديد: $${d.new_balance}`;
                    if(balanceMessage) balanceMessage.style.color = 'green';
                    if(loggedInUserProfile.email === currentSearchedUser.email) refreshUserData();
                } else {
                    if(balanceMessage) balanceMessage.textContent = d.error || "فشل التحديث";
                    if(balanceMessage) balanceMessage.style.color = 'red';
                }
             } catch(e) { if(balanceMessage) balanceMessage.textContent = "خطأ اتصال"; if(balanceMessage) balanceMessage.style.color = 'red'; }
        }

        if (addBalanceBtn) addBalanceBtn.onclick = () => updateBalance(parseInt(balanceAmountInput.value), "إضافة يدوية");
        if (subtractBalanceBtn) subtractBalanceBtn.onclick = () => updateBalance(-parseInt(balanceAmountInput.value), "خصم يدوي");
        
        if (adminUpdateLevelBtn) {
            adminUpdateLevelBtn.onclick = async () => {
                const lvl = parseInt(adminLevelAmount.value);
                if (!currentSearchedUser || isNaN(lvl) || lvl < 1) return;
                if(adminLevelMessage) adminLevelMessage.textContent = "جاري التحديث...";
                if(adminLevelMessage) adminLevelMessage.style.color = 'blue';
                
                try {
                    const res = await fetch(`/admin-update-level`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ adminEmail: loggedInUserProfile.email, targetEmail: currentSearchedUser.email, newLevel: lvl })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        currentSearchedUser.level = d.new_level;
                        if(searchedUserLevel) searchedUserLevel.textContent = d.new_level;
                        if(adminLevelMessage) adminLevelMessage.textContent = "تم التحديث";
                        if(adminLevelMessage) adminLevelMessage.style.color = 'green';
                        if(loggedInUserProfile.email === currentSearchedUser.email) refreshUserData();
                    } else {
                        if(adminLevelMessage) adminLevelMessage.textContent = d.error || "فشل التحديث";
                        if(adminLevelMessage) adminLevelMessage.style.color = 'red';
                    }
                } catch(e) { if(adminLevelMessage) adminLevelMessage.textContent = "خطأ اتصال"; if(adminLevelMessage) adminLevelMessage.style.color = 'red'; }
            }
        }

        if (deleteUserBtn) {
            deleteUserBtn.onclick = async () => {
                if(!currentSearchedUser || !confirm(`تحذير: حذف ${currentSearchedUser.name} نهائياً؟`)) return;
                 if(deleteMessage) deleteMessage.textContent = "جاري الحذف...";
                 if(deleteMessage) deleteMessage.style.color = 'blue';
                 
                try {
                    const res = await fetch(`/admin-delete-user`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ emailToDelete: currentSearchedUser.email, adminEmail: loggedInUserProfile.email })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        if(deleteMessage) deleteMessage.textContent = "تم الحذف بنجاح!";
                        if(deleteMessage) deleteMessage.style.color = 'green';
                        if(searchedUserCard) searchedUserCard.style.display = "none";
                        currentSearchedUser = null;
                    } else {
                         if(deleteMessage) deleteMessage.textContent = d.error || "فشل الحذف";
                         if(deleteMessage) deleteMessage.style.color = 'red';
                    }
                } catch(e) { if(deleteMessage) deleteMessage.textContent = "خطأ اتصال"; if(deleteMessage) deleteMessage.style.color = 'red'; }
            }
        }

        // --- ج. إدارة الأسر ---
        if(familyButtons) {
            familyButtons.forEach(btn => {
                btn.onclick = async () => {
                    const family = btn.dataset.family;
                    if(adminFamilyMessage) adminFamilyMessage.textContent = "جاري التحميل...";
                    if(adminFamilyMessage) adminFamilyMessage.style.color = 'blue';

                    try {
                        const res = await fetch(`/admin-get-family`, {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ family })
                        });
                        const d = await res.json();
                        if(d.users) {
                            if(adminFamilyMessage) adminFamilyMessage.textContent = `عدد الأعضاء: ${d.users.length}`;
                            if(adminFamilyMessage) adminFamilyMessage.style.color = 'black';
                            if(massUpdateControls) massUpdateControls.style.display = "block";
                            if(adminFamilyResultsDiv) adminFamilyResultsDiv.innerHTML = "";
                            
                            // 🛑 إعادة تصفير قائمة التحديد الجماعي
                            scannedUsersBatch = []; 
                            if(selectedUsersCount) selectedUsersCount.textContent = '0';

                            d.users.forEach(u => {
                                const div = document.createElement('div');
                                div.className = "family-user-item";
                                div.innerHTML = `<input type="checkbox" class="mass-update-checkbox" data-email="${u.email}"> 
                                                    <div class="user-info"><span>${u.name}</span> <strong>$${u.balance}</strong></div>`;
                                if(adminFamilyResultsDiv) adminFamilyResultsDiv.appendChild(div);
                                
                                // ربط كليك لعرض تفاصيل المستخدم
                                div.querySelector('.user-info').onclick = () => populateAdminCard(u);
                            });
                        }
                    } catch(e) { if(adminFamilyMessage) adminFamilyMessage.textContent = "خطأ في تحميل البيانات"; if(adminFamilyMessage) adminFamilyMessage.style.color = 'red'; }
                }
            });
        }
        
        // منطق التحديد الجماعي (Checkbox)
        if (adminFamilyResultsDiv) {
            adminFamilyResultsDiv.addEventListener('change', (e) => {
                if (e.target.classList.contains('mass-update-checkbox')) {
                    const email = e.target.dataset.email;
                    if (e.target.checked) {
                        if (!scannedUsersBatch.includes(email)) scannedUsersBatch.push(email);
                    } else {
                        scannedUsersBatch = scannedUsersBatch.filter(u => u !== email);
                    }
                    if(selectedUsersCount) selectedUsersCount.textContent = scannedUsersBatch.length;
                }
            });
        }

        if(massUpdateAddBtn || massUpdateSubtractBtn) {
            const handleMassUpdate = async (isAdd) => {
                if(!scannedUsersBatch.length) { if(massUpdateMessage) massUpdateMessage.textContent = "اختر مستخدماً واحداً على الأقل"; if(massUpdateMessage) massUpdateMessage.style.color = 'red'; return; }
                const amt = parseInt(massUpdateAmount.value);
                if(isNaN(amt) || amt <= 0) { if(massUpdateMessage) massUpdateMessage.textContent = "أدخل كمية صحيحة"; if(massUpdateMessage) massUpdateMessage.style.color = 'red'; return; }
                
                const amount = isAdd ? amt : -amt;
                const reason = isAdd ? "إضافة جماعية" : "خصم جماعي";
                
                if (!confirm(`هل أنت متأكد من ${isAdd ? 'إضافة' : 'خصم'} ${amt} نقطة لـ ${scannedUsersBatch.length} مستخدم؟`)) return;

                if(massUpdateMessage) massUpdateMessage.textContent = "جاري الإرسال..."; if(massUpdateMessage) massUpdateMessage.style.color = 'blue';

                try {
                    const res = await fetch(`/admin-mass-update`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ emails: scannedUsersBatch, amount, reason })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        if(massUpdateMessage) massUpdateMessage.textContent = `تم تحديث ${d.updated_count} مستخدم بنجاح!`;
                        if(massUpdateMessage) massUpdateMessage.style.color = 'green';
                        scannedUsersBatch = []; 
                        if(selectedUsersCount) selectedUsersCount.textContent = '0';
                        if(massUpdateAmount) massUpdateAmount.value = '';
                        // إعادة تحميل قائمة الأسرة لتحديث الأرصدة
                        // يجب إعادة تفعيل زر الأسرة ليعرض القائمة
                        const activeFamilyButton = document.querySelector('.family-btn:focus');
                        if (activeFamilyButton) activeFamilyButton.click(); 
                    } else {
                        if(massUpdateMessage) massUpdateMessage.textContent = d.error || "فشل التحديث الجماعي";
                        if(massUpdateMessage) massUpdateMessage.style.color = 'red';
                    }
                } catch(e) { if(massUpdateMessage) massUpdateMessage.textContent = "خطأ اتصال"; if(massUpdateMessage) massUpdateMessage.style.color = 'red'; }
            }
            if(massUpdateAddBtn) massUpdateAddBtn.onclick = () => handleMassUpdate(true);
            if(massUpdateSubtractBtn) massUpdateSubtractBtn.onclick = () => handleMassUpdate(false);
        }

        // --- د. مسح الحضور (Scan) ---
        if (startScanBtn) {
             startScanBtn.onclick = () => {
                 if (html5QrCode && html5QrCode.isScanning) {
                     html5QrCode.stop().then(() => {
                         startScanBtn.textContent = "تشغيل الكاميرا والمسح";
                         if(readerDiv) readerDiv.innerHTML = "";
                         if(scanStatusMessage) scanStatusMessage.textContent = "تم الإيقاف";
                     }).catch(err => { console.error(err); });
                 } else {
                     if(!html5QrCode) html5QrCode = new Html5Qrcode("reader");
                     scannedUsersBatch = [];
                     renderScannedBatchList();
                     
                     html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 250 } }, onScanSuccess, () => {})
                     .then(() => {
                         startScanBtn.textContent = "إيقاف الكاميرا";
                         if(scanStatusMessage) scanStatusMessage.textContent = "جاهز للمسح...";
                     })
                     .catch((err) => {
                         if(scanStatusMessage) scanStatusMessage.textContent = `❌ فشل تفعيل الكاميرا: ${err}.`;
                         if(scanStatusMessage) scanStatusMessage.style.color = 'red';
                     });
                 }
             }
        }

        async function onScanSuccess(decodedText) {
             const email = decodedText.trim();
             if (!scannedUsersBatch.includes(email)) {
                 scannedUsersBatch.push(email);
                 renderScannedBatchList();
                 if(scanStatusMessage) scanStatusMessage.textContent = `✅ تمت إضافة: ${email}`;
                 if(scanStatusMessage) scanStatusMessage.style.color = "green";
             } else {
                 if(scanStatusMessage) scanStatusMessage.textContent = `⚠️ مكرر: ${email}`;
                 if(scanStatusMessage) scanStatusMessage.style.color = "orange";
             }
        }

        function renderScannedBatchList() {
             if(!scannedBatchList) return;
             scannedBatchList.innerHTML = "";
             if(scannedBatchListContainer) scannedBatchListContainer.style.display = scannedUsersBatch.length ? "block" : "none";
             if(scanBatchCount) scanBatchCount.textContent = scannedUsersBatch.length;
             if(submitScanBatchBtn) submitScanBatchBtn.style.display = scannedUsersBatch.length ? "block" : "none";
             
             scannedUsersBatch.forEach((email, index) => {
                 const li = document.createElement('li');
                 li.className = 'scanned-user-item'; // كلاس جديد للتنسيق
                 li.innerHTML = `<span>${email}</span> <button class="remove-scan-item-btn" data-email="${email}">X</button>`;
                 li.querySelector('button').onclick = () => {
                     scannedUsersBatch = scannedUsersBatch.filter(e => e !== email);
                     renderScannedBatchList();
                 };
                 if(scannedBatchList) scannedBatchList.appendChild(li);
             });
        }

        if(submitScanBatchBtn) {
            submitScanBatchBtn.onclick = async () => {
                 if(!scannedUsersBatch.length) return;
                 const [amt, rsn] = rewardReasonSelect.value.split(':');
                 const rewardAmount = parseInt(amt);
                 
                 if(isNaN(rewardAmount) || rewardAmount <= 0) { if(scanBatchMessage) scanBatchMessage.textContent = "اختر نوع مكافأة صحيح"; return; }
                 if (!confirm(`هل أنت متأكد من إضافة ${rewardAmount} نقطة لـ ${scannedUsersBatch.length} مستخدم (${rsn})؟`)) return;

                 if(scanBatchMessage) scanBatchMessage.textContent = 'جاري الإرسال...';
                 if(scanBatchMessage) scanBatchMessage.style.color = 'blue';

                 try {
                     const res = await fetch('/admin-batch-scan-attendance', {
                         method: 'POST', headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({ emails: scannedUsersBatch, rewardAmount, reason: rsn, adminEmail: loggedInUserProfile.email })
                     });
                     const d = await res.json();
                     if(res.ok) {
                         if(scanBatchMessage) scanBatchMessage.textContent = `✅ نجاح! تم تحديث ${d.updated_count} مستخدم.`;
                         if(scanBatchMessage) scanBatchMessage.style.color = "green";
                         scannedUsersBatch = [];
                         renderScannedBatchList();
                     } else {
                         if(scanBatchMessage) scanBatchMessage.textContent = d.error || "فشل";
                         if(scanBatchMessage) scanBatchMessage.style.color = "red";
                     }
                 } catch(e) { if(scanBatchMessage) scanBatchMessage.textContent = "خطأ اتصال"; if(scanBatchMessage) scanBatchMessage.style.color = 'red'; }
            }
        }
        
        // --- هـ. الطباعة ---
        if(fetchQrListBtn) {
            fetchQrListBtn.onclick = async () => {
                if(qrListMessage) qrListMessage.textContent = "جاري الجلب...";
                try {
                    const res = await fetch('/admin-get-qr-list', {
                        method: 'POST', headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ adminEmail: loggedInUserProfile.email })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        if(qrListResults) qrListResults.value = JSON.stringify(d.users);
                        if(qrListMessage) qrListMessage.textContent = `✅ تم جلب ${d.users.length} مستخدم.`;
                    }
                } catch(e) { if(qrListMessage) qrListMessage.textContent = "خطأ في الجلب"; }
            }
        }

        if(generatePrintCardsBtn) {
            generatePrintCardsBtn.onclick = () => {
                const users = JSON.parse(qrListResults.value || "[]");
                if(printableCardsContainer) printableCardsContainer.innerHTML = "";
                if(qrListMessage) qrListMessage.textContent = "جاري التوليد...";
                
                // استخدام Batch Processing لتجنب تجميد المتصفح
                let i = 0;
                function processBatch() {
                    let count = 0;
                    while (count < 50 && i < users.length) {
                        const u = users[i];
                        const card = document.createElement('div');
                        card.className = 'print-card';
                        card.innerHTML = `<div class="print-card-name">${u.name}</div><div class="print-card-family">${u.family}</div><div class="print-card-qr"></div>`;
                        if(printableCardsContainer) printableCardsContainer.appendChild(card);
                        new QRCode(card.querySelector('.print-card-qr'), { text: u.email, width: 120, height: 120 });
                        count++;
                        i++;
                    }

                    if (i < users.length) {
                        if(qrListMessage) qrListMessage.textContent = `جاري توليد الكروت... (${i}/${users.length})`;
                        setTimeout(processBatch, 100);
                    } else {
                        if(qrListMessage) qrListMessage.textContent = `✅ اكتمل! تم توليد ${users.length} كارت.`;
                    }
                }
                processBatch();
            }
        }
        
        if (downloadCardsAsImageBtn) {
            downloadCardsAsImageBtn.addEventListener('click', () => {
                const containerToCapture = printableCardsContainer;
                if (!containerToCapture || containerToCapture.children.length === 0) {
                    if(qrListMessage) qrListMessage.textContent = "الرجاء توليد الكروت أولاً (الخطوة 2).";
                    return;
                }
                if(qrListMessage) qrListMessage.textContent = "جاري تحويل الكروت إلى صورة... قد يستغرق هذا بعض الوقت...";

                html2canvas(containerToCapture, { scrollX: 0, scrollY: -window.scrollY, scale: 2 }).then(canvas => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'kiropay-qr-cards.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    if(qrListMessage) qrListMessage.textContent = "✅ تم تحميل الصورة بنجاح! يمكنك الآن طباعتها.";
                }).catch(err => {
                    if(qrListMessage) qrListMessage.textContent = "❌ فشل تحويل الصورة.";
                    console.error("html2canvas error:", err);
                });
            });
        }
        
        // --- و. الكويز، الإعلانات، المتجر (Forms) ---
        // (منطق الإرسال لهذه النماذج سيعمل بنفس الطريقة مع الـ APIs التي لديك)
        // ...
        
    })(); // نهاية دالة الأدمن


    // -----------------------------------------------------
    // 6. منطق الجيست (الزائر) - المصحح
    // -----------------------------------------------------
    
    if(guestFamilyButtons) {
        guestFamilyButtons.forEach(btn => {
            btn.onclick = async () => {
                const family = btn.dataset.family;
                if(guestMessage) guestMessage.textContent = "جاري التحميل...";

                try {
                    const res = await fetch('/guest-get-family', {
                        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ family })
                    });
                    const d = await res.json();
                    if(d.users) {
                        if(guestResultsList) guestResultsList.innerHTML = "";
                        d.users.forEach((u, i) => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span>${i+1}. ${u.name}</span> <strong>$${u.balance} نقطة</strong>`;
                            li.style.cursor = "pointer";
                            li.onclick = () => showUserStats(u.name, u.email);
                            if(guestResultsList) guestResultsList.appendChild(li);
                        });
                        if(guestMessage) guestMessage.textContent = `عرض ${d.users.length} مستخدم`;
                    }
                } catch(e) { if(guestMessage) guestMessage.textContent = "خطأ في تحميل البيانات"; }
            }
        });
    }

    async function showUserStats(name, email) {
        if(!guestDetailsModal || !guestDetailsTitle || !guestStatsContent) return;

        if(guestDetailsTitle) guestDetailsTitle.textContent = `إحصائيات ${name}`;
        if(guestStatsContent) guestStatsContent.innerHTML = "<p style='text-align:center;'>جاري تحميل سجل الأنشطة...</p>";
        
        if(guestDetailsModal) guestDetailsModal.style.display = "flex";
        
        try {
            // 🛑 استخدام دالة get-transactions للحصول على السجل ثم معالجته يدوياً
            const res = await fetch('/get-transactions', { 
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email })
            });
            const d = await res.json();
            
            if(d.transactions) {
                const counts = {};
                const statsMap = {
                    "القداس": "القداس", "مدارس الاحد": "مدارس الاحد", "مدرسة شمامسة": "مدرسة شمامسة", 
                    "عشية": "عشية", "درس كتاب": "درس كتاب", "تسبحة": "تسبحة", 
                    "تسميع مزمور": "تسميع مزمور", "قداس اضافي": "ق. إضافي", 
                    "اعتراف": "اعتراف", "مسابقة": "مسابقة"
                };
                let otherCount = 0;
                
                // تصفير الإحصائيات أولاً
                Object.values(statsMap).forEach(key => counts[key] = 0);

                d.transactions.forEach(t => {
                    let matched = false;
                    if (t.amount > 0) {
                        for (const reasonKey in statsMap) {
                            if (t.reason && t.reason.includes(reasonKey)) {
                                counts[statsMap[reasonKey]]++;
                                matched = true;
                                break;
                            }
                        }
                        if (!matched && t.reason && t.reason.toLowerCase().includes('خصم')) {
                            // تجاهل الخصومات
                        } else if (!matched) {
                            otherCount++;
                        }
                    }
                });
                
                let html = "";
                // دمج Other في القائمة
                counts["أخرى/زيادة"] = otherCount; 
                
                // عرض الإحصائيات في grid
                for (const k in counts) {
                    const v = counts[k];
                    const color = v > 0 ? "color:#004a99;font-weight:bold;" : "color:#6c757d;";
                    html += `<div class="stat-item"><div class="stat-label">${k}</div><div class="stat-value" style="${color}">${v}</div></div>`;
                }
                
                if(guestStatsContent) guestStatsContent.innerHTML = html;
            }

        } catch(e) {
            if(guestStatsContent) guestStatsContent.innerHTML = "<p style='text-align:center; color:red;'>خطأ في جلب بيانات الإحصائيات.</p>";
            console.error("Guest Stats Error:", e);
        }
    }

    // ربط زر إغلاق نافذة الـ QR لليوزر
    if(closeQrBtn) closeQrBtn.onclick = () => qrModalOverlay.style.display = 'none';
    
    // ربط زر إغلاق نافذة إحصائيات الجيست
    if(closeGuestDetails) closeGuestDetails.onclick = () => guestDetailsModal.style.display = 'none';

    // ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.onclick = refreshUserData;
    if(logoutBtn) logoutBtn.onclick = resetUI;
    if(logoutBtnGuest) logoutBtnGuest.onclick = resetUI;
    if(unlockedItemsBtn) unlockedItemsBtn.onclick = loadUserUnlockedItems;
    if(backToStoreBtn) backToStoreBtn.onclick = loadMainDashboard;
    
    // 🛑 دالة تحميل لوحات المستخدم
    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections();
        try { await loadLeaderboards(); } catch(e) {}
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) {}
        try { await loadStoreItems(); } catch(e) {}
    }


});
