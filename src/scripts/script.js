const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const localPageRoutes = {
  "/": "/src/pages/index.html",
  "/about": "/src/pages/about.html",
  "/services": "/src/pages/services.html",
  "/services/website-development": "/src/pages/service-website-development.html",
  "/services/software-development": "/src/pages/service-software-development.html",
  "/services/mobile-app-development": "/src/pages/service-mobile-app-development.html",
  "/services/ui-ux-design": "/src/pages/service-ui-ux-design.html",
  "/services/ai-machine-learning": "/src/pages/service-ai-machine-learning.html",
  "/services/cloud-computing": "/src/pages/service-cloud-computing.html",
  "/services/cybersecurity": "/src/pages/service-cybersecurity.html",
  "/services/data-analytics": "/src/pages/service-data-analytics-bi.html",
  "/services/data-analytics-bi": "/src/pages/service-data-analytics-bi.html",
  "/services/digital-marketing-seo": "/src/pages/service-digital-marketing-seo.html",
  "/services/ecommerce-development": "/src/pages/service-ecommerce-development.html",
  "/services/saas-development": "/src/pages/service-saas-development.html",
  "/services/api-integration": "/src/pages/service-api-integration.html",
  "/services/software-testing": "/src/pages/service-software-testing-qa.html",
  "/services/software-testing-qa": "/src/pages/service-software-testing-qa.html",
  "/services/it-consulting": "/src/pages/service-it-consulting.html",
  "/services/website-maintenance": "/src/pages/service-website-maintenance.html",
  "/services/managed-it-support": "/src/pages/service-managed-it-support.html",
  "/solutions": "/src/pages/solutions.html",
  "/industries": "/src/pages/industries.html",
  "/work": "/src/pages/work.html",
  "/projects": "/src/pages/projects.html",
  "/work/fintech-payment-gateway": "/src/pages/work-fintech-payment-gateway.html",
  "/work/healthcare-telemedicine-platform": "/src/pages/work-healthcare-telemedicine.html",
  "/work/ecommerce-headless-storefront": "/src/pages/work-ecommerce-headless.html",
  "/pricing": "/src/pages/pricing.html",
  "/careers": "/src/pages/careers.html",
  "/careers/senior-fullstack-engineer": "/src/pages/career-senior-fullstack-engineer.html",
  "/careers/lead-ui-ux-designer": "/src/pages/career-lead-ui-ux-designer.html",
  "/careers/cloud-devops-architect": "/src/pages/career-cloud-devops-architect.html",
  "/blog": "/src/pages/blog.html",
  "/blog/modern-web-performance-core-web-vitals": "/src/pages/blog-modern-web-performance.html",
  "/blog/resilient-cloud-architecture-edge-computing": "/src/pages/blog-resilient-cloud-architecture.html",
  "/blog/minimalist-design-systems-conversion": "/src/pages/blog-minimalist-design-systems.html",
  "/faq": "/src/pages/faq.html",
  "/contact": "/src/pages/contact.html",
  "/privacy-policy": "/src/pages/privacy-policy.html",
  "/terms-and-conditions": "/src/pages/terms-conditions.html",
  "/cookie-policy": "/src/pages/cookie-policy.html",
  "/disclaimer": "/src/pages/disclaimer.html",
  "/refund-policy": "/src/pages/refund-policy.html",
  "/support-policy": "/src/pages/support-policy.html",
  "/sitemap": "/src/pages/sitemap.html",
  "/internships": "/src/pages/internships.html",
  "/internships/programs": "/src/pages/internships-programs.html",
  "/internships/programs/web-development": "/src/pages/internships-program-web-development.html",
  "/internships/programs/software-development": "/src/pages/internships-program-software-development.html",
  "/internships/programs/ui-ux-design": "/src/pages/internships-program-ui-ux-design.html",
  "/internships/programs/ai-machine-learning": "/src/pages/internships-program-ai-machine-learning.html",
  "/internships/programs/cloud-devops": "/src/pages/internships-program-cloud-devops.html",
  "/internships/how-it-works": "/src/pages/internships-how-it-works.html",
  "/internships/faq": "/src/pages/internships-faq.html",
  "/internships/support": "/src/pages/internships-support.html",
  "/internships/register": "/src/pages/internships-register.html",
  "/internships/login": "/src/pages/internships-login.html",
  "/internships/verify-email": "/src/pages/internships-verify-email.html",
  "/internships/forgot-password": "/src/pages/internships-forgot-password.html",
  "/internships/reset-password": "/src/pages/internships-reset-password.html",
  "/internships/dashboard": "/src/pages/internships-dashboard.html",
  "/internships/application-status": "/src/pages/internships-application-status.html",
  "/internships/payment-status": "/src/pages/internships-payment-status.html",
  "/verify-certificate": "/src/pages/verify-certificate.html",
  "/register": "/src/pages/register.html",
  "/login": "/src/pages/login.html",
  "/verify-email": "/src/pages/verify-email.html",
  "/forgot-password": "/src/pages/forgot-password.html",
  "/reset-password": "/src/pages/reset-password.html",
  "/student/dashboard": "/src/pages/student-dashboard.html",
  "/student/profile": "/src/pages/student-profile.html",
  "/student/applications": "/src/pages/student-applications.html",
  "/student/internship": "/src/pages/student-internship.html",
  "/student/tasks": "/src/pages/student-tasks.html",
  "/student/tasks/task-1": "/src/pages/student-task-detail.html",
  "/student/submissions": "/src/pages/student-submissions.html",
  "/student/submit-work": "/src/pages/student-submit-work.html",
  "/student/certificates": "/src/pages/student-certificates.html",
  "/student/settings": "/src/pages/student-settings.html",
  "/admin/dashboard": "/src/admin/admin-dashboard.html",
  "/admin/programs": "/src/admin/admin-programs.html",
  "/admin/applications": "/src/admin/admin-applications.html",
  "/admin/students": "/src/admin/admin-students.html",
  "/admin/tasks": "/src/admin/admin-tasks.html",
  "/admin/submissions": "/src/admin/admin-submissions.html",
  "/admin/reviews": "/src/admin/admin-reviews.html",
  "/admin/payments": "/src/admin/admin-payments.html",
  "/admin/certificates": "/src/admin/admin-certificates.html",
  "/admin/users": "/src/admin/admin-users.html",
  "/admin/audit-logs": "/src/admin/admin-audit-logs.html",
  "/admin/settings": "/src/admin/admin-settings.html",
  "/admin/login": "/src/admin/admin-login.html",
  "/admin/leads": "/src/admin/admin-leads.html",
  "/admin/projects": "/src/admin/admin-projects.html",
  "/admin/clients": "/src/admin/admin-clients.html",
  "/admin/support": "/src/admin/admin-support.html",
  "/admin/pricing": "/src/admin/admin-pricing.html"
};

const isLocalStaticServer =
  ["127.0.0.1", "localhost"].includes(window.location.hostname) &&
  !["3000", "8888"].includes(window.location.port);

if (isLocalStaticServer) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const targetUrl = new URL(link.href, window.location.href);
    const mappedPath = localPageRoutes[targetUrl.pathname.replace(/\/$/, "") || "/"];

    if (targetUrl.origin === window.location.origin && mappedPath) {
      event.preventDefault();
      window.location.href = `${mappedPath}${targetUrl.search}${targetUrl.hash}`;
    }
  });
}

const serviceSelect = document.querySelector('select[name="service"]');
const packageSelect = document.querySelector("#packageSelect, select[name='package']");
const queryParams = new URLSearchParams(window.location.search);

if (serviceSelect) {
  const selectedService = queryParams.get("service")?.trim();
  const selectedInterest = queryParams.get("interest")?.trim();
  const targetVal = selectedService || (selectedInterest === "internship" ? "Internship Application" : selectedInterest);
  if (targetVal) {
    const serviceAliases = {
      "Landing Page": "Business Landing Page",
      "internship": "Internship Application",
    };
    const normalizedService = serviceAliases[targetVal] || targetVal;
    const matchingOption = [...serviceSelect.options].find(
      (option) => option.value.toLowerCase() === normalizedService.toLowerCase()
    );
    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }
}

