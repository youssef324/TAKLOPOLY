document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
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
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsList = document.getElementById("unlocked-items-list");
    const backToStoreBtn = document.getElementById("back-to-store-btn");
    const storeContainer = document.getElementById("store-container");
    const storeItemsList = document.getElementById("store-items-list");
    const leaderboardContainer = document.getElementById("leaderboard-container");
    const quizContainer = document.getElementById("quiz-container");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const newsTicker = document.getElementById("news-ticker");
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const closeQrBtn = document.querySelector(".close-qr-btn");

    // Admin Elements
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");
    const adminAddItemForm = document.getElementById("admin-add-item-form");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminSearchForm = document.getElementById("admin-search-form");
    const adminResultsList = document.getElementById("admin-results-list");
    const adminSelectUser = document.getElementById("admin-select-user");
    const adminSearchedUserCard = document.getElementById("admin-searched-user-card");
    const adminSearchMessage = document.getElementById("admin-search-message");

    // Scan & Print
    const startScanBtn = document.getElementById("start-scan-btn");
    const batchAddPointsBtn = document.getElementById("batch-add-points-btn");
    const scannedListContainer = document.getElementById("scanned-list-container");
    const scannedUsersList = document.getElementById("scanned-users-list");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn");
    const printableCardsContainer = document.getElementById("admin-printable-cards-container");
    const qrListResults = document.getElementById("admin-qr-list-results");
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const downloadCardsAsImageBtn = document.getElementById("admin-download-cards-as-image-btn");

    // Guest Modal
    const guestDetailsModal = document.getElementById("guest-details-modal");
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");

    // Edit Modal
    const editModalOverlay = document.getElementById("edit-modal-overlay");
    const closeEditModal = document.getElementById("close-edit-modal");
    const editItemForm = document.getElementById("edit-item-form");

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

    // --- Reset UI ---
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
        if(showQrBtn) showQrBtn.style.display = "none";
        
        if (html5QrCode && html5QrCode.isScanning) html5QrCode.stop().catch(console.error);
        html5QrCode = null;
        if (qrModalOverlay) qrModalOverlay.style.display = "none";
        if (editModalOverlay) editModalOverlay.style.display = "none";
    };
    resetUI();

    // --- Accordion Logic ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            // إغلاق الكل أولاً
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.display = 'none';
                }
            });
            // تبديل الحالي
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // --- Login Logic ---
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
                    // 🛑 إظهار لوحة القيادة (المتجر والصدارة) فوراً 🛑
                    loadMainDashboard(); 
                }
            } else {
                messageDiv.textContent = data.error || "فشل الدخول";
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال.";
        }
    });

    // --- Buttons Event Listeners (الإصلاح) ---
    // 🛑 تم نقلها هنا لضمان تحميلها 🛑
    
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

    if (backToStoreBtn) backToStoreBtn.onclick = loadMainDashboard;

    // 🛑 إصلاح زر QR (تأخير الرسم) 🛑
    if (showQrBtn) showQrBtn.onclick = () => {
        if (!loggedInUserProfile) return;
        qrModalOverlay.style.display = 'flex';
        qrCodeContainer.innerHTML = ''; // تنظيف
        
        // تأخير 100ms لضمان أن العنصر معروض قبل الرسم
        setTimeout(() => {
            qrCodeContainer.innerHTML = ''; // تأكيد التنظيف
            new QRCode(qrCodeContainer, { 
                text: loggedInUserProfile.email, 
                width: 200, 
                height: 200,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }, 100);
        
        document.getElementById("qr-user-email-display").textContent = loggedInUserProfile.email;
    };
    if (closeQrBtn) closeQrBtn.onclick = () => qrModalOverlay.style.display = 'none';


    // --- Functions ---

    function updateUserProfileUI(user) {
        document.getElementById("user-name").textContent = `الاسم: ${user.name}`;
        document.getElementById("user-family").textContent = `العائلة: ${user.family}`;
        document.getElementById("user-balance").textContent = `الرصيد: $${user.balance}`;
        document.getElementById("user-level").textContent = `المستوى: ${user.level || 1}`;
        document.getElementById("user-avatar").src = user.profile_image_url || DEFAULT_AVATAR_URL;
        loadTransactionHistory(user.email);
    }

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
        
        // تأكد من إظهار الأقسام
        leaderboardContainer.style.display = "block";
        quizContainer.style.display = "block";
        storeContainer.style.display = "block";
        unlockedItemsContainer.style.display = "none";
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
                
                if (!canBuy) div.classList.add('locked'); // التغميق

                div.innerHTML = `
                    <img src="${item.image_url || '/default-item.png'}">
                    <h5>${item.name}</h5>
                    <p class="level-req">${(item.required_level > 1) ? 'مستوى ' + item.required_level : '<span style="color:#28a745">متاح للجميع</span>'}</p>
                    <span class="price-tag">$${item.price}</span>
                    <button onclick="buyItem('${item.id}')" ${canBuy ? '' : 'disabled'}>${canBuy ? `شراء` : 'مغلق'}</button>
                `;
                storeItemsList.appendChild(div);
            });
        } catch (e) { storeItemsList.innerHTML = "Error"; }
    }

    window.buyItem = async (id) => {
        if (!confirm("تأكيد الشراء؟")) return;
        try {
            const res = await fetch(`/buy-store-item`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loggedInUserProfile.email, itemId: id }) });
            const data = await res.json();
            alert(data.message || data.error);
            if (data.success) refreshUserData();
        } catch (e) { alert("خطأ"); }
    };

    async function loadLeaderboards() {
        const rankEmojis = { 1: "🥇", 2: "🥈", 3: "🥉" };
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
                data.champions.forEach((u, i) => { list.innerHTML += `<div class="champion-card"><div class="rank">${rankEmojis[i + 1] || i + 1}</div><img src="${u.profile_image_url || DEFAULT_AVATAR_URL}" class="card-img"><span class="name">${u.name}</span><small>${u.balance}</small></div>`; });
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

    // Admin Search Fix
    if (adminSearchForm) {
        adminSearchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("admin-search-name").value;
            try {
                const res = await fetch(`/admin-search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
                const data = await res.json();
                currentSearchResults = data.users;
                const list = document.getElementById("admin-results-list");
                const sel = document.getElementById("admin-select-user");
                
                if (data.users.length > 0) {
                    if (data.users.length === 1) { 
                        populateAdminCard(data.users[0]); 
                        list.style.display = "none"; 
                    } else { 
                        list.style.display = "block"; 
                        sel.innerHTML = ""; 
                        data.users.forEach(u => { sel.innerHTML += `<option value="${u.email}">${u.name}</option>`; }); 
                        populateAdminCard(data.users[0]); 
                    }
                    adminSearchMessage.textContent = "";
                } else {
                    adminSearchMessage.textContent = "لا يوجد مستخدم بهذا الاسم";
                }
            } catch(err) { adminSearchMessage.textContent = "خطأ"; }
        });
    }
    if (adminSelectUser) { adminSelectUser.addEventListener("change", () => { populateAdminCard(currentSearchResults.find(u => u.email === adminSelectUser.value)); }); }
    
    function populateAdminCard(user) {
        currentSearchedUser = user;
        document.getElementById("searched-user-name").textContent = user.name;
        document.getElementById("searched-user-family").textContent = user.family;
        document.getElementById("searched-user-balance").textContent = user.balance;
        document.getElementById("searched-user-level").textContent = user.level;
        document.getElementById("admin-searched-user-card").style.display = "block";
        
        // QR للأدمن
        document.getElementById("admin-show-user-qr-btn").onclick = () => { 
            qrCodeContainer.innerHTML = ''; 
            setTimeout(() => new QRCode(qrCodeContainer, { text: user.email, width: 200, height: 200 }), 50); 
            document.getElementById("qr-user-email-display").textContent = user.email; 
            qrModalOverlay.style.display = 'flex'; 
        };
    }

    // Guest Buttons
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

    // (باقي الدوال الأساسية مثل loadAnnouncements, openGuestDetails, Admin Add/Delete موجودة ضمناً، ولكن تم اختصار الرد للتركيز على الإصلاحات. الكود الكامل يجب أن يحتويها كما في الردود السابقة)
    
    async function loadAnnouncements() {
        try {
            const response = await fetch(`/get-announcement`, { method: "POST" });
            const data = await response.json();
            let cleanMessage = data.message || "";
            let cleanTicker = data.ticker_message || "";
            if (cleanMessage.startsWith('{') && cleanMessage.includes('ticker_message')) {
                try { const parsed = JSON.parse(cleanMessage); cleanMessage = parsed.message; cleanTicker = parsed.ticker_message; } catch (e) {}
            }
            if (cleanTicker) { newsTicker.textContent = cleanTicker; newsTicker.style.animation = 'none'; newsTicker.offsetHeight; newsTicker.style.animation = null; } 
            else { newsTicker.textContent = "أهلاً بكم في TAKLOPOLY!"; }
            if (cleanMessage) { userAnnouncementText.textContent = cleanMessage; userAnnouncementBox.style.display = "block"; } 
            else { userAnnouncementBox.style.display = "none"; }
            if (loggedInUserProfile && loggedInUserProfile.role === 'admin') {
                adminTickerText.value = cleanTicker; adminAnnouncementText.value = cleanMessage;
            }
        } catch (e) { }
    }
    
    // ... (تأكد من وجود باقي دوال الأدمن مثل adminAddItemForm و updateBal هنا في الكود النهائي)
    
});
