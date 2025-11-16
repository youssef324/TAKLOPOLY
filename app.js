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
    
    // 🛑 عناصر العرض المباشر الجديدة 🛑
    const inlineQrDisplayContainer = document.getElementById("inline-qr-display-container");
    const inlineQrCodeArea = document.getElementById("inline-qr-code-area");
    const inlineQrEmailDisplayArea = document.getElementById("inline-qr-email-display-area");
    const editModalOverlay = document.getElementById("edit-modal-overlay");

    // 🛑 عناصر الأدمن الجديدة
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

    // 🛑 [FINAL FIX] دالة إعادة الضبط القسرية (لحماية من ظهور المودلز)
    const resetUI = () => {
        // إخفاء الأقسام الرئيسية
        if(cardContainer) cardContainer.style.display = "none";
        if(formContainer) formContainer.style.display = "flex"; 
        if(logoutBtn) logoutBtn.style.display = "none";
        if(refreshDataBtn) refreshDataBtn.style.display = "none";
        if(adminPanelDiv) adminPanelDiv.style.display = "none";
        if(guestContainer) guestContainer.style.display = "none";

        // إخفاء عناصر المستخدم
        hideUserSections();
        if(unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
        if(showQrBtn) showQrBtn.style.display = "none";
        if(avatarOverlayLabel) avatarOverlayLabel.style.display = "none";

        // 🛑🛑 إخفاء النوافذ المنبثقة والـ Inline بشكل قسري 🛑🛑
        if(editModalOverlay) editModalOverlay.style.display = "none";
        if(guestDetailsModal) guestDetailsModal.style.display = "none";
        if(inlineQrDisplayContainer) inlineQrDisplayContainer.style.display = "none";

        // إخفاء نوافذ الأدمن الجديدة
        if(document.getElementById('admin-main-menu')) document.getElementById('admin-main-menu').style.display = 'grid';
        if(adminViews) adminViews.forEach(view => view.style.display = 'none');

        // تصفير البيانات
        loggedInUserProfile = null;
    };
    
    resetUI(); 
    
    // 🛑 دالة وهمية لتحديث بيانات الكارت (لإصلاح مشكلة تسجيل الدخول)
    function updateUserCardUI(user) {
        if(userNameP) userNameP.textContent = `الاسم: ${user.name}`;
        if(userFamilyP) userFamilyP.textContent = `العائلة: ${user.family}`;
        if(userBalanceP) userBalanceP.textContent = `الرصيد: $${user.balance}`;
        if(userLevelP) userLevelP.textContent = `المستوى: ${user.level || 1}`; 
        if(userAvatarImg) userAvatarImg.src = user.profile_image_url ? user.profile_image_url : DEFAULT_AVATAR_URL;
        // يجب أن تعمل loadTransactionHistory هنا
        // loadTransactionHistory(user.email);
    }
    
    // ... (rest of helper functions like resizeImage) ...

    // -----------------------------------------------------
    // 3. دوال جلب البيانات (APIs/STUBs) - يجب أن تكون موجودة
    // -----------------------------------------------------

    async function loadLeaderboards() { /* ... existing logic ... */ }
    async function loadActiveQuiz(email) { /* ... existing logic ... */ }
    async function loadStoreItems() { /* ... existing logic ... */ }
    async function loadTransactionHistory(email) { /* ... existing logic ... */ }
    async function loadAdminStoreItems() { /* ... existing logic ... */ }

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
            console.error("Refresh Error:", err);
        }
        if(refreshDataBtn) refreshDataBtn.textContent = "تحديث البيانات";
    }

    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login Logic)
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
                
                await refreshUserData(); // 🛑 يشغل loadMainDashboard و يظهر الأزرار
            } else {
                messageDiv.textContent = `فشل: ${data.error || "خطأ في بيانات الدخول"}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "حدث خطأ في الاتصال بالشبكة أو فشل غير متوقع.";
            messageDiv.style.color = "red";
        }
    });

    // -----------------------------------------------------
    // 5. منطق الأزرار المعطلة (Admin/Guest Fix)
    // -----------------------------------------------------
    
    // 🛑 [ADMIN FIX] منطق التنقل بين أقسام الأدمن (Admin Menu)
    if (menuButtons) {
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                
                if(document.getElementById('admin-main-menu')) document.getElementById('admin-main-menu').style.display = 'none';
                if(adminViews) adminViews.forEach(view => view.style.display = 'none');
                
                const targetSection = document.getElementById(targetId);
                if(targetSection) targetSection.style.display = 'block';

                // Stop scanner if moving away from scan view
                // if (targetId !== 'admin-scan-view' && html5QrCode && html5QrCode.isScanning) { html5QrCode.stop().catch(() => {}); }
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
                
                if(document.getElementById('admin-main-menu')) document.getElementById('admin-main-menu').style.display = 'grid'; 
                
                // if (html5QrCode && html5QrCode.isScanning) { html5QrCode.stop().catch(() => {}); }
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

            if (inlineQrCodeArea) inlineQrCodeArea.innerHTML = '';
            const qrData = loggedInUserProfile.email;

            new QRCode(inlineQrCodeArea, {
                text: qrData, width: 150, height: 150, colorDark: "#000000",
                colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H
            });
            
            if (inlineQrEmailDisplayArea) inlineQrEmailDisplayArea.textContent = loggedInUserProfile.email;
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

    // ... (rest of the listeners and complex functions like handleBuyItem, setupAdminPanel, etc.) ...
});
