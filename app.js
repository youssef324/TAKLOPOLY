document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // 1. تعريف العناصر الأساسية
    // =========================================
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

    // عناصر المستخدم
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const avatarUploadInput = document.getElementById("avatar-upload-input");
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label");
    const transactionList = document.getElementById("transaction-list");

    // الحاويات
    const adminPanelDiv = document.getElementById("admin-panel");
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");
    const storeContainer = document.getElementById("store-container");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const guestContainer = document.getElementById("guest-container");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const unlockedItemsMessage = document.getElementById("unlocked-items-message");

    // عناصر الكويز
    const quizQuestionText = document.getElementById("quiz-question-text");
    const quizBtnA = document.getElementById("quiz-btn-a");
    const quizBtnB = document.getElementById("quiz-btn-b");
    const quizBtnC = document.getElementById("quiz-btn-c");
    const quizOptionButtons = document.querySelectorAll(".quiz-option-btn");
    const quizSubmitBtn = document.getElementById("quiz-submit-btn");
    const quizMessage = document.getElementById("quiz-message");

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
    let currentQuizId = null;
    let selectedOption = null;
    const DEFAULT_AVATAR_URL = "/default-avatar.png";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/Dhbanzq4n/image/upload`;
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";

    // =========================================
    // 2. دوال المساعدة (Reset UI & Helpers)
    // =========================================

    const resetUI = () => {
        if (cardContainer) cardContainer.style.display = "none";
        if (formContainer) formContainer.style.display = "flex";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (logoutBtnGuest) logoutBtnGuest.style.display = "none";
        if (guestContainer) guestContainer.style.display = "none";
        if (refreshDataBtn) refreshDataBtn.style.display = "none";
        if (unlockedItemsBtn) unlockedItemsBtn.style.display = "none";
        if (showQrBtn) showQrBtn.style.display = "none";
        if (adminPanelDiv) adminPanelDiv.style.display = "none";
        if (leaderboardContainer) leaderboardContainer.style.display = "none";
        if (quizContainer) quizContainer.style.display = "none";
        if (storeContainer) storeContainer.style.display = "none";
        if (unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
        if (avatarOverlayLabel) avatarOverlayLabel.style.display = "none";
        if (massUpdateControls) massUpdateControls.style.display = "none";
        if (userAnnouncementBox) userAnnouncementBox.style.display = "none";

        loggedInUserProfile = null;
        if (transactionList) transactionList.innerHTML = "";
        if (userLevelP) userLevelP.textContent = "";
        
        const tickerBar = document.getElementById("news-ticker-bar");
        if(tickerBar) tickerBar.style.display = "none";
    };

    resetUI();

    function hideUserSections() {
        if(leaderboardContainer) leaderboardContainer.style.display = "none";
        if(quizContainer) quizContainer.style.display = "none";
        if(storeContainer) storeContainer.style.display = "none";
        if(unlockedItemsContainer) unlockedItemsContainer.style.display = "none";
    }
    
    // دالة ضغط الصور
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

    // =========================================
    // 3. الإعلانات (Database Version)
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

            // المربع الأصفر
            if (data.message && data.message.trim() !== "") {
                if(boxText) boxText.textContent = data.message;
                if(boxContainer) boxContainer.style.display = "block";
                if(adminBoxInput) adminBoxInput.value = data.message;
            }
            // الشريط المتحرك
            if (data.ticker_message && data.ticker_message.trim() !== "") {
                if(tickerText) tickerText.textContent = data.ticker_message;
                if(tickerBar) tickerBar.style.display = "flex";
                if(adminTickerInput) adminTickerInput.value = data.ticker_message;
            }
        } catch (err) { console.error("Announcement Error", err); }
    }

    // =========================================
    // 4. تسجيل الدخول والوظائف الأساسية
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
                const user = data.user;
                loggedInUserProfile = user;
                
                loadAnnouncement();

                if (user.role === 'admin') {
                    adminPanelDiv.style.display = "block";
                    cardContainer.style.display = "flex";
                    avatarOverlayLabel.style.display = "flex";
                    
                    userNameP.textContent = `الاسم: ${user.name}`;
                    userFamilyP.textContent = `العائلة: ${user.family}`;
                    userBalanceP.textContent = `الرصيد: $${user.balance}`;
                    userLevelP.textContent = `المستوى: ${user.level || 1}`;
                    userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
                    
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    formContainer.style.display = "none";
                    
                    loadAdminStoreItems(); // تحميل متجر الأدمن

                } else if (user.role === 'guest') {
                    guestContainer.style.display = "block";
                    logoutBtnGuest.style.display = "block";
                    formContainer.style.display = "none";

                } else {
                    // يوزر عادي
                    cardContainer.style.display = "flex";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    unlockedItemsBtn.style.display = "block";
                    if(showQrBtn) showQrBtn.style.display = "block";
                    avatarOverlayLabel.style.display = "flex";
                    leaderboardContainer.style.display = "block";
                    
                    userNameP.textContent = `الاسم: ${user.name}`;
                    userFamilyP.textContent = `العائلة: ${user.family}`;
                    userBalanceP.textContent = `الرصيد: $${user.balance}`;
                    userLevelP.textContent = `المستوى: ${user.level || 1}`;
                    userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
                    
                    // تحميل كل بيانات اليوزر
                    await loadTransactionHistory(user.email);
                    await loadMainDashboard();
                }
            } else {
                messageDiv.textContent = `فشل: ${data.error}`;
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال.";
            messageDiv.style.color = "red";
            console.error("Login Error:", err);
        }
    });

    async function loadMainDashboard() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        hideUserSections();
        try { await loadLeaderboards(); } catch(e) { console.error(e); }
        try { await loadActiveQuiz(loggedInUserProfile.email); } catch(e) { console.error(e); }
        try { await loadStoreItems(); } catch(e) { console.error(e); }
    }

    // =========================================
    // 5. وظائف المتجر (Store) - كاملة
    // =========================================
    async function loadStoreItems() {
        if (!loggedInUserProfile || loggedInUserProfile.role === 'admin') return;
        storeContainer.style.display = "block";
        if(storeLoadingMessage) storeLoadingMessage.style.display = 'block';
        if(storeItemsList) storeItemsList.innerHTML = '';
        if(storeMessage) storeMessage.textContent = "";

        try {
            const response = await fetch(`/get-store-items`);
            const data = await response.json();
            if(storeLoadingMessage) storeLoadingMessage.style.display = 'none';
            
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'store-item-card';
                    
                    const userLevel = loggedInUserProfile.level || 1;
                    const canAfford = loggedInUserProfile.balance >= item.price;
                    const highEnoughLevel = userLevel >= (item.required_level || 1);
                    
                    let btnText = `شراء (${item.price} نقطة)`;
                    if (!highEnoughLevel) {
                        btnText = `يتطلب مستوى ${item.required_level}`;
                        card.classList.add('locked');
                    } else if (!canAfford) {
                        btnText = "النقاط غير كافية";
                    }
                    
                    const levelText = (item.required_level > 1) ? `<p class="level-req">يتطلب مستوى ${item.required_level}</p>` : '';

                    card.innerHTML = `
                        <img src="${item.image_url || '/default-item.png'}" alt="${item.name}">
                        <h5>${item.name}</h5>
                        ${levelText}
                        <p class="price">$${item.price}</p>
                        <button class="buy-item-btn" data-id="${item.id}" ${(!canAfford || !highEnoughLevel) ? 'disabled' : ''}>${btnText}</button>
                    `;
                    storeItemsList.appendChild(card);
                });
                
                document.querySelectorAll('.buy-item-btn').forEach(btn => {
                    btn.addEventListener('click', handleBuyItem);
                });
            } else {
                storeItemsList.innerHTML = '<p style="text-align:center;">المتجر فارغ حالياً.</p>';
            }
        } catch(err) { console.error(err); }
    }

    async function handleBuyItem(e) {
        const itemId = e.target.dataset.id;
        e.target.disabled = true;
        storeMessage.textContent = "جاري الشراء...";
        storeMessage.style.color = "blue";

        try {
            const response = await fetch(`/buy-store-item`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email, itemId })
            });
            const data = await response.json();
            if (response.ok || data.success) {
                storeMessage.textContent = data.message || "تم الشراء!";
                storeMessage.style.color = "green";
                await refreshUserData();
            } else {
                storeMessage.textContent = data.error;
                storeMessage.style.color = "red";
            }
        } catch(err) {
            storeMessage.textContent = "خطأ في العملية.";
            storeMessage.style.color = "red";
        }
    }

    if (unlockedItemsBtn) {
        unlockedItemsBtn.addEventListener('click', async () => {
            hideUserSections();
            unlockedItemsContainer.style.display = "block";
            unlockedItemsList.innerHTML = "جاري التحميل...";
            try {
                const res = await fetch(`/get-unlocked-items`, {
                    method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ email: loggedInUserProfile.email })
                });
                const data = await res.json();
                unlockedItemsList.innerHTML = "";
                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const div = document.createElement("div");
                        div.className = "store-item-card";
                        div.innerHTML = `<img src="${item.image_url || '/default-item.png'}"><h5>${item.name}</h5><p>تم الشراء</p>`;
                        unlockedItemsList.appendChild(div);
                    });
                } else {
                    unlockedItemsList.innerHTML = "<p style='text-align:center'>لا يوجد مشتريات.</p>";
                }
            } catch(e) { unlockedItemsList.innerHTML = "خطأ"; }
        });
    }
    
    if(backToStoreBtn) backToStoreBtn.addEventListener('click', loadMainDashboard);

    // =========================================
    // 6. وظائف الكويز (Quiz) - كاملة
    // =========================================
    async function loadActiveQuiz(email) {
        if(quizContainer) quizContainer.style.display = "block";
        try {
            const res = await fetch(`/get-active-quiz`, {
                method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email })
            });
            if(!res.ok) {
                if(quizContainer) quizContainer.innerHTML = '<p style="text-align:center; color:orange;">لا يوجد سؤال متاح حالياً.</p>';
                return;
            }
            const data = await res.json();
            const quiz = data.quiz;
            
            if(quizQuestionText) quizQuestionText.textContent = `${quiz.question_text} (+${quiz.points})`;
            if(quizBtnA) quizBtnA.textContent = quiz.option_a;
            if(quizBtnB) quizBtnB.textContent = quiz.option_b;
            if(quizBtnC) quizBtnC.textContent = quiz.option_c;
            
            currentQuizId = quiz.id;
            selectedOption = null;
            if(quizMessage) quizMessage.textContent = "";
            quizOptionButtons.forEach(b => b.classList.remove('selected'));
            if(quizSubmitBtn) quizSubmitBtn.disabled = false;
            
        } catch(e) { console.error(e); }
    }

    quizOptionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            quizOptionButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = btn.dataset.value;
        });
    });

    if(quizSubmitBtn) {
        quizSubmitBtn.addEventListener('click', async () => {
            if(!selectedOption) return alert("اختر إجابة");
            quizMessage.textContent = "جاري الإرسال...";
            try {
                const res = await fetch(`/submit-quiz-answer`, {
                    method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ email: loggedInUserProfile.email, quizId: currentQuizId, selectedOption })
                });
                const data = await res.json();
                if(data.success) {
                    quizMessage.textContent = data.message;
                    quizMessage.style.color = "green";
                    refreshUserData();
                } else {
                    quizMessage.textContent = data.message;
                    quizMessage.style.color = "red";
                }
            } catch(e) { quizMessage.textContent = "خطأ"; }
        });
    }

    // =========================================
    // 7. وظائف الجيست (Guest) - كاملة
    // =========================================
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestModalUserName = document.getElementById("guest-modal-user-name");
    const guestHistoryModal = document.getElementById("guest-history-modal-overlay");
    const statsGridContainer = document.getElementById("stats-grid-container");
    const loadingSpinner = document.getElementById("loading-spinner");
    const guestMessage = document.getElementById("guest-message");

    guestFamilyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const familyName = btn.dataset.family;
            if(guestMessage) guestMessage.textContent = "جاري التحميل...";
            if(guestResultsList) guestResultsList.innerHTML = "";
            try {
                const res = await fetch('/guest-get-family', {
                    method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ family: familyName })
                });
                const data = await res.json();
                if(data.users) {
                    if(guestMessage) guestMessage.textContent = `عدد المستخدمين: ${data.users.length}`;
                    data.users.forEach((u, idx) => {
                        const li = document.createElement("li");
                        li.style.cursor = "pointer";
                        li.style.padding = "10px";
                        li.style.borderBottom = "1px solid #eee";
                        li.innerHTML = `<span>${idx+1}. ${u.name}</span> <strong>${u.balance}</strong>`;
                        li.addEventListener('click', () => showGuestUserStats(u.email, u.name));
                        guestResultsList.appendChild(li);
                    });
                }
            } catch(e) { if(guestMessage) guestMessage.textContent = "خطأ"; }
        });
    });

    async function showGuestUserStats(email, name) {
        if(guestModalUserName) guestModalUserName.textContent = name;
        if(statsGridContainer) statsGridContainer.innerHTML = "";
        if(loadingSpinner) loadingSpinner.style.display = "block";
        if(guestHistoryModal) guestHistoryModal.style.display = "flex";

        try {
            const res = await fetch('/guest-get-family', {
                method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ targetEmail: email })
            });
            const data = await res.json();
            if(loadingSpinner) loadingSpinner.style.display = "none";

            if(data.stats) {
                for (const [key, value] of Object.entries(data.stats)) {
                    const div = document.createElement("div");
                    div.className = "stat-box";
                    if(value > 0) div.classList.add("highlight");
                    div.innerHTML = `<span class="label">${key}</span><span class="count">${value}</span>`;
                    statsGridContainer.appendChild(div);
                }
            }
        } catch(e) { if(loadingSpinner) loadingSpinner.style.display = "none"; }
    }
    
    const closeGuestBtn = document.getElementById("close-guest-history-btn");
    if(closeGuestBtn) closeGuestBtn.addEventListener('click', () => guestHistoryModal.style.display = "none");
    window.addEventListener('click', (e) => {
        if(e.target === guestHistoryModal) guestHistoryModal.style.display = "none";
    });

    // =========================================
    // 8. وظائف الأدمن (Balance, Scan, etc.)
    // =========================================
    
    // حفظ الإعلانات (الأدمن)
    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const boxVal = document.getElementById("admin-box-text").value.trim();
            const tickerVal = document.getElementById("admin-ticker-text").value.trim();
            const msgElement = document.getElementById("admin-announcement-message");
            
            if (!boxVal && !tickerVal) return msgElement.textContent = "أدخل نصاً.";
            msgElement.textContent = "جاري الحفظ...";
            
            try {
                const res = await fetch(`/admin-set-announcement`, {
                    method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ message: boxVal, ticker_message: tickerVal })
                });
                if (res.ok) {
                    msgElement.textContent = "تم الحفظ!";
                    msgElement.style.color = "green";
                    loadAnnouncement();
                } else { msgElement.textContent = "فشل"; }
            } catch(e) { msgElement.textContent = "خطأ"; }
        });
    }

    // باقي منطق الأدمن (تم تجميعه هنا لتجنب الأخطاء)
    (function setupAdminPanel() {
        let currentSearchedUser = null;
        const adminSearchMessage = document.getElementById("admin-search-message");

        if(adminSearchForm) {
            adminSearchForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const name = document.getElementById("admin-search-name").value.trim();
                if(!name) return;
                
                try {
                    const res = await fetch(`/admin-search`, {
                        method: "POST", headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ name })
                    });
                    const data = await res.json();
                    adminResultsListDiv.style.display = "none";
                    searchedUserCard.style.display = "none";
                    
                    if(data.users && data.users.length > 0) {
                        if(data.users.length === 1) {
                            populateAdminCard(data.users[0]);
                        } else {
                            adminSelectUser.innerHTML = "";
                            data.users.forEach(u => {
                                const opt = document.createElement("option");
                                opt.value = u.email; opt.textContent = `${u.name}`;
                                adminSelectUser.appendChild(opt);
                            });
                            adminResultsListDiv.style.display = "block";
                            populateAdminCard(data.users[0]);
                        }
                    } else { adminSearchMessage.textContent = "لم يتم العثور على مستخدم."; }
                } catch(err) { console.error(err); }
            });
        }

        function populateAdminCard(user) {
            currentSearchedUser = user;
            searchedUserName.textContent = `الاسم: ${user.name}`;
            searchedUserFamily.textContent = `العائلة: ${user.family}`;
            searchedUserEmail.textContent = `الإيميل: ${user.email}`;
            searchedUserBalance.textContent = `الرصيد: ${user.balance}`;
            searchedUserLevel.textContent = user.level || 1;
            searchedUserCard.style.display = "block";
            
            const showQr = document.getElementById("admin-show-user-qr-btn");
            if(showQr) showQr.onclick = () => {
                const qrCodeContainer = document.getElementById("qr-code-container");
                const qrModalOverlay = document.getElementById("qr-modal-overlay");
                const qrUserEmailDisplay = document.getElementById("qr-user-email-display");
                qrCodeContainer.innerHTML = "";
                new QRCode(qrCodeContainer, { text: user.email, width: 250, height: 250 });
                qrUserEmailDisplay.textContent = user.email;
                qrModalOverlay.style.display = "flex";
            };
        }
        
        // تحديث الرصيد والمستوى (Admin Buttons)
        const addBal = document.getElementById("admin-add-balance-btn");
        const subBal = document.getElementById("admin-subtract-balance-btn");
        const updLvl = document.getElementById("admin-update-level-btn");
        const delUsr = document.getElementById("admin-delete-user-btn");
        
        async function doUpdate(url, body) {
            if(!currentSearchedUser) return;
            try {
                const res = await fetch(url, {
                    method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                const data = await res.json();
                if(res.ok) {
                    if(data.new_balance !== undefined) {
                        currentSearchedUser.balance = data.new_balance;
                        searchedUserBalance.textContent = `الرصيد: ${data.new_balance}`;
                    }
                    if(data.new_level !== undefined) {
                        currentSearchedUser.level = data.new_level;
                        searchedUserLevel.textContent = data.new_level;
                    }
                    alert("تم التحديث بنجاح");
                    if(loggedInUserProfile.email === currentSearchedUser.email) refreshUserData();
                }
            } catch(e) { alert("خطأ"); }
        }

        if(addBal) addBal.addEventListener('click', () => {
            const amount = parseInt(document.getElementById("admin-balance-amount").value);
            if(amount) doUpdate('/admin-update-balance', { email: currentSearchedUser.email, amount, reason: "إضافة يدوية" });
        });
        if(subBal) subBal.addEventListener('click', () => {
            const amount = parseInt(document.getElementById("admin-balance-amount").value);
            if(amount) doUpdate('/admin-update-balance', { email: currentSearchedUser.email, amount: -amount, reason: "خصم يدوي" });
        });
        if(updLvl) updLvl.addEventListener('click', () => {
            const newLevel = parseInt(document.getElementById("admin-level-amount").value);
            if(newLevel) doUpdate('/admin-update-level', { adminEmail: loggedInUserProfile.email, targetEmail: currentSearchedUser.email, newLevel });
        });
        if(delUsr) delUsr.addEventListener('click', async () => {
            if(!confirm("حذف نهائي؟")) return;
            await doUpdate('/admin-delete-user', { adminEmail: loggedInUserProfile.email, emailToDelete: currentSearchedUser.email });
            searchedUserCard.style.display = "none";
        });
        
        // Batch Scan Logic (Admin)
        let scannedBatchList = [];
        const startScanBtn = document.getElementById("start-scan-btn");
        const batchScanList = document.getElementById("batch-scan-list");
        const batchScanContainer = document.getElementById("batch-scan-container");
        const submitBatchBtn = document.getElementById("submit-batch-rewards-btn");
        let html5QrCode;

        if(startScanBtn) {
            startScanBtn.addEventListener('click', () => {
                if (html5QrCode && html5QrCode.isScanning) {
                    html5QrCode.stop().then(() => {
                        startScanBtn.textContent = "تشغيل الكاميرا";
                        document.getElementById("reader").innerHTML = "";
                    });
                    return;
                }
                html5QrCode = new Html5Qrcode("reader");
                html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
                    (decodedText) => {
                        const email = decodedText.trim();
                        if(!scannedBatchList.includes(email)) {
                            scannedBatchList.push(email);
                            updateBatchUI();
                        }
                    }
                ).then(() => startScanBtn.textContent = "إيقاف");
            });
        }

        function updateBatchUI() {
            if(!batchScanList) return;
            batchScanList.innerHTML = "";
            if(scannedBatchList.length > 0) {
                batchScanContainer.style.display = "block";
                document.getElementById("batch-count").textContent = scannedBatchList.length;
                scannedBatchList.forEach((email, idx) => {
                    const li = document.createElement("li");
                    li.innerHTML = `${email} <button onclick="removeBatchItem(${idx})">X</button>`;
                    batchScanList.appendChild(li);
                });
            }
        }
        // تعليق الدالة في Window عشان الـ onclick في الـ HTML يشوفها
        window.removeBatchItem = (idx) => {
            scannedBatchList.splice(idx, 1);
            updateBatchUI();
        };

        if(submitBatchBtn) {
            submitBatchBtn.addEventListener('click', async () => {
                if(scannedBatchList.length === 0) return;
                const rewardData = document.getElementById("reward-reason-select").value.split(':');
                const amount = parseInt(rewardData[0]);
                const reason = rewardData[1];
                
                submitBatchBtn.disabled = true;
                submitBatchBtn.textContent = "جاري التنفيذ...";
                
                for (const email of scannedBatchList) {
                    try {
                        await fetch('/scan-attendance', {
                            method: "POST", headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({ scannedEmail: email, rewardAmount: amount, reason, adminEmail: loggedInUserProfile.email })
                        });
                    } catch(e) {}
                }
                alert("تم التنفيذ");
                scannedBatchList = [];
                updateBatchUI();
                submitBatchBtn.disabled = false;
                submitBatchBtn.textContent = "تنفيذ المكافآت";
                refreshUserData();
            });
        }
        
        // Admin Add Item
        if(adminAddItemForm) {
            adminAddItemForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById("store-item-name").value;
                const price = document.getElementById("store-item-price").value;
                const level = document.getElementById("store-item-required-level").value;
                try {
                     await fetch('/admin-add-item', {
                        method: "POST", headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ name, price, required_level: level, email: loggedInUserProfile.email })
                    });
                    alert("تمت الإضافة");
                    loadAdminStoreItems();
                } catch(err) { alert("خطأ"); }
            });
        }

        // Load Admin Store Items
        async function loadAdminStoreItems() {
            if(!adminStoreItemsList) return;
            adminStoreItemsList.innerHTML = "جاري التحميل...";
            try {
                const res = await fetch('/admin-get-items');
                const data = await res.json();
                adminStoreItemsList.innerHTML = "";
                if(data.items) {
                    data.items.forEach(item => {
                        const li = document.createElement("li");
                        li.className = "admin-item-card";
                        li.innerHTML = `
                            <div><strong>${item.name}</strong> <small>${item.price} نقطة</small></div>
                            <button class="delete-store-item-btn" data-id="${item.id}">حذف</button>
                        `;
                        adminStoreItemsList.appendChild(li);
                    });
                    document.querySelectorAll('.delete-store-item-btn').forEach(btn => {
                        btn.addEventListener('click', async (e) => {
                           if(!confirm("حذف؟")) return;
                           await fetch('/admin-delete-item', {
                               method: "POST", headers: {"Content-Type": "application/json"},
                               body: JSON.stringify({ itemId: e.target.dataset.id })
                           });
                           loadAdminStoreItems();
                        });
                    });
                }
            } catch(e) {}
        }
        
    })(); // End Admin Setup

    // =========================================
    // 9. اللوج اوت والريفرش
    // =========================================
    function handleLogout() {
        resetUI();
        loginForm.reset();
        messageDiv.textContent = "تم تسجيل الخروج.";
    }
    if(logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if(logoutBtnGuest) logoutBtnGuest.addEventListener('click', handleLogout);

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
            } else { transactionList.innerHTML = "<li>لا يوجد سجل.</li>"; }
        } catch(e) { transactionList.innerHTML = "<li>خطأ في السجل.</li>"; }
    }

    async function loadLeaderboards() {
        if(!topChampionsList) return;
        topChampionsList.innerHTML = "جاري التحميل...";
        try {
            const res = await fetch('/get-top-champions', { method: "POST" });
            const data = await res.json();
            topChampionsList.innerHTML = "";
            if(data.champions) {
                data.champions.forEach((u, idx) => {
                    const div = document.createElement("div");
                    div.className = "champion-card";
                    div.innerHTML = `<div class="rank">${idx+1}</div><img src="${u.profile_image_url||DEFAULT_AVATAR_URL}" class="card-img"><span class="name">${u.name}</span><small>${u.balance}</small>`;
                    topChampionsList.appendChild(div);
                });
            }
            // تحميل باقي القوائم (مختصر)
            loadFamilyList("اسرة الانبا موسي الاسود", "family-anba-moussa-list");
            loadFamilyList("اسرة مارجرس", "family-margerges-list");
            loadFamilyList("اسرة الانبا كاراس", "family-anba-karas-list");
        } catch(e) {}
    }

    async function loadFamilyList(family, elementId) {
        const list = document.getElementById(elementId);
        if(!list) return;
        try {
            const res = await fetch('/get-family-top-10', {
                method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ family })
            });
            const data = await res.json();
            list.innerHTML = "";
            if(data.users) {
                data.users.forEach((u, idx) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<span>${idx+1}. ${u.name}</span> <strong>${u.balance}</strong>`;
                    list.appendChild(li);
                });
            }
        } catch(e) {}
    }

});