if (packageSelect) {
  const selectedPackage = queryParams.get("plan") || queryParams.get("package") || queryParams.get("service");
  if (selectedPackage) {
    const packageAliases = {
      "Starter Website": "Starter Website",
      "Business Website": "Business Website",
      "Custom Website": "Custom Website",
      "Premium Package": "Premium / Custom Package",
      "Website Maintenance": "Maintenance Package",
    };
    const normalizedPackage = packageAliases[selectedPackage] || selectedPackage;
    const matchingOption = [...packageSelect.options].find((option) => option.value === normalizedPackage);
    if (matchingOption) {
      packageSelect.value = normalizedPackage;
    }
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (window.innerWidth <= 1140) {
      document.body.classList.toggle("nav-drawer-open", isOpen);
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-drawer-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      let closedDropdown = false;
      document.querySelectorAll(".nav-item-dropdown.open").forEach((el) => {
        el.classList.remove("open");
        const btn = el.querySelector(".nav-dropdown-trigger");
        if (btn) {
          btn.setAttribute("aria-expanded", "false");
          btn.focus();
          closedDropdown = true;
        }
      });
      if (!closedDropdown && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-drawer-open");
        navToggle.focus();
      }
    }
  });

  // Mobile & keyboard accessibility for mega-menu dropdowns
  const dropdownTriggers = document.querySelectorAll(".nav-dropdown-trigger");
  dropdownTriggers.forEach((btn) => {
    const parent = btn.closest(".nav-item-dropdown");
    if (!parent) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const willOpen = !parent.classList.contains("open");
      document.querySelectorAll(".nav-item-dropdown.open").forEach((el) => {
        if (el !== parent) {
          el.classList.remove("open");
          const otherBtn = el.querySelector(".nav-dropdown-trigger");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
      parent.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!parent.classList.contains("open")) {
          parent.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
        const firstLink = parent.querySelector(".mega-menu a");
        if (firstLink) firstLink.focus();
      }
    });

    // Synchronize hover state aria-expanded for screen readers
    parent.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1140) {
        btn.setAttribute("aria-expanded", "true");
      }
    });
    parent.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1140 && !parent.classList.contains("open")) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item-dropdown")) {
      document.querySelectorAll(".nav-item-dropdown.open").forEach((el) => {
        el.classList.remove("open");
        const btn = el.querySelector(".nav-dropdown-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
    if (!e.target.closest(".site-header") && navLinks.classList.contains("open") && window.innerWidth <= 1140) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-drawer-open");
    }
  });

  // Sticky Compact Header on Scroll (throttled with requestAnimationFrame)
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    let scrollTicking = false;
    const scrollThreshold = 36;

    const handleHeaderScroll = () => {
      const isScrolled = window.scrollY > scrollThreshold;
      if (siteHeader.classList.contains("is-scrolled") !== isScrolled) {
        siteHeader.classList.toggle("is-scrolled", isScrolled);
      }
      scrollTicking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(handleHeaderScroll);
          scrollTicking = true;
        }
      },
      { passive: true }
    );

    handleHeaderScroll();
  }
}

const faqToggles = document.querySelectorAll("[data-faq-toggle]");

faqToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const answerId = button.getAttribute("aria-controls");
    const answer = answerId ? document.getElementById(answerId) : null;
    const willOpen = button.getAttribute("aria-expanded") !== "true";

    faqToggles.forEach((item) => {
      const itemAnswerId = item.getAttribute("aria-controls");
      const itemAnswer = itemAnswerId ? document.getElementById(itemAnswerId) : null;
      item.setAttribute("aria-expanded", "false");
      if (itemAnswer) itemAnswer.hidden = true;
    });

    button.setAttribute("aria-expanded", String(willOpen));
    if (answer) answer.hidden = !willOpen;
  });
});

const inquiryForm = document.querySelector("[data-inquiry-form]");
const inquiryMessage = inquiryForm?.querySelector('textarea[name="message"]');
const characterCount = inquiryForm?.querySelector("[data-character-count]");

const trimField = (form, name) => {
  const field = form.elements[name];
  if (!field || typeof field.value !== "string") return "";
  field.value = field.value.trim();
  return field.value;
};

const clearInquiryErrors = (form) => {
  form.querySelectorAll("[data-field-error]").forEach((item) => {
    item.textContent = "";
  });
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  const summary = form.querySelector("[data-error-summary]");
  if (summary) {
    summary.hidden = true;
    summary.textContent = "";
  }
};

const setInquiryError = (form, name, message) => {
  const field = form.elements[name];
  const error = form.querySelector(`[data-field-error="${CSS.escape(name)}"]`);
  if (field) field.setAttribute("aria-invalid", "true");
  if (error) error.textContent = message;
};

const isPracticalEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPracticalPhone = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 && /^[+\d\s().-]+$/.test(value);
};

const isSafeHttpUrl = (value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};

const validateInquiryForm = (form) => {
  clearInquiryErrors(form);
  const errors = [];
  const allowedServices = new Set([...form.elements.service.options].map((option) => option.value).filter(Boolean));
  const allowedBudgets = new Set([...form.elements.budget.options].map((option) => option.value).filter(Boolean));
  const allowedTimelines = new Set([...form.elements.timeline.options].map((option) => option.value).filter(Boolean));

  const name = trimField(form, "name");
  const email = trimField(form, "email");
  const phone = trimField(form, "phone");
  trimField(form, "company");
  const websiteUrl = trimField(form, "website-url");
  const message = trimField(form, "message");
  const service = form.elements.service.value;
  const budget = form.elements.budget.value;
  const timeline = form.elements.timeline.value;
  const consent = form.elements.consent.checked;

  if (name.length < 2 || name.length > 80) errors.push(["name", "Please enter your full name."]);
  if (!isPracticalEmail(email) || email.length > 254) errors.push(["email", "Please enter a valid email address."]);
  if (!isPracticalPhone(phone)) errors.push(["phone", "Please enter a valid phone number."]);
  if (websiteUrl.length > 500 || !isSafeHttpUrl(websiteUrl)) errors.push(["website-url", "Please enter a valid HTTP or HTTPS website URL."]);
  if (!allowedServices.has(service)) errors.push(["service", "Please select a service."]);
  if (budget && !allowedBudgets.has(budget)) errors.push(["budget", "Please select a valid budget option."]);
  if (timeline && !allowedTimelines.has(timeline)) errors.push(["timeline", "Please select a valid timeline option."]);
  if (message.length < 20 || message.length > 3000) errors.push(["message", "Please provide at least 20 characters about your project."]);
  if (!consent) errors.push(["consent", "Please confirm that we may use your information to respond."]);

  errors.forEach(([field, messageText]) => setInquiryError(form, field, messageText));

  if (errors.length) {
    const summary = form.querySelector("[data-error-summary]");
    if (summary) {
      summary.textContent = "Please review the highlighted fields and try again.";
      summary.hidden = false;
    }
    form.elements[errors[0][0]]?.focus();
    return false;
  }

  return true;
};

inquiryMessage?.addEventListener("input", () => {
  if (characterCount) characterCount.textContent = String(inquiryMessage.value.length);
});

inquiryForm?.addEventListener("input", (event) => {
  const target = event.target;
  if (!target || !target.name) return;
  target.removeAttribute("aria-invalid");
  const err = inquiryForm.querySelector(`[data-field-error="${CSS.escape(target.name)}"]`);
  if (err) err.textContent = "";
});

inquiryForm?.addEventListener("change", (event) => {
  const target = event.target;
  if (!target || !target.name) return;
  target.removeAttribute("aria-invalid");
  const err = inquiryForm.querySelector(`[data-field-error="${CSS.escape(target.name)}"]`);
  if (err) err.textContent = "";
});

const projectFilterButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    projectFilterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.projectCategory.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const projectModal = document.querySelector(".project-modal");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalType = document.querySelector("[data-project-modal-type]");
const projectModalStatus = document.querySelector("[data-project-modal-status]");
const projectModalTech = document.querySelector("[data-project-modal-tech]");
const projectModalFeatures = document.querySelector("[data-project-modal-features]");
const projectModalDemo = document.querySelector("[data-project-modal-demo]");
const projectModalClose = projectModal?.querySelector(".modal-close");
let previousProjectFocus = null;

