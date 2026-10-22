/**
 * ABSS Nexus Technologies — Firebase Configuration & Enterprise Identity Provider
 * 
 * Recommended Authentication Architecture:
 * - In accordance with security best practices, production client authentication
 *   can utilize Firebase Authentication (Google Sign-In, Email/Password, MFA).
 * - Avoid custom rolling authentication for untrusted environments.
 * - This module automatically detects configured Firebase environment tokens
 *   and exports the client authentication instances.
 */

// Global configuration object (injected via window.__ABSS_CONFIG__, process.env, or project defaults)
export const firebaseConfig = {
  apiKey: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_API_KEY) || (typeof process !== "undefined" && process.env?.FIREBASE_API_KEY) || "AIzaSyBWZ2Ui1Lgwi5buYkmytubFUOwYjxokRXE",
  authDomain: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_AUTH_DOMAIN) || (typeof process !== "undefined" && process.env?.FIREBASE_AUTH_DOMAIN) || "abss-nexus-technologies.firebaseapp.com",
  projectId: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_PROJECT_ID) || (typeof process !== "undefined" && process.env?.FIREBASE_PROJECT_ID) || "abss-nexus-technologies",
  storageBucket: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_STORAGE_BUCKET) || (typeof process !== "undefined" && process.env?.FIREBASE_STORAGE_BUCKET) || "abss-nexus-technologies.firebasestorage.app",
  messagingSenderId: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_MESSAGING_SENDER_ID) || (typeof process !== "undefined" && process.env?.FIREBASE_MESSAGING_SENDER_ID) || "920484841009",
  appId: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_APP_ID) || (typeof process !== "undefined" && process.env?.FIREBASE_APP_ID) || "1:920484841009:web:f597c5e6980b5ed8edf710",
  measurementId: (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_MEASUREMENT_ID) || (typeof process !== "undefined" && process.env?.FIREBASE_MEASUREMENT_ID) || "G-7TGL0VYJX2"
};

/**
 * Checks whether Firebase credentials have been configured for the environment.
 * @returns {boolean}
 */
export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey.length > 10);
};
