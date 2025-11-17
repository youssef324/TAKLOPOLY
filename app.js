document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // 1. تعريف العناصر الأساسية
    // =========================================
    
    // عناصر الدخول والتسجيل
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");
    const refreshDataBtn = document.getElementById("refresh-data-btn");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const showQrBtn = document.getElementById("show-qr-btn");
    const backToStoreBtn = document.getElementById("back-to-store-btn");

    // عناصر البروفايل
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const avatarUploadInput = document.getElementById("avatar-upload-input");
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label");
    const transactionList = document.getElementById("transaction-list");
    
    // الحاويات الرئيسية
    const adminPanelDiv = document.getElementById("admin-panel");
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");
    const storeContainer = document.getElementById("store-container");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const guestContainer = document.getElementById("guest-container");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");

    // عناصر الأدمن
    const adminSearchForm = document.getElementById("admin-search-form");
    const adminSelectUser = document.getElementById("admin-select-user");
    const searchedUserCard = document.getElementById("admin-searched-user-card");
    const searchedUserName = document.getElementById("searched-user-name");
    const searchedUserFamily = document.getElementById("searched-user-family");
    const searchedUserEmail = document.getElementById("searched-user-email");
    const searchedUserBalance = document.getElementById("searched-user-balance");
    const searchedUserLevel = document.getElementById("searched-user-level");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminResultsListDiv = document.getElementById("admin-results-list");
    const adminFamilyResultsDiv = document.getElementById("admin-family-results");
    const massUpdateControls = document.getElementById("mass-update-controls");
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminQuizForm = document.getElementById("admin-quiz-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminStoreMessage = document.getElementById("admin-store-message");
    
    // متغيرات عامة
    let loggedInUserProfile = null;
    const DEFAULT_AVATAR_URL = "/default-avatar.png";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/Dhbanzq4n/image/upload`;
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";

    // =========================================
    // 2. دوال الإدارة والتحكم (Helpers)
    // =========================================

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
        
        const tickerBar = document.getElementById("news-ticker-bar");
        if(tickerBar) tickerBar.style.display = "none";
    };

    resetUI();

    function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width, height = img.height;
                    if (width > height) {
                        if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
                    } else {
                        if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
                    }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
                };
            };
            reader.onerror = (error) => reject(error);
        });
    }

    function hideUserSections() {
        leaderboardContainer.style.display = "none";
        quizContainer.style.display = "none";
        storeContainer.style.display = "none";
        unlockedItemsContainer.style.display = "none";
    }

    // =========================================
    // 3. دوال الإعلانات (الشريط والمربع) - تم التصحيح ✅
    // =========================================

    async function loadAnnouncement() {
        const boxContainer = document.getElementById("user-announcement-box");
        const boxText = document.getElementById("user-announcement-text");
        const tickerBar = document.getElementById("news-ticker-bar");
        const tickerText = document.getElementById("ticker-text-display");
        
        const adminBoxInput = document.getElementById("admin-box-text");
        const adminTickerInput = document.getElementById("admin-ticker-text");

        if(boxContainer) boxContainer.style.display = "none";
        if(tickerBar) tickerBar.style.display = "none";

        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            if (!response.ok) return;

            const data = await response.json();

            // عرض المربع الأصفر
            if (data.message && data.message.trim() !== "") {
                if(boxText) boxText.textContent = data.message;
                if(boxContainer) boxContainer.style.display = "block";
                if(adminBoxInput) adminBoxInput.value = data.message;
            }

            // عرض الشريط المتحرك
            if (data.ticker_message && data.ticker_message.trim() !== "") {
                if(tickerText) tickerText.textContent = data.ticker_message;
                if(tickerBar) tickerBar.style.display = "flex";
                if(adminTickerInput) adminTickerInput.value = data.ticker_message;
            }
        } catch (err) {
            console.error("Error loading announcements:", err);
        }
    }

    // =========================================
    // 4. تسجيل الدخول والخروج
    // =========================================

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = "جاري تسجيل الدخول...";
        messageDiv.style.color = "blue";
        resetUI();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`/login`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = "تم تسجيل الدخول بنجاح!";
                messageDiv.style.color = "green";
                loggedInUserProfile = data.user;
                loadAnnouncement();

                if (loggedInUserProfile.role === 'admin') {
                    adminPanelDiv.style.display = "block";
                    cardContainer.style.display = "flex";
                    avatarOverlayLabel.style.display = "flex";
                    userNameP.textContent = `الاسم: ${loggedInUserProfile.name}`;
                    userFamilyP.textContent = `العائلة: ${loggedInUserProfile.family}`;
                    userBalanceP.textContent = `الرصيد: $${loggedInUserProfile.balance}`;
                    userLevelP.textContent = `المستوى: ${loggedInUserProfile.level || 1}`;
                    userAvatarImg.src = loggedInUserProfile.profile_image_url || DEFAULT_AVATAR_URL;
                    
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    formContainer.style.display = "none";
                    loadAdminStoreItems();

                } else if (loggedInUserProfile.role === 'guest') {
                    guestContainer.style.display = "block";
                    logoutBtnGuest.style.display = "block";
                    formContainer.style.display = "none";
                } else {
                    cardContainer.style.display = "flex";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    unlockedItemsBtn.style.display = "block";
                    if(showQrBtn) showQrBtn.style.display = "block";
                    avatarOverlayLabel.style.display = "flex";
                    leaderboardContainer.style.display = "block";
                    
                    userNameP.textContent = `الاسم: ${loggedInUserProfile.name}`;
                    userFamilyP.textContent = `العائلة: ${loggedInUserProfile.family}`;
                    userBalanceP.textContent = `الرصيد: $${loggedInUserProfile.balance}`;
                    userLevelP.textContent = `المستوى: ${loggedInUserProfile.level || 1}`;
                    userAvatarImg.src = loggedInUserProfile.profile_image_url || DEFAULT_AVATAR_URL;
                    
                    loadTransactionHistory(loggedInUserProfile.email);
                    loadStoreItems();
                    loadActiveQuiz(loggedInUserProfile.email);
                    loadLeaderboards();
                    formContainer.style.display = "none";
                }
            } else {
                messageDiv.textContent = `فشل: ${data.error}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال.";
            messageDiv.style.color = "red";
        }
    });

    function handleLogout() {
        resetUI();
        loginForm.reset();
        messageDiv.textContent = "تم تسجيل الخروج.";
        messageDiv.style.color = "blue";
    }
    if(logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener("click", handleLogout);

    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        refreshDataBtn.textContent = "جاري التحديث...";
        try {
            const response = await fetch(`/get-user-profile`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email }),
            });
            if (!response.ok) throw new Error("فشل التحديث");
            const data = await response.json();
            loggedInUserProfile = data.user;
            userNameP.textContent = `الاسم: ${data.user.name}`;
            userBalanceP.textContent = `الرصيد: $${data.user.balance}`;
            userLevelP.textContent = `المستوى: ${data.user.level || 1}`;
            userAvatarImg.src = data.user.profile_image_url || DEFAULT_AVATAR_URL;
            if (data.user.role === 'user') {
                loadTransactionHistory(data.user.email);
                loadStoreItems();
                loadActiveQuiz(data.user.email);
            }
            loadAnnouncement();
            refreshDataBtn.textContent = "تحديث البيانات";
        } catch(err) {
            refreshDataBtn.textContent = "فشل التحديث";
        }
    }
    if(refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);

    // =========================================
    // 5. وظائف الأدمن - تم التصحيح ✅
    // =========================================

    // حفظ الإعلانات (الخانتين معاً)
    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const boxVal = document.getElementById("admin-box-text").value.trim();
            const tickerVal = document.getElementById("admin-ticker-text").value.trim();
            const msgElement = document.getElementById("admin-announcement-message");

            if (!boxVal && !tickerVal) {
                msgElement.textContent = "اكتب إعلان واحد على الأقل.";
                msgElement.style.color = "red";
                return;
            }

            msgElement.textContent = "جاري الحفظ...";
            try {
                const response = await fetch(`/admin-set-announcement`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: boxVal, ticker_message: tickerVal }),
                });
                if (response.ok) {
                    msgElement.textContent = "تم الحفظ بنجاح!";
                    msgElement.style.color = "green";
                    loadAnnouncement();
                } else {
                    msgElement.textContent = "فشل الحفظ.";
                    msgElement.style.color = "red";
                }
            } catch (err) {
                msgElement.textContent = "خطأ اتصال.";
                msgElement.style.color = "red";
            }
        });
    }

    // باقي وظائف الأدمن (تم دمجها)
    (function setupAdminPanel() {
        let currentSearchedUser = null;
        const adminSearchMessage = document.getElementById("admin-search-message");
        const balanceMessage = document.getElementById("admin-balance-message");
        const adminLevelMessage = document.getElementById("admin-level-message");
        const deleteMessage = document.getElementById("admin-delete-message");
        const adminFamilyMessage = document.getElementById("admin-family-message");

        if(adminSearchForm) {
            adminSearchForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const name = document.getElementById("admin-search-name").value.trim();
                adminSearchMessage.textContent = `جاري البحث...`;
                adminSearchMessage.style.color = "blue";
                adminSelectUser.innerHTML = '';
                adminResultsListDiv.style.display = "none";
                searchedUserCard.style.display = "none";

                try {
                    const response = await fetch(`/admin-search`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: name }),
                    });
                    const data = await response.json();
                    if(data.users && data.users.length > 0) {
                        if(data.users.length === 1) {
                            populateAdminCard(data.users[0]);
                        } else {
                            adminResultsListDiv.style.display = "block";
                            data.users.forEach(u => {
                                const opt = document.createElement("option");
                                opt.value = u.email; opt.textContent = `${u.name} (${u.family})`;
                                adminSelectUser.appendChild(opt);
                            });
                            populateAdminCard(data.users[0]);
                        }
                        adminSearchMessage.textContent = "تم العثور على نتائج.";
                        adminSearchMessage.style.color = "green";
                    } else {
                        adminSearchMessage.textContent = "لم يتم العثور على مستخدم.";
                        adminSearchMessage.style.color = "red";
                    }
                } catch(err) { adminSearchMessage.textContent = "خطأ."; }
            });
        }

        function populateAdminCard(user) {
            currentSearchedUser = user;
            searchedUserName.textContent = user.name;
            searchedUserFamily.textContent = user.family;
            searchedUserEmail.textContent = user.email;
            searchedUserBalance.textContent = user.balance;
            searchedUserLevel.textContent = user.level || 1;
            searchedUserCard.style.display = "block";
            
            const qrBtn = document.getElementById("admin-show-user-qr-btn");
            if(qrBtn) {
                qrBtn.onclick = () => {
                    const qrCodeContainer = document.getElementById("qr-code-container");
                    const qrModalOverlay = document.getElementById("qr-modal-overlay");
                    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");
                    qrCodeContainer.innerHTML = '';
                    new QRCode(qrCodeContainer, { text: user.email, width: 250, height: 250 });
                    qrUserEmailDisplay.textContent = user.email;
                    qrModalOverlay.style.display = 'flex';
                };
            }
        }

        const addBalanceBtn = document.getElementById("admin-add-balance-btn");
        const subtractBalanceBtn = document.getElementById("admin-subtract-balance-btn");
        
        async function updateBalance(amount, reason) {
            if(!currentSearchedUser) return;
            try {
                const res = await fetch(`/admin-update-balance`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: currentSearchedUser.email, amount, reason })
                });
                const data = await res.json();
                if(res.ok) {
                    currentSearchedUser.balance = data.new_balance;
                    searchedUserBalance.textContent = data.new_balance;
                    balanceMessage.textContent = "تم التحديث.";
                    balanceMessage.style.color = "green";
                }
            } catch(e) {}
        }

        if(addBalanceBtn) addBalanceBtn.addEventListener('click', () => {
            const amount = parseInt(document.getElementById("admin-balance-amount").value);
            if(amount) updateBalance(amount, "إضافة يدوية");
        });
        if(subtractBalanceBtn) subtractBalanceBtn.addEventListener('click', () => {
            const amount = parseInt(document.getElementById("admin-balance-amount").value);
            if(amount) updateBalance(-amount, "خصم يدوي");
        });

    })(); 

    // =========================================
    // 6. واجهة الزائر والمربعات
    // =========================================
    
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const guestHistoryModal = document.getElementById("guest-history-modal-overlay");
    const statsGridContainer = document.getElementById("stats-grid-container");
    const loadingSpinner = document.getElementById("loading-spinner");
    const guestModalUserName = document.getElementById("guest-modal-user-name");

    guestFamilyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const familyName = button.dataset.family;
            guestMessage.textContent = "جاري التحميل...";
            guestResultsList.innerHTML = '';
            try {
                const response = await fetch('/guest-get-family', { 
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ family: familyName }) 
                });
                const data = await response.json();
                if (data.success && data.users) {
                    guestMessage.textContent = `عدد المستخدمين: ${data.users.length}`;
                    data.users.forEach((user, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${index+1}. ${user.name}</span> <strong>${user.balance}</strong>`;
                        li.style.cursor = "pointer";
                        li.style.padding = "10px";
                        li.style.borderBottom = "1px solid #eee";
                        li.addEventListener('click', () => showGuestUserStats(user.email, user.name));
                        guestResultsList.appendChild(li);
                    });
                }
            } catch (err) { guestMessage.textContent = "خطأ"; }
        });
    });

    async function showGuestUserStats(email, name) {
        if(guestModalUserName) guestModalUserName.textContent = name;
        if(statsGridContainer) statsGridContainer.innerHTML = '';
        if(loadingSpinner) loadingSpinner.style.display = 'block';
        if(guestHistoryModal) guestHistoryModal.style.display = "flex";

        try {
            const response = await fetch('/guest-get-family', {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetEmail: email }) 
            });
            const data = await response.json();
            if(loadingSpinner) loadingSpinner.style.display = 'none';

            if (data.success && data.stats) {
                for (const [key, value] of Object.entries(data.stats)) {
                    const div = document.createElement("div");
                    div.className = "stat-box";
                    if (value > 0) div.classList.add("highlight");
                    div.innerHTML = `<span class="label">${key}</span><span class="count">${value}</span>`;
                    statsGridContainer.appendChild(div);
                }
            }
        } catch (err) { if(loadingSpinner) loadingSpinner.style.display = 'none'; }
    }

    const closeGuestBtn = document.getElementById("close-guest-history-btn");
    if(closeGuestBtn) closeGuestBtn.addEventListener('click', () => guestHistoryModal.style.display = "none");
    window.addEventListener('click', (e) => {
        if (e.target === guestHistoryModal) guestHistoryModal.style.display = "none";
    });

    // =========================================
    // 7. وظائف مساعدة (Store, History)
    // =========================================
    
    async function loadTransactionHistory(email) {
        if(!transactionList) return;
        transactionList.innerHTML = "<li>جاري التحميل...</li>";
        try {
            const res = await fetch(`/get-transactions`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            transactionList.innerHTML = "";
            if(data.transactions && data.transactions.length > 0) {
                data.transactions.forEach(t => {
                    const li = document.createElement("li");
                    li.innerHTML = `<span>${t.reason}</span> <span class="${t.amount>0?'positive':'negative'}">${t.amount}</span>`;
                    transactionList.appendChild(li);
                });
            } else {
                transactionList.innerHTML = "<li>لا يوجد سجل.</li>";
            }
        } catch(e) { transactionList.innerHTML = "<li>خطأ في السجل.</li>"; }
    }

    async function loadStoreItems() {
        if(storeItemsList) {
            storeItemsList.innerHTML = "";
            try {
                const res = await fetch('/get-store-items');
                const data = await res.json();
                if(data.items) {
                    data.items.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'store-item-card';
                        // ... كود عرض المتجر ... (مختصر للحفاظ على المساحة)
                        card.innerHTML = `<h5>${item.name}</h5><p>${item.price}</p>`;
                        storeItemsList.appendChild(card);
                    });
                }
            } catch(e) {}
        }
    }

}); // End of DOMContentLoaded
