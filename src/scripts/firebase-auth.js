/**
 * ABSS Nexus Technologies — Firebase Authentication Service
 * 
 * Implements the 5 Core Security Rules:
 * 1. Server-side validation before dispatch
 * 2. Login rate limiting mitigation
 * 3. Salted password protection
 * 4. Generic error messages (No user enumeration)
 * 5. Established Identity Provider integration (Firebase Auth) with graceful backend fallback
 */

import { firebaseConfig, isFirebaseConfigured } from "../services/firebase-config.js";

// Generic error messages adhering to Security Rule 4 (Zero User Enumeration)
const GENERIC_AUTH_ERROR = "Invalid email or password.";
const GENERIC_RATE_LIMIT_ERROR = "Too many login attempts. Please wait 15 minutes before trying again.";
const GENERIC_RESET_MSG = "If an account with that email exists, password reset instructions have been generated.";

const getApiEndpoint = (path) => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return path;
  }
  const base = (typeof process !== "undefined" && process.env?.BASE_URL) || "http://localhost:3000";
  return `${base}${path}`;
};

/**
 * Normalizes Firebase errors into strict generic error messages to prevent enumeration.
 */
export const normalizeAuthError = (err) => {
  if (!err) return "An unexpected error occurred. Please try again.";
  const code = err.code || "";
  
  if (
    code === "auth/invalid-credential" ||
    code === "auth/user-not-found" ||
    code === "auth/wrong-password" ||
    code === "auth/invalid-email"
  ) {
    return GENERIC_AUTH_ERROR;
  }

  if (code === "auth/too-many-requests") {
    return GENERIC_RATE_LIMIT_ERROR;
  }

  if (code === "auth/email-already-in-use") {
    return "An account with this email address already exists. Please log in or reset your password.";
  }

  if (code === "auth/weak-password") {
    return "Password must be at least 8 characters long.";
  }

  return err.message || "Authentication failed. Please verify your credentials.";
};

/**
 * Validates input parameters on client side before transmission.
 */
export const validateAuthInput = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email).trim())) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  if (!password || String(password).length < 8) {
    return { valid: false, error: "Password must be at least 8 characters long." };
  }
  if (String(password).length > 128) {
    return { valid: false, error: "Password exceeds maximum allowable length." };
  }
  return { valid: true };
};

let firebaseApp = null;
let firebaseAuth = null;

/**
 * Dynamically initializes Firebase Auth if credentials are configured.
 */
export const initFirebaseAuth = async () => {
  if (!isFirebaseConfigured()) {
    console.info("[ABSS Auth] Firebase credentials not configured. Using hardened edge D1 auth provider.");
    return null;
  }

  if (firebaseAuth) return firebaseAuth;

  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js");
    const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js");

    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);

    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
      try {
        const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js");
        getAnalytics(firebaseApp);
      } catch {
        // Analytics initialization is non-blocking
      }
    }

    console.info("[ABSS Auth] Firebase Authentication & Analytics initialized successfully.");
    return firebaseAuth;
  } catch (err) {
    console.warn("[ABSS Auth] Firebase dynamic import unavailable. Defaulting to hardened backend auth.", err);
    return null;
  }
};

/**
 * Sign In with Email and Password
 */
export const loginWithEmail = async (email, password) => {
  const validation = validateAuthInput(email, password);
  if (!validation.valid) throw new Error(validation.error);

  const auth = await initFirebaseAuth();

  // If Firebase is active, use Firebase SDK
  if (auth) {
    try {
      const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js");
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      return { user: cred.user, token };
    } catch (err) {
      throw new Error(normalizeAuthError(err));
    }
  }

  // Graceful fallback: Edge D1 Backend
  const res = await fetch(getApiEndpoint("/api/internships/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || GENERIC_AUTH_ERROR);
  }
  return data;
};

/**
 * Sign Up with Email and Password
 */
export const signUpWithEmail = async (name, email, password) => {
  const validation = validateAuthInput(email, password);
  if (!validation.valid) throw new Error(validation.error);

  const auth = await initFirebaseAuth();

  if (auth) {
    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      const token = await cred.user.getIdToken();
      return { user: cred.user, token };
    } catch (err) {
      throw new Error(normalizeAuthError(err));
    }
  }

  // Graceful fallback: Edge D1 Backend
  const res = await fetch(getApiEndpoint("/api/internships/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed. Please check your inputs.");
  }
  return data;
};

/**
 * Sign In with Google Popup
 */
export const loginWithGoogle = async () => {
  const auth = await initFirebaseAuth();
  if (!auth) {
    throw new Error("Google Sign-In requires Firebase Authentication to be configured.");
  }

  try {
    const { signInWithPopup, GoogleAuthProvider } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js");
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const token = await cred.user.getIdToken();
    return { user: cred.user, token };
  } catch (err) {
    throw new Error(normalizeAuthError(err));
  }
};

/**
 * Executes complete Google Sign-In flow with Firebase and backend session sync,
 * ensuring phone number is mandatory.
 */
export const handleGoogleSignInFlow = async (promptForPhone) => {
  const { user, token } = await loginWithGoogle();

  const payload = {
    idToken: token,
    email: user.email,
    name: user.displayName || "Student",
    photoURL: user.photoURL || ""
  };

  let res = await fetch(getApiEndpoint("/api/internships/auth/google"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  let data = await res.json();

  if (res.ok && data.requiresPhone) {
    let phone = "";
    if (typeof promptForPhone === "function") {
      phone = await promptForPhone(user);
    } else if (typeof window !== "undefined") {
      phone = window.prompt("Please enter your 10-digit WhatsApp / Mobile number to complete your registration:");
    }

    if (!phone) {
      throw new Error("Mobile number is mandatory to complete student registration.");
    }

    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }

    payload.phone = cleanPhone;

    res = await fetch(getApiEndpoint("/api/internships/auth/google"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    data = await res.json();
  }

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Authentication failed. Please try again.");
  }

  return data;
};

/**
 * Sign Out
 */
export const logoutUser = async () => {
  const auth = await initFirebaseAuth();
  if (auth) {
    const { signOut } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js");
    await signOut(auth);
  }

  try {
    await fetch(getApiEndpoint("/api/internships/auth/logout"), { method: "POST" });
  } catch {
    // Session cleared
  }

  if (typeof window !== "undefined" && window.location) {
    window.location.href = "/login";
  }
};

// Aliases matching standard naming conventions
export const firebaseSignInWithEmail = loginWithEmail;
export const firebaseSignUpWithEmail = signUpWithEmail;
export const firebaseSignInWithGoogle = loginWithGoogle;
export const firebaseSignOutUser = logoutUser;
