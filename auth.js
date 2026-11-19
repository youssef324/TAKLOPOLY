/* ==========================================================================
   TAKLOPOLY — Dedicated Authentication Logic (login.html & signup.html)
   Handles form validation, Cloudinary uploads, and server session checks.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageDiv = document.getElementById("message");

    // Cloudinary Configuration (Preserved from existing app.js)
    const CLOUDINARY_CLOUD_NAME = "Dhbanzq4n";
    const CLOUDINARY_UPLOAD_PRESET = "kiropay_upload";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const DEFAULT_AVATAR_URL = "/default-avatar.png";

    // Helper: display status message
    function showMessage(text, type = "info") {
        if (!messageDiv) return;
        messageDiv.textContent = text;
        messageDiv.className = `status-${type}`;
        messageDiv.style.display = "block";
    }

    function clearMessage() {
        if (!messageDiv) return;
        messageDiv.textContent = "";
        messageDiv.className = "";
        messageDiv.style.display = "none";
    }

    // Check if the user already has a valid server session
    async function checkExistingSession() {
        try {
            const res = await fetch("/get-session", { credentials: "same-origin" });
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated && data.user) {
                    // Already logged in - smoothly redirect to main application
                    window.location.href = "index.html";
                }
            }
        } catch (e) {
            // Offline or serverless function not running locally; stay on login/signup page
            console.log("Session pre-check skipped:", e.message);
        }
    }

    // Client-side image compression helper (Preserved from existing app.js)
    function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, "image/jpeg", quality);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    // -------------------------------------------------------------
    // 1. LOGIN HANDLING
    // -------------------------------------------------------------
    if (loginForm) {
        checkExistingSession();

        const submitBtn = document.getElementById("login-submit-btn");

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearMessage();

            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value : "";

            if (!email || !password) {
                showMessage("الرجاء إدخال البريد الإلكتروني وكلمة المرور.", "error");
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>جاري التحقق...</span> <i class="fas fa-spinner fa-spin"></i>`;
            }
            showMessage("جاري تسجيل الدخول...", "info");

            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "same-origin"
                });

                const data = await response.json().catch(() => ({ error: "استجابة غير صالحة من السيرفر." }));

                if (response.ok && data.success) {
                    showMessage("تم تسجيل الدخول بنجاح! جاري الانتقال للعبة...", "success");
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 500);
                } else {
                    showMessage(data.error || "البريد الإلكتروني أو كلمة المرور غير صحيحة.", "error");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `<span>دخول اللعبة</span> <i class="fas fa-arrow-left"></i>`;
                    }
                }
            } catch (err) {
                console.error("Login Error:", err);
                showMessage("حدث خطأ في الاتصال بالخادم. تأكد من اتصال الإنترنت.", "error");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>دخول اللعبة</span> <i class="fas fa-arrow-left"></i>`;
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 2. SIGNUP HANDLING
    // -------------------------------------------------------------
    if (signupForm) {
        checkExistingSession();
        initFamilyOptions();

        // Fetch and populate families dynamically from central config
        async function initFamilyOptions() {
            const familySelect = document.getElementById("family");
            if (!familySelect) return;
            try {
                const res = await fetch("/get-families");
                if (res.ok) {
                    const data = await res.json();
                    if (data.families && Array.isArray(data.families) && data.families.length > 0) {
                        const currentVal = familySelect.value;
                        familySelect.innerHTML = '<option value="" disabled selected>-- اختر الأسرة --</option>';
                        data.families.forEach(f => {
                            const opt = document.createElement("option");
                            opt.value = f;
                            opt.textContent = f;
                            if (f === currentVal) opt.selected = true;
                            familySelect.appendChild(opt);
                        });
                    }
                }
            } catch (e) {
                console.log("Could not load dynamic families, keeping static options:", e.message);
            }
        }

        const submitBtn = document.getElementById("signup-submit-btn");

        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearMessage();

            const nameInput = document.getElementById("name");
            const familySelect = document.getElementById("family");
            const emailInput = document.getElementById("signup-email");
            const passwordInput = document.getElementById("signup-password");
            const avatarFileInput = document.getElementById("signup-avatar-file");

            const name = nameInput ? nameInput.value.trim() : "";
            const family = familySelect ? familySelect.value : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value : "";
            const avatarFile = (avatarFileInput && avatarFileInput.files) ? avatarFileInput.files[0] : null;

            if (!name || !family || !email || !password) {
                showMessage("الرجاء ملء جميع الحقول المطلوبة واختيار الأسرة.", "error");
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>جاري المعالجة...</span> <i class="fas fa-spinner fa-spin"></i>`;
            }

            let profile_image_url = DEFAULT_AVATAR_URL;

            try {
                if (avatarFile) {
                    showMessage("جاري ضغط ورفع الصورة الشخصية...", "info");
                    const resizedBlob = await resizeImage(avatarFile, 250, 250, 0.7);
                    const formData = new FormData();
                    formData.append("file", resizedBlob);
                    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                    const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                        method: "POST",
                        body: formData
                    });

                    if (!cloudinaryResponse.ok) {
                        throw new Error("فشل رفع الصورة إلى خدمة التخزين السحابي.");
                    }

                    const cloudinaryData = await cloudinaryResponse.json();
                    profile_image_url = cloudinaryData.secure_url;
                }

                showMessage("جاري إنشاء الحساب في السيرفر...", "info");

                const dataToFunctions = new FormData();
                dataToFunctions.append("name", name);
                dataToFunctions.append("family", family);
                dataToFunctions.append("email", email);
                dataToFunctions.append("password", password);
                dataToFunctions.append("profile_image_url", profile_image_url);

                const response = await fetch("/signup", {
                    method: "POST",
                    body: dataToFunctions
                });

                const data = await response.json().catch(() => ({ error: "استجابة غير صالحة من السيرفر." }));

                if (response.ok && data.success) {
                    showMessage("تم إنشاء الحساب بنجاح! جاري تحويلك لصفحة تسجيل الدخول...", "success");
                    signupForm.reset();
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                } else {
                    showMessage(data.error || "فشل إنشاء الحساب، يرجى المحاولة مرة أخرى.", "error");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `<span>تأكيد التسجيل وبدء اللعب</span> <i class="fas fa-rocket"></i>`;
                    }
                }
            } catch (err) {
                console.error("Signup Error:", err);
                showMessage(`حدث خطأ: ${err.message || "فشل غير متوقع."}`, "error");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>تأكيد التسجيل وبدء اللعب</span> <i class="fas fa-rocket"></i>`;
                }
            }
        });
    }
});