const projectDetails = {
  "Personal Portfolio Website": {
    type: "Personal Portfolio Project",
    description:
      "Purpose: Present projects, skills, leadership experience and professional contact information in one responsive personal website.",
    technologies: "HTML, CSS, JavaScript",
    features: "Responsive sections, skills showcase, projects area, contact options, social profile links",
    status: "Completed Demo Project",
    demo: "Live Demo Available",
  },
  "Business Landing Page": {
    type: "Internal Demo Project",
    description:
      "Purpose: Present a business service, benefits, trust-building content and contact actions in a focused page.",
    technologies: "HTML, CSS",
    features: "Hero section, service highlights, benefit blocks, call-to-action areas, contact section",
    status: "Completed — Demo Coming Soon",
    demo: "Demo Coming Soon",
  },
  "College / Institute Website": {
    type: "Internal Demo Project",
    description:
      "Purpose: Organize academic, admission, facilities and institutional information for students and parents.",
    technologies: "HTML, CSS, JavaScript",
    features: "Institute overview, course sections, admission information, facilities, contact form",
    status: "Demo Project In Progress",
    demo: "Demo In Progress",
  },
  "Restaurant Website": {
    type: "Internal Demo Project",
    description:
      "Purpose: Present menu items, services, location information and reservation actions for a restaurant or cafe.",
    technologies: "HTML, CSS",
    features: "Menu presentation, gallery area, restaurant overview, reservation actions, location details",
    status: "Completed — Demo Coming Soon",
    demo: "Demo Coming Soon",
  },
  "E-commerce Website Demo": {
    type: "Internal Demo Project",
    description:
      "Purpose: Show how products, categories, search, cart and customer-account flows can be structured.",
    technologies: "HTML, CSS, JavaScript",
    features: "Product cards, category browsing, search concept, cart action, customer-account flow",
    status: "Demo Project Coming Soon",
    demo: "Coming Soon",
  },
  "Business Dashboard UI": {
    type: "Internal Demo Project",
    description:
      "Purpose: Organize operational information for leads, projects, clients, metrics and management tasks.",
    technologies: "HTML, CSS, JavaScript",
    features: "Sidebar navigation, metric cards, chart area, lead/project sections, management layout",
    status: "Demo Project In Progress",
    demo: "Demo In Progress",
  },
};

document.querySelectorAll("[data-project-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!projectModal || !projectModalTitle) return;
    const projectName = button.dataset.projectModal;
    const detail = projectDetails[projectName];
    if (!detail) return;

    projectModalTitle.textContent = projectName;
    if (projectModalDescription) projectModalDescription.textContent = detail.description;
    if (projectModalType) projectModalType.textContent = detail.type;
    if (projectModalStatus) projectModalStatus.textContent = detail.status;
    if (projectModalTech) projectModalTech.textContent = detail.technologies;
    if (projectModalFeatures) projectModalFeatures.textContent = detail.features;
    if (projectModalDemo) projectModalDemo.textContent = detail.demo;
    previousProjectFocus = document.activeElement;
    projectModal.showModal();
    projectModalClose?.focus();
  });
});

projectModalClose?.addEventListener("click", () => {
  projectModal?.close();
});

document.querySelector("[data-close-project-modal]")?.addEventListener("click", () => {
  projectModal?.close();
});

projectModal?.addEventListener("close", () => {
  previousProjectFocus?.focus?.();
});

const packageModal = document.querySelector(".package-modal");
const packageModalTitle = document.querySelector("#package-modal-title");
const modalPackageSelect = document.querySelector("#selected-package");
const maintenanceModal = document.querySelector(".maintenance-modal");

document.querySelectorAll("[data-package-form]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!packageModal || !packageModalTitle || !modalPackageSelect) return;
    const packageName = button.dataset.package || "";
    packageModalTitle.textContent = packageName ? `Request ${packageName}` : "Start Your Project";
    modalPackageSelect.value = packageName;
    packageModal.showModal();
  });
});

document.querySelector(".package-modal-close")?.addEventListener("click", () => {
  packageModal?.close();
});

packageModal?.addEventListener("click", (event) => {
  if (event.target === packageModal) {
    packageModal.close();
  }
});

document.querySelector("[data-maintenance-form]")?.addEventListener("click", () => {
  maintenanceModal?.showModal();
});

document.querySelector(".maintenance-modal-close")?.addEventListener("click", () => {
  maintenanceModal?.close();
});

maintenanceModal?.addEventListener("click", (event) => {
  if (event.target === maintenanceModal) {
    maintenanceModal.close();
  }
});

const formToLead = (form) => {
  const formData = new FormData(form);
  const textValue = (...names) => {
    for (const name of names) {
      const value = formData.get(name);
      if (value) return String(value).trim();
    }
    return "";
  };
  const formName = textValue("form-name") || form.getAttribute("name") || "website-inquiry";
  const name = textValue("name");
  const company = textValue("company", "organization");
  const email = textValue("email");
  const phone = textValue("phone");
  const packageName = textValue("package", "budget-plan");
  const budgetLabel = textValue("budget", "budget-plan");
  const websiteUrl = textValue("website-url");
  const firstBudgetNumber = budgetLabel.match(/\d[\d,]*/)?.[0]?.replaceAll(",", "") || "0";
  const service =
    textValue("service") ||
    packageName ||
    textValue("maintenance-type") ||
    textValue("feedback-type") ||
    formName.replaceAll("-", " ");
  const message = textValue("message", "project-details", "maintenance-details");
  const timeline = textValue("timeline");
  const consent = textValue("consent");
  const sourceMap = {
    contact: "Contact Form",
    "package-request": "Pricing Form",
    "website-maintenance": "Maintenance Form",
    feedback: "Feedback Form",
  };
  const contact = [email, phone].filter(Boolean).join(" / ");

  return {
    id: `${formName}-${Date.now()}`,
    client: name || company || "Website Inquiry",
    name,
    company,
    email,
    phone,
    contact,
    service,
    packageName,
    budget: Number(firstBudgetNumber),
    budgetLabel,
    websiteUrl,
    message: [
      websiteUrl ? `Website URL: ${websiteUrl}` : "",
      message,
      timeline ? `Timeline: ${timeline}` : "",
      consent ? `Consent: ${consent}` : "",
    ].filter(Boolean).join("\n\n"),
    timeline,
    status: "New",
    source: sourceMap[formName] || "Contact Form",
    formName,
    consent,
    turnstileToken: textValue("cf-turnstile-response", "turnstileToken"),
  };
};

const setFormStatus = (form, type, message) => {
  let status = form.querySelector("[data-form-status]");
  if (!status) {
    status = document.createElement("p");
    status.dataset.formStatus = "";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.append(status);
  }
  status.className = `form-status ${type}`;
  status.textContent = message;
};

document.querySelectorAll("form.contact-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.matches("[data-inquiry-form]")) {
      form.querySelector("[data-success-actions]")?.setAttribute("hidden", "");
      if (form.elements.website?.value) {
        form.reset();
        setFormStatus(form, "success", "Thank you for contacting ABSS Nexus Technologies. Your project details have been received and will be reviewed.");
        return;
      }

      if (!validateInquiryForm(form)) return;
    }

    const submitButton = form.querySelector("[type='submit']");
    const originalButtonText = submitButton?.textContent || "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
      submitButton.textContent = "Submitting…";
    }

    try {
      const leadData = formToLead(form);
      await window.AbssAdminApi?.queueContactLead(leadData);
      try {
        window.AbssDataSync?.dualSyncRecord("contact_lead", leadData);
      } catch {}
      form.reset();
      if (characterCount && form.matches("[data-inquiry-form]")) characterCount.textContent = "0";
      setFormStatus(form, "success", form.matches("[data-inquiry-form]")
        ? "Your Inquiry Has Been Submitted. Thank you for contacting ABSS Nexus Technologies. Your project details have been received and will be reviewed."
        : "Thank you. Your request has been received and ABSS Nexus Technologies will contact you soon.");
      form.querySelector("[data-success-actions]")?.removeAttribute("hidden");
    } catch (error) {
      console.error("Contact submission failed");
      setFormStatus(form, "error", form.matches("[data-inquiry-form]")
        ? "Your Inquiry Could Not Be Submitted. Please check your connection and try again. You may also contact us by email or WhatsApp."
        : "Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
        submitButton.textContent = originalButtonText;
      }
    }
  });
});

