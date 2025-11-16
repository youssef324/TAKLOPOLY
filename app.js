document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. تعريف العناصر (DOM Elements) - (كاملة هنا)
    // -----------------------------------------------------
    
    // ... (كل تعريفات العناصر const و let في هذا الجزء) ...
    const loginForm = document.getElementById("login-form");
    // ...
    const guestDetailsModal = document.getElementById("guest-details-modal"); 
    // ...
    let loggedInUserProfile = null; 
    
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

    // 🛑 [FINAL FIX] دالة إعادة الضبط القسرية
    const resetUI = () => {
        // إخفاء الأقسام الرئيسية
        if(cardContainer) cardContainer.style.display = "none";
        if(formContainer) formContainer.style.display = "flex"; 
        if(logoutBtn) logoutBtn.style.display = "none";
        if(refreshDataBtn) refreshDataBtn.style.display = "none";
        if(adminPanelDiv) adminPanelDiv.style.display = "none";
        if(guestContainer) guestContainer.style.display = "none"; // 👈 المتغير مُعرّف الآن!

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
    
    // 🛑🛑🛑 استدعاء الدالة هنا بعد تعريف جميع المتغيرات 🛑🛑🛑
    resetUI(); 


    // ... (بقية الدوال) ...

    // -----------------------------------------------------
    // 4. منطق تسجيل الدخول (Login Logic)
    // -----------------------------------------------------
    loginForm.addEventListener("submit", async (event) => {
        // ... (كود الدخول الذي تم تصحيحه سابقاً) ...
    });

    // ... (بقية الملف كما تم إرساله مسبقاً) ...
});
