document.addEventListener("DOMContentLoaded", () => {
    // ============================================================
    // 1. تعريف العناصر (DOM Elements)
    // ============================================================

    // عناصر الدخول والتسجيل
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    // عناصر واجهة الزائر (Guest)
    const guestContainer = document.getElementById("guest-container");
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");
    
    // مودال إحصائيات الجيست
    const guestStatsModal = document.getElementById("guest-stats-modal");
    const closeGuestStatsBtn = document.getElementById("close-guest-stats");
    const guestStatsContent = document.getElementById("guest-stats-content");
    const guestStatsName = document.getElementById("guest-stats-name");

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

    // بيانات Cloudinary
    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    // عناصر لوحة الأدمن (الهيكل الجديد - Dashboard)
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminMenu = document.getElementById('admin-main-menu');
    const adminViews = document.querySelectorAll('.admin-section-view');
    const menuButtons = document.querySelectorAll('.admin-menu-btn');
    const closeSectionButtons = document.querySelectorAll('.close-section-btn');

    // عناصر وظائف الأدمن - البحث والتعديل
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

    // عناصر وظائف الأدمن - الأسر والمسح والطباعة
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
    const scannedBatchListContainer = document.getElementById("scanned-batch-list-container");
    const scanBatchCount = document.getElementById("scan-batch-count");
    const scannedBatchList = document.getElementById("scanned-batch-list");
    const submitScanBatchBtn = document.getElementById("submit-scan-batch-btn");
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

    // عناصر QR Code للمستخدم
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");

    // عناصر الإعلانات للمستخدم
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const tickerTextDisplay = document.getElementById("ticker-text-display");

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

    // متغيرات الحالة العامة
    let loggedInUserProfile = null;
    let currentSearchResults = [];
    let currentSearchedUser = null;
    let currentQuizId = null;
    let selectedOption = null;
    let html5QrCode = null;

    // ============================================================
    // 2. دالة Reset UI (إخفاء كل شيء)
    // ============================================================
    const resetUI = () => {
        // إخفاء الواجهات
        if(cardContainer) cardContainer.style.display = "none";
        if(formContainer) formContainer.style.display = "flex"; // إظهار فورم الدخول فقط
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
        
        // إعادة ضبط الأدمن
        if(adminMenu) adminMenu.style.display = 'grid';
        if(adminViews) adminViews.forEach(v => v.style.display = 'none');

        // إغلاق المودالز
        if(editModalOverlay) editModalOverlay.style.display = "none";
        if(qrModalOverlay) qrModalOverlay.style.display = "none";
        if(guestStatsModal) guestStatsModal.style.display = "none";

        // إيقاف الكاميرا بأمان
        if (html5QrCode) {
            try {
                if (html5QrCode.isScanning) {
                    html5QrCode.stop().then(() => { html5QrCode = null; }).catch(() => { html5QrCode = null; });
                } else {
                    html5QrCode = null;
                }
            } catch(e) { html5QrCode = null; }
        }

        // تصفير البيانات
        loggedInUserProfile = null;
        if(transactionList) transactionList.innerHTML = "";
        if(messageDiv) messageDiv.textContent = "";
        if(scanBatchCount) scanBatchCount.textContent = "0";
        if(scannedBatchList) scannedBatchList.innerHTML = "";
        if(scanBatchMessage) scanBatchMessage.textContent = "";
    };

    // استدعاء Reset عند بدء التشغيل
    resetUI();


    // ============================================================
    // 3. منطق تسجيل الدخول (Login)
    // ============================================================
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = "جاري تسجيل الدخول...";
        messageDiv.style.color = "blue";
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = "تم الدخول بنجاح!";
                messageDiv.style.color = "green";
                const user = data.user;
                loggedInUserProfile = user;

                // إخفاء الفورم فوراً
                formContainer.style.display = "none";

                // التوجيه حسب الدور
                if (user.role === 'admin') {
                    // --- أدمن ---
                    adminPanelDiv.style.display = "block";
                    
                    // الأدمن يرى الكارت أيضاً
                    cardContainer.style.display = "flex"; 
                    if(avatarOverlayLabel) avatarOverlayLabel.style.display = "flex";
                    updateUserCardUI(user);
                    
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    
                    await loadAdminStoreItems(); 
                    
                } else if (user.role === 'guest') {
                    // --- جيست (زائر) ---
                    guestContainer.style.display = "block";
                    logoutBtnGuest.style.display = "block";
                    
                    cardContainer.style.display = "none";
                    formContainer.style.display = "none";
                    
                } else {
                    // --- مستخدم عادي ---
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
                
                // تحميل الإعلانات للجميع
                loadAnnouncement();

            } else {
                messageDiv.textContent = data.error || "خطأ في الدخول";
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال بالشبكة";
            messageDiv.style.color = "red";
            console.error(err);
        }
    });

    function updateUserCardUI(user) {
        if(userNameP) userNameP.textContent = `الاسم: ${user.name}`;
        if(userFamilyP) userFamilyP.textContent = `العائلة: ${user.family}`;
        if(userBalanceP) userBalanceP.textContent = `الرصيد: $${user.balance}`;
        if(userLevelP) userLevelP.textContent = `المستوى: ${user.level || 1}`;
        if(userAvatarImg) userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
        
        // تحميل السجل
        loadTransactionHistory(user.email);
    }


    // -----------------------------------------------------
    // 4. منطق لوحة الأدمن (Dashboard Navigation)
    // -----------------------------------------------------
    (function setupAdminPanel() {
        let currentSearchedUser = null;
        let scannedUsersBatch = [];

        // 🛑🛑 منطق القوائم الجديد (Dashboard Navigation) 🛑🛑
        
        // 1. تشغيل أزرار القائمة الرئيسية
        if (menuButtons) {
            menuButtons.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    const targetId = btn.dataset.target;
                    // إخفاء القائمة الرئيسية
                    if(adminMenu) adminMenu.style.display = 'none';
                    // إخفاء أي نافذة مفتوحة
                    if(adminViews) adminViews.forEach(view => view.style.display = 'none');
                    // إظهار النافذة المطلوبة
                    const targetSection = document.getElementById(targetId);
                    if(targetSection) targetSection.style.display = 'block';
                }
            });
        }

        // 2. تشغيل أزرار الإغلاق (X)
        if (closeSectionButtons) {
            closeSectionButtons.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    // إغلاق النافذة الحالية
                    const parentSection = btn.closest('.admin-section-view');
                    if(parentSection) parentSection.style.display = 'none';
                    // إعادة إظهار القائمة الرئيسية
                    if(adminMenu) adminMenu.style.display = 'grid';
                }
            });
        }
        // 🛑🛑 نهاية منطق القوائم 🛑🛑

        // --- أ. البحث عن مستخدم ---
        if(adminSearchForm) {
            adminSearchForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const name = adminSearchInput.value.trim();
                adminSearchMessage.textContent = "جاري البحث...";
                try {
                    const response = await fetch(`/admin-search`, {
                        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name })
                    });
                    const data = await response.json();
                    if(response.ok && data.users.length > 0) {
                        currentSearchResults = data.users;
                        if(data.users.length === 1) {
                            populateAdminCard(data.users[0]);
                            adminResultsListDiv.style.display = 'none';
                        } else {
                            adminSelectUser.innerHTML = '<option value="">اختر...</option>';
                            data.users.forEach(u => {
                                const opt = document.createElement('option');
                                opt.value = u.email;
                                opt.textContent = `${u.name} (${u.family})`;
                                adminSelectUser.appendChild(opt);
                            });
                            adminResultsListDiv.style.display = 'block';
                        }
                        adminSearchMessage.textContent = "";
                    } else {
                        adminSearchMessage.textContent = "لم يتم العثور على مستخدم.";
                        searchedUserCard.style.display = "none";
                    }
                } catch(e) { adminSearchMessage.textContent = "خطأ في البحث"; }
            });
        }
        
        if(adminSelectUser) {
            adminSelectUser.onchange = () => {
                const user = currentSearchResults.find(u => u.email === adminSelectUser.value);
                if(user) populateAdminCard(user);
            }
        }

        function populateAdminCard(user) {
            currentSearchedUser = user;
            searchedUserName.textContent = user.name;
            searchedUserFamily.textContent = user.family;
            searchedUserEmail.textContent = user.email;
            searchedUserBalance.textContent = user.balance;
            searchedUserLevel.textContent = user.level || 1;
            searchedUserCard.style.display = "block";
            
            // زر عرض QR للأدمن
            if(adminShowUserQrBtn) {
                adminShowUserQrBtn.onclick = () => {
                    qrCodeContainer.innerHTML = '';
                    new QRCode(qrCodeContainer, { text: user.email, width: 250, height: 250 });
                    qrUserEmailDisplay.textContent = user.email;
                    qrModalOverlay.style.display = 'flex';
                }
            }
        }

        // --- ب. تعديل الرصيد والمستوى والحذف ---
        async function updateBalance(amount, reason) {
             if (!currentSearchedUser || isNaN(amount)) return;
             try {
                const res = await fetch(`/admin-update-balance`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: currentSearchedUser.email, amount, reason })
                });
                const d = await res.json();
                if(res.ok) {
                    currentSearchedUser.balance = d.new_balance;
                    searchedUserBalance.textContent = d.new_balance;
                    balanceAmountInput.value = "";
                    balanceMessage.textContent = "تم التحديث";
                    if(loggedInUserProfile.email === currentSearchedUser.email) refreshUserData();
                }
             } catch(e) {}
        }

        if (addBalanceBtn) addBalanceBtn.onclick = () => updateBalance(parseInt(balanceAmountInput.value), "إضافة يدوية");
        if (subtractBalanceBtn) subtractBalanceBtn.onclick = () => updateBalance(-parseInt(balanceAmountInput.value), "خصم يدوي");
        
        if (adminUpdateLevelBtn) {
            adminUpdateLevelBtn.onclick = async () => {
                const lvl = parseInt(adminLevelAmount.value);
                if (!currentSearchedUser || isNaN(lvl)) return;
                try {
                    const res = await fetch(`/admin-update-level`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ adminEmail: loggedInUserProfile.email, targetEmail: currentSearchedUser.email, newLevel: lvl })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        currentSearchedUser.level = d.new_level;
                        searchedUserLevel.textContent = d.new_level;
                        adminLevelMessage.textContent = "تم التحديث";
                    }
                } catch(e) {}
            }
        }

        if (deleteUserBtn) {
            deleteUserBtn.onclick = async () => {
                if(!currentSearchedUser || !confirm("حذف نهائي؟")) return;
                try {
                    const res = await fetch(`/admin-delete-user`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ emailToDelete: currentSearchedUser.email, adminEmail: loggedInUserProfile.email })
                    });
                    if(res.ok) {
                        deleteMessage.textContent = "تم الحذف";
                        searchedUserCard.style.display = "none";
                        currentSearchedUser = null;
                    }
                } catch(e) {}
            }
        }

        // --- ج. إدارة الأسر ---
        if(familyButtons) {
            familyButtons.forEach(btn => {
                btn.onclick = async () => {
                    const family = btn.dataset.family;
                    try {
                        const res = await fetch(`/admin-get-family`, {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ family })
                        });
                        const d = await res.json();
                        if(d.users) {
                            adminFamilyMessage.textContent = `عدد الأعضاء: ${d.users.length}`;
                            massUpdateControls.style.display = "block";
                            adminFamilyResultsDiv.innerHTML = "";
                            d.users.forEach(u => {
                                const div = document.createElement('div');
                                div.className = "family-user-item";
                                div.innerHTML = `<input type="checkbox" class="mass-update-checkbox" data-email="${u.email}"> 
                                                 <div class="user-info"><span>${u.name}</span> <strong>${u.balance}</strong></div>`;
                                adminFamilyResultsDiv.appendChild(div);
                            });
                        }
                    } catch(e) {}
                }
            });
        }
        
        // منطق التحديد الجماعي (Checkbox)
        if (adminFamilyResultsDiv) {
            adminFamilyResultsDiv.addEventListener('change', (e) => {
                if (e.target.classList.contains('mass-update-checkbox')) {
                    const email = e.target.dataset.email;
                    if (e.target.checked) {
                        if (!scannedUsersBatch.includes(email)) scannedUsersBatch.push(email); // نستخدم نفس المصفوفة للتسهيل
                    } else {
                        scannedUsersBatch = scannedUsersBatch.filter(u => u !== email);
                    }
                    selectedUsersCount.textContent = scannedUsersBatch.length;
                }
            });
        }

        if(massUpdateAddBtn) {
            massUpdateAddBtn.onclick = async () => {
                if(!scannedUsersBatch.length) return;
                const amt = parseInt(massUpdateAmount.value);
                if(isNaN(amt)) return;
                // استدعاء API التحديث الجماعي
                try {
                    const res = await fetch(`/admin-mass-update`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ emails: scannedUsersBatch, amount: amt, reason: "إضافة جماعية" })
                    });
                    if(res.ok) {
                         massUpdateMessage.textContent = "تم التحديث";
                         scannedUsersBatch = [];
                         refreshUserData();
                    }
                } catch(e) { massUpdateMessage.textContent = "خطأ"; }
            }
        }

        // --- د. مسح الحضور (Scan) ---
        if (startScanBtn) {
            startScanBtn.onclick = () => {
                if (html5QrCode && html5QrCode.isScanning) {
                    html5QrCode.stop().then(() => {
                         startScanBtn.textContent = "تشغيل الكاميرا";
                         readerDiv.innerHTML = "";
                         scanStatusMessage.textContent = "تم الإيقاف";
                    });
                } else {
                    if(!html5QrCode) html5QrCode = new Html5Qrcode("reader");
                    // تفريغ قائمة المسح عند بدء مسح جديد
                    scannedUsersBatch = [];
                    renderScannedBatchList(); 
                    
                    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 250 } }, onScanSuccess, () => {})
                    .then(() => {
                        startScanBtn.textContent = "إيقاف الكاميرا";
                        scanStatusMessage.textContent = "جاهز للمسح...";
                    })
                    .catch(err => {
                        scanStatusMessage.textContent = "خطأ في الكاميرا. تأكد من السماح بالإذن.";
                    });
                }
            }
        }

        async function onScanSuccess(decodedText) {
            const email = decodedText.trim();
            if (!scannedUsersBatch.includes(email)) {
                scannedUsersBatch.push(email);
                renderScannedBatchList();
                scanStatusMessage.textContent = `تمت إضافة: ${email}`;
                scanStatusMessage.style.color = "green";
            } else {
                scanStatusMessage.textContent = `مكرر: ${email}`;
                scanStatusMessage.style.color = "orange";
            }
        }

        function renderScannedBatchList() {
            if(!scannedBatchList) return;
            scannedBatchList.innerHTML = "";
            scannedBatchListContainer.style.display = scannedUsersBatch.length ? "block" : "none";
            scanBatchCount.textContent = scannedUsersBatch.length;
            scannedUsersBatch.forEach(email => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${email}</span> <button style="background:red;color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;">X</button>`;
                li.querySelector('button').onclick = () => {
                    scannedUsersBatch = scannedUsersBatch.filter(e => e !== email);
                    renderScannedBatchList();
                };
                scannedBatchList.appendChild(li);
            });
        }

        if(submitScanBatchBtn) {
            submitScanBatchBtn.onclick = async () => {
                if(!scannedUsersBatch.length) return;
                const [amt, rsn] = rewardReasonSelect.value.split(':');
                try {
                    const res = await fetch('/admin-batch-scan-attendance', {
                        method: 'POST', headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ emails: scannedUsersBatch, rewardAmount: parseInt(amt), reason: rsn, adminEmail: loggedInUserProfile.email })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        scanBatchMessage.textContent = `تم تحديث ${d.updated_count} مستخدم`;
                        scanBatchMessage.style.color = "green";
                        scannedUsersBatch = [];
                        renderScannedBatchList();
                    } else {
                        scanBatchMessage.textContent = "فشل";
                        scanBatchMessage.style.color = "red";
                    }
                } catch(e) { scanBatchMessage.textContent = "خطأ اتصال"; }
            }
        }

        // --- هـ. الطباعة ---
        if(fetchQrListBtn) {
            fetchQrListBtn.onclick = async () => {
                try {
                    const res = await fetch('/admin-get-qr-list', {
                         method: 'POST', headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({ adminEmail: loggedInUserProfile.email })
                    });
                    const d = await res.json();
                    if(res.ok) {
                        qrListResults.value = JSON.stringify(d.users);
                        qrListMessage.textContent = `تم جلب ${d.users.length} مستخدم`;
                    }
                } catch(e) {}
            }
        }

        if(generatePrintCardsBtn) {
            generatePrintCardsBtn.onclick = () => {
                const users = JSON.parse(qrListResults.value || "[]");
                printableCardsContainer.innerHTML = "";
                users.forEach(u => {
                    const card = document.createElement('div');
                    card.className = 'print-card';
                    card.innerHTML = `<div class="print-card-name">${u.name}</div><div class="print-card-family">${u.family}</div><div class="print-card-qr"></div>`;
                    printableCardsContainer.appendChild(card);
                    new QRCode(card.querySelector('.print-card-qr'), { text: u.email, width: 120, height: 120 });
                });
            }
        }
        
        if(downloadCardsAsImageBtn) {
            downloadCardsAsImageBtn.onclick = () => {
                const containerToCapture = printableCardsContainer;
                if (containerToCapture.children.length === 0) return;
                html2canvas(containerToCapture, { scrollX: 0, scrollY: -window.scrollY, scale: 2 }).then(canvas => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'kiropay-qr-cards.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
        }
        
        // --- و. الإعلانات (المنطق الجديد) ---
        if (adminAnnouncementForm) {
            adminAnnouncementForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const announcementTextValue = adminAnnouncementText.value.trim();
                const tickerTextValue = adminTickerText.value.trim();
                try {
                    const response = await fetch(`/admin-set-announcement`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            message: announcementTextValue,
                            ticker_message: tickerTextValue 
                        }),
                    });
                    if (response.ok) {
                        adminAnnouncementMessage.textContent = "تم النشر!";
                        loadAnnouncement();
                    }
                } catch (err) {}
            });
        }
        
        // --- ز. الكويز ---
        if (adminQuizForm) {
            adminQuizForm.addEventListener("submit", async (event) => {
                event.preventDefault(); 
                const question = document.getElementById("quiz-question").value.trim();
                const optionA = document.getElementById("quiz-opt-a").value.trim();
                const optionB = document.getElementById("quiz-opt-b").value.trim();
                const optionC = document.getElementById("quiz-opt-c").value.trim();
                const answer = document.getElementById("quiz-correct-opt").value.trim(); 
                const pointsInput = document.getElementById("quiz-points").value;
                const points = parseInt(pointsInput);

                try {
                    const response = await fetch(`/admin-create-quiz`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            question: question, opt_a: optionA, opt_b: optionB, opt_c: optionC, correct_opt: answer, points: points 
                        }),
                    });
                    if (response.ok) {
                        adminQuizMessage.textContent = `تم إضافة السؤال!`;
                        adminQuizForm.reset(); 
                    }
                } catch (err) {}
            });
        }

        // --- ح. المتجر (إضافة) ---
        if (adminAddItemForm) {
            adminAddItemForm.addEventListener("submit", async (event) => {
                event.preventDefault(); 
                const name = document.getElementById("store-item-name").value.trim();
                const price = parseInt(document.getElementById("store-item-price").value);
                const requiredLevel = parseInt(document.getElementById("store-item-required-level").value) || 1; 
                const imageFile = storeItemImageFile.files[0]; 

                let final_image_url = ''; 
                try {
                    if (imageFile) { 
                        const resizedBlob = await resizeImage(imageFile, 400, 400, 0.8); 
                        const formData = new FormData();
                        formData.append('file', resizedBlob);
                        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                        const cloudinaryResponse = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
                        const cloudinaryData = await cloudinaryResponse.json();
                        final_image_url = cloudinaryData.secure_url;
                    }
                    const response = await fetch(`/admin-add-item`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, price, image_url: final_image_url, required_level: requiredLevel, email: loggedInUserProfile.email }),
                    });
                    if (response.ok) {
                        adminStoreMessage.textContent = `تم الإضافة!`;
                        adminAddItemForm.reset(); 
                        await loadAdminStoreItems(); 
                    }
                } catch (err) {}
            });
        }

        // --- ط. المتجر (تعديل وحذف) ---
        // تم دمجها في loadAdminStoreItems لتسهيل الربط بالعناصر الديناميكية

    })(); // نهاية دالة الأدمن

    // -----------------------------------------------------
    // 6. منطق الجيست (الزائر) - المصحح
    // -----------------------------------------------------
    if(guestFamilyButtons) {
        guestFamilyButtons.forEach(btn => {
            btn.onclick = async () => {
                const family = btn.dataset.family;
                try {
                    const res = await fetch('/guest-get-family', {
                        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ family })
                    });
                    const d = await res.json();
                    if(d.users) {
                        guestResultsList.innerHTML = "";
                        d.users.forEach((u, i) => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span>${i+1}. ${u.name}</span> <strong>${u.balance}</strong>`;
                            li.style.cursor = "pointer";
                            li.onclick = () => showGuestStats(u.name, u.email);
                            guestResultsList.appendChild(li);
                        });
                        guestMessage.textContent = `عرض ${d.users.length} مستخدم`;
                        guestContainer.style.display = "block";
                    }
                } catch(e) {}
            }
        });
    }

    async function showGuestStats(name, email) {
        guestStatsName.textContent = name;
        guestStatsContent.innerHTML = "جاري التحميل...";
        guestStatsModal.style.display = "flex";
        try {
            const res = await fetch('/guest-get-family', { // استخدام نفس الفانكشن (الذكية)
                 method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ targetEmail: email })
            });
            const d = await res.json();
            if(d.mode === 'stats') {
                let html = "";
                for (const [k, v] of Object.entries(d.stats)) {
                     const color = v > 0 ? "color:#004a99;font-weight:bold;" : "color:#aaa;";
                     html += `<div class="stat-item"><div class="stat-label">${k}</div><div class="stat-value" style="${color}">${v}</div></div>`;
                }
                guestStatsContent.innerHTML = html;
            }
        } catch(e) {
            guestStatsContent.innerHTML = "خطأ";
        }
    }

    if(closeGuestStatsBtn) closeGuestStatsBtn.onclick = () => guestStatsModal.style.display = "none";

    // -----------------------------------------------------
    // 7. باقي الوظائف والـ Listeners
    // -----------------------------------------------------
    async function loadAnnouncement() {
        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await response.json();
            
            // 1. الإعلان الثابت (الصندوق)
            if (data.message && data.message.trim()) {
                if(userAnnouncementText) userAnnouncementText.textContent = data.message;
                if(userAnnouncementBox) userAnnouncementBox.style.display = "block";
            }

            // 2. شريط الأخبار (المتحرك)
            if (tickerTextDisplay) {
                const rawTicker = data.ticker_message || ""; 
                if(rawTicker) {
                    tickerTextDisplay.innerHTML = rawTicker.replace(/\|/g, '<span style="margin:0 20px; color:#ffc107">✦</span>');
                    const tickerContainer = document.querySelector('.news-ticker-container');
                    if(tickerContainer) tickerContainer.style.display = 'flex';
                    
                    const tickerMove = document.querySelector('.ticker-move');
                    if(tickerMove) {
                        const duration = Math.max(10, rawTicker.length / 5);
                        tickerMove.style.animation = `ticker-scroll ${duration}s linear infinite`;
                    }
                } else {
                    const tickerContainer = document.querySelector('.news-ticker-container');
                    if(tickerContainer) tickerContainer.style.display = 'none';
                }
            }
            
            // ملء حقول الأدمن
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                if (adminAnnouncementText) adminAnnouncementText.value = data.message || "";
                if (adminTickerText) adminTickerText.value = data.ticker_message || "";
            }

        } catch(e) {}
    }

    // تسجيل جديد
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = "جاري التسجيل...";
        messageDiv.style.color = "blue";

        const name = document.getElementById("name").value;
        const family = document.getElementById("family").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const avatarFile = document.getElementById("signup-avatar-file").files[0];

        let profile_image_url = DEFAULT_AVATAR_URL;

        try {
            if (avatarFile) {
                const resizedBlob = await resizeImage(avatarFile, 150, 150, 0.7); 
                const formData = new FormData();
                formData.append('file', resizedBlob);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                
                const cloudinaryResponse = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
                const cloudinaryData = await cloudinaryResponse.json();
                profile_image_url = cloudinaryData.secure_url;
            }

            const dataToFunctions = new FormData();
            dataToFunctions.append('name', name);
            dataToFunctions.append('family', family);
            dataToFunctions.append('email', email);
            dataToFunctions.append('password', password);
            dataToFunctions.append('profile_image_url', profile_image_url);

            const response = await fetch(`/signup`, { method: "POST", body: dataToFunctions });
            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = "تم التسجيل!";
                messageDiv.style.color = "green";
                signupForm.reset(); 
                loginForm.scrollIntoView(); 
            } else {
                messageDiv.textContent = data.error;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ";
            messageDiv.style.color = "red";
        }
    });

    // تغيير الصورة
    if(avatarUploadInput) {
        avatarUploadInput.addEventListener("change", async () => {
             // كود رفع الصورة (مختصر)
             // (يمكن إضافته هنا إذا كنت تحتاجه)
        });
    }

    // ربط الأزرار العامة
    if(refreshDataBtn) refreshDataBtn.onclick = refreshUserData;
    if(logoutBtn) logoutBtn.onclick = resetUI;
    if(logoutBtnGuest) logoutBtnGuest.onclick = resetUI;
    if(unlockedItemsBtn) unlockedItemsBtn.onclick = loadUserUnlockedItems;
    if(backToStoreBtn) backToStoreBtn.onclick = loadMainDashboard;

    // QR لليوزر
    if(showQrBtn) {
        showQrBtn.onclick = () => {
            if (!loggedInUserProfile) return;
            qrCodeContainer.innerHTML = '';
            new QRCode(qrCodeContainer, { text: loggedInUserProfile.email, width: 250, height: 250 });
            qrUserEmailDisplay.textContent = loggedInUserProfile.email;
            qrModalOverlay.style.display = 'flex';
        }
    }
    if(closeQrBtn) closeQrBtn.onclick = () => qrModalOverlay.style.display = 'none';

    // الكويز (إجابة)
    if(quizSubmitBtn) {
        quizSubmitBtn.onclick = async () => {
            if (!selectedOption) {
                quizMessage.textContent = "اختر إجابة";
                return;
            }
            quizSubmitBtn.disabled = true;
            try {
                const response = await fetch(`/submit-quiz-answer`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: loggedInUserProfile.email, quizId: currentQuizId, selectedOption: selectedOption })
                });
                const data = await response.json();
                quizMessage.textContent = data.message;
                if(data.success) refreshUserData();
            } catch(e) {}
        }
    }
    
    // خيارات الكويز
    quizOptionButtons.forEach(btn => {
        btn.onclick = () => {
            quizOptionButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = btn.dataset.value;
        }
    });

});
