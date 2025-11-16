document.addEventListener("DOMContentLoaded", () => {
    // --- مسك العناصر الأساسية ---
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");
    const formContainer = document.querySelector(".form-container");
    const cardContainer = document.querySelector(".card-container");
    const logoutBtn = document.getElementById("logout-btn");
    const refreshDataBtn = document.getElementById("refresh-data-btn");

    // --- عناصر واجهة الزائر ---
    const guestContainer = document.getElementById("guest-container");
    const guestFamilyButtons = document.querySelectorAll(".guest-family-btn");
    const guestResultsList = document.getElementById("guest-results-list");
    const guestMessage = document.getElementById("guest-message");
    const logoutBtnGuest = document.getElementById("logout-btn-guest");

    // --- عناصر كارت المستخدم ---
    const userNameP = document.getElementById("user-name");
    const userFamilyP = document.getElementById("user-family");
    const userBalanceP = document.getElementById("user-balance");
    const userLevelP = document.getElementById("user-level");
    const userAvatarImg = document.getElementById("user-avatar");
    const DEFAULT_AVATAR_URL = "/default-avatar.png";
    const transactionList = document.getElementById("transaction-list");
    const avatarOverlayLabel = document.getElementById("avatar-overlay-label");
    let loggedInUserProfile = null;

    // --- بيانات Cloudinary ---
    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    // --- عناصر لوحة الأدمن ---
    const adminPanelDiv = document.getElementById("admin-panel");
    const adminSearchForm = document.getElementById("admin-search-form");
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
    const massUpdateControls = document.getElementById("mass-update-controls");
    const selectedUsersCount = document.getElementById("selected-users-count");
    const massUpdateAmount = document.getElementById("mass-update-amount");
    const massUpdateAddBtn = document.getElementById("mass-update-add-btn");
    const massUpdateSubtractBtn = document.getElementById("mass-update-subtract-btn");
    const massUpdateMessage = document.getElementById("mass-update-message");
    let selectedUsersForMassUpdate = [];

    // --- عناصر المتجر والمشتريات ---
    const storeContainer = document.getElementById("store-container");
    const unlockedItemsContainer = document.getElementById("unlocked-items-container");
    const unlockedItemsBtn = document.getElementById("unlocked-items-btn");
    const backToStoreBtn = document.getElementById("back-to-store-btn");
    const storeItemsList = document.getElementById("store-items-list");
    const storeMessage = document.getElementById("store-message");
    const storeLoadingMessage = document.getElementById("store-loading-message");
    const adminStoreItemsList = document.getElementById("admin-store-items-list");
    const adminStoreMessage = document.getElementById("admin-store-message");

    // --- عناصر QR (لليوزر) ---
    const showQrBtn = document.getElementById("show-qr-btn");
    const qrModalOverlay = document.getElementById("qr-modal-overlay");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrUserEmailDisplay = document.getElementById("qr-user-email-display");

    // --- عناصر مسح الأدمن (المعدلة) ---
    const startScanBtn = document.getElementById("start-scan-btn");
    const readerDiv = document.getElementById("reader");
    const rewardReasonSelect = document.getElementById("reward-reason-select");
    const scanStatusMessage = document.getElementById("scan-status-message");
    // 🛑🛑 عناصر القائمة المؤقتة الجديدة 🛑🛑
    const scannedUsersList = document.getElementById("scanned-users-list");
    const queueCount = document.getElementById("queue-count");
    const processScansBtn = document.getElementById("process-scans-btn");
    let html5QrCode = null;
    let scannedEmailsQueue = []; // المصفوفة التي تخزن الإيميلات الممسوحة

    // --- دالة مساعدة لضغط الصور (كما هي) ---
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
                    // ... (منطق الضغط كما هو)
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                            width = width < 1 ? 1 : width;
                            height = height < 1 ? 1 : height;
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

    // ----------------------------------------------------------------------------------
    // 🛑🛑 منطق المسح الجماعي الجديد 🛑🛑
    // ----------------------------------------------------------------------------------

    // 🛑 دالة تحديث واجهة قائمة المسح 🛑
    function updateScanQueueUI(message = null, color = 'blue') {
        if (!scannedUsersList || !queueCount || !processScansBtn) return;
        
        scannedUsersList.innerHTML = '';
        const uniqueEmails = [...new Set(scannedEmailsQueue)];

        if (uniqueEmails.length === 0) {
            scannedUsersList.innerHTML = '<li style="text-align:center; color:#888;">القائمة فارغة. ابدأ المسح.</li>';
            processScansBtn.disabled = true;
            processScansBtn.textContent = 'تأكيد إضافة المكافأة (نقاط) لـ الكل';
        } else {
            uniqueEmails.forEach(email => {
                const li = document.createElement('li');
                li.className = 'scanned-user-item';
                li.innerHTML = `
                    <span>${email}</span>
                    <button data-email="${email}" class="remove-scanned-user" title="حذف">
                        &times;
                    </button>
                `;
                scannedUsersList.appendChild(li);
            });
            processScansBtn.disabled = false;
            processScansBtn.textContent = `تأكيد إضافة المكافأة (${uniqueEmails.length} مستخدم)`;
        }

        queueCount.textContent = uniqueEmails.length;
        if (message) {
            scanStatusMessage.textContent = message;
            scanStatusMessage.style.color = color;
        }
    }

    // 🛑 دالة حذف مستخدم من قائمة الانتظار 🛑
    function handleRemoveScannedUser(e) {
        if (e.target.classList.contains('remove-scanned-user')) {
            const emailToRemove = e.target.dataset.email;
            scannedEmailsQueue = scannedEmailsQueue.filter(email => email !== emailToRemove);
            updateScanQueueUI(`تم حذف ${emailToRemove} من القائمة.`);
        }
    }
    if (scannedUsersList) {
        scannedUsersList.addEventListener('click', handleRemoveScannedUser);
    }
    
    // 🛑 دالة معالجة قائمة المسح (إرسال إلى API Mass Update) 🛑
    async function handleProcessScans() {
        if (!loggedInUserProfile) return;
        const uniqueEmails = [...new Set(scannedEmailsQueue)];
        
        if (uniqueEmails.length === 0) {
            updateScanQueueUI('القائمة فارغة ولا يوجد ما يمكن معالجته.', 'red');
            return;
        }

        const [amountStr, reason] = rewardReasonSelect.value.split(':');
        const rewardAmount = parseInt(amountStr);
        const adminEmail = loggedInUserProfile.email;

        if (isNaN(rewardAmount) || rewardAmount === 0) {
            updateScanQueueUI('خطأ: قيمة المكافأة غير صالحة.', 'red');
            return;
        }

        if (!confirm(`هل أنت متأكد من إضافة ${rewardAmount} نقطة لـ ${uniqueEmails.length} مستخدم؟`)) {
            return;
        }

        processScansBtn.disabled = true;
        updateScanQueueUI(`جاري معالجة ${uniqueEmails.length} مستخدم...`, 'blue');

        try {
            // 🛑🛑 استخدام "amount" بدلاً من "rewardAmount" لتطابق الـ API الخلفي 🛑🛑
            const response = await fetch(`/admin-mass-update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emails: uniqueEmails,
                    amount: rewardAmount, // تم التعديل هنا
                    reason: reason,
                    adminEmail: adminEmail 
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // 🛑 استخدام updated_count من الـ API 
                updateScanQueueUI(`✅ نجاح! تم إضافة ${rewardAmount} نقطة لـ ${data.updated_count} مستخدم.`, 'green');
                scannedEmailsQueue = []; 
                await refreshUserData(); 
            } else {
                updateScanQueueUI(`❌ فشل المعالجة: ${data.error || 'خطأ غير محدد.'}`, 'red');
            }

        } catch (err) {
            updateScanQueueUI('خطأ في الاتصال بالـ API أثناء المعالجة.', 'red');
            console.error("Mass Scan Process Error:", err);
        } finally {
            // نؤخر التحديث النهائي لكي تظهر رسالة النجاح
            setTimeout(() => { updateScanQueueUI(); }, 3000); 
        }
    }


    // 🛑 دالة مسح QR (معدلة لتستخدم قائمة الانتظار) 🛑
    async function onScanSuccess(decodedText, decodedResult) {
        const scannedEmail = decodedText.trim();
        const [amountStr, reason] = rewardReasonSelect.value.split(':');
        const rewardAmount = parseInt(amountStr);

        if (!scannedEmail || isNaN(rewardAmount) || rewardAmount === 0) {
            updateScanQueueUI('خطأ: بيانات الكود أو المكافأة غير صالحة.', 'red');
            return;
        }
        
        // 1. تحقق من التكرار
        if (scannedEmailsQueue.includes(scannedEmail)) {
            updateScanQueueUI(`تحذير: إيميل ${scannedEmail} موجود بالفعل في القائمة.`, 'orange');
            return;
        }

        // 2. إضافة الإيميل إلى قائمة الانتظار
        scannedEmailsQueue.push(scannedEmail);

        // 3. تحديث الواجهة
        updateScanQueueUI(`تم إضافة ${scannedEmail} إلى قائمة الانتظار.`);
    }

    // 🛑 زر تشغيل الماسح 🛑
    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().then(() => {
                    startScanBtn.textContent = 'تشغيل الكاميرا والمسح';
                    readerDiv.innerHTML = '';
                    scanStatusMessage.textContent = 'تم إيقاف الماسح.';
                }).catch(err => {
                    scanStatusMessage.textContent = 'حدث خطأ أثناء إيقاف الماسح.';
                    scanStatusMessage.style.color = 'red';
                });
                return;
            }

            if (typeof Html5Qrcode === 'undefined') {
                scanStatusMessage.textContent = 'خطأ: لم يتم تحميل مكتبة Html5Qrcode.';
                scanStatusMessage.style.color = 'red';
                return;
            }

            if (!html5QrCode) { html5QrCode = new Html5Qrcode("reader"); }
            
            scanStatusMessage.textContent = 'جاري تفعيل الكاميرا... قد تظهر رسالة طلب إذن.';
            scanStatusMessage.style.color = 'blue';

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                (errorMessage) => { /* تجاهل أخطاء عدم العثور */ }
            )
            .then(() => {
                startScanBtn.textContent = 'إيقاف الماسح';
                scanStatusMessage.textContent = 'الكاميرا جاهزة! امسح كود QR الآن.';
                scanStatusMessage.style.color = 'green';
            })
            .catch((err) => {
                scanStatusMessage.textContent = `❌ فشل تفعيل الكاميرا: ${err}. تأكد من صلاحية الكاميرا.`;
                scanStatusMessage.style.color = 'red';
                console.error("Camera Start Error:", err);
            });
        });
    }

    // ----------------------------------------------------------------------------------
    // 🛑🛑 نهاية منطق المسح الجماعي 🛑🛑
    // ----------------------------------------------------------------------------------


    // 🛑 دالة إعادة ضبط الواجهة (محدثة) 🛑
    const resetUI = () => {
        // ... (كود resetUI كما هو) ...
        cardContainer.style.display = "none";
        formContainer.style.display = "flex";
        logoutBtn.style.display = "none";
        logoutBtnGuest.style.display = "none";
        guestContainer.style.display = "none";
        refreshDataBtn.style.display = "none";
        unlockedItemsBtn.style.display = "none";
        if (showQrBtn) showQrBtn.style.display = "none";
        adminPanelDiv.style.display = "none";
        adminPanelDiv.style.visibility = "hidden"; // لضمان الإخفاء
        // ... (بقية الإخفاء)
        
        // 🛑🛑 إعادة تعيين حالة قائمة المسح 🛑🛑
        scannedEmailsQueue = [];
        if (scannedUsersList) scannedUsersList.innerHTML = '';
        if (processScansBtn) processScansBtn.disabled = true;

        if (html5QrCode && html5QrCode.isScanning) {
             // ... (إيقاف الماسح)
             try {
                 html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
             } catch (e) {
                 console.warn("Scanner stop failed on reset:", e);
             }
        }
        html5QrCode = null;
    };

    resetUI();
    // 🛑🛑 استدعاء تحديث قائمة المسح الأولية 🛑🛑
    if(scannedUsersList) updateScanQueueUI("تأكد من اختيار نوع المكافأة قبل بدء المسح.", 'gray');


    // ----------------------------------------------------------------------------------
    // ... (بقية الدوال والـ Event Listeners - تم حذفها هنا للاختصار ولكنها موجودة في الكود الكامل لديك)
    // ----------------------------------------------------------------------------------

    // 🛑 الدوال الأساسية للـ UI (يجب أن تكون موجودة في الكود الكامل لديك) 🛑
    function hideUserSections() { /* ... */ }
    async function loadMainDashboard() { /* ... */ }
    async function loadUserUnlockedItems() { /* ... */ }
    async function refreshUserData() { /* ... */ }
    async function loadTransactionHistory(email) { /* ... */ }
    async function loadLeaderboards() { /* ... */ }
    async function loadActiveQuiz(email) { /* ... */ }
    async function loadAnnouncement() { /* ... */ }
    async function loadStoreItems() { /* ... */ }
    async function handleBuyItem(event) { /* ... */ }
    async function handleEditItem(itemId, name, price, imageUrl, requiredLevel) { /* ... */ }
    async function loadAdminStoreItems() { /* ... */ }
    async function handleDeleteItem(event) { /* ... */ }

    // 🛑 ربط الزرار الرئيسية (يجب أن تكون موجودة في الكود الكامل لديك) 🛑
    if (document.getElementById("unlocked-items-btn")) document.getElementById("unlocked-items-btn").addEventListener('click', loadUserUnlockedItems);
    if (document.getElementById("back-to-store-btn")) document.getElementById("back-to-store-btn").addEventListener('click', loadMainDashboard);
    document.getElementById("logout-btn").addEventListener("click", resetUI);
    if (document.getElementById("logout-btn-guest")) document.getElementById("logout-btn-guest").addEventListener("click", resetUI);
    document.getElementById("refresh-data-btn").addEventListener('click', refreshUserData);

    // 🛑 Admin Panel Setup (يجب أن تكون موجودة في الكود الكامل لديك) 🛑
    (function setupAdminPanel() { /* ... */ })(); 
    
    // 🛑 Login Form (يجب أن تكون موجودة في الكود الكامل لديك) 🛑
    document.getElementById("login-form").addEventListener("submit", async (event) => { /* ... */ });
    
});
