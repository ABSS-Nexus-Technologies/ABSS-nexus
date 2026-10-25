/**
 * ABSS Nexus Technologies - Universal Client Authentication Engine
 * Handles student login, registration, email verification, and password reset.
 * Supports asynchronous AJAX submission, URL error/notice handling,
 * instant account verification banners, and graceful native form fallback.
 */

(function () {
  "use strict";

  function getAlertBox(form) {
    let alertBox = document.getElementById("auth-alert");
    if (!alertBox && form) {
      alertBox = document.createElement("div");
      alertBox.id = "auth-alert";
      alertBox.className = "auth-alert";
      form.parentNode.insertBefore(alertBox, form);
    }
    return alertBox;
  }

  function showAlert(type, message, htmlContent = "", form = null) {
    const alertBox = getAlertBox(form);
    if (!alertBox) return;
    alertBox.className = "auth-alert visible auth-alert-" + type;
    if (htmlContent) {
      alertBox.innerHTML = htmlContent;
    } else {
      alertBox.textContent = message;
    }
    alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearAlert(form = null) {
    const alertBox = getAlertBox(form);
    if (alertBox) {
      alertBox.className = "auth-alert";
      alertBox.innerHTML = "";
    }
  }

  function initAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramError = urlParams.get("error");
    const paramVerified = urlParams.get("verified");
    const paramRegistered = urlParams.get("registered");
    const paramReset = urlParams.get("reset");
    const paramDevVerificationUrl = urlParams.get("devVerificationUrl");
    const queryToken = urlParams.get("token");

    // 1. Process URL Query Parameters on Page Load
    if (paramError) {
      let errHtml = "<strong>" + paramError + "</strong>";
      if (paramDevVerificationUrl) {
        errHtml += `<div style="margin-top: 12px;"><a href="${paramDevVerificationUrl}" class="btn btn-primary" style="display:inline-block; padding: 8px 16px; font-size: 0.88rem; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Activate &amp; Verify Email Now &rarr;</a></div>`;
      }
      showAlert("error", "", errHtml);
    } else if (paramVerified === "1") {
      showAlert("success", "Email address verified successfully! Please log in to access your dashboard.");
    } else if (paramRegistered === "1") {
      showAlert("success", "Account created successfully! Please sign in with your credentials.");
    } else if (paramReset === "1") {
      showAlert("success", "Password updated successfully! Please sign in with your new password.");
    }

    // 2. Attach Student Login Handler (#login-form)
    const loginForm = document.getElementById("login-form") || document.querySelector("form[action*='/auth/login']");
    if (loginForm) {
      if (!loginForm.getAttribute("action")) {
        loginForm.setAttribute("action", "/api/internships/auth/login");
        loginForm.setAttribute("method", "POST");
      }

      loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearAlert(loginForm);

        const emailInput = document.getElementById("login-email") || loginForm.querySelector("input[type='email']");
        const passInput = document.getElementById("login-password") || document.getElementById("login-pass") || loginForm.querySelector("input[type='password']");
        const submitBtn = document.getElementById("login-submit-btn") || loginForm.querySelector("button[type='submit']");

        const email = (emailInput ? emailInput.value : "").trim().toLowerCase();
        const password = passInput ? passInput.value : "";

        if (!email || !password) {
          showAlert("error", "Please provide both your registered email address and password.", "", loginForm);
          return;
        }

        const originalText = submitBtn ? submitBtn.textContent : "Log In";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Authenticating...";
        }

        try {
          const res = await fetch("/api/internships/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            if (res.status === 403 && data.emailVerified === false) {
              let verifyHtml = "<strong>" + (data.error || "Please verify your email address before logging in.") + "</strong>";
              if (data.devVerificationUrl) {
                verifyHtml += `<div style="margin-top: 12px;"><a href="${data.devVerificationUrl}" class="btn btn-primary" style="display:inline-block; padding: 9px 18px; font-size: 0.9rem; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Activate &amp; Verify Email Now &rarr;</a></div>`;
              } else {
                verifyHtml += `<div style="margin-top: 8px;"><a href="/internships/verify-email" style="color: #0066cc; text-decoration: underline; font-weight: 600;">Click here to enter verification token &rarr;</a></div>`;
              }
              showAlert("error", "", verifyHtml, loginForm);
            } else {
              showAlert("error", data.error || "Invalid email or password.", "", loginForm);
            }

            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
            return;
          }

          showAlert("success", "Login successful! Redirecting to student dashboard...", "", loginForm);

          const redirectTarget = urlParams.get("redirect") || "/internships/dashboard";
          const safeRedirect = (redirectTarget && redirectTarget.startsWith("/") && !redirectTarget.startsWith("//"))
            ? redirectTarget
            : "/internships/dashboard";

          setTimeout(function () {
            window.location.href = safeRedirect;
          }, 500);
        } catch (err) {
          showAlert("error", "Network connection error. Please try again.", "", loginForm);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      });
    }

    // 3. Attach Student Registration Handler (#register-form or #reg-form)
    const regForm = document.getElementById("register-form") || document.getElementById("reg-form") || document.querySelector("form[action*='/auth/register']");
    if (regForm) {
      if (!regForm.getAttribute("action")) {
        regForm.setAttribute("action", "/api/internships/auth/register");
        regForm.setAttribute("method", "POST");
      }

      regForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearAlert(regForm);

        const nameInput = document.getElementById("reg-name") || document.getElementById("name") || regForm.querySelector("input[name='name']");
        const emailInput = document.getElementById("reg-email") || document.getElementById("email") || regForm.querySelector("input[name='email']");
        const phoneInput = document.getElementById("reg-phone") || document.getElementById("phone") || regForm.querySelector("input[name='phone']");
        const passInput = document.getElementById("reg-password") || document.getElementById("password") || regForm.querySelector("input[name='password']");
        const confirmInput = document.getElementById("reg-confirm") || document.getElementById("confirmPassword") || regForm.querySelector("input[name='confirmPassword']");
        const trackInput = document.getElementById("reg-track") || document.getElementById("track") || regForm.querySelector("select[name='track']");
        const durationInput = document.getElementById("reg-duration") || document.getElementById("duration") || regForm.querySelector("select[name='duration']");
        const submitBtn = document.getElementById("reg-submit-btn") || regForm.querySelector("button[type='submit']");

        const name = (nameInput ? nameInput.value : "").trim();
        const email = (emailInput ? emailInput.value : "").trim().toLowerCase();
        const phone = (phoneInput ? phoneInput.value : "").trim().replace(/\D/g, "").slice(-10);
        const password = passInput ? passInput.value : "";
        const confirmPassword = confirmInput ? confirmInput.value : "";
        const track = trackInput ? trackInput.value : "Web Development";
        const duration = durationInput ? durationInput.value : "4 Weeks";

        if (!name || name.length < 2) {
          showAlert("error", "Please provide your full legal name (minimum 2 characters).", "", regForm);
          if (nameInput) nameInput.focus();
          return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showAlert("error", "Please provide a valid email address.", "", regForm);
          if (emailInput) emailInput.focus();
          return;
        }

        if (!phone || phone.length !== 10) {
          showAlert("error", "Please provide a valid 10-digit WhatsApp / Mobile number.", "", regForm);
          if (phoneInput) phoneInput.focus();
          return;
        }

        if (!password || password.length < 8) {
          showAlert("error", "Password must be at least 8 characters long.", "", regForm);
          if (passInput) passInput.focus();
          return;
        }

        if (confirmInput && password !== confirmPassword) {
          showAlert("error", "Passwords do not match. Please re-enter your password.", "", regForm);
          if (confirmInput) confirmInput.focus();
          return;
        }

        const originalText = submitBtn ? submitBtn.textContent : "Register Account";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Creating Account...";
        }

        try {
          const res = await fetch("/api/internships/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ name, email, phone, password, track, duration }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            showAlert("error", data.error || "Registration could not be completed.", "", regForm);
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
            return;
          }

          // Dual Sync: mirror student registration to Firebase Firestore & Google Sheets (non-blocking)
          try {
            window.AbssDataSync?.dualSyncRecord("student_registration", {
              name,
              email,
              phone,
              track,
              duration,
              status: "Registered",
            });
          } catch {}

          regForm.reset();
          let successHtml = `
            <div style="text-align: left; line-height: 1.55;">
              <p style="font-size: 1.05rem; font-weight: 700; color: #166534; margin: 0 0 10px;">Account Created Successfully!</p>
              <p style="margin: 0 0 8px; font-size: 0.95rem;">📧 A verification link has been sent to <strong>${email}</strong></p>
              <p style="margin: 0 0 8px; color: #4b5563; font-size: 0.88rem;">Check your inbox (including spam folder) and click the link to verify.</p>
              ${data.verificationCode ? `<p style="margin: 8px 0 0; color: #4b5563; font-size: 0.88rem;">Code: <strong style="font-family: monospace; font-size: 1.15rem; letter-spacing: 2px; color: #0066cc;">${data.verificationCode}</strong> (if clicking link doesn't work)</p>` : ""}
              ${data.devVerificationUrl ? `
                <div style="margin-top: 14px; padding: 12px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;">
                  <p style="margin: 0 0 6px; font-weight: 600; color: #166534; font-size: 0.85rem;">Development Instant Activation:</p>
                  <a href="${data.devVerificationUrl}" class="btn btn-primary" style="display: inline-block; padding: 8px 16px; font-size: 0.88rem; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Verify &amp; Activate Account &rarr;</a>
                </div>
              ` : `
                <div style="margin-top: 14px;">
                  <a href="/internships/login" class="btn btn-primary" style="display: inline-block; padding: 10px 20px; font-size: 0.9rem; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Proceed to Login &rarr;</a>
                </div>
              `}
            </div>
          `;
          showAlert("success", "", successHtml, regForm);

          if (data.emailServiceConfigured) {
            console.log("[Auth Registration] ✓ Verification email dispatched via email API to:", email);
          } else {
            console.log("[Auth Registration] [Fallback Mode] No email API key configured. Verification Code:", data.verificationCode, "| Verification Link:", data.devVerificationUrl);
          }

          if (submitBtn) {
            submitBtn.textContent = "Account Registered!";
          }
        } catch (err) {
          showAlert("error", "Network connection error. Please try again.", "", regForm);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      });
    }

    // 4. Attach Google Sign-In Handler (#btn-google-auth)
    const googleBtn = document.getElementById("btn-google-auth");
    if (googleBtn) {
      googleBtn.addEventListener("click", async function () {
        clearAlert();
        const originalHtml = googleBtn.innerHTML;
        googleBtn.disabled = true;
        googleBtn.innerHTML = `<span>Connecting to Google...</span>`;

        try {
          const { handleGoogleSignInFlow } = await import("/src/scripts/firebase-auth.js");
          const result = await handleGoogleSignInFlow(async function (googleUser) {
            const entered = window.prompt(`Welcome, ${googleUser.displayName || "Student"}!\n\nPlease enter your 10-digit WhatsApp / Mobile number to complete your registration:`);
            return entered;
          });

          showAlert("success", "Login successful! Redirecting to dashboard...");
          const redirectTarget = urlParams.get("redirect") || result?.redirect || "/internships/dashboard";
          setTimeout(function () {
            window.location.href = redirectTarget;
          }, 500);
        } catch (err) {
          showAlert("error", err?.message || "Google sign-in could not be completed.");
          googleBtn.disabled = false;
          googleBtn.innerHTML = originalHtml;
        }
      });
    }

    // 5. Attach Email Verification Handler (#verify-form)
    const verifyForm = document.getElementById("verify-form") || document.querySelector("form[action*='/auth/verify-email']");
    const tokenInput = document.getElementById("verify-token") || (verifyForm ? verifyForm.querySelector("input[name='token']") : null);
    const verifySubmitBtn = document.getElementById("verify-submit-btn") || (verifyForm ? verifyForm.querySelector("button[type='submit']") : null);
    const successActions = document.getElementById("verify-success-actions");

    async function submitVerification(token) {
      if (!token) return;
      if (verifySubmitBtn) {
        verifySubmitBtn.disabled = true;
        verifySubmitBtn.textContent = "Verifying Token...";
      }

      try {
        const res = await fetch("/api/internships/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          showAlert("error", data.error || "Email verification failed.", "", verifyForm);
          if (verifySubmitBtn) {
            verifySubmitBtn.disabled = false;
            verifySubmitBtn.textContent = "Verify Email Address";
          }
          return;
        }

        if (verifyForm) verifyForm.style.display = "none";
        if (successActions) successActions.style.display = "block";
        const loginUrl = "/internships/login?verified=1";
        const msg = (data.message || "Email address verified successfully!") + `<div style="margin-top: 14px;"><a href="${loginUrl}" class="btn btn-primary" style="display:inline-block; padding: 9px 18px; font-size: 0.9rem; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Proceed to Login &rarr;</a></div>`;
        showAlert("success", "", msg, verifyForm);
      } catch (err) {
        showAlert("error", "Network connection error. Please try again.", "", verifyForm);
        if (verifySubmitBtn) {
          verifySubmitBtn.disabled = false;
          verifySubmitBtn.textContent = "Verify Email Address";
        }
      }
    }

    if (queryToken && (verifyForm || tokenInput)) {
      if (tokenInput) tokenInput.value = queryToken;
      submitVerification(queryToken);
    }

    if (verifyForm) {
      verifyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const token = tokenInput ? tokenInput.value.trim() : "";
        if (!token) {
          showAlert("error", "Please paste or enter your verification token.", "", verifyForm);
          return;
        }
        submitVerification(token);
      });
    }

    // 6. Attach Forgot Password Handler (#forgot-form)
    const forgotForm = document.getElementById("forgot-form") || document.querySelector("form[action*='/auth/forgot-password']");
    if (forgotForm) {
      forgotForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearAlert(forgotForm);

        const emailInp = document.getElementById("forgot-email") || forgotForm.querySelector("input[type='email']");
        const btn = forgotForm.querySelector("button[type='submit']");
        const email = emailInp ? emailInp.value.trim().toLowerCase() : "";

        if (!email) {
          showAlert("error", "Please enter your registered email address.", "", forgotForm);
          return;
        }

        const origText = btn ? btn.textContent : "Send Reset Link";
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Sending...";
        }

        try {
          const res = await fetch("/api/internships/auth/forgot-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ email }),
          });
          const data = await res.json().catch(() => ({}));

          let successHtml = "<strong>" + (data.message || "Password reset link sent if account exists.") + "</strong>";
          if (data.devResetUrl) {
            successHtml += `<div style="margin-top: 14px; padding: 12px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;"><p style="margin: 0 0 8px; font-weight: 600; color: #166534;">Local Dev Password Reset:</p><a href="${data.devResetUrl}" class="btn btn-primary" style="display:inline-block; padding: 8px 16px; background: #0066cc; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password Now &rarr;</a></div>`;
          }
          showAlert("success", "", successHtml, forgotForm);
          if (btn) {
            btn.disabled = false;
            btn.textContent = origText;
          }
        } catch (err) {
          showAlert("error", "Network connection error. Please try again.", "", forgotForm);
          if (btn) {
            btn.disabled = false;
            btn.textContent = origText;
          }
        }
      });
    }

    // 7. Attach Reset Password Handler (#reset-form)
    const resetForm = document.getElementById("reset-form") || document.querySelector("form[action*='/auth/reset-password']");
    if (resetForm) {
      resetForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearAlert(resetForm);

        const tokenInp = document.getElementById("reset-token") || resetForm.querySelector("input[name='token']");
        const passInp = document.getElementById("reset-password") || document.getElementById("reset-new-password") || document.getElementById("new-pass") || resetForm.querySelector("input[name='password']");
        const confirmInp = document.getElementById("reset-confirm") || document.getElementById("reset-confirm-password") || resetForm.querySelector("input[name='confirmPassword']");
        const btn = resetForm.querySelector("button[type='submit']");

        const token = queryToken || (tokenInp ? tokenInp.value.trim() : "");
        const newPassword = passInp ? passInp.value : "";
        const confirmPass = confirmInp ? confirmInp.value : "";

        if (!token) {
          showAlert("error", "Missing or invalid reset token. Please request a new link.", "", resetForm);
          return;
        }

        if (!newPassword || newPassword.length < 8) {
          showAlert("error", "Password must be at least 8 characters long.", "", resetForm);
          return;
        }

        if (confirmInp && newPassword !== confirmPass) {
          showAlert("error", "Passwords do not match.", "", resetForm);
          return;
        }

        const origText = btn ? btn.textContent : "Set New Password";
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Updating Password...";
        }

        try {
          const res = await fetch("/api/internships/auth/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ token, newPassword }),
          });
          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            showAlert("error", data.error || "Password reset failed.", "", resetForm);
            if (btn) {
              btn.disabled = false;
              btn.textContent = origText;
            }
            return;
          }

          resetForm.reset();
          showAlert("success", "Password updated successfully! Redirecting to login...", "", resetForm);
          setTimeout(function () {
            window.location.href = "/internships/login?reset=1";
          }, 800);
        } catch (err) {
          showAlert("error", "Network connection error. Please try again.", "", resetForm);
          if (btn) {
            btn.disabled = false;
            btn.textContent = origText;
          }
        }
      });
    }

    // Initialize password reveal toggles
    if (typeof initPasswordToggles === "function") {
      initPasswordToggles();
    } else {
      document.querySelectorAll('.toggle-password-btn').forEach(btn => {
        if (btn.dataset.toggleBound) return;
        btn.dataset.toggleBound = "true";
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const wrapper = btn.closest('.password-input-wrapper') || btn.parentElement;
          const input = wrapper ? wrapper.querySelector('input') : null;
          if (!input) return;
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.setAttribute('aria-pressed', !isPassword);
          btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
          const openEye = btn.querySelector('.eye-open');
          const offEye = btn.querySelector('.eye-off');
          if (openEye && offEye) {
            openEye.style.display = isPassword ? 'none' : 'block';
            offEye.style.display = isPassword ? 'block' : 'none';
          }
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }

  // Global helper
  window.AbssAuth = {
    showAlert,
    clearAlert,
  };
})();
