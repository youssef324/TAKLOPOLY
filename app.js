document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");
    const refreshDataBtn = document.getElementById("refresh-data-btn");
    const guestContainer = document.getElementById("guest-container");
    const adminPanelDiv = document.getElementById("admin-panel");

    // User Elements
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const transactionList = document.getElementById("transaction-list");

    // Announcement Elements
    const newsTicker = document.getElementById("news-ticker");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");

    // Store & Leaderboard
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const backToStoreBtn = document.getElementById("back-to-store-btn");
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");

    // Admin Scan Elements
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    const scannedListContainer = document.getElementById("scanned-list-container");
    const scannedUsersList = document.getElementById("scanned-users-list");
    const batchAddPointsBtn = document.getElementById("batch-add-points-btn");
    
    // Print & Guest Modal Elements
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn");
    const printableCardsContainer = document.getElementById("admin-printable-cards-container");
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const guestDetailsModal = document.getElementById("guest-details-modal");
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");
    const adminSearchForm = document.getElementById("admin-search-form");
    const adminResultsList = document.getElementById("admin-results-list");
    const adminSelectUser = document.getElementById("admin-select-user");
    const adminSearchedUserCard = document.getElementById("admin-searched-user-card");
    const adminSearchMessage = document.getElementById("admin-search-message");

    // Edit & QR Modals
    const editModalOverlay = document.getElementById("edit-modal-overlay");
    const closeEditModal = document.getElementById("close-edit-modal");
    const editItemForm = document.getElementById("edit-item-form");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const showQrBtn = document.getElementById("show-qr-btn");
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn");

    let loggedInUserProfile = null;
    let html5QrCode = null;
    let scannedBatch = [];
    let currentQuizId = null;
    let selectedOption = null;
    let currentSearchResults = [];
    let currentSearchedUser = null;
    let selectedUsersForMassUpdate = [];
    const DEFAULT_AVATAR_URL = "/default-avatar.png";
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/Dhbanzq4n/image/upload";
    const CLOUDINARY_PRESET = "kiropay_upload";

    const resetUI = () => {
        cardContainer.style.display = "none";
        formContainer.style.display = "flex";
        logoutBtn.style.display = "none";
        logoutBtnGuest.style.display = "none";
        guestContainer.style.display = "none";
        refreshDataBtn.style.display = "none";
        unlockedItemsBtn.style.display = "none";
        adminPanelDiv.style.display = "none";
        storeContainer.style.display = "none";
        unlockedItemsContainer.style.display = "none";
        userAnnouncementBox.style.display = "none";
        leaderboardContainer.style.display = "none";
        quizContainer.style.display = "none";
        if (showQrBtn) showQrBtn.style.display = "none";
        
        if (html5QrCode && html5QrCode.isScanning) html5QrCode.stop().catch(console.error);
        html5QrCode = null;
        if (qrModalOverlay) qrModalOverlay.style.display = "none";
        if (editModalOverlay) editModalOverlay.style.display = "none";
    };
    resetUI();

    // Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.display = 'none';
                }
            });
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    async function loadAnnouncements() {
        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await response.json();
            let cleanMessage = data.message || "";
            let cleanTicker = data.ticker_message || "";
            if (cleanMessage.startsWith('{') && cleanMessage.includes('ticker_message')) {
                try {
                    const parsed = JSON.parse(cleanMessage);
                    cleanMessage = parsed.message;
                    cleanTicker = parsed.ticker_message;
                } catch (e) {}
            }
            if (cleanTicker) {
                newsTicker.textContent = cleanTicker;
                newsTicker.style.animation = 'none';
                newsTicker.offsetHeight;
                newsTicker.style.animation = null; 
            } else {
                newsTicker.textContent = "أهلاً بكم في TAKLOPOLY!";
            }
            if (cleanMessage) {
                userAnnouncementText.textContent = cleanMessage;
                userAnnouncementBox.style.display = "block";
            } else {
                userAnnouncementBox.style.display = "none";
            }
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                adminTickerText.value = cleanTicker;
                adminAnnouncementText.value = cleanMessage;
            }
        } catch (e) { console.error("Announcement Load Error", e); }
    }

    if (adminAnnouncementForm) {
        adminAnnouncementForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            adminAnnouncementMessage.textContent = "جاري النشر...";
            try {
                const response = await fetch(`/admin-set-announcement`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: adminAnnouncementText.value.trim(),
                        ticker_message: adminTickerText.value.trim()
                    })
                });
                if (response.ok) {
                    adminAnnouncementMessage.textContent = "تم التحديث!";
                    loadAnnouncements();
                } else {
                    adminAnnouncementMessage.textContent = "فشل النشر.";
                }
            } catch (err) { adminAnnouncementMessage.textContent = "خطأ في الاتصال."; }
        });
    }

    // 🛑 إصلاح اللوجن: التأكد من تسلسل الأحداث 🛑
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = "جاري الدخول...";
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
                messageDiv.textContent = "";
                loggedInUserProfile = data.user;

                if (loggedInUserProfile.role === 'admin') {
                    adminPanelDiv.style.display = "block";
                    logoutBtn.style.display = "block";
                    formContainer.style.display = "none";
                    loadAdminStoreItems();
                    loadAnnouncements();
                } else if (loggedInUserProfile.role === 'guest') {
                    guestContainer.style.display = "block";
                    logoutBtnGuest.style.display = "block";
                    formContainer.style.display = "none";
                } else {
                    // User
                    cardContainer.style.display = "flex";
                    formContainer.style.display = "none";
                    logoutBtn.style.display = "block";
                    refreshDataBtn.style.display = "block";
                    unlockedItemsBtn.style.display = "block";
                    if (showQrBtn) showQrBtn.style.display = "block";
                    
                    updateUserProfileUI(loggedInUserProfile);
                    loadAnnouncements();
                    await loadMainDashboard(); // 🛑 استدعاء المتجر والصدارة
                }
            } else {
                messageDiv.textContent = data.error || "فشل الدخول";
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال.";
        }
    });

    function updateUserProfileUI(user) {
        userNameP.textContent = `الاسم: ${user.name}`;
        userFamilyP.textContent = `العائلة: ${user.family}`;
        userBalanceP.textContent = `الرصيد: $${user.balance}`;
        userLevelP.textContent = `المستوى: ${user.level || 1}`;
        userAvatarImg.src = user.profile_image_url || DEFAULT_AVATAR_URL;
        loadTransactionHistory(user.email);
    }

    // 🛑 إصلاح أزرار الجيست والبحث 🛑
    // نقلنا هذه الدوال هنا لضمان عملها
    
    // زر البحث للأدمن
    if (adminSearchForm) {
        adminSearchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("admin-search-name").value;
            try {
                const res = await fetch(`/admin-search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
                const data = await res.json();
                currentSearchResults = data.users;
                
                if (data.users.length > 0) {
                    if (data.users.length === 1) { 
                        populateAdminCard(data.users[0]); 
                        adminResultsList.style.display = "none"; 
                    } else { 
                        adminResultsList.style.display = "block"; 
                        adminSelectUser.innerHTML = ""; 
                        data.users.forEach(u => { adminSelectUser.innerHTML += `<option value="${u.email}">${u.name}</option>`; }); 
                        populateAdminCard(data.users[0]); 
                    }
                    adminSearchMessage.textContent = "";
                } else {
                    adminSearchMessage.textContent = "لا يوجد مستخدم";
                }
            } catch(err) { adminSearchMessage.textContent = "خطأ"; }
        });
    }
    if (adminSelectUser) adminSelectUser.addEventListener("change", () => { populateAdminCard(currentSearchResults.find(u => u.email === adminSelectUser.value)); });

    // أزرار الجيست
    document.querySelectorAll(".guest-family-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const list = document.getElementById("guest-results-list");
            const msg = document.getElementById("guest-message");
            list.innerHTML = "<li>جاري التحميل...</li>";
            try {
                const res = await fetch('/guest-get-family', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: btn.dataset.family }) });
                const data = await res.json();
                list.innerHTML = ""; 
                msg.textContent = `عرض ${data.users.length} مستخدم`;
                data.users.forEach(u => {
                    const li = document.createElement("li");
                    li.style.cursor = "pointer";
                    li.innerHTML = `<span>${u.name}</span> <strong>${u.balance} نقطة</strong>`;
                    li.onclick = () => openGuestDetails(u);
                    list.appendChild(li);
                });
            } catch (e) { list.innerHTML = "<li>خطأ</li>"; }
        });
    });

    // 🛑 إصلاح زر العودة للقائمة 🛑
    if (backToStoreBtn) {
        backToStoreBtn.onclick = () => {
            unlockedItemsContainer.style.display = "none";
            loadMainDashboard(); // إعادة تحميل وإظهار الواجهة الرئيسية
        };
    }

    // 🛑 إصلاح زر QR 🛑
    if (showQrBtn) {
        showQrBtn.onclick = () => {
            if (!loggedInUserProfile) return;
            qrModalOverlay.style.display = 'flex';
            qrCodeContainer.innerHTML = '';
            setTimeout(() => {
                new QRCode(qrCodeContainer, { text: loggedInUserProfile.email, width: 200, height: 200 });
            }, 100);
            document.getElementById("qr-user-email-display").textContent = loggedInUserProfile.email;
        };
    }
    if (closeQrBtn) closeQrBtn.onclick = () => qrModalOverlay.style.display = 'none';
    
    // أزرار الخروج والتحديث
    if (logoutBtn) logoutBtn.onclick = () => { resetUI(); loginForm.reset(); };
    if (logoutBtnGuest) logoutBtnGuest.onclick = () => { resetUI(); loginForm.reset(); };
    if (refreshDataBtn) refreshDataBtn.onclick = refreshUserData;
    
    if (unlockedItemsBtn) unlockedItemsBtn.onclick = async () => {
        unlockedItemsContainer.style.display = "block"; 
        storeContainer.style.display = "none";
        leaderboardContainer.style.display = "none"; 
        quizContainer.style.display = "none";
        try {
            const res = await fetch(`/get-unlocked-items`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loggedInUserProfile.email }) });
            const data = await res.json(); 
            unlockedItemsList.innerHTML = "";
            if (data.items) data.items.forEach(i => { 
                unlockedItemsList.innerHTML += `<div class="store-item-card"><img src="${i.image_url}"><h5>${i.name}</h5><small>${new Date(i.purchased_at).toLocaleDateString()}</small></div>`; 
            });
        } catch (e) {}
    };

    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        refreshDataBtn.textContent = "...";
        try {
            const res = await fetch(`/get-user-profile`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loggedInUserProfile.email }) });
            const data = await res.json();
            loggedInUserProfile = data.user;
            if (loggedInUserProfile.role !== 'admin') {
                updateUserProfileUI(loggedInUserProfile);
                loadMainDashboard();
            } else { loadAdminStoreItems(); }
            refreshDataBtn.textContent = "تحديث";
        } catch (e) { refreshDataBtn.textContent = "فشل"; }
    }

    async function loadMainDashboard() {
        loadStoreItems();
        loadLeaderboards();
        loadActiveQuiz(loggedInUserProfile.email);
        leaderboardContainer.style.display = "block";
        quizContainer.style.display = "block";
        storeContainer.style.display = "block";
    }

    // باقي الدوال (Scan, Store, Helper...)
    // ... (يجب أن تنسخ باقي الكود من الردود السابقة وتضعه هنا ليعمل كل شيء، سأقوم بوضعه لك لضمان الاكتمال)
    
    function populateAdminCard(user) {
        currentSearchedUser = user;
        document.getElementById("searched-user-name").textContent = user.name;
        document.getElementById("searched-user-family").textContent = user.family;
        document.getElementById("searched-user-balance").textContent = user.balance;
        document.getElementById("searched-user-level").textContent = user.level;
        document.getElementById("admin-searched-user-card").style.display = "block";
        document.getElementById("admin-show-user-qr-btn").onclick = () => { qrCodeContainer.innerHTML = ''; setTimeout(() => new QRCode(qrCodeContainer, { text: user.email, width: 200, height: 200 }), 50); document.getElementById("qr-user-email-display").textContent = user.email; qrModalOverlay.style.display = 'flex'; };
    }
    
    // (Admin Store, Add Item, Delete Item...)
    async function loadAdminStoreItems() {
        adminStoreItemsList.innerHTML = "Loading...";
        try {
            const res = await fetch(`/admin-get-items`);
            const data = await res.json();
            adminStoreItemsList.innerHTML = "";
            data.items.forEach(i => {
                const li = document.createElement("li");
                li.className = "admin-item-card";
                li.style.border = "1px solid #ddd"; li.style.padding = "10px"; li.style.marginBottom = "10px"; li.style.backgroundColor = "#fff"; li.style.display = "flex"; li.style.justifyContent = "space-between"; li.style.alignItems = "center";
                li.innerHTML = `<div><strong>${i.name}</strong><div>$${i.price} | Lvl:${i.required_level}</div></div><div><button class="del-btn" data-id="${i.id}" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">حذف</button></div>`;
                adminStoreItemsList.appendChild(li);
            });
            document.querySelectorAll(".del-btn").forEach(b => b.addEventListener("click", async (e) => { if(confirm("حذف؟")) { await fetch(`/admin-delete-item`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ itemId: e.target.dataset.id }) }); loadAdminStoreItems(); } }));
        } catch (e) {}
    }
    if (adminAddItemForm) {
        adminAddItemForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("store-item-name").value;
            const price = document.getElementById("store-item-price").value;
            const lvl = document.getElementById("store-item-required-level").value;
            const res = await fetch(`/admin-add-item`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, price, required_level: lvl, email: loggedInUserProfile.email }) });
            if (res.ok) { alert("تم"); adminAddItemForm.reset(); loadAdminStoreItems(); }
        });
    }
    
    async function loadStoreItems() {
        storeItemsList.innerHTML = "<p>Loading...</p>";
        try {
            const res = await fetch(`/get-store-items`);
            const data = await res.json();
            storeItemsList.innerHTML = "";
            data.items.forEach(item => {
                const div = document.createElement("div");
                div.className = "store-item-card";
                const canBuy = (loggedInUserProfile.balance >= item.price && loggedInUserProfile.level >= (item.required_level || 1));
                if (!canBuy) div.classList.add('locked');
                div.innerHTML = `<img src="${item.image_url || '/default-item.png'}"><h5>${item.name}</h5><p class="level-req">${(item.required_level > 1) ? 'مستوى ' + item.required_level : '<span style="color:#28a745">متاح</span>'}</p><span class="price-tag">$${item.price}</span><button onclick="buyItem('${item.id}')" ${canBuy ? '' : 'disabled'}>${canBuy ? `شراء` : 'مغلق'}</button>`;
                storeItemsList.appendChild(div);
            });
        } catch (e) {}
    }

    async function loadLeaderboards() {
        try {
            const [champRes, moussaRes, margRes, karasRes] = await Promise.allSettled([
                fetch('/get-top-champions', { method: "POST" }), 
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة الانبا موسي الاسود" }) }), 
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة مارجرس" }) }), 
                fetch('/get-family-top-10', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: "اسرة الانبا كاراس" }) })
            ]);
            if (champRes.status === 'fulfilled') {
                const data = await champRes.value.json(); 
                const list = document.getElementById("top-champions-list"); 
                list.innerHTML = "";
                data.champions.forEach((u, i) => { list.innerHTML += `<div class="champion-card"><div class="rank">${i + 1}</div><img src="${u.profile_image_url || DEFAULT_AVATAR_URL}" class="card-img"><span class="name">${u.name}</span><small>${u.balance}</small></div>`; });
            }
            const renderList = (res, elId) => {
                if (res.status === 'fulfilled') {
                    res.value.json().then(d => { const l = document.getElementById(elId); l.innerHTML = ""; d.users.forEach((u, i) => { l.innerHTML += `<li><span>${i + 1}. ${u.name}</span> <strong>${u.balance}</strong></li>`; }); });
                }
            };
            renderList(moussaRes, "family-anba-moussa-list"); 
            renderList(margRes, "family-margerges-list"); 
            renderList(karasRes, "family-anba-karas-list");
        } catch (e) {}
    }

    async function openGuestDetails(user) {
        guestDetailsModal.style.display = "flex";
        guestDetailsTitle.textContent = user.name;
        const ids = ["val-mass", "val-sunday", "val-deacon", "val-vespers", "val-book", "val-praise", "val-psalm", "val-extra-mass", "val-extra-mass-nt", "val-mass-nt", "val-extra-vespers", "val-confession", "val-competition", "val-other"];
        ids.forEach(id => document.getElementById(id).textContent = "0");
        try {
            const response = await fetch(`/get-transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: user.email }) });
            const data = await response.json();
            if (data.transactions) {
                const counts = { "القداس": "val-mass", "مدارس الاحد": "val-sunday", "مدرسة شمامسة": "val-deacon", "عشية": "val-vespers", "درس كتاب": "val-book", "تسبحة": "val-praise", "تسميع مزمور": "val-psalm", "قداس اضافي": "val-extra-mass", "قداس اضافي بدون تونية": "val-extra-mass-nt", "قداس بدون تونية": "val-mass-nt", "عشية او تسبحة(زيادة)": "val-extra-vespers", "اعتراف": "val-confession", "مسابقة": "val-competition" };
                let otherCount = 0;
                data.transactions.forEach(t => {
                    let matched = false;
                    for (const key in counts) { if (t.reason && t.reason.includes(key) && t.amount > 0) { document.getElementById(counts[key]).textContent++; matched = true; break; } }
                    if (!matched && t.amount > 0) otherCount++;
                });
                document.getElementById("val-other").textContent = otherCount;
            }
        } catch (e) {}
    }
    if (closeGuestDetails) closeGuestDetails.onclick = () => guestDetailsModal.style.display = "none";

    async function loadTransactionHistory(email) {
        transactionList.innerHTML = "<li>جاري التحميل...</li>";
        try {
            const res = await fetch(`/get-transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
            const data = await res.json();
            transactionList.innerHTML = "";
            if (data.transactions) data.transactions.forEach(t => { transactionList.innerHTML += `<li><span>${t.reason}</span> <span class="${t.amount > 0 ? 'positive' : 'negative'}">${t.amount}</span></li>`; });
        } catch (e) {}
    }
    
    // Scan Logic
    function onScanSuccess(decodedText) {
        const email = decodedText.trim();
        if (!scannedBatch.includes(email)) { scannedBatch.push(email); scanStatusMessage.textContent = `تم إضافة: ${email}`; renderScannedList(); }
    }
    function renderScannedList() {
        scannedUsersList.innerHTML = "";
        scannedBatch.forEach((email, index) => { scannedUsersList.innerHTML += `<li class="scanned-item"><span>${email}</span><span class="delete-scan-btn" onclick="removeScan(${index})">&times;</span></li>`; });
        if (scannedBatch.length > 0) { scannedListContainer.style.display = "block"; batchAddPointsBtn.style.display = "block"; }
    }
    window.removeScan = (index) => { scannedBatch.splice(index, 1); renderScannedList(); };
    if (startScanBtn) startScanBtn.onclick = () => { html5QrCode = new Html5Qrcode("reader"); html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, onScanSuccess); };
    if (batchAddPointsBtn) batchAddPointsBtn.onclick = async () => {
        const [amt, reason] = rewardReasonSelect.value.split(':');
        await fetch(`/admin-batch-scan-attendance`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ emails: scannedBatch, rewardAmount: parseInt(amt), reason, adminEmail: loggedInUserProfile.email }) });
        alert("تم"); scannedBatch = []; renderScannedList();
    };
});
