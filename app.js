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
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const transactionList = document.getElementById("transaction-list");
    const newsTicker = document.getElementById("news-ticker");
    const userAnnouncementBox = document.getElementById("user-announcement-box");
    const userAnnouncementText = document.getElementById("user-announcement-text");
    const adminAnnouncementForm = document.getElementById("admin-announcement-form");
    const adminTickerText = document.getElementById("admin-ticker-text");
    const adminAnnouncementText = document.getElementById("admin-announcement-text");
    const adminAnnouncementMessage = document.getElementById("admin-announcement-message");
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
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    const scannedListContainer = document.getElementById("scanned-list-container");
    const scannedUsersList = document.getElementById("scanned-users-list");
    const batchAddPointsBtn = document.getElementById("batch-add-points-btn");
    const fetchQrListBtn = document.getElementById("admin-fetch-qr-list-btn");
    const qrListResults = document.getElementById("admin-qr-list-results");
    const generatePrintCardsBtn = document.getElementById("admin-generate-print-cards-btn");
    const printableCardsContainer = document.getElementById("admin-printable-cards-container");
    const qrListMessage = document.getElementById("admin-qr-list-message");
    const guestDetailsModal = document.getElementById("guest-details-modal");
    const closeGuestDetails = document.getElementById("close-guest-details");
    const guestDetailsTitle = document.getElementById("guest-details-title");
    const editModalOverlay = document.getElementById("edit-modal-overlay");
    const closeEditModal = document.getElementById("close-edit-modal");
    const editItemForm = document.getElementById("edit-item-form");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const closeQrBtn = document.querySelector(".close-qr-btn");
    const showQrBtn = document.getElementById("show-qr-btn");

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
        
        if (html5QrCode && html5QrCode.isScanning) { html5QrCode.stop().catch(console.error); }
        html5QrCode = null;
        if (qrModalOverlay) qrModalOverlay.style.display = "none";
        if (editModalOverlay) editModalOverlay.style.display = "none";
    };
    resetUI();

    // Accordion Logic (الأدمن)
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
            } else { newsTicker.textContent = "أهلاً بكم في TAKLOPOLY! - مسابقة صوم الميلاد"; }

            if (cleanMessage) {
                userAnnouncementText.textContent = cleanMessage;
                userAnnouncementBox.style.display = "block";
            } else { userAnnouncementBox.style.display = "none"; }

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
                    body: JSON.stringify({ message: adminAnnouncementText.value.trim(), ticker_message: adminTickerText.value.trim() })
                });
                if (response.ok) {
                    adminAnnouncementMessage.textContent = "تم التحديث!";
                    loadAnnouncements();
                } else { adminAnnouncementMessage.textContent = "فشل النشر."; }
            } catch (err) { adminAnnouncementMessage.textContent = "خطأ في الاتصال."; }
        });
    }

    // Login
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
                    // 🛑 تحميل اللوحة فوراً 🛑
                    loadMainDashboard(); 
                }
            } else {
                messageDiv.textContent = data.error || "فشل الدخول";
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "خطأ في الاتصال. حاول مرة أخرى.";
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

    // 🛑 إصلاح QR المستخدم 🛑
    if (showQrBtn) {
        showQrBtn.addEventListener('click', () => {
            if (!loggedInUserProfile) return;
            qrModalOverlay.style.display = 'flex'; // إظهار
            qrCodeContainer.innerHTML = ''; // تنظيف
            
            // تأخير بسيط لضمان الرسم
            setTimeout(() => {
                new QRCode(qrCodeContainer, { 
                    text: loggedInUserProfile.email, 
                    width: 200, 
                    height: 200,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }, 50);
            
            document.getElementById("qr-user-email-display").textContent = loggedInUserProfile.email;
        });
    }
    if (closeQrBtn) closeQrBtn.addEventListener('click', () => qrModalOverlay.style.display = 'none');

    function renderScannedList() {
        scannedUsersList.innerHTML = "";
        if (scannedBatch.length > 0) {
            scannedListContainer.style.display = "block";
            batchAddPointsBtn.style.display = "block";
            batchAddPointsBtn.textContent = `إضافة النقاط لـ (${scannedBatch.length}) مستخدم ✅`;
            scannedBatch.forEach((email, index) => {
                const li = document.createElement("li");
                li.className = "scanned-item";
                li.innerHTML = `<span>${email}</span><span class="delete-scan-btn" data-index="${index}">&times;</span>`;
                scannedUsersList.appendChild(li);
            });
            document.querySelectorAll(".delete-scan-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    scannedBatch.splice(e.target.dataset.index, 1);
                    renderScannedList();
                });
            });
        } else {
            scannedListContainer.style.display = "none";
            batchAddPointsBtn.style.display = "none";
        }
    }

    function onScanSuccess(decodedText) {
        const email = decodedText.trim();
        if (!scannedBatch.includes(email)) {
            scannedBatch.push(email);
            scanStatusMessage.textContent = `تم إضافة: ${email}`;
            scanStatusMessage.style.color = "green";
            renderScannedList();
        } else {
            scanStatusMessage.textContent = `مكرر: ${email}`;
            scanStatusMessage.style.color = "orange";
        }
    }

    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().then(() => { startScanBtn.textContent = 'تشغيل الكاميرا'; });
                return;
            }
            html5QrCode = new Html5Qrcode("reader");
            html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, onScanSuccess)
                .then(() => { startScanBtn.textContent = "إيقاف الماسح"; });
        });
    }

    if (batchAddPointsBtn) {
        batchAddPointsBtn.addEventListener("click", async () => {
            const [amountStr, reason] = rewardReasonSelect.value.split(':');
            const amount = parseInt(amountStr);
            if (scannedBatch.length === 0) return;
            if (!confirm(`تأكيد إضافة ${amount} نقطة لـ ${scannedBatch.length} مستخدم؟`)) return;
            batchAddPointsBtn.disabled = true;
            try {
                const response = await fetch(`/admin-batch-scan-attendance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ emails: scannedBatch, rewardAmount: amount, reason, adminEmail: loggedInUserProfile.email })
                });
                const data = await response.json();
                if (response.ok) { alert(data.message); scannedBatch = []; renderScannedList(); scanStatusMessage.textContent = "تمت الإضافة بنجاح!"; } 
                else { alert(data.error); }
            } catch (err) { alert("خطأ في الاتصال."); } finally { batchAddPointsBtn.disabled = false; }
        });
    }

    // إصلاح الأزرار
    if (logoutBtn) logoutBtn.addEventListener("click", () => { resetUI(); loginForm.reset(); });
    if (logoutBtnGuest) logoutBtnGuest.addEventListener("click", () => { resetUI(); loginForm.reset(); });

    async function refreshUserData() {
        if (!loggedInUserProfile) return;
        refreshDataBtn.textContent = "...";
        try {
            const res = await fetch(`/get-user-profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email })
            });
            const data = await res.json();
            loggedInUserProfile = data.user;
            if (loggedInUserProfile.role !== 'admin') {
                updateUserProfileUI(loggedInUserProfile);
                loadMainDashboard();
            } else { loadAdminStoreItems(); }
            refreshDataBtn.textContent = "تحديث";
        } catch (e) { refreshDataBtn.textContent = "فشل"; }
    }
    if (refreshDataBtn) refreshDataBtn.addEventListener('click', refreshUserData);

    if (unlockedItemsBtn) unlockedItemsBtn.addEventListener('click', async () => {
        unlockedItemsContainer.style.display = "block"; leaderboardContainer.style.display = "none"; quizContainer.style.display = "none"; storeContainer.style.display = "none";
        try {
            const res = await fetch(`/get-unlocked-items`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loggedInUserProfile.email }) });
            const data = await res.json(); unlockedItemsList.innerHTML = "";
            if (data.items) data.items.forEach(i => { unlockedItemsList.innerHTML += `<div class="store-item-card"><img src="${i.image_url}"><h5>${i.name}</h5><small>${new Date(i.purchased_at).toLocaleDateString()}</small></div>`; });
        } catch (e) {}
    });
    if (backToStoreBtn) backToStoreBtn.addEventListener('click', () => loadMainDashboard());

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

                div.innerHTML = `
                    <img src="${item.image_url || '/default-item.png'}">
                    <h5>${item.name}</h5>
                    <p class="level-req">${(item.required_level > 1) ? 'مستوى ' + item.required_level : '<span style="color:#28a745">متاح للجميع</span>'}</p>
                    <span class="price-tag">$${item.price}</span>
                    <button onclick="buyItem('${item.id}')" ${canBuy ? '' : 'disabled'}>${canBuy ? `شراء (${item.price} نقطة)` : 'غير متاح'}</button>
                `;
                storeItemsList.appendChild(div);
            });
        } catch (e) { storeItemsList.innerHTML = "Error"; }
    }
    
    window.buyItem = async (id) => {
        if (!confirm("شراء؟")) return;
        try {
            const res = await fetch(`/buy-store-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loggedInUserProfile.email, itemId: id })
            });
            const data = await res.json();
            alert(data.message || data.error);
            if (data.success || res.ok) refreshUserData();
        } catch (e) { alert("Error"); }
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
                    if (width > height) { if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; } }
                    else { if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; } }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => { resolve(blob); }, 'image/jpeg', quality);
                };
                img.onerror = (e) => reject(e);
            };
            reader.onerror = (e) => reject(e);
        });
    }
    
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const family = document.getElementById("family").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const avatarFile = document.getElementById("signup-avatar-file").files[0];
        let profile_image_url = DEFAULT_AVATAR_URL;
        try {
            if (avatarFile) {
                const blob = await resizeImage(avatarFile, 150, 150, 0.7);
                const fd = new FormData(); fd.append('file', blob); fd.append('upload_preset', CLOUDINARY_PRESET);
                const r = await fetch(CLOUDINARY_URL, { method: 'POST', body: fd });
                const d = await r.json(); profile_image_url = d.secure_url;
            }
            const fd = new FormData(); fd.append('name', name); fd.append('family', family); fd.append('email', email); fd.append('password', password); fd.append('profile_image_url', profile_image_url);
            const res = await fetch(`/signup`, { method: "POST", body: fd });
            if (res.ok) { alert("تم التسجيل!"); signupForm.reset(); } else { alert("فشل التسجيل"); }
        } catch (err) { alert("خطأ"); }
    });

    async function loadTransactionHistory(email) {
        transactionList.innerHTML = "<li>جاري التحميل...</li>";
        try {
            const res = await fetch(`/get-transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
            const data = await res.json();
            transactionList.innerHTML = "";
            if (data.transactions && data.transactions.length > 0) {
                data.transactions.forEach(t => {
                    const li = document.createElement("li");
                    li.innerHTML = `<span>${t.reason}</span> <span class="${t.amount > 0 ? 'positive' : 'negative'}">${t.amount}</span>`;
                    transactionList.appendChild(li);
                });
            } else { transactionList.innerHTML = "<li>لا يوجد معاملات.</li>"; }
        } catch (e) { transactionList.innerHTML = "<li>خطأ</li>"; }
    }
    
    // Admin Functions
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
                li.innerHTML = `<div><strong style="font-size:1.2em;">${i.name}</strong><div style="color: #666;">السعر: $${i.price} | المستوى: ${i.required_level}</div></div><div><button class="edit-btn" data-id="${i.id}" data-name="${i.name}" data-price="${i.price}" data-lvl="${i.required_level}" data-url="${i.image_url}" style="background:#ffc107; color:#333; border:none; padding:5px 10px; margin-left:5px; border-radius:4px; cursor:pointer;">تعديل</button><button class="del-btn" data-id="${i.id}" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">حذف</button></div>`;
                adminStoreItemsList.appendChild(li);
            });
            document.querySelectorAll(".del-btn").forEach(b => b.addEventListener("click", deleteItem));
            document.querySelectorAll(".edit-btn").forEach(b => b.addEventListener("click", openEditModal));
        } catch (e) { adminStoreItemsList.innerHTML = "Error"; }
    }
    if (adminAddItemForm) {
        adminAddItemForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("store-item-name").value;
            const price = document.getElementById("store-item-price").value;
            const lvl = document.getElementById("store-item-required-level").value;
            const file = document.getElementById("store-item-image-file").files[0];
            let url = '';
            if (file) { const blob = await resizeImage(file, 400, 400, 0.8); const fd = new FormData(); fd.append('file', blob); fd.append('upload_preset', CLOUDINARY_PRESET); const r = await fetch(CLOUDINARY_URL, { method: 'POST', body: fd }); const d = await r.json(); url = d.secure_url; }
            const res = await fetch(`/admin-add-item`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, price, required_level: lvl, image_url: url, email: loggedInUserProfile.email }) });
            if (res.ok) { alert("تم"); adminAddItemForm.reset(); loadAdminStoreItems(); }
        });
    }
    async function deleteItem(e) { if (confirm("حذف؟")) { await fetch(`/admin-delete-item`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemId: e.target.dataset.id }) }); loadAdminStoreItems(); } }
    function openEditModal(e) { document.getElementById("edit-item-id").value = e.target.dataset.id; document.getElementById("edit-item-name").value = e.target.dataset.name; document.getElementById("edit-item-price").value = e.target.dataset.price; document.getElementById("edit-item-required-level").value = e.target.dataset.lvl; document.getElementById("edit-item-current-url").value = e.target.dataset.url; document.getElementById("edit-current-image").src = e.target.dataset.url; editModalOverlay.style.display = 'flex'; }
    if (closeEditModal) closeEditModal.onclick = () => editModalOverlay.style.display = 'none';
    if (editItemForm) {
        editItemForm.onsubmit = async (e) => {
            e.preventDefault();
            const id = document.getElementById("edit-item-id").value;
            const name = document.getElementById("edit-item-name").value;
            const price = document.getElementById("edit-item-price").value;
            const lvl = document.getElementById("edit-item-required-level").value;
            const file = document.getElementById("edit-item-new-file").files[0];
            let url = document.getElementById("edit-item-current-url").value;
            if (file) { const blob = await resizeImage(file, 400, 400, 0.8); const fd = new FormData(); fd.append('file', blob); fd.append('upload_preset', CLOUDINARY_PRESET); const r = await fetch(CLOUDINARY_URL, { method: 'POST', body: fd }); const d = await r.json(); url = d.secure_url; }
            await fetch(`/admin-update-item`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemId: id, name, price, required_level: lvl, image_url: url, adminEmail: loggedInUserProfile.email }) });
            editModalOverlay.style.display = 'none'; loadAdminStoreItems();
        };
    }

    if (document.getElementById("admin-search-form")) {
        document.getElementById("admin-search-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("admin-search-name").value;
            const res = await fetch(`/admin-search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
            const data = await res.json();
            currentSearchResults = data.users;
            const list = document.getElementById("admin-results-list");
            const sel = document.getElementById("admin-select-user");
            if (data.users.length > 0) {
                if (data.users.length === 1) { populateAdminCard(data.users[0]); list.style.display = "none"; }
                else { list.style.display = "block"; sel.innerHTML = ""; data.users.forEach(u => { sel.innerHTML += `<option value="${u.email}">${u.name}</option>`; }); populateAdminCard(data.users[0]); }
            }
        });
    }
    if (document.getElementById("admin-select-user")) { document.getElementById("admin-select-user").addEventListener("change", () => { populateAdminCard(currentSearchResults.find(u => u.email === document.getElementById("admin-select-user").value)); }); }
    function populateAdminCard(user) {
        currentSearchedUser = user;
        document.getElementById("searched-user-name").textContent = user.name;
        document.getElementById("searched-user-family").textContent = user.family;
        document.getElementById("searched-user-balance").textContent = user.balance;
        document.getElementById("searched-user-level").textContent = user.level;
        document.getElementById("admin-searched-user-card").style.display = "block";
        document.getElementById("admin-show-user-qr-btn").onclick = () => { qrCodeContainer.innerHTML = ''; setTimeout(() => new QRCode(qrCodeContainer, { text: user.email, width: 200, height: 200 }), 50); document.getElementById("qr-user-email-display").textContent = user.email; qrModalOverlay.style.display = 'flex'; };
    }
    const updateBal = async (amt) => { if (!currentSearchedUser) return; await fetch(`/admin-update-balance`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: currentSearchedUser.email, amount: amt, reason: "Admin" }) }); alert("تم"); };
    if (document.getElementById("admin-add-balance-btn")) document.getElementById("admin-add-balance-btn").onclick = () => updateBal(parseInt(document.getElementById("admin-balance-amount").value));
    if (document.getElementById("admin-subtract-balance-btn")) document.getElementById("admin-subtract-balance-btn").onclick = () => updateBal(-parseInt(document.getElementById("admin-balance-amount").value));
    if (document.getElementById("admin-update-level-btn")) { document.getElementById("admin-update-level-btn").onclick = async () => { const lvl = parseInt(document.getElementById("admin-level-amount").value); await fetch(`/admin-update-level`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetEmail: currentSearchedUser.email, newLevel: lvl, adminEmail: loggedInUserProfile.email }) }); alert("تم"); }; }
    if (document.getElementById("admin-delete-user-btn")) { document.getElementById("admin-delete-user-btn").onclick = async () => { if (confirm("حذف؟")) { await fetch(`/admin-delete-user`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ emailToDelete: currentSearchedUser.email, adminEmail: loggedInUserProfile.email }) }); alert("تم"); document.getElementById("admin-searched-user-card").style.display = "none"; } }; }

    document.querySelectorAll(".family-btn").forEach(b => {
        b.addEventListener("click", async () => {
            const f = b.dataset.family;
            const res = await fetch(`/admin-get-family`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ family: f }) });
            const data = await res.json();
            const d = document.getElementById("admin-family-results"); d.innerHTML = "";
            if (data.users) {
                document.getElementById("mass-update-controls").style.display = "block"; document.getElementById("selected-users-count").textContent = "0"; selectedUsersForMassUpdate = [];
                data.users.forEach(u => { const div = document.createElement("div"); div.innerHTML = `<input type="checkbox" class="mass-cb" data-email="${u.email}"> ${u.name} (${u.balance})`; d.appendChild(div); });
                d.querySelectorAll(".mass-cb").forEach(cb => cb.addEventListener("change", (e) => { if (e.target.checked) selectedUsersForMassUpdate.push(e.target.dataset.email); else selectedUsersForMassUpdate = selectedUsersForMassUpdate.filter(x => x !== e.target.dataset.email); document.getElementById("selected-users-count").textContent = selectedUsersForMassUpdate.length; }));
            }
        });
    });
    const massUp = async (amt) => { if (selectedUsersForMassUpdate.length && confirm("تأكيد؟")) { await fetch(`/admin-mass-update`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ emails: selectedUsersForMassUpdate, amount: amt, reason: "Mass", adminEmail: loggedInUserProfile.email }) }); alert("تم"); } };
    if (document.getElementById("mass-update-add-btn")) document.getElementById("mass-update-add-btn").onclick = () => massUp(parseInt(document.getElementById("mass-update-amount").value));
    if (document.getElementById("mass-update-subtract-btn")) document.getElementById("mass-update-subtract-btn").onclick = () => massUp(-parseInt(document.getElementById("mass-update-amount").value));

    if (fetchQrListBtn) {
        fetchQrListBtn.onclick = async () => {
            const res = await fetch(`/admin-get-qr-list`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminEmail: loggedInUserProfile.email }) });
            const data = await res.json();
            qrListResults.value = JSON.stringify(data.users);
            qrListMessage.textContent = "تم الجلب";
        };
    }
    if (generatePrintCardsBtn) {
        generatePrintCardsBtn.onclick = () => {
            const users = JSON.parse(qrListResults.value);
            printableCardsContainer.innerHTML = "";
            users.forEach(u => {
                const d = document.createElement("div"); d.className = "print-card";
                d.innerHTML = `<div class="print-card-name">${u.name}</div><div class="print-card-family">${u.family}</div><div class="print-card-qr"></div>`;
                printableCardsContainer.appendChild(d);
                new QRCode(d.querySelector(".print-card-qr"), { text: u.email, width: 180, height: 180 });
            });
        };
    }
    
    async function loadMainDashboard() {
        loadStoreItems();
        loadLeaderboards();
        loadActiveQuiz(loggedInUserProfile.email);
        leaderboardContainer.style.display = "block";
        quizContainer.style.display = "block";
        storeContainer.style.display = "block";
    }
});