const adminLoginPage = document.querySelector("[data-admin-login-page]");
const adminApp = document.querySelector("[data-admin-app]");

if (adminLoginPage) {
  const loginForm = document.querySelector("[data-login-form]");
  const nextPage = new URLSearchParams(window.location.search).get("next") || "/admin/";
  const safeNextPage = window.AbssAdminAuthGuard?.getSafeNextPage(nextPage) || "/admin/";

  window.AbssAdminAuthGuard?.redirectAuthenticatedLogin(safeNextPage);

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const message = document.querySelector("[data-login-message]");

    try {
      await window.AbssAdminApi?.login(username, password);
      const targetPath = safeNextPage.startsWith("/") ? safeNextPage : `/admin/${safeNextPage.replace(/^admin-/, "").replace(/\.html$/, "")}`;
      window.location.href = targetPath;
      return;
    } catch (error) {
      if (message) {
        message.textContent = error?.message || "Wrong username or password.";
      }
    }
  });
}

if (adminApp) {
  const adminApi = window.AbssAdminApi;
  const adminShell = document.querySelector("[data-admin-shell]");
  const adminModal = document.querySelector("[data-admin-modal]");
  const adminForm = document.querySelector("[data-admin-form]");
  const leadDetailsModal = document.querySelector("[data-lead-details-modal]");
  const leadDetails = document.querySelector("[data-lead-details]");

  const defaults = {
    leads: [],
    projects: [],
    clients: [],
    tickets: [],
    pricing: [],
    activity: [],
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const staleDemoIds = new Set([
    "lead-1",
    "lead-2",
    "lead-3",
    "lead-4",
    "project-1",
    "project-2",
    "project-3",
    "project-4",
    "client-1",
    "client-2",
    "client-3",
    "ticket-1",
    "ticket-2",
    "ticket-3",
    "price-1",
    "price-2",
    "price-3",
  ]);
  const staleDemoActivity = new Set([
    "Proposal shared with EduSpark Institute",
    "Payment reminder added for Restaurant website",
    "Design review completed for Dashboard UI",
    "Backend database initialized",
    "Admin system connected to local API",
    "Admin function connected",
    "Ready for cloud persistence",
  ]);
  const sanitizeState = (state = {}) => ({
    ...state,
    leads: (state.leads || []).filter((item) => !staleDemoIds.has(item.id)),
    projects: (state.projects || []).filter((item) => !staleDemoIds.has(item.id)),
    clients: (state.clients || []).filter((item) => !staleDemoIds.has(item.id)),
    tickets: (state.tickets || []).filter((item) => !staleDemoIds.has(item.id)),
    pricing: (state.pricing || []).filter((item) => !staleDemoIds.has(item.id)),
    activity: (state.activity || []).filter((item) => !staleDemoActivity.has(item)),
    metrics: state.metrics || {},
    leadsTotal: Number(state.leadsTotal || 0),
    leadsPage: Number(state.leadsPage || 1),
    leadsPageSize: Number(state.leadsPageSize || 20),
  });
  const readState = () => {
    return sanitizeState(adminApi?.loadState(defaults) || clone(defaults));
  };
  let adminState = clone(defaults);
  let activeFilters = { leadsSearch: "", leadsStatus: "all", leadsPage: 1, leadsPageSize: 20 };
  let storageStatus = null;

  const saveState = () => {
    adminApi?.saveState(adminState);
  };

  const addActivity = (message) => {
    adminState.activity.unshift(message);
    adminState.activity = adminState.activity.slice(0, 8);
    saveState();
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const leadStatuses = ["New", "Follow Up", "Call Booked", "Proposal Sent", "Converted", "Rejected"];
  const formatMoney = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
  const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const emptyState = (message) => `<div class="admin-empty-state">${escapeHtml(message)}</div>`;
  const emptyRow = (message, columns) => `<tr><td colspan="${columns}"><div class="admin-empty-state">${escapeHtml(message)}</div></td></tr>`;
  const textField = (value, fallback = "") => String(value || fallback).trim();
  const parseContact = (contact = "") => {
    const [email = "", phone = ""] = String(contact).split(" / ");
    return { email: email.trim(), phone: phone.trim() };
  };
  const leadName = (lead) => textField(lead.name || lead.client, "Website Inquiry");
  const leadEmail = (lead) => textField(lead.email || parseContact(lead.contact).email);
  const leadPhone = (lead) => textField(lead.phone || parseContact(lead.contact).phone);
  const leadBudgetLabel = (lead) => textField(lead.budgetLabel, lead.budget ? formatMoney(lead.budget) : "Not specified");
  const leadMessage = (lead) => textField(lead.message, "No project message was provided.");
  const leadCreatedAt = (lead) => textField(lead.createdAt);
  const formatLeadDate = (value) => {
    if (!value) return "Legacy lead";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Legacy lead";
    return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  };
  const leadSource = (lead) => textField(lead.source, "Contact Form");
  const sortLeadsNewestFirst = (leads) =>
    [...leads].sort((left, right) => {
      const rightTime = Date.parse(right.createdAt || "") || 0;
      const leftTime = Date.parse(left.createdAt || "") || 0;
      return rightTime - leftTime;
    });
  const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""').replaceAll("\r", " ").replaceAll("\n", " ")}"`;
  const getLeadById = (id) => adminState.leads.find((lead) => String(lead.id) === String(id));
  const normalizedLeadStatus = (status) => (leadStatuses.includes(status) ? status : "New");
  const updateLeadStatus = async (id, status) => {
    const lead = getLeadById(id);
    const nextStatus = normalizedLeadStatus(status);
    if (!lead) return;
    if (adminApi?.isAuthenticated?.()) {
      await adminApi.updateLead(id, { status: nextStatus });
      lead.status = nextStatus;
      lead.updatedAt = new Date().toISOString();
      return;
    }
    lead.status = nextStatus;
    lead.updatedAt = new Date().toISOString();
    addActivity(`${leadName(lead)} lead moved to ${nextStatus}`);
    renderAdmin();
  };

  const statusClass = (status) => {
    if (["Converted", "Proposal Sent", "Done", "Closed"].includes(status)) return "completed";
    if (["Follow Up", "Call Booked", "Active", "In Progress"].includes(status)) return "progress";
    if (["Rejected"].includes(status)) return "rejected";
    if (["New", "Open", "High"].includes(status)) return "upcoming";
    return "neutral";
  };

  const refreshStorageStatus = async () => {
    try {
      storageStatus = await adminApi?.getStorageStatus();
    } catch (error) {
      storageStatus = null;
    }
  };

  const refreshLeadsFromServer = async () => {
    if (!document.querySelector("[data-leads-table]") || !adminApi?.listLeads || !adminApi?.isAuthenticated?.()) return;
    try {
      const result = await adminApi.listLeads({
        page: activeFilters.leadsPage,
        pageSize: activeFilters.leadsPageSize,
        search: activeFilters.leadsSearch,
        status: activeFilters.leadsStatus,
        sort: "newest",
      });
      adminState.leads = result.items || [];
      adminState.leadsTotal = Number.isFinite(Number(result.total)) ? Number(result.total) : adminState.leads.length;
      adminState.leadsPage = result.page || activeFilters.leadsPage;
      adminState.leadsPageSize = result.pageSize || activeFilters.leadsPageSize;
    } catch (error) {
      console.error("Lead pagination failed", error);
    }
  };

  const showAdmin = async () => {
    const session = await window.AbssAdminAuthGuard?.requireAdminSession(defaults);
    if (!session?.authenticated) {
      return;
    }

    adminState = sanitizeState(session.state || readState());
    await refreshLeadsFromServer();
    if (adminApi?.getMode?.() !== "api") {
      saveState();
    }

    if (adminShell) {
      adminShell.hidden = false;
    }
    await refreshStorageStatus();
    renderAdmin();
  };

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    adminApi?.logout();
    window.location.href = "admin-login.html";
  });

  document.querySelector("[data-reset-admin]")?.addEventListener("click", () => {
    adminState = clone(defaults);
    saveState();
    renderAdmin();
  });

  document.querySelector("[data-migrate-storage]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const message = document.querySelector("[data-storage-message]");
    const confirmed = window.confirm("Migrate existing KV data into D1? Existing KV data will remain unchanged as a backup.");
    if (!confirmed) return;
    button.disabled = true;
    if (message) {
      message.className = "form-status";
      message.textContent = "Migration is running...";
    }
    try {
      const result = await adminApi?.migrateStorage();
      await refreshStorageStatus();
      const migrated =
        Number(result.leadsMigrated || 0) +
        Number(result.projectsMigrated || 0) +
        Number(result.clientsMigrated || 0) +
        Number(result.ticketsMigrated || 0) +
        Number(result.pricingMigrated || 0) +
        Number(result.activityMigrated || 0);
      if (message) {
        message.className = "form-status success";
        message.textContent = `Migration completed. ${migrated} records migrated, ${Number(result.skippedRecords || 0)} skipped.`;
      }
      adminState = sanitizeState(adminApi?.loadState(defaults) || clone(defaults));
      renderAdmin();
    } catch (error) {
      if (message) {
        message.className = "form-status error";
        message.textContent = "Migration failed. Check Cloudflare D1 binding and migration status.";
      }
    } finally {
      button.disabled = false;
    }
  });

  document.querySelector("[data-export-csv]")?.addEventListener("click", async () => {
    let exportLeads = adminState.leads;
    if (adminApi?.isAuthenticated?.() && adminApi?.listLeads) {
      const result = await adminApi.listLeads({ page: 1, pageSize: 500, sort: "newest" });
      exportLeads = result.items || [];
    }
    const rows = [
      ["ID", "Name", "Company", "Email", "Phone", "Service", "Package", "Budget Value", "Budget Label", "Message", "Timeline", "Status", "Source", "Created At", "Updated At"],
    ];
    sortLeadsNewestFirst(exportLeads).forEach((lead) => {
      rows.push([
        lead.id,
        leadName(lead),
        lead.company,
        leadEmail(lead),
        leadPhone(lead),
        lead.service,
        lead.packageName,
        Number(lead.budget || 0),
        leadBudgetLabel(lead),
        leadMessage(lead),
        lead.timeline,
        normalizedLeadStatus(lead.status),
        leadSource(lead),
        lead.createdAt || "",
        lead.updatedAt || "",
      ]);
    });
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "abss-leads-export.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-admin-tab]").forEach((tab) => tab.classList.remove("active"));
      document.querySelectorAll("[data-admin-panel]").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`[data-admin-panel="${button.dataset.adminTab}"]`)?.classList.add("active");
      renderCharts();
    });
  });

  document.querySelector("[data-search='leads']")?.addEventListener("input", async (event) => {
    activeFilters.leadsSearch = event.target.value.toLowerCase();
    activeFilters.leadsPage = 1;
    await refreshLeadsFromServer();
    renderLeads();
  });

  document.querySelector("[data-filter='leads']")?.addEventListener("change", async (event) => {
    activeFilters.leadsStatus = event.target.value;
    activeFilters.leadsPage = 1;
    await refreshLeadsFromServer();
    renderLeads();
  });

  document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => openEntryModal(button.dataset.openModal));
  });

  document.querySelector("[data-close-admin-modal]")?.addEventListener("click", () => adminModal?.close());
  adminModal?.addEventListener("click", (event) => {
    if (event.target === adminModal) adminModal.close();
  });
  document.querySelector("[data-close-lead-details]")?.addEventListener("click", () => leadDetailsModal?.close());
  leadDetailsModal?.addEventListener("click", (event) => {
    if (event.target === leadDetailsModal) leadDetailsModal.close();
  });
  leadDetailsModal?.addEventListener("change", async (event) => {
    const select = event.target.closest("[data-lead-status-select]");
    if (!select) return;
    await updateLeadStatus(select.dataset.id, select.value);
    openLeadDetails(select.dataset.id);
  });

  adminApp.addEventListener("click", async (event) => {
    const actionButton = event.target.closest("[data-admin-action]");
    if (!actionButton) return;
    const { adminAction, id } = actionButton.dataset;

    if (adminAction === "delete-lead") {
      if (adminApi?.isAuthenticated?.()) {
        await adminApi.deleteLead(id);
        await refreshLeadsFromServer();
        await refreshStorageStatus();
        renderAdmin();
        return;
      } else {
        adminState.leads = adminState.leads.filter((lead) => lead.id !== id);
        addActivity("Lead removed from queue");
      }
    }

    if (adminAction === "view-lead") {
      openLeadDetails(id);
      return;
    }

    if (adminAction === "cycle-lead") {
      const lead = adminState.leads.find((item) => item.id === id);
      if (lead) {
        const currentIndex = leadStatuses.indexOf(normalizedLeadStatus(lead.status));
        await updateLeadStatus(id, leadStatuses[(currentIndex + 1) % leadStatuses.length]);
        if (adminApi?.isAuthenticated?.()) {
          await refreshLeadsFromServer();
          await refreshStorageStatus();
          renderAdmin();
          return;
        }
      }
    }

    if (adminAction === "delete-project") {
      adminState.projects = adminState.projects.filter((project) => project.id !== id);
      addActivity("Project removed from tracker");
    }

    if (adminAction === "project-progress") {
      const project = adminState.projects.find((item) => item.id === id);
      if (project) {
        project.progress = Math.min(100, Number(project.progress) + 10);
        project.status = project.progress >= 100 ? "Done" : "Active";
        addActivity(`${project.name} progress updated`);
      }
    }

    if (adminAction === "delete-client") {
      adminState.clients = adminState.clients.filter((client) => client.id !== id);
      addActivity("Client removed from database");
    }

    if (adminAction === "delete-ticket") {
      adminState.tickets = adminState.tickets.filter((ticket) => ticket.id !== id);
      addActivity("Support ticket removed");
    }

    if (adminAction === "cycle-ticket") {
      const order = ["Open", "In Progress", "Closed"];
      const ticket = adminState.tickets.find((item) => item.id === id);
      if (ticket) {
        ticket.status = order[(order.indexOf(ticket.status) + 1) % order.length];
        addActivity(`${ticket.client} ticket moved to ${ticket.status}`);
      }
    }

    saveState();
    renderAdmin();
  });

  document.querySelector("[data-save-pricing]")?.addEventListener("click", () => {
    document.querySelectorAll("[data-pricing-card]").forEach((card, index) => {
      const packageItem = adminState.pricing[index];
      if (!packageItem) return;
      packageItem.name = card.querySelector("[name='name']").value.trim();
      packageItem.price = Number(card.querySelector("[name='price']").value || 0);
      packageItem.timeline = card.querySelector("[name='timeline']").value.trim();
      packageItem.details = card.querySelector("[name='details']").value.trim();
    });
    addActivity("Pricing packages updated");
    renderAdmin();
  });

  adminForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(adminForm);
    const type = adminForm.dataset.entryType;

    if (type === "lead") {
      const now = new Date().toISOString();
      const email = textField(formData.get("email"));
      const phone = textField(formData.get("phone"));
      const budgetLabel = textField(formData.get("budgetLabel"), formData.get("budget"));
      const lead = {
        id: makeId("lead"),
        client: formData.get("client"),
        name: formData.get("client"),
        company: formData.get("company"),
        email,
        phone,
        contact: [email, phone].filter(Boolean).join(" / "),
        service: formData.get("service"),
        packageName: formData.get("packageName"),
        budget: Number(formData.get("budget") || 0),
        budgetLabel,
        message: formData.get("message"),
        status: normalizedLeadStatus(formData.get("status")),
        source: "Admin",
        createdAt: now,
        updatedAt: now,
      };
      if (adminApi?.isAuthenticated?.()) {
        await adminApi.createLead(lead);
        await refreshLeadsFromServer();
        await refreshStorageStatus();
        adminModal?.close();
        renderAdmin();
        return;
      } else {
        adminState.leads.unshift(lead);
        addActivity(`${formData.get("client")} lead added`);
      }
    }

    if (type === "project") {
      adminState.projects.unshift({
        id: makeId("project"),
        name: formData.get("name"),
        client: formData.get("client"),
        value: Number(formData.get("value") || 0),
        progress: Number(formData.get("progress") || 0),
        status: "Active",
      });
      addActivity(`${formData.get("name")} project added`);
    }

    if (type === "client") {
      adminState.clients.unshift({
        id: makeId("client"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
      });
      addActivity(`${formData.get("name")} added to clients`);
    }

    if (type === "ticket") {
      adminState.tickets.unshift({
        id: makeId("ticket"),
        client: formData.get("client"),
        issue: formData.get("issue"),
        priority: formData.get("priority"),
        status: "Open",
      });
      addActivity(`${formData.get("client")} support ticket added`);
    }

    saveState();
    adminModal?.close();
    renderAdmin();
  });

  const openEntryModal = (type) => {
    const titles = {
      lead: "Add Lead",
      project: "Add Project",
      client: "Add Client",
      ticket: "Add Support Ticket",
    };

    const fields = {
      lead: `
        <p class="eyebrow">Lead</p><h2>${titles.lead}</h2>
        <div class="admin-form-grid">
          <label>Client<input name="client" required /></label>
          <label>Company<input name="company" /></label>
          <label>Email<input name="email" type="email" /></label>
          <label>Phone<input name="phone" /></label>
          <label>Service<input name="service" required /></label>
          <label>Package<input name="packageName" /></label>
          <label>Budget<input name="budget" type="number" min="0" required /></label>
          <label>Budget Label<input name="budgetLabel" placeholder="₹5,000 - ₹10,000" /></label>
          <label>Status<select name="status"><option>New</option><option>Follow Up</option><option>Call Booked</option><option>Proposal Sent</option><option>Converted</option><option>Rejected</option></select></label>
          <label class="full-field">Message<textarea name="message" rows="4"></textarea></label>
          <button class="btn primary" type="submit">Save Lead</button>
        </div>`,
      project: `
        <p class="eyebrow">Project</p><h2>${titles.project}</h2>
        <div class="admin-form-grid">
          <label>Project Name<input name="name" required /></label>
          <label>Client<input name="client" required /></label>
          <label>Value<input name="value" type="number" min="0" required /></label>
          <label>Progress %<input name="progress" type="number" min="0" max="100" value="10" required /></label>
          <button class="btn primary" type="submit">Save Project</button>
        </div>`,
      client: `
        <p class="eyebrow">Client</p><h2>${titles.client}</h2>
        <div class="admin-form-grid">
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Phone<input name="phone" required /></label>
          <label>Service<input name="service" required /></label>
          <button class="btn primary" type="submit">Save Client</button>
        </div>`,
      ticket: `
        <p class="eyebrow">Support</p><h2>${titles.ticket}</h2>
        <div class="admin-form-grid">
          <label>Client<input name="client" required /></label>
          <label>Priority<select name="priority"><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label class="full-field">Issue<textarea name="issue" rows="4" required></textarea></label>
          <button class="btn primary" type="submit">Save Ticket</button>
        </div>`,
    };

    adminForm.dataset.entryType = type;
    adminForm.innerHTML = fields[type];
    adminModal?.showModal();
  };

  const renderMetrics = () => {
    const activeProjects = adminState.projects.filter((project) => project.status !== "Done");
    const openTickets = adminState.tickets.filter((ticket) => ticket.status !== "Closed");
    const revenue = activeProjects.reduce((total, project) => total + Number(project.value || 0), 0);
    const metrics = adminState.metrics || {};
    const leadMetric = document.querySelector("[data-metric='leads']");
    const projectMetric = document.querySelector("[data-metric='projects']");
    const revenueMetric = document.querySelector("[data-metric='revenue']");
    const supportMetric = document.querySelector("[data-metric='support']");
    const lastUpdated = document.querySelector("[data-last-updated]");
    const totalLeadCount = storageStatus?.counts?.leads ?? metrics.totalLeads ?? (adminState.leadsTotal || adminState.leads.length);
    if (leadMetric) leadMetric.textContent = totalLeadCount;
    if (projectMetric) projectMetric.textContent = metrics.activeProjects ?? activeProjects.length;
    if (revenueMetric) revenueMetric.textContent = formatMoney(metrics.openProjectValue ?? revenue);
    if (supportMetric) supportMetric.textContent = metrics.openSupportTickets ?? openTickets.length;
    if (lastUpdated) {
      lastUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  };

  const renderStorageStatus = () => {
    const panel = document.querySelector("[data-storage-panel]");
    if (!panel) return;
    const counts = storageStatus?.counts || {};
    const migration = storageStatus?.migration || {};
    const setField = (name, value) => {
      const field = panel.querySelector(`[data-storage-field="${name}"]`);
      if (field) field.textContent = value;
    };
    const activeBadge = panel.querySelector("[data-storage-active]");
    const migrationNote = panel.querySelector("[data-storage-migration]");
    const migrateButton = panel.querySelector("[data-migrate-storage]");

    setField("activeStorage", storageStatus?.activeStorage || "Unavailable");
    setField("d1Connected", storageStatus?.d1Connected ? "Connected" : "Not connected");
    setField("leads", counts.leads ?? 0);
    setField("projects", counts.projects ?? 0);
    setField("clients", counts.clients ?? 0);
    setField("tickets", counts.tickets ?? 0);
    if (activeBadge) activeBadge.textContent = storageStatus?.activeStorage || "Unavailable";
    if (migrationNote) {
      migrationNote.textContent = migration.completed
        ? `Last migration completed at ${formatLeadDate(migration.updatedAt || migration.details?.migrationCompletedAt)}.`
        : "Migration has not run yet. KV data will remain unchanged when migrated.";
    }
    if (migrateButton) {
      migrateButton.hidden = Boolean(migration.completed) || !storageStatus?.d1Connected;
    }
  };

  const openLeadDetails = (id) => {
    const lead = getLeadById(id);
    if (!leadDetails || !lead) return;
    const email = leadEmail(lead);
    const phone = leadPhone(lead);
    const whatsappPhone = phone.replace(/[^\d]/g, "");
    const status = normalizedLeadStatus(lead.status);

    leadDetails.innerHTML = `
      <div class="lead-details">
        <p class="eyebrow">Lead Details</p>
        <h2>${escapeHtml(leadName(lead))}</h2>
        <div class="lead-detail-grid">
          <article><span>Full Name</span><strong>${escapeHtml(leadName(lead))}</strong></article>
          <article><span>Company/Organization</span><strong>${escapeHtml(textField(lead.company, "Not provided"))}</strong></article>
          <article><span>Email</span><strong>${escapeHtml(email || "Not provided")}</strong></article>
          <article><span>Phone</span><strong>${escapeHtml(phone || "Not provided")}</strong></article>
          <article><span>Service</span><strong>${escapeHtml(textField(lead.service, "Website Inquiry"))}</strong></article>
          <article><span>Package</span><strong>${escapeHtml(textField(lead.packageName, "Not selected"))}</strong></article>
          <article><span>Budget Range</span><strong>${escapeHtml(leadBudgetLabel(lead))}</strong></article>
          <article><span>Timeline</span><strong>${escapeHtml(textField(lead.timeline, "Not provided"))}</strong></article>
          <article><span>Source</span><strong>${escapeHtml(leadSource(lead))}</strong></article>
          <article><span>Submitted Date and Time</span><strong>${escapeHtml(formatLeadDate(lead.createdAt))}</strong></article>
          <article>
            <span>Current Status</span>
            <select data-lead-status-select data-id="${escapeHtml(lead.id)}">
              ${leadStatuses.map((item) => `<option value="${escapeHtml(item)}" ${item === status ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select>
          </article>
          <article class="full-field"><span>Project Message</span><p>${escapeHtml(leadMessage(lead))}</p></article>
        </div>
        <div class="lead-action-row">
          ${email ? `<a class="row-action" href="mailto:${escapeHtml(email)}">Email</a>` : ""}
          ${phone ? `<a class="row-action" href="tel:${escapeHtml(phone)}">Phone</a>` : ""}
          ${whatsappPhone ? `<a class="row-action" href="https://wa.me/${escapeHtml(whatsappPhone)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
        </div>
      </div>`;
    leadDetailsModal?.showModal();
  };

  const renderLeads = () => {
    const table = document.querySelector("[data-leads-table]");
    if (!table) return;
    const countNote = document.querySelector("[data-leads-count-note]");
    const rows = sortLeadsNewestFirst(adminState.leads).filter((lead) => {
      const searchText = [
        leadName(lead),
        lead.company,
        leadEmail(lead),
        leadPhone(lead),
        lead.service,
        lead.packageName,
        leadMessage(lead),
        normalizedLeadStatus(lead.status),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchText.includes(activeFilters.leadsSearch);
      const matchesStatus = activeFilters.leadsStatus === "all" || normalizedLeadStatus(lead.status) === activeFilters.leadsStatus;
      return matchesSearch && matchesStatus;
    });
    const displayedCount = rows.length;
    const filteredTotal = adminState.leadsTotal || rows.length;
    if (countNote) {
      countNote.textContent = `Showing ${displayedCount} of ${filteredTotal} inquiries`;
    }
    if (!rows.length) {
      table.innerHTML = emptyRow("No leads yet. New website inquiries will appear here.", 6);
      return;
    }
    table.innerHTML = rows
      .map(
        (lead) => `
          <tr>
            <td>${escapeHtml(leadName(lead))}</td>
            <td>${escapeHtml(textField(lead.service, "Website Inquiry"))}</td>
            <td>${escapeHtml(leadBudgetLabel(lead))}</td>
            <td><span class="status-badge ${statusClass(normalizedLeadStatus(lead.status))}">${escapeHtml(normalizedLeadStatus(lead.status))}</span></td>
            <td>${escapeHtml(formatLeadDate(lead.createdAt))}</td>
            <td>
              <button type="button" class="row-action" data-admin-action="view-lead" data-id="${escapeHtml(lead.id)}">View Details</button>
              <button type="button" class="row-action" data-admin-action="cycle-lead" data-id="${escapeHtml(lead.id)}">Status</button>
              <button type="button" class="row-action danger" data-admin-action="delete-lead" data-id="${escapeHtml(lead.id)}">Delete</button>
            </td>
          </tr>`
      )
      .join("");
  };

  const renderProjects = () => {
    const list = document.querySelector("[data-project-list]");
    if (!list) return;
    if (!adminState.projects.length) {
      list.innerHTML = emptyState("No projects yet. Add real projects when work starts.");
      return;
    }
    list.innerHTML = adminState.projects
      .map(
        (project) => `
          <article class="admin-mini-card">
            <span class="status-badge ${statusClass(project.status)}">${escapeHtml(project.status)}</span>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.client)} - ${formatMoney(project.value)}</p>
            <div class="pipeline-list">
              <div>
                <span>Progress</span>
                <strong>${Number(project.progress)}%</strong>
                <progress value="${Number(project.progress)}" max="100"></progress>
              </div>
            </div>
            <div class="admin-mini-card-actions">
              <button type="button" class="row-action" data-admin-action="project-progress" data-id="${project.id}">+10%</button>
              <button type="button" class="row-action danger" data-admin-action="delete-project" data-id="${project.id}">Delete</button>
            </div>
          </article>`
      )
      .join("");
  };

  const renderClients = () => {
    const list = document.querySelector("[data-client-list]");
    if (!list) return;
    if (!adminState.clients.length) {
      list.innerHTML = emptyState("No clients yet. Converted customers will appear here.");
      return;
    }
    list.innerHTML = adminState.clients
      .map(
        (client) => `
          <article class="admin-mini-card">
            <h3>${escapeHtml(client.name)}</h3>
            <p>${escapeHtml(client.service)}</p>
            <small>${escapeHtml(client.email)}</small>
            <small>${escapeHtml(client.phone)}</small>
            <div class="admin-mini-card-actions">
              <button type="button" class="row-action danger" data-admin-action="delete-client" data-id="${client.id}">Delete</button>
            </div>
          </article>`
      )
      .join("");
  };

  const renderTickets = () => {
    const table = document.querySelector("[data-support-table]");
    if (!table) return;
    if (!adminState.tickets.length) {
      table.innerHTML = emptyRow("No support tickets yet.", 5);
      return;
    }
    table.innerHTML = adminState.tickets
      .map(
        (ticket) => `
          <tr>
            <td>${escapeHtml(ticket.client)}</td>
            <td>${escapeHtml(ticket.issue)}</td>
            <td><span class="status-badge ${statusClass(ticket.priority)}">${escapeHtml(ticket.priority)}</span></td>
            <td><span class="status-badge ${statusClass(ticket.status)}">${escapeHtml(ticket.status)}</span></td>
            <td>
              <button type="button" class="row-action" data-admin-action="cycle-ticket" data-id="${ticket.id}">Status</button>
              <button type="button" class="row-action danger" data-admin-action="delete-ticket" data-id="${ticket.id}">Delete</button>
            </td>
          </tr>`
      )
      .join("");
  };

  const renderPricing = () => {
    const editor = document.querySelector("[data-pricing-editor]");
    if (!editor) return;
    if (!adminState.pricing.length) {
      editor.innerHTML = emptyState("No pricing packages configured yet.");
      return;
    }
    editor.innerHTML = adminState.pricing
      .map(
        (item) => `
          <article class="admin-mini-card" data-pricing-card>
            <label>Package<input name="name" value="${escapeHtml(item.name)}" /></label>
            <label>Price<input name="price" type="number" min="0" value="${Number(item.price)}" /></label>
            <label>Timeline<input name="timeline" value="${escapeHtml(item.timeline)}" /></label>
            <label>Details<textarea name="details">${escapeHtml(item.details)}</textarea></label>
          </article>`
      )
      .join("");
  };

  const renderDemand = () => {
    const demand = document.querySelector("[data-service-demand]");
    if (!demand) return;
    const counts = adminState.leads.reduce((items, lead) => {
      const service = textField(lead.service, "Website Inquiry");
      items[service] = (items[service] || 0) + 1;
      return items;
    }, {});
    const total = Math.max(adminState.leads.length, 1);
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    if (!entries.length) {
      demand.innerHTML = emptyState("No service demand data yet.");
      return;
    }
    demand.innerHTML = entries
      .map(([service, count]) => `<div><span>${escapeHtml(service)}</span><strong>${Math.round((count / total) * 100)}%</strong></div>`)
      .join("");
  };

  const renderActivity = () => {
    const list = document.querySelector("[data-activity-list]");
    if (!list) return;
    if (!adminState.activity.length) {
      list.innerHTML = emptyState("No admin activity yet.");
      return;
    }
    list.innerHTML = adminState.activity
      .slice(0, 5)
      .map((item, index) => `<div><strong>${escapeHtml(item)}</strong><span>${index === 0 ? "Just now" : `${index} update ago`}</span></div>`)
      .join("");
  };

  const drawBarChart = (canvas, labels, values) => {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#f5f7fa";
    context.fillRect(0, 0, width, height);
    if (!values.some((value) => Number(value) > 0)) {
      context.fillStyle = "#4b5563";
      context.font = "800 16px Inter, Arial";
      context.fillText("No data yet", 44, height / 2);
      return;
    }
    const max = Math.max(...values, 1);
    const barWidth = (width - 80) / values.length;
    values.forEach((value, index) => {
      const barHeight = (value / max) * 170;
      const x = 44 + index * barWidth;
      const y = height - 52 - barHeight;
      context.fillStyle = "#0066CC";
      context.fillRect(x, y, barWidth - 18, barHeight);
      context.fillStyle = "#0d1b2a";
      context.font = "700 13px Inter, Arial";
      context.fillText(String(value), x, y - 8);
      context.fillStyle = "#4b5563";
      context.font = "700 11px Inter, Arial";
      context.fillText(labels[index], x - 2, height - 24);
    });
  };

  const drawDemandChart = (canvas) => {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const counts = adminState.leads.reduce((items, lead) => {
      const service = textField(lead.service, "Website Inquiry");
      items[service] = (items[service] || 0) + 1;
      return items;
    }, {});
    const entries = Object.entries(counts).slice(0, 4);
    const total = entries.reduce((sum, item) => sum + item[1], 0) || 1;
    const colors = ["#0066CC", "#00C2FF", "#10b981", "#f59e0b"];
    let start = -Math.PI / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f5f7fa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (!entries.length) {
      context.fillStyle = "#4b5563";
      context.font = "800 16px Inter, Arial";
      context.fillText("No data yet", 44, canvas.height / 2);
      return;
    }
    entries.forEach(([, count], index) => {
      const angle = (count / total) * Math.PI * 2;
      context.beginPath();
      context.moveTo(110, 132);
      context.arc(110, 132, 82, start, start + angle);
      context.closePath();
      context.fillStyle = colors[index];
      context.fill();
      start += angle;
    });
    entries.forEach(([label, count], index) => {
      context.fillStyle = colors[index];
      context.fillRect(220, 58 + index * 42, 14, 14);
      context.fillStyle = "#0d1b2a";
      context.font = "700 12px Inter, Arial";
      context.fillText(`${label.slice(0, 18)} ${Math.round((count / total) * 100)}%`, 244, 70 + index * 42);
    });
  };

  const renderCharts = () => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const base = adminState.leads.length;
    const values = base ? [0, 0, 0, 0, Math.max(0, base - 2), base] : [0, 0, 0, 0, 0, 0];
    drawBarChart(document.querySelector("#leadChart"), labels, values);
    drawDemandChart(document.querySelector("#serviceChart"));
  };

  const renderAdmin = () => {
    renderMetrics();
    renderLeads();
    renderProjects();
    renderClients();
    renderTickets();
    renderPricing();
    renderDemand();
    renderActivity();
    renderStorageStatus();
    renderCharts();
  };

  showAdmin();
}

/* ==========================================================================
   HOMEPAGE STATS COUNTER ANIMATION
   ========================================================================== */
(function initCounterObserver() {
  const statElements = document.querySelectorAll(".stat-num[data-count]");
  if (!statElements.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateNumber = (element) => {
    const rawTarget = element.getAttribute("data-count");
    const targetValue = parseFloat(rawTarget);
    if (Number.isNaN(targetValue)) return;
    const prefix = element.getAttribute("data-prefix") || "";
    const suffix = element.getAttribute("data-suffix") || "";

    if (prefersReduced) {
      element.textContent = `${prefix}${rawTarget}${suffix}`;
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    const hasDecimal = rawTarget.includes(".");
    const decimalPlaces = hasDecimal ? (rawTarget.split(".")[1] || "").length : 0;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * targetValue;

      element.textContent = `${prefix}${current.toFixed(decimalPlaces)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${rawTarget}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    statElements.forEach((el) => observer.observe(el));
  } else {
    statElements.forEach(animateNumber);
  }
})();

/* ==========================================================================
   INTERACTIVE HERO TERMINAL TAB SWITCHER
   ========================================================================== */
(function initTerminalSwitcher() {
  const tabs = document.querySelectorAll(".terminal-tab[data-tab]");
  const views = document.querySelectorAll(".terminal-code-view[data-view]");
  if (!tabs.length || !views.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      views.forEach((view) => {
        const matches = view.getAttribute("data-view") === selected;
        view.classList.toggle("active", matches);
        view.hidden = !matches;
      });
    });
  });
})();

/* ==========================================================================
   GLOBAL TOAST NOTIFICATION SYSTEM
   ========================================================================== */
window.showToast = function showToast(message, type = "info", duration = 3500) {
  let toastContainer = document.getElementById("site-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "site-toast-container";
    toastContainer.className = "site-toast-container";
    toastContainer.setAttribute("aria-live", "polite");
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `site-toast site-toast--${type}`;
  
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  toast.innerHTML = `
    <span class="site-toast__icon" aria-hidden="true">${icon}</span>
    <span class="site-toast__message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      toast.remove();
      if (!toastContainer.children.length) {
        toastContainer.remove();
      }
    }, 300);
  }, duration);
};

/* ==========================================================================
   GLOBAL FLOATING BACK-TO-TOP BUTTON
   ========================================================================== */
(function initBackToTop() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const btt = document.createElement("button");
  btt.type = "button";
  btt.className = "site-back-to-top";
  btt.setAttribute("aria-label", "Scroll back to top");
  btt.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(btt);

  let isVisible = false;
  window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > 350;
    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      btt.classList.toggle("is-visible", isVisible);
    }
  }, { passive: true });

  btt.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();

