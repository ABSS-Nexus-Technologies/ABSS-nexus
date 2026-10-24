const http = require("http");

const BASE_URL = "http://127.0.0.1:3000";

const routesToTest = [
  // 1. Main company website — 12 pages
  { path: "/", name: "Home" },
  { path: "/about", name: "About Us" },
  { path: "/services", name: "Services" },
  { path: "/solutions", name: "Solutions" },
  { path: "/industries", name: "Industries" },
  { path: "/work", name: "Our Work / Portfolio" },
  { path: "/contact", name: "Contact Us" },
  { path: "/careers", name: "Careers" },
  { path: "/blog", name: "Blog" },
  { path: "/faq", name: "FAQ" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/terms-and-conditions", name: "Terms & Conditions" },

  // 2. Individual IT service pages — 15 pages + aliases
  { path: "/services/website-development", name: "Website Development" },
  { path: "/services/software-development", name: "Software Development" },
  { path: "/services/mobile-app-development", name: "Mobile App Development" },
  { path: "/services/ui-ux-design", name: "UI/UX Design" },
  { path: "/services/ai-machine-learning", name: "AI & Machine Learning" },
  { path: "/services/cloud-computing", name: "Cloud Computing" },
  { path: "/services/cybersecurity", name: "Cybersecurity" },
  { path: "/services/data-analytics", name: "Data Analytics & BI (Alias)" },
  { path: "/services/data-analytics-bi", name: "Data Analytics & BI" },
  { path: "/services/digital-marketing-seo", name: "Digital Marketing & SEO" },
  { path: "/services/ecommerce-development", name: "E-commerce Development" },
  { path: "/services/saas-development", name: "SaaS Development" },
  { path: "/services/api-integration", name: "API Integration" },
  { path: "/services/software-testing", name: "Software Testing & QA (Alias)" },
  { path: "/services/software-testing-qa", name: "Software Testing & QA" },
  { path: "/services/it-consulting", name: "IT Consulting" },
  { path: "/services/website-maintenance", name: "Website Maintenance" },
  { path: "/services/managed-it-support", name: "Managed IT Support" },

  // 3. Additional public pages
  { path: "/cookie-policy", name: "Cookie Policy" },
  { path: "/blog/modern-web-performance-core-web-vitals", name: "Blog: Modern Web Performance" },
  { path: "/blog/resilient-cloud-architecture-edge-computing", name: "Blog: Resilient Cloud Architecture" },
  { path: "/blog/minimalist-design-systems-conversion", name: "Blog: Minimalist Design Systems" },
  { path: "/work/fintech-payment-gateway", name: "Case Study: Fintech Gateway" },
  { path: "/work/healthcare-telemedicine-platform", name: "Case Study: Telemedicine Platform" },
  { path: "/work/ecommerce-headless-storefront", name: "Case Study: Headless E-commerce" },
  { path: "/careers/senior-fullstack-engineer", name: "Career: Senior Full-Stack Engineer" },
  { path: "/careers/lead-ui-ux-designer", name: "Career: Lead UI/UX Designer" },
  { path: "/careers/cloud-devops-architect", name: "Career: Cloud & DevOps Architect" },
  { path: "/internships/programs", name: "Internship Programs Hub" },
  { path: "/internships/programs/web-development", name: "Program: Web Development" },
  { path: "/internships/programs/data-science", name: "Program: Data Science" },
  { path: "/internships/programs/machine-learning", name: "Program: Machine Learning" },
  { path: "/internships/programs/data-analyst", name: "Program: Data Analyst" },
  { path: "/internships/programs/cyber-security", name: "Program: Cyber Security" },
  { path: "/internships/programs/software-development", name: "Program: Software Development" },
  { path: "/internships/programs/prompt-engineering", name: "Program: Prompt Engineering" },
  { path: "/internships/programs/agent-engineering", name: "Program: Agent Engineering" },
  { path: "/internships/programs/ai-engineering", name: "Program: AI Engineering" },
  { path: "/internships/programs/android-development", name: "Program: Android Development" },
  { path: "/internships/programs/product-management", name: "Program: Product Management" },
  { path: "/internships/programs/ui-ux-design", name: "Program: UI/UX Design" },
  { path: "/internships/programs/graphics-design", name: "Program: Graphics Design" },
  { path: "/internships/programs/human-resources", name: "Program: Human Resources" },
  { path: "/internships/programs/digital-marketing", name: "Program: Digital Marketing" },
  { path: "/internships/programs/content-writing", name: "Program: Content Writing" },
  { path: "/internships/programs/cloud-devops", name: "Program: Cloud & DevOps" },

  // 4. Internship public portal
  { path: "/internships", name: "Internships Home" },
  { path: "/internships/about", name: "Internship About Us" },
  { path: "/internships/details", name: "Internship Details" },
  { path: "/internships/contact", name: "Internship Contact Us" },
  { path: "/internships/privacy-policy", name: "Internship Privacy Policy" },
  { path: "/internships/terms-and-conditions", name: "Internship Terms & Conditions" },
  { path: "/internships/how-it-works", name: "How It Works" },
  { path: "/internships/faq", name: "Internship FAQ" },
  { path: "/internships/support", name: "Internship Support" },
  { path: "/internships/application-status", name: "Application Status" },
  { path: "/internships/payment-status", name: "Payment Status" },
  { path: "/verify-certificate", name: "Verify Certificate" },

  // 5. Authentication — 5 pages
  { path: "/register", name: "Register" },
  { path: "/login", name: "Login" },
  { path: "/verify-email", name: "Verify Email" },
  { path: "/forgot-password", name: "Forgot Password" },
  { path: "/reset-password", name: "Reset Password" },

  // 6. Student dashboard — 10 pages
  { path: "/student/dashboard", name: "Student Dashboard" },
  { path: "/student/profile", name: "Student Profile" },
  { path: "/student/applications", name: "Student Applications" },
  { path: "/student/internship", name: "Student Internship Track" },
  { path: "/student/tasks", name: "Student Tasks Board" },
  { path: "/student/tasks/task-1", name: "Student Task Detail" },
  { path: "/student/submissions", name: "Student Submissions" },
  { path: "/student/submit-work", name: "Student Submit Work" },
  { path: "/student/certificates", name: "Student Certificates" },
  { path: "/student/settings", name: "Student Settings" },

  // 7. Admin Console — Landing & Two Modules
  { path: "/admin/", name: "Admin Landing Hub" },
  { path: "/admin/login", name: "Admin Login" },

  // Module 1: Internship Administration (11 Pages)
  { path: "/admin/internships/", name: "Internship Admin Overview" },
  { path: "/admin/internships/programs", name: "Internship Admin Programs" },
  { path: "/admin/internships/applications", name: "Internship Admin Applications" },
  { path: "/admin/internships/students", name: "Internship Admin Students" },
  { path: "/admin/internships/tasks", name: "Internship Admin Tasks" },
  { path: "/admin/internships/submissions", name: "Internship Admin Submissions" },
  { path: "/admin/internships/reviews", name: "Internship Admin Reviews" },
  { path: "/admin/internships/payments", name: "Internship Admin Payments" },
  { path: "/admin/internships/certificates", name: "Internship Admin Certificates" },
  { path: "/admin/internships/reports", name: "Internship Admin Reports" },
  { path: "/admin/internships/settings", name: "Internship Admin Settings" },

  // Module 2: Company Administration (15 Pages)
  { path: "/admin/company/", name: "Company Admin Overview" },
  { path: "/admin/company/pages", name: "Company Admin Pages" },
  { path: "/admin/company/navigation", name: "Company Admin Navigation" },
  { path: "/admin/company/services", name: "Company Admin Services" },
  { path: "/admin/company/solutions", name: "Company Admin Solutions" },
  { path: "/admin/company/industries", name: "Company Admin Industries" },
  { path: "/admin/company/projects", name: "Company Admin Projects" },
  { path: "/admin/company/leads", name: "Company Admin Leads" },
  { path: "/admin/company/careers", name: "Company Admin Careers" },
  { path: "/admin/company/candidates", name: "Company Admin Candidates" },
  { path: "/admin/company/blog", name: "Company Admin Blog" },
  { path: "/admin/company/media", name: "Company Admin Media" },
  { path: "/admin/company/seo", name: "Company Admin SEO" },
  { path: "/admin/company/analytics", name: "Company Admin Analytics" },
  { path: "/admin/company/settings", name: "Company Admin Settings" },

  // Legacy Admin Pages (Backward Compatibility)
  { path: "/admin/dashboard", name: "Legacy Admin Dashboard" },
  { path: "/admin/leads", name: "Legacy Admin Leads" },
  { path: "/admin/clients", name: "Legacy Admin Clients" },
  { path: "/admin/projects", name: "Legacy Admin Projects" },
  { path: "/admin/pricing", name: "Legacy Admin Pricing" },
  { path: "/admin/support", name: "Legacy Admin Support" },
  { path: "/admin/programs", name: "Legacy Admin Programs" },
  { path: "/admin/applications", name: "Legacy Admin Applications" },
  { path: "/admin/students", name: "Legacy Admin Students" },
  { path: "/admin/tasks", name: "Legacy Admin Tasks" },
  { path: "/admin/submissions", name: "Legacy Admin Submissions" },
  { path: "/admin/reviews", name: "Legacy Admin Reviews" },
  { path: "/admin/payments", name: "Legacy Admin Payments" },
  { path: "/admin/certificates", name: "Legacy Admin Certificates" },
  { path: "/admin/users", name: "Legacy Admin Users" },
  { path: "/admin/audit-logs", name: "Legacy Admin Audit Logs" },
  { path: "/admin/settings", name: "Legacy Admin Settings" },

  // 8. Utility page
  { path: "/src/pages/404.html", name: "404 Error Page" },
];

function fetchRoute(routePath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${routePath}`, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    }).on("error", reject);
  });
}

async function runTests() {
  console.log(`\n=== Running 68-Page Architecture Validation (${routesToTest.length} Routes) ===\n`);
  let passed = 0;
  let failed = 0;

  for (const item of routesToTest) {
    try {
      const res = await fetchRoute(item.path);
      const isHtml = (res.headers["content-type"] || "").includes("text/html");
      const hasTitle = /<title>[^<]+<\/title>/i.test(res.body);

      if (res.status === 200 && isHtml && hasTitle) {
        console.log(`✓ [200 OK] ${item.name.padEnd(40)} ${item.path}`);
        passed++;
      } else {
        console.error(`✗ [FAIL]   ${item.name.padEnd(40)} ${item.path} -> Status: ${res.status}, isHtml: ${isHtml}, hasTitle: ${hasTitle}`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ [ERROR]  ${item.name.padEnd(40)} ${item.path} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== Result: ${passed} Passed, ${failed} Failed out of ${routesToTest.length} Routes ===\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
