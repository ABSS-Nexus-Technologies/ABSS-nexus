const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const componentsDir = path.join(rootDir, "src", "components");
const pagesDir = path.join(rootDir, "src", "pages");

const headerTemplate = fs.readFileSync(path.join(componentsDir, "header.html"), "utf8").trim();
const footerTemplate = fs.readFileSync(path.join(componentsDir, "footer.html"), "utf8").trim();
const whatsappTemplate = fs.readFileSync(path.join(componentsDir, "floating-whatsapp.html"), "utf8").trim();

const internshipHeaderPath = path.join(componentsDir, "internship-header.html");
const internshipFooterPath = path.join(componentsDir, "internship-footer.html");
const internshipHeaderTemplate = fs.existsSync(internshipHeaderPath)
  ? fs.readFileSync(internshipHeaderPath, "utf8").trim()
  : headerTemplate;
const internshipFooterTemplate = fs.existsSync(internshipFooterPath)
  ? fs.readFileSync(internshipFooterPath, "utf8").trim()
  : footerTemplate;

// Route mapping helper
function getPageRoute(fileName) {
  if (fileName === "index.html") return "/";
  const name = fileName.replace(/\.html$/, "");
  if (name.startsWith("service-")) return `/services/${name.replace(/^service-/, "")}`;
  if (fileName === "internships-terms-conditions.html") return "/internships/terms-and-conditions";
  if (name.startsWith("internships-program-")) return `/internships/programs/${name.replace(/^internships-program-/, "")}`;
  if (name.startsWith("internships-")) return `/internships/${name.replace(/^internships-/, "")}`;
  if (name.startsWith("work-")) return `/work/${name.replace(/^work-/, "")}`;
  if (name.startsWith("blog-")) return `/blog/${name.replace(/^blog-/, "")}`;
  if (name.startsWith("career-")) return `/careers/${name.replace(/^career-/, "")}`;
  return `/${name}`;
}

function isInternshipPage(file) {
  return file.startsWith("internships") || file === "verify-certificate.html";
}

function customizeAcademyHeaderForPage(rawHeader, pageRoute) {
  let customized = rawHeader.replace(/\s+aria-current="page"/g, "");
  if (pageRoute === "/internships") {
    customized = customized.replace('href="/internships" class="nav-link">Home</a>', 'href="/internships" class="nav-link" aria-current="page">Home</a>');
  } else {
    const targetHref = `href="${pageRoute}"`;
    if (customized.includes(targetHref)) {
      customized = customized.replace(targetHref, `${targetHref} aria-current="page"`);
    } else if (pageRoute.startsWith("/internships/programs")) {
      customized = customized.replace('href="/internships/programs" class="nav-link"', 'href="/internships/programs" class="nav-link" aria-current="page"');
    } else if (pageRoute.startsWith("/internships/details") || pageRoute.startsWith("/internships/how-it-works")) {
      customized = customized.replace('href="/internships/details" class="nav-link"', 'href="/internships/details" class="nav-link" aria-current="page"');
    }
  }
  return customized;
}

function customizeHeaderForPage(rawHeader, pageRoute) {
  // Clear any existing aria-current="page"
  let customized = rawHeader.replace(/\s+aria-current="page"/g, "");

  // Highlight exact match or parent match
  if (pageRoute === "/") {
    customized = customized.replace('<a href="/" class="nav-link">', '<a href="/" class="nav-link" aria-current="page">');
  } else {
    // If it is a service page, highlight Services dropdown trigger or specific link
    const targetHref = `href="${pageRoute}"`;
    if (customized.includes(targetHref)) {
      customized = customized.replace(targetHref, `${targetHref} aria-current="page"`);
    } else {
      // Highlight parent section
      if (pageRoute.startsWith("/services")) {
        customized = customized.replace('<span>Services</span>', '<span class="active-nav-parent">Services</span>');
      } else if (pageRoute.startsWith("/solutions")) {
        customized = customized.replace('<span>Solutions</span>', '<span class="active-nav-parent">Solutions</span>');
      } else if (pageRoute.startsWith("/internships")) {
        customized = customized.replace('href="/internships"', 'href="/internships" aria-current="page"');
      }
    }
  }

  return customized;
}

function syncComponents() {
  console.log("=== ABSS Nexus Component Synchronization Engine ===");
  console.log("Single Source of Truth:", componentsDir);

  const files = fs.readdirSync(pagesDir);
  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    if (!file.endsWith(".html")) continue;
    // Skip student dashboard internal views and admin views (which use custom app shells)
    if (file.startsWith("student-") || file.startsWith("admin-") || file === "internships-dashboard.html") {
      skippedCount++;
      continue;
    }

    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, "utf8");
    const pageRoute = getPageRoute(file);
    const isAcademy = isInternshipPage(file);

    const activeHeaderTemplate = isAcademy ? internshipHeaderTemplate : headerTemplate;
    const activeFooterTemplate = isAcademy ? internshipFooterTemplate : footerTemplate;

    let changed = false;

    // 1. Sync Header
    const headerRegex = /<header\s+class="site-header[^"]*"[^>]*>[\s\S]*?<\/header>/i;
    if (headerRegex.test(content)) {
      const specializedHeader = isAcademy
        ? customizeAcademyHeaderForPage(activeHeaderTemplate, pageRoute)
        : customizeHeaderForPage(activeHeaderTemplate, pageRoute);
      content = content.replace(headerRegex, specializedHeader);
      changed = true;
    }

    // 2. Sync Footer
    const footerRegex = /<footer\s+class="site-footer[^"]*"[^>]*>[\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, activeFooterTemplate);
      changed = true;
    }

    // 3. Sync Floating WhatsApp
    const whatsappRegex = /<a\s+class="floating-whatsapp"[^>]*>[\s\S]*?<\/a>/i;
    if (whatsappRegex.test(content)) {
      content = content.replace(whatsappRegex, whatsappTemplate);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      updatedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`✓ Sync Complete: Synchronized ${updatedCount} pages from canonical components (${skippedCount} specialized/admin pages preserved).`);
}

if (require.main === module) {
  syncComponents();
}

module.exports = { syncComponents };