/* ==========================================================================
   INTERACTIVE COPY-TO-CLIPBOARD FOR CONTACT DETAILS
   ========================================================================== */
(function initContactCopy() {
  document.addEventListener("click", (e) => {
    const copyTarget = e.target.closest("[data-copy-text]");
    if (!copyTarget) return;

    e.preventDefault();
    const textToCopy = copyTarget.getAttribute("data-copy-text");
    if (!textToCopy) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (window.showToast) {
          window.showToast(`Copied to clipboard: ${textToCopy}`, "success");
        }
      }).catch(() => {
        if (window.showToast) {
          window.showToast("Could not copy to clipboard", "error");
        }
      });
    }
  });
})();

/* ==========================================================================
   SERVICES CATALOG INTERACTIVE CATEGORY FILTER
   ========================================================================== */
(function initServicesCatalogFilter() {
  const filterBar = document.querySelector("[data-service-filter-bar]");
  const serviceCards = document.querySelectorAll(".cinematic-service-card");
  if (!filterBar || !serviceCards.length) return;

  const buttons = filterBar.querySelectorAll("button[data-filter]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      serviceCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "all";
        const matches = filter === "all" || category.includes(filter);
        card.style.display = matches ? "flex" : "none";
      });
    });
  });
})();

/* ==========================================================================
   GLOBAL SCROLL REVEAL & STAGGERED PAGE ANIMATION CONTROLLER (ALL PAGES)
   ========================================================================== */
