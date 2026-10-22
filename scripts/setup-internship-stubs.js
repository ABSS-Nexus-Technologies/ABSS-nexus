const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const routes = [
  { dir: "internships", src: "src/pages/internships.html" },
  { dir: "internships/about", src: "src/pages/internships-about.html" },
  { dir: "internships/details", src: "src/pages/internships-details.html" },
  { dir: "internships/contact", src: "src/pages/internships-contact.html" },
  { dir: "internships/privacy-policy", src: "src/pages/internships-privacy-policy.html" },
  { dir: "internships/terms-and-conditions", src: "src/pages/internships-terms-conditions.html" },
  { dir: "internships/programs", src: "src/pages/internships-programs.html" },
  { dir: "internships/programs/web-development", src: "src/pages/internships-program-web-development.html" },
  { dir: "internships/programs/software-development", src: "src/pages/internships-program-software-development.html" },
  { dir: "internships/programs/ui-ux-design", src: "src/pages/internships-program-ui-ux-design.html" },
  { dir: "internships/programs/ai-machine-learning", src: "src/pages/internships-program-ai-machine-learning.html" },
  { dir: "internships/programs/cloud-devops", src: "src/pages/internships-program-cloud-devops.html" },
  { dir: "internships/how-it-works", src: "src/pages/internships-how-it-works.html" },
  { dir: "internships/faq", src: "src/pages/internships-faq.html" },
  { dir: "internships/support", src: "src/pages/internships-support.html" },
  { dir: "internships/register", src: "src/pages/internships-register.html" },
  { dir: "internships/login", src: "src/pages/internships-login.html" },
  { dir: "internships/verify-email", src: "src/pages/internships-verify-email.html" },
  { dir: "internships/forgot-password", src: "src/pages/internships-forgot-password.html" },
  { dir: "internships/reset-password", src: "src/pages/internships-reset-password.html" },
  { dir: "internships/dashboard", src: "src/pages/internships-dashboard.html" },
];

for (const { dir, src } of routes) {
  const fullDir = path.join(rootDir, dir);
  fs.mkdirSync(fullDir, { recursive: true });
  const content = fs.readFileSync(path.join(rootDir, src), "utf8");
  fs.writeFileSync(path.join(fullDir, "index.html"), content, "utf8");
  console.log(`Created stub: ${dir}/index.html`);
}

console.log("All internship directory stubs created successfully.");
