const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");
const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".html"));

const authPages = new Set([
  "login.html",
  "register.html",
  "forgot-password.html",
  "reset-password.html",
  "verify-email.html",
  "internships-login.html",
  "internships-register.html",
  "internships-forgot-password.html",
  "internships-reset-password.html",
  "internships-verify-email.html"
]);

const studentPages = new Set([
  "internships-dashboard.html",
  "student-applications.html",
  "student-certificates.html",
  "student-dashboard.html",
  "student-internship.html",
  "student-profile.html",
  "student-settings.html",
  "student-submissions.html",
  "student-submit-work.html",
  "student-task-detail.html",
  "student-tasks.html"
]);

let updatedScript = 0;
let updatedAuthCss = 0;
let updatedTwitter = 0;
let updatedRobots = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let html = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // 1. Auth pages keep full styles.css to support header, dark theme, and footer


  // 2. Defer script.js
  if (/<script\s+src=["']\/src\/scripts\/script\.js["']\s*><\/script>/i.test(html)) {
    html = html.replace(/<script\s+src=["']\/src\/scripts\/script\.js["']\s*><\/script>/gi, '<script src="/src/scripts/script.js" defer></script>');
    modified = true;
    updatedScript++;
  }

  // 3. Defer seo-schema.js
  if (/<script\s+src=["']\/src\/scripts\/seo-schema\.js["']\s*><\/script>/i.test(html)) {
    html = html.replace(/<script\s+src=["']\/src\/scripts\/seo-schema\.js["']\s*><\/script>/gi, '<script src="/src/scripts/seo-schema.js" defer></script>');
    modified = true;
  }

  // 4. Meta Twitter card on public pages
  if (!studentPages.has(file) && !html.includes("twitter:card")) {
    if (html.includes('property="og:image"')) {
      html = html.replace(/(<meta property=["']og:image["'][^>]+>)/i, '$1\n    <meta name="twitter:card" content="summary_large_image" />');
      modified = true;
      updatedTwitter++;
    } else if (html.includes("<title>")) {
      html = html.replace(/(<title>)/i, '<meta name="twitter:card" content="summary_large_image" />\n    $1');
      modified = true;
      updatedTwitter++;
    }
  }

  // 5. Robots meta tag on public pages
  if (!studentPages.has(file) && !html.includes('name="robots"')) {
    if (html.includes('name="viewport"')) {
      html = html.replace(/(<meta name=["']viewport["'][^>]+>)/i, '$1\n    <meta name="robots" content="index, follow" />');
      modified = true;
      updatedRobots++;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, "utf8");
  }
}

console.log(`Page optimizations applied successfully:
- script.js deferred: ${updatedScript}
- Auth pages switched to auth.min.css: ${updatedAuthCss}
- twitter:card added: ${updatedTwitter}
- robots added: ${updatedRobots}`);