(function initGlobalScrollReveal() {
  if (window.__abssScrollRevealInitialized) return;
  window.__abssScrollRevealInitialized = true;

  function setupPageAnimations() {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Universal selectors for cards, headers, grids, metrics, testimonials, and CTAs across all pages
    const animSelector = [
      ".reveal-on-scroll",
      ".section-heading",
      ".section-header",
      ".cinematic-service-card",
      ".service-card",
      ".project-card",
      ".work-card",
      ".case-study-card",
      ".industry-showcase-card",
      ".solution-showcase-card",
      ".testimonial-card",
      ".package-card",
      ".pricing-card",
      ".package-grid article",
      ".bento-service-card",
      ".agency-stat-card",
      ".metric-card",
      ".stat-card",
      ".process-card",
      ".process-step",
      ".step-card",
      ".faq-item",
      ".career-card",
      ".blog-card",
      ".contact-method-card",
      ".contact-form-wrapper",
      ".contact-card",
      ".program-card",
      ".portal-card",
      ".feature-card",
      ".radiant-cta-box",
      ".cta-box"
    ].join(", ");

    const animTargets = Array.from(document.querySelectorAll(animSelector));
    if (!animTargets.length) return;

    // Exclude elements inside hero sections that already have dedicated CSS keyframe entrances
    const heroEl = document.querySelector(".site-hero, .page-hero, .portal-hero");
    const activeTargets = animTargets.filter((el) => {
      if (heroEl && heroEl.contains(el) && !el.classList.contains("reveal-on-scroll")) {
        return false;
      }
      return true;
    });

    if (!activeTargets.length) return;

    // Assign staggered cascading delays for sibling elements in multi-item containers
    activeTargets.forEach((el) => {
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }

      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((c) => c.classList.contains("reveal-on-scroll"));
        if (siblings.length > 1) {
          const index = siblings.indexOf(el);
          const delayClass = `reveal-delay-${Math.min((index % 6) + 1, 6)}`;
          if (!el.className.includes("reveal-delay-")) {
            el.classList.add(delayClass);
          }
        }
      }
    });

    // Signal CSS that JS animation system is active
    document.documentElement.classList.add("reveal-animations-ready");
    document.documentElement.classList.add("has-scroll-reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
      }
    );

    // Differentiate elements above the fold vs offscreen
    const inViewport = [];
    const outOfViewport = [];

    activeTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        inViewport.push(el);
      } else {
        outOfViewport.push(el);
        observer.observe(el);
      }
    });

    // Stagger elements visible on page load for a silky smooth entrance
    inViewport.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add("is-revealed");
      }, 50 + idx * 45);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPageAnimations);
  } else {
    setupPageAnimations();
  }
})();

