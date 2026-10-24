/**
 * ABSS NEXUS ACADEMY — STUDENT WORKSPACE DASHBOARD CONTROLLER
 * Ultra-Responsive Single Page Application Architecture
 * Fully Interactive: AI Career Coach, Resume Builder, Tasks, Digital ID, Certificates, Refer & Earn
 */

(function () {
  'use strict';

  // Available domains and their respective 5 curriculum milestones
  const AVAILABLE_DOMAINS = [
  {
    "id": "web-dev",
    "slug": "web-development",
    "name": "Web Development",
    "category": "Engineering & Dev",
    "icon": "💻",
    "count": 5
  },
  {
    "id": "data-science",
    "slug": "data-science",
    "name": "Data Science",
    "category": "AI & Data",
    "icon": "🔬",
    "count": 5
  },
  {
    "id": "machine-learning",
    "slug": "machine-learning",
    "name": "Machine Learning",
    "category": "AI & Data",
    "icon": "🧠",
    "count": 5
  },
  {
    "id": "data-analyst",
    "slug": "data-analyst",
    "name": "Data Analyst",
    "category": "AI & Data",
    "icon": "📊",
    "count": 5
  },
  {
    "id": "cyber-security",
    "slug": "cyber-security",
    "name": "Cyber Security",
    "category": "Engineering & Dev",
    "icon": "🛡️",
    "count": 5
  },
  {
    "id": "software-dev",
    "slug": "software-development",
    "name": "Software Development",
    "category": "Engineering & Dev",
    "icon": "⚙️",
    "count": 5
  },
  {
    "id": "prompt-eng",
    "slug": "prompt-engineering",
    "name": "Prompt Engineering",
    "category": "AI & Data",
    "icon": "✨",
    "count": 5
  },
  {
    "id": "agent-eng",
    "slug": "agent-engineering",
    "name": "Agent Engineering",
    "category": "AI & Data",
    "icon": "🤖",
    "count": 5
  },
  {
    "id": "ai-eng",
    "slug": "ai-engineering",
    "name": "AI Engineering",
    "category": "AI & Data",
    "icon": "🚀",
    "count": 5
  },
  {
    "id": "android-dev",
    "slug": "android-development",
    "name": "Android Development",
    "category": "Engineering & Dev",
    "icon": "📱",
    "count": 5
  },
  {
    "id": "product-mgmt",
    "slug": "product-management",
    "name": "Product Management",
    "category": "Business & Strategy",
    "icon": "📋",
    "count": 5
  },
  {
    "id": "ui-ux",
    "slug": "ui-ux-design",
    "name": "UI/UX",
    "category": "Design & Creative",
    "icon": "🎨",
    "count": 5
  },
  {
    "id": "graphics-design",
    "slug": "graphics-design",
    "name": "Graphics Design",
    "category": "Design & Creative",
    "icon": "🖌️",
    "count": 5
  },
  {
    "id": "human-resources",
    "slug": "human-resources",
    "name": "Human Resources",
    "category": "Business & Strategy",
    "icon": "👥",
    "count": 5
  },
  {
    "id": "digital-marketing",
    "slug": "digital-marketing",
    "name": "Digital Marketing",
    "category": "Marketing & Growth",
    "icon": "📈",
    "count": 5
  },
  {
    "id": "content-writing",
    "slug": "content-writing",
    "name": "Content Writing",
    "category": "Marketing & Growth",
    "icon": "✍️",
    "count": 5
  },
  {
    "id": "cloud-devops",
    "slug": "cloud-devops",
    "name": "Cloud Architecture & DevOps",
    "category": "Engineering & Dev",
    "icon": "☁️",
    "count": 5
  }
];

  const DOMAIN_TASKS = {
  "web-development": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Responsive Semantic Interface & Design System",
      "desc": "Build a responsive, mobile-first web interface using semantic HTML5, modern CSS Grid/Flexbox, and accessibility standards.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit your GitHub repository and live deployment URL.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Create semantic HTML5 layout with landmark tags (header, nav, main, section, footer)",
        "Implement responsive CSS design tokens (colors, typography, spacing) without heavy frameworks",
        "Test responsiveness across viewports (320px to 1440px) and WCAG AA contrast standards",
        "Deploy to GitHub Pages, Netlify, or Vercel and verify Core Web Vitals"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Asynchronous API Integration & Client State",
      "desc": "Implement dynamic asynchronous data fetching, error boundary handling, and client-side caching.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Unlocked after completing Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Integrate async Fetch requests with loading spinners and skeleton screens",
        "Implement client-side state handling and localStorage fallback",
        "Handle HTTP error codes (400, 404, 500) gracefully with user-friendly alerts",
        "Document API contracts in repository README"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Interactive Component Architecture & Form Validation",
      "desc": "Build accessible interactive modals, dropdowns, and form validation using the native Constraint Validation API.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Build accessible modal dialogs with keyboard navigation (Esc to close, tab trap)",
        "Implement real-time form validation with custom regex and instant visual feedback",
        "Add subtle CSS micro-animations with prefers-reduced-motion media query",
        "Write component documentation and usage examples"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Backend API & Serverless Function Wiring",
      "desc": "Connect frontend client with serverless endpoints or Node.js backend with JSON payloads and authentication.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Build serverless functions on Cloudflare Pages or Express endpoints",
        "Implement JWT token validation and secure HTTP-only cookies",
        "Configure CORS headers and input sanitization to block XSS attacks",
        "Write integration tests validating HTTP response status codes"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Capstone Production Deployment & Lighthouse Audit",
      "desc": "Final production release, Core Web Vitals audit (LCP < 2.5s, CLS < 0.1), and portfolio case study submission.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Perform Lighthouse audit ensuring 90+ scores across Performance, Accessibility, and SEO",
        "Configure production custom domain with SSL and security headers",
        "Record a 3-minute video walkthrough explaining project architecture",
        "Submit live application URL and GitHub link for ISO credential issuance"
      ]
    }
  ],
  "data-science": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Data Acquisition & Exploratory Data Analysis (EDA)",
      "desc": "Ingest multi-source tabular datasets, handle missing values, and calculate statistical distribution metrics.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Jupyter Notebook (.ipynb) with markdown explanations and visualization charts.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Load raw CSV/JSON datasets into Pandas DataFrames and audit data types and missing values",
        "Generate descriptive statistics (mean, median, IQR, variance, skewness)",
        "Produce distribution histograms, box plots, and scatter matrices using Seaborn & Matplotlib",
        "Document 5 key analytical insights discovered from initial exploration"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Feature Engineering & Preprocessing Pipeline",
      "desc": "Build an automated data cleaning and feature engineering transformation pipeline.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Implement one-hot and target encoding for high-cardinality categorical variables",
        "Apply standard/min-max feature scaling and power transformations",
        "Detect and treat multi-variate outliers using IQR and Z-score methods",
        "Assemble transformations into a reproducible Scikit-Learn Pipeline object"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Predictive Modeling & Baseline Evaluation",
      "desc": "Train supervised classification and regression algorithms, establishing rigorous benchmark baselines.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Split data using stratified k-fold cross-validation to prevent data leakage",
        "Train Logistic Regression, Random Forest, and Gradient Boosting baseline models",
        "Calculate accuracy, precision, recall, F1-score, and ROC-AUC metrics",
        "Plot confusion matrix and precision-recall trade-off curves"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Hyperparameter Optimization & Model Explainability",
      "desc": "Fine-tune model hyperparameters using Optuna/GridSearch and explain feature importance with SHAP.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Run Bayesian hyperparameter search using Optuna across learning rate and tree depth",
        "Compute SHAP (SHapley Additive exPlanations) summary plots and feature importance",
        "Perform residual analysis to diagnose model bias and heteroscedasticity",
        "Serialize best performing model using Joblib with schema versioning"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Interactive Streamlit Dashboard & Executive Insights Deck",
      "desc": "Deploy an interactive web dashboard for non-technical stakeholders with live inference.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Develop interactive Streamlit/Gradio web application with dynamic filter sliders",
        "Allow users to upload CSVs or enter features to receive real-time predictions",
        "Deploy application to Streamlit Community Cloud or Hugging Face Spaces",
        "Draft executive summary report with business recommendations"
      ]
    }
  ],
  "machine-learning": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Mathematical Foundations & Supervised Algorithms",
      "desc": "Implement fundamental machine learning algorithms from scratch and evaluate loss function optimization.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Python scripts with vectorized NumPy operations and gradient descent plots.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Code Linear Regression with batch gradient descent from first principles in NumPy",
        "Implement Logistic Regression with binary cross-entropy loss and sigmoid activation",
        "Compare scratch implementation convergence against Scikit-Learn benchmarks",
        "Document learning rate schedules and gradient norms"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Ensemble Learning & Gradient Boosting Machines",
      "desc": "Build high-accuracy ensemble classifiers using Random Forests, XGBoost, and LightGBM.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Train and tune Random Forest and XGBoost classifiers on complex tabular datasets",
        "Address severe class imbalance using SMOTE and focal loss weights",
        "Evaluate feature interaction terms and permutation importance",
        "Benchmark inference latency across CPU and GPU threads"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Deep Neural Networks & Backpropagation",
      "desc": "Construct deep multi-layer neural networks using PyTorch with regularization techniques.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Build a custom PyTorch nn.Module with AdamW optimizer and CosineAnnealingLR",
        "Implement Dropout, Batch Normalization, and early stopping callbacks",
        "Track training vs validation loss curves to identify overfitting boundaries",
        "Export trained model weights to ONNX format"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Model Evaluation, Bias & Drift Monitoring",
      "desc": "Perform rigorous error analysis, subgroup parity audits, and data drift detection.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Calculate demographic parity and equalized odds metrics for fairness audits",
        "Implement Evidently AI or PSI (Population Stability Index) drift tests",
        "Generate SHAP waterfall plots for individual sample inference explanations",
        "Document model governance card following IEEE standards"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Production Inference Microservice with FastAPI & Docker",
      "desc": "Package and deploy a production-ready ML model as a containerized REST API.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Develop high-throughput FastAPI inference endpoint with Pydantic payload validation",
        "Write unit tests with pytest ensuring sub-50ms inference response times",
        "Build optimized Docker image with multi-stage builds and non-root user",
        "Deploy container to cloud (Render / AWS ECS) and submit live test documentation"
      ]
    }
  ],
  "data-analyst": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Advanced SQL Data Extraction & Optimization",
      "desc": "Query complex multi-table relational databases using CTEs, window functions, and indexing strategies.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit SQL queries and query execution plan (EXPLAIN ANALYZE) screenshots.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Write multi-table INNER, LEFT, and FULL OUTER JOINs with filtering predicates",
        "Implement Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)",
        "Construct Common Table Expressions (CTEs) for recursive and hierarchical queries",
        "Optimize query performance by inspecting execution plans and creating indexes"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Data Cleaning, Transformation & Quality Audit",
      "desc": "Audit raw unstructured business data for anomalies, inconsistencies, and null distributions.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Perform automated data profiling to identify missing, duplicate, and corrupt values",
        "Normalize address, currency, and date formats into standardized ISO schemas",
        "Write automated SQL assertions and data validation checks",
        "Generate a Data Quality Scorecard for stakeholders"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Cohort Retention & Customer Lifetime Value (LTV) Modeling",
      "desc": "Calculate vital business growth metrics including cohort churn, retention curves, and MRR.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Build monthly user cohort retention heatmap analyzing 12-month customer behavior",
        "Compute Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV) ratios",
        "Perform RFM (Recency, Frequency, Monetary) customer segmentation",
        "Summarize churn risk factors in a quarterly business report"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Interactive Business Intelligence Dashboard (Power BI / Tableau)",
      "desc": "Build an interactive, drill-down dashboard with dynamic parameters and executive KPI cards.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Design a Star Schema data model with Fact and Dimension tables in Power BI / Tableau",
        "Write DAX measures for Year-over-Year (YoY) growth, MTD, and rolling 30-day averages",
        "Add interactive cross-filtering, slicers, and drill-through pages",
        "Publish interactive dashboard and publish accessible public link"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Executive Stakeholder Presentation & Data Storytelling",
      "desc": "Present business insights and actionable strategic recommendations to executive leadership.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Assemble 10-slide executive presentation translating technical metrics into ROI recommendations",
        "Highlight 3 immediate revenue growth opportunities backed by statistical significance",
        "Record 5-minute video presentation communicating findings clearly",
        "Submit slide deck, dashboard link, and video presentation for evaluation"
      ]
    }
  ],
  "cyber-security": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Linux System Hardening & Network Packet Analysis",
      "desc": "Configure secure firewall rules, analyze network packet captures, and audit open ports.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit packet capture (.pcap) analysis and firewall hardening audit report.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Perform network reconnaissance using Nmap service version and OS detection scripts",
        "Capture and inspect network protocols (DNS, HTTP, TLS handshake) in Wireshark",
        "Configure UFW / iptables firewall rules and disable legacy Telnet/FTP services",
        "Harden SSH daemon by disabling root login and enforcing ED25519 key authentication"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Web Application Vulnerability Assessment (OWASP Top 10)",
      "desc": "Identify, reproduce, and remediate critical web vulnerabilities like SQLi, XSS, and CSRF.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Audit web targets for Cross-Site Scripting (Reflected, Stored, DOM-based XSS)",
        "Test for SQL Injection vulnerabilities using parameterized queries as mitigation",
        "Inspect cookie security flags (Secure, HttpOnly, SameSite=Strict)",
        "Implement Content Security Policy (CSP) headers to block malicious script injection"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Cryptography & Cryptographic Key Management",
      "desc": "Implement modern cryptographic primitives, digital signatures, and token security.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Implement AES-256-GCM symmetric authenticated encryption for sensitive payloads",
        "Generate and verify RSA-4096 / ECC digital signatures for tamper detection",
        "Audit password hashing algorithms using Argon2id / bcrypt with high work factors",
        "Document secret management policies avoiding hardcoded credentials in Git"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Penetration Testing & Threat Modeling",
      "desc": "Perform authorized penetration testing using Burp Suite and construct a STRIDE threat model.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Intercept and manipulate HTTP requests with Burp Suite / OWASP ZAP proxy",
        "Conduct broken object-level authorization (BOLA/IDOR) testing on API endpoints",
        "Build a STRIDE threat matrix mapping spoofing, tampering, and elevation of privilege risks",
        "Prioritize discovered attack vectors using CVSS 3.1 scoring formulas"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Enterprise Security Audit Report & Incident Response Plan",
      "desc": "Publish an industry-standard penetration test report and incident response playbook.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Compile executive vulnerability assessment report with severity classifications",
        "Provide code-level remediation snippets for each confirmed security finding",
        "Draft a 6-step Incident Response Plan (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned)",
        "Submit final security audit deliverable for ISO certification review"
      ]
    }
  ],
  "software-development": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: OOP Architecture, Clean Code & Unit Testing",
      "desc": "Structure scalable object-oriented software following SOLID principles and automated testing.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit GitHub repo with unit test coverage report.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Implement clean domain models applying Single Responsibility and Dependency Inversion",
        "Use Factory and Repository design patterns for modular code organization",
        "Write unit tests with Jest / Mocha achieving > 85% branch coverage",
        "Configure ESLint and Prettier for automated code quality enforcement"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: RESTful API Engineering with CRUD & Strict Validations",
      "desc": "Build robust RESTful backend services with input validation and centralized error handlers.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Design modular Express/Fastify route controllers with async/await patterns",
        "Enforce strict schema validation using Zod or Joi to prevent malformed requests",
        "Implement centralized error handling middleware returning standardized error schemas",
        "Generate automated Swagger / OpenAPI 3.0 API documentation"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Relational Database Schema Design & Migrations",
      "desc": "Model relational database schemas with foreign key constraints, indexes, and transactions.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Design 3NF normalized schema for e-commerce or booking platform with proper foreign keys",
        "Write idempotent up/down SQL migration scripts using Prisma or Drizzle ORM",
        "Execute ACID database transactions for multi-step monetary or inventory operations",
        "Profile queries with EXPLAIN to eliminate slow sequential table scans"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Authentication, Authorization & Security Middlewares",
      "desc": "Implement enterprise JWT token authentication, refresh tokens, and rate limiting.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Build dual-token auth flow (short-lived JWT access token + secure refresh token)",
        "Implement Role-Based Access Control (RBAC) middleware for Admin, Mentor, and Student roles",
        "Enforce IP rate-limiting using Redis or memory stores to prevent brute-force attacks",
        "Add Helmet security headers (HSTS, X-Frame-Options, CSP)"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Full-Stack Integration, Dockerization & CI/CD Pipeline",
      "desc": "Containerize the full-stack system and deploy through automated GitHub Actions CI/CD.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Connect backend REST API with frontend client interface with full error handling",
        "Write Dockerfile and docker-compose.yml orchestrating database and API services",
        "Set up GitHub Actions workflow to run tests, linting, and automated cloud deploy",
        "Submit production URL and architecture diagram for certification evaluation"
      ]
    }
  ],
  "prompt-engineering": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Foundational System Prompts & Structured JSON Outputs",
      "desc": "Design deterministic system prompts and enforce valid JSON schema responses from LLMs.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit prompt templates, schema definitions, and validation test suite.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Write clear system instructions establishing role, scope, constraints, and edge cases",
        "Enforce structured JSON output formatting with explicit JSON schema parameters",
        "Benchmark zero-shot vs few-shot in-context examples for error reduction",
        "Build a Python script validating LLM outputs against Pydantic models"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Advanced Reasoning Prompts (CoT, ReAct & Tree-of-Thought)",
      "desc": "Implement advanced cognitive reasoning techniques to solve complex multi-step reasoning problems.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Implement Chain-of-Thought (CoT) prompting for arithmetic and logical reasoning tasks",
        "Construct ReAct (Reason + Act) prompting loops combining thought and action steps",
        "Design Tree-of-Thought prompt branches for evaluating multiple prospective solutions",
        "Measure accuracy improvements over direct prompting baselines"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Automated Prompt Evaluation & Benchmarking Suite",
      "desc": "Build an automated evaluation framework to measure prompt accuracy, hallucination, and latency.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Create a benchmark dataset of 50 edge-case test prompts and ground truth targets",
        "Implement automated LLM-as-a-Judge scoring with rubrics for relevance and clarity",
        "Calculate BLEU, ROUGE, and semantic embedding similarity scores across prompt versions",
        "Generate a comparative performance scorecard tracking cost per prompt run"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: RAG Prompting & Context Window Compression",
      "desc": "Optimize retrieval context insertion, avoid needle-in-a-haystack lost-in-the-middle degradation.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Structure RAG prompt headers with clear source citation markers and instructions",
        "Implement prompt compression techniques (LLMLingua) to eliminate redundant tokens",
        "Position crucial facts at the start and end of context to prevent attention loss",
        "Validate answer groundedness to eliminate hallucinated assertions"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Adversarial Robustness, Jailbreak Defense & Guardrails",
      "desc": "Test LLM prompts against prompt injection attacks and build defense guardrails.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Simulate 10 distinct prompt injection techniques (ignore instructions, roleplay, hex encoding)",
        "Implement defensive delimiter boundaries (XML tags, triple quotes) and input sanitization",
        "Integrate Llama Guard or NeMo Guardrails to filter sensitive PII and policy violations",
        "Submit adversarial audit report with mitigation proof for certification review"
      ]
    }
  ],
  "agent-engineering": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Function Calling & Tool Augmentation Pipeline",
      "desc": "Connect an LLM to external APIs and deterministic code tools using structured function calling.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Python repository demonstrating function execution and error handling.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Define tool schemas with JSON Schema descriptions for calculators, web search, and weather APIs",
        "Implement tool execution dispatcher mapping model function calls to Python functions",
        "Handle missing arguments, tool execution timeouts, and API exceptions gracefully",
        "Demonstrate end-to-end question answering using real-time tool data"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Agent Memory Systems & Conversation Persistence",
      "desc": "Build short-term episodic and long-term semantic memory architectures for stateful agents.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Implement sliding window conversation buffer memory with automated summarization",
        "Build long-term vector semantic memory using Chroma / SQLite to recall user preferences",
        "Design memory retrieval filters prioritizing recency and semantic relevance",
        "Persist agent session states across multi-turn interactions"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Hierarchical Multi-Agent Team Orchestration",
      "desc": "Coordinate specialized collaborative agents using CrewAI or LangGraph for complex task execution.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Define 3 specialized agent roles: Research Analyst, Technical Writer, and Quality Auditor",
        "Implement inter-agent message passing and state handoff protocols in LangGraph",
        "Build consensus checking and automated revision loops until quality thresholds are met",
        "Visualize execution graphs and dependency flows"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Human-in-the-Loop & Execution Guardrails",
      "desc": "Add human approval checkpoints, recursion limits, and sandboxed code execution.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Implement human approval breakpoints before destructive actions (sending emails, DB writes)",
        "Enforce strict recursion depth limits and budget controls to prevent infinite agent loops",
        "Execute dynamic code in an isolated Docker sandbox container",
        "Log full step-by-step trace events for auditability"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Autonomous End-to-End Task Agent Deployment",
      "desc": "Deploy a production-grade autonomous agent capable of solving complex multi-day workflows.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Build an autonomous market intelligence or automated bug triage agent",
        "Deploy agent backend on cloud with webhook triggers and scheduled cron runs",
        "Instrument agent with Langfuse or Arize Phoenix for real-time observability",
        "Submit video walkthrough, repository URL, and execution logs for certification"
      ]
    }
  ],
  "ai-engineering": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Vector Embeddings & Semantic Search Engine",
      "desc": "Generate dense text embeddings and build a semantic similarity search engine with indexing.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Python code, vector database connection, and query benchmark results.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Generate text embeddings using HuggingFace / OpenAI embedding models",
        "Store and index document chunks in a vector database (Chroma, Qdrant, or Pinecone)",
        "Implement cosine similarity and Euclidean distance search queries",
        "Evaluate top-k retrieval precision on technical documentation queries"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Production Retrieval-Augmented Generation (RAG) System",
      "desc": "Build an end-to-end RAG pipeline with hybrid search, re-ranking, and citation generation.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Implement recursive character text splitting with domain-aware chunk overlaps",
        "Build Hybrid Search combining BM25 keyword matching with dense vector retrieval",
        "Add a Cross-Encoder Re-ranker (Cohere / BGE-Reranker) to refine top results",
        "Generate answers with strict markdown citation links to original source documents"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: AI Observability, Tracing & Latency Optimization",
      "desc": "Instrument AI pipelines with real-time tracing, token cost accounting, and streaming responses.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Integrate OpenTelemetry or Langfuse tracing across every LLM and tool invocation",
        "Implement Server-Sent Events (SSE) streaming for real-time token delivery",
        "Set up semantic response caching with Redis to reduce duplicate API costs by > 40%",
        "Measure and optimize Time-to-First-Token (TTFT) and total generation latency"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Parameter-Efficient Fine-Tuning (PEFT / LoRA)",
      "desc": "Fine-tune an open-source LLM (Llama 3 / Mistral) on a domain dataset using QLoRA.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "12–14 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Curate, clean, and validate 500+ instruction-response training pairs in JSONL format",
        "Configure 4-bit quantization and LoRA rank/alpha adapter parameters using HuggingFace PEFT",
        "Train model on Google Colab / GPU instance and track loss curves on Weights & Biases",
        "Evaluate fine-tuned adapter against base model on out-of-distribution test prompts"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Production AI Microservice Architecture & Release",
      "desc": "Deploy a scalable, containerized AI service with rate limiting, fallbacks, and SLA monitoring.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Build production FastAPI microservice supporting streaming inference and health checks",
        "Implement multi-provider fallback logic (e.g. OpenAI -> Anthropic -> OpenRouter)",
        "Deploy service using Docker on AWS / GCP / Cloudflare with autoscaling policies",
        "Submit architecture documentation and live API test endpoint for certification"
      ]
    }
  ],
  "android-development": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Modern Android UI with Jetpack Compose & Material 3",
      "desc": "Build responsive, declarative Android user interfaces with Jetpack Compose and Material Design 3.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Android Studio project repository and running app screen recordings.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Build composable layouts using Column, Row, Box, and LazyColumn with scroll state",
        "Implement Material Design 3 theming (dynamic color schemes, dark mode, typography)",
        "Manage UI state with remember, mutableStateOf, and state hoisting patterns",
        "Ensure edge-to-edge layout display across various mobile screen densities"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Multi-Screen Navigation & Architecture Components (MVVM)",
      "desc": "Implement Jetpack Navigation Compose and structure app architecture using MVVM.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Configure NavHostController with type-safe route arguments and transitions",
        "Implement ViewModel lifecycle architecture retaining state across screen rotations",
        "Expose reactive UI state using Kotlin StateFlow and SharedFlow",
        "Add Bottom Navigation bar and top app bar with contextual action icons"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Asynchronous REST Networking with Retrofit & Coroutines",
      "desc": "Connect mobile client to remote REST APIs using Retrofit, Moshi/Gson, and Kotlin Coroutines.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Build Retrofit HTTP client with OkHttp logging interceptors and authorization headers",
        "Consume asynchronous API endpoints safely inside CoroutineScope / viewModelScope",
        "Display shimmer loading effects and handle network disconnection with retry buttons",
        "Implement image caching and asynchronous loading using Coil library"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Offline-First Local Persistence with Room Database",
      "desc": "Implement local database caching using Room ORM with repository pattern architecture.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Create Room Entities, DAOs, and AppDatabase with primary keys and indexes",
        "Implement a Single Source of Truth Repository pattern synchronizing remote and local data",
        "Write unit tests verifying database CRUD operations with in-memory Room instances",
        "Support automated schema migrations without user data loss"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: App Optimization, Unit Testing & Signed APK Release",
      "desc": "Optimize APK size with Proguard/R8 and export signed production Android App Bundle (AAB/APK).",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Write ViewModel and Repository unit tests with MockK and Turbine library",
        "Enable code shrinking and obfuscation with Proguard / R8 rules",
        "Generate cryptographically signed Release APK / Android App Bundle (AAB)",
        "Submit signed APK and demonstration video for ISO certificate evaluation"
      ]
    }
  ],
  "product-management": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Market Research, Problem Statement & User Personas",
      "desc": "Conduct competitive teardowns, quantitative user interviews, and formalize user persona boards.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit comprehensive user research report in PDF or Notion doc format.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Perform competitive teardown of top 3 industry alternatives identifying key gaps",
        "Formulate validated problem statements using jobs-to-be-done (JTBD) framework",
        "Construct 2 detailed user personas outlining demographics, goals, pain points, and workflows",
        "Summarize market opportunity and addressable market size (TAM/SAM/SOM)"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Product Requirement Document (PRD) Drafting",
      "desc": "Author an industry-standard Product Requirement Document (PRD) with engineering specifications.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Structure PRD defining executive summary, strategic objectives, and target metrics",
        "Detail functional feature specifications with explicit user story acceptance criteria",
        "Outline non-functional requirements (security, performance latency, internationalization)",
        "Document out-of-scope items and edge-case error scenarios"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Feature Backlog Prioritization (RICE & MoSCoW)",
      "desc": "Apply quantitative prioritization frameworks to build an actionable MVP release roadmap.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Score a 20-feature backlog using the RICE framework (Reach x Impact x Confidence / Effort)",
        "Categorize requirements into MoSCoW buckets (Must-have, Should-have, Could-have, Won't-have)",
        "Build a multi-sprint Agile release Gantt timeline for engineering handover",
        "Document trade-off rationale and stakeholder consensus notes"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: User Journey Mapping & Low-Fidelity Wireframes",
      "desc": "Map the end-to-end customer onboarding journey and sketch wireframes of key screen transitions.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Create visual user journey map tracking user emotions, actions, and friction points across steps",
        "Design low-fidelity wireframes in Figma / Whimsical covering the complete core flow",
        "Define trigger states, confirmation modals, and empty states",
        "Conduct peer review walk-through with design and engineering leads"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Go-to-Market (GTM) Strategy & Product Analytics Dashboard",
      "desc": "Define the North Star metric, pirate metrics (AARRR), and a launch communication playbook.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Establish North Star Metric and build an AARRR funnel framework (Acquisition to Referral)",
        "Design product telemetry event taxonomy (Mixpanel / PostHog tracking plan)",
        "Draft Go-to-Market (GTM) launch schedule with email announcements and release notes",
        "Submit complete PM portfolio bundle for ISO credential evaluation"
      ]
    }
  ],
  "ui-ux-design": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: User Research, Competitive Audit & Persona Mapping",
      "desc": "Conduct heuristic evaluations of existing products and document target user pain points.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Figma research board with competitive screenshots and persona cards.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Perform Jakob Nielsen 10 Heuristics evaluation on competing digital products",
        "Synthesize user interview quotes into empathy maps (Says, Thinks, Does, Feels)",
        "Create 2 detailed user personas with primary workflow objectives",
        "Document design opportunities and problem statements"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Information Architecture & Low-Fidelity Wireframes",
      "desc": "Structure product sitemaps, task flow diagrams, and low-fidelity grayscale wireframes.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Map hierarchical application sitemap and core navigation structures",
        "Design user task flow diagrams showing critical user paths and decision branches",
        "Assemble low-fidelity grayscale wireframes covering mobile and desktop layouts",
        "Test low-fidelity flow with 3 target users for navigation clarity"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Scalable Design System & Tokenized Component Library",
      "desc": "Construct an accessible design system in Figma with auto-layout and design tokens.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Create color palettes with accessible WCAG AA (4.5:1) contrast ratios",
        "Define typography hierarchy, modular spacing tokens, and 8px grid system",
        "Build reusable master components (Buttons, Inputs, Cards, Navbars) with interactive states",
        "Implement Figma auto-layout 5.0 and component variant properties"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: High-Fidelity Clickable Interactive Prototype",
      "desc": "Assemble a responsive high-fidelity interactive prototype with realistic animations.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Convert wireframes into pixel-perfect high-fidelity screens applying the design system",
        "Add micro-interactions, smart animate transitions, and dynamic overlay modals",
        "Prototype realistic mobile gestures (drag, swipe, toggle, bottom sheets)",
        "Validate accessibility with screen reader simulator and contrast checkers"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Usability Testing Synthesis & Developer Handover Specs",
      "desc": "Conduct moderated usability testing, document findings, and export developer-ready specs.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Conduct usability testing with 5 participants measuring task completion rates and time-on-task",
        "Synthesize usability issues into a severity matrix (Critical, Major, Minor)",
        "Annotate design files with developer spacing specs, responsive rules, and asset exports",
        "Submit Figma link, case study walkthrough, and design portfolio for certification"
      ]
    }
  ],
  "graphics-design": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Brand Identity Design & Visual Moodboard",
      "desc": "Design brand logo marks, color psychology schemes, and typography pairing guidelines.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit vector logo assets (.svg / .ai / .eps) and brand identity sheet.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Create brand moodboard exploring visual direction, texture, and aesthetic themes",
        "Sketch 10 logo concepts and vectorize top 3 marks in vector software (Illustrator/Figma)",
        "Select primary and secondary brand color palette based on color psychology",
        "Establish font pairings (Heading + Body) with strict hierarchy rules"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Social Media Marketing Creatives & Banners",
      "desc": "Design high-converting social media creative suites across Instagram, LinkedIn, and YouTube.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Design 5 cohesive Instagram carousel slides utilizing visual hierarchy and hooks",
        "Create YouTube thumbnail and LinkedIn banner with bold focal points and clean margins",
        "Ensure text legibility on small mobile viewports with contrasting drop shadows",
        "Export assets in optimized WebP and high-res PNG formats"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Custom Vector Iconography & Storytelling Illustrations",
      "desc": "Create a 12-piece vector icon set and digital storytelling spot illustrations.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Design a 12-icon set based on a 24px grid with consistent stroke weight and corner radii",
        "Create 2 custom spot illustrations depicting teamwork and technology",
        "Export SVG files with clean paths and minimized XML metadata",
        "Document icon usage guidelines in a visual style guide"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Print & Marketing Collateral (CMYK Standards)",
      "desc": "Design business stationery, marketing brochures, and event roll-up banners with print bleeds.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Design double-sided corporate business card with 3mm bleed and safe margins",
        "Design trifold promotional brochure formatted for standard A4 CMYK print",
        "Ensure vector resolution at 300 DPI with embedded fonts or converted outlines",
        "Generate print-ready PDF/X-1a files with crop marks"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Comprehensive Design Portfolio & Brand Book Presentation",
      "desc": "Assemble high-resolution 3D mockups into a Behance-ready brand identity presentation.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Apply designs to photorealistic 3D product and stationery mockups",
        "Compile a comprehensive 15-page Brand Guidelines Book (Logo rules, clear space, color codes)",
        "Publish polished case study on Behance / Dribbble / PDF portfolio",
        "Submit portfolio link and high-res export files for certification evaluation"
      ]
    }
  ],
  "human-resources": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Technical Job Description Writing & Talent Sourcing Strategy",
      "desc": "Draft role specifications and create multi-channel Boolean search strings on LinkedIn.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit Job Descriptions and Boolean sourcing strategy document.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Write 2 high-converting job descriptions for technical and creative roles with clear requirements",
        "Craft Boolean search strings (AND, OR, NOT, site:) for LinkedIn and GitHub talent mining",
        "Design personalized candidate outreach email templates achieving high response rates",
        "Map competitive salary benchmarks using industry compensation databases"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Candidate Screening & Structured Interview Rubric",
      "desc": "Build competency-based interview questions and scoring matrices to eliminate evaluation bias.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Design an initial 15-minute phone screening questionnaire assessing culture and basic fit",
        "Formulate behavioral interview questions using the STAR methodology (Situation, Task, Action, Result)",
        "Construct an objective 5-point evaluation rubric for technical and soft skills",
        "Conduct mock screening interview and document candidate scorecards"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Employee Onboarding & 30-60-90 Day Orientation SOP",
      "desc": "Architect an end-to-end onboarding experience for new hires from day one to 90 days.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Create pre-boarding checklist covering hardware provisioning, email access, and paperwork",
        "Design First-Week Orientation schedule including team welcomes and buddy pairing",
        "Formulate a 30-60-90 day goal-setting framework with measurable performance milestones",
        "Assemble Employee Welcome Guide covering core communication channels and tools"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Performance Management Framework & HR Policies Formulation",
      "desc": "Develop quarterly OKR templates, POSH guidelines, and remote-work workplace policies.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Draft quarterly Objectives and Key Results (OKR) review templates for individual contributors",
        "Author formal workplace policy documentation (Remote Work, Leave, Code of Conduct, POSH)",
        "Design 360-degree peer feedback questionnaires and performance calibration guidelines",
        "Document step-by-step grievance escalation matrix"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: HR Analytics Dashboard & Talent Retention Strategy",
      "desc": "Analyze recruitment and attrition metrics to recommend actionable employee retention strategies.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Build spreadsheet/dashboard tracking Time-to-Hire, Cost-per-Hire, Offer Acceptance Rate, and eNPS",
        "Analyze employee turnover trends identifying top departure reasons",
        "Draft a proactive Employee Retention & Recognition proposal to reduce attrition by 15%",
        "Submit complete HR documentation bundle and executive presentation for certification"
      ]
    }
  ],
  "digital-marketing": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Comprehensive SEO Audit & High-Intent Keyword Matrix",
      "desc": "Perform on-page and technical SEO audits and curate keyword targeting spreadsheets.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit SEO audit spreadsheet with actionable remediation recommendations.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Crawl target website using Screaming Frog / Lighthouse to identify broken links and missing meta tags",
        "Conduct keyword research identifying 30 high-intent, low-difficulty transactional keywords",
        "Audit site architecture, XML sitemaps, robots.txt, and URL slug structures",
        "Document on-page title and meta description recommendations for top 5 key landing pages"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Content Marketing Funnel & 30-Day Editorial Calendar",
      "desc": "Design full-funnel content strategies across Top, Middle, and Bottom of Funnel (TOFU/MOFU/BOFU).",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Map content topics across TOFU (educational blogs), MOFU (comparison guides), and BOFU (case studies)",
        "Build 30-day editorial calendar specifying platforms, publish dates, captions, and CTAs",
        "Write 2 high-converting social media posts designed for organic engagement and click-throughs",
        "Establish content distribution workflow across LinkedIn, Twitter/X, and Quora"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Paid Advertising Strategy (Meta Ads & Google Search Ads)",
      "desc": "Structure high-ROI paid ad campaigns with audience targeting, ad copy, and budgeting.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Set up Google Search Ad campaign plan with negative keywords and exact-match ad groups",
        "Design Meta (Facebook/Instagram) audience targeting matrix with custom lookalike audiences",
        "Write 3 variations of ad copy using PAS (Problem-Agitate-Solution) and emotional triggers",
        "Model a ₹25,000 monthly ad spend budget forecasting CPC, CTR, CPA, and projected ROAS"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Email Marketing Automation & Lead Nurturing Sequence",
      "desc": "Build automated email drip sequences that convert new leads into paying customers.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "8–10 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Draft a 5-part email welcome and nurturing sequence with compelling subject lines",
        "Set up behavioral automation triggers (lead magnet download, abandoned cart, demo request)",
        "Conduct A/B test planning across subject line variants and button CTAs",
        "Ensure email deliverability best practices (SPF, DKIM, DMARC compliance, unsubscribe links)"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Google Analytics 4 (GA4) Tracking & Growth Campaign ROI Report",
      "desc": "Configure conversion event measurement in GA4 and publish a full-funnel campaign performance report.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Configure custom conversion events in Google Analytics 4 via Google Tag Manager",
        "Build a multi-channel attribution model tracking user conversions across search, social, and direct",
        "Compile a comprehensive marketing performance deck calculating CAC, ROAS, and LTV",
        "Submit campaign portfolio and strategic optimization roadmap for certification"
      ]
    }
  ],
  "content-writing": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: Research-Backed 1,500+ Word In-Depth SEO Blog Article",
      "desc": "Write an authoritative, high-ranking SEO blog post with original research and clear structure.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit article Google Doc with target keyword density and readability score.",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Conduct competitive content research and identify content gaps in top 3 ranking Google results",
        "Write 1,500+ word article with logical H2/H3 hierarchy, bulleted takeaways, and statistics",
        "Integrate primary and secondary keywords naturally (1-2% density) without keyword stuffing",
        "Optimize readability using Hemingway Editor achieving Grade 8-9 clarity score"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: High-Converting Landing Page Copywriting (AIDA / PAS)",
      "desc": "Write persuasive, conversion-focused copy for a modern SaaS or tech services landing page.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Craft 5 compelling hero section headlines and subheadings using the AIDA framework",
        "Write feature-to-benefit transformation copy emphasizing customer outcomes over technical specs",
        "Author customer social proof case snippets and objection-busting FAQ answers",
        "Design action-oriented Call to Action (CTA) buttons with high perceived value"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Technical Case Study & Product Documentation Guide",
      "desc": "Document a complex technical project into a digestible customer success story and user guide.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Structure a Problem-Solution-Outcome customer case study highlighting measurable percentages",
        "Interview technical stakeholders and translate engineering jargon into business value",
        "Write step-by-step product walkthrough documentation with clear annotations",
        "Produce executive summary and key takeaway callout boxes"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Thought Leadership Content & Viral Social Media Threads",
      "desc": "Ghostwrite high-impact LinkedIn thought leadership posts and educational Twitter/X threads.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "8–10 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Write 3 high-engagement LinkedIn posts utilizing pattern interrupts and storytelling hooks",
        "Draft a 7-tweet educational thread breaking down an emerging industry trend",
        "Format copy with whitespace, formatting rhythm, and clear mobile readability",
        "Incorporate discussion prompts encouraging genuine audience commentary"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: Brand Voice Style Guide & Multi-Format Writing Portfolio",
      "desc": "Publish a comprehensive editorial tone-of-voice guide and showcase a bylined writing portfolio.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "10–12 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Author a 10-page Brand Editorial Style Guide (Tone, Voice, Grammar rules, Do & Don'ts)",
        "Compile all written samples into a public digital writing portfolio (Notion / Medium / Substack)",
        "Write a reflective meta-essay analyzing copywriting principles applied across tasks",
        "Submit portfolio link and documentation for ISO certificate review"
      ]
    }
  ],
  "cloud-devops": [
    {
      "id": "TASK-1",
      "name": "Milestone 1: High-Availability Edge Routing & Serverless Deployment",
      "desc": "Deploy serverless edge workers, configure DNS records, and enforce strict security headers.",
      "status": "in-progress",
      "grade": "Under Review",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Submit live edge URL and security header test report (securityheaders.com).",
      "time": "6–8 hrs",
      "difficulty": "Beginner-Friendly",
      "steps": [
        "Deploy serverless functions on Cloudflare Pages/Workers with edge caching",
        "Configure custom domain DNS (A, CNAME, TXT) and strict SSL/TLS encryption",
        "Implement HTTP security response headers (HSTS, CSP, X-Frame-Options)",
        "Verify 100% global uptime using multi-region synthetic pings"
      ]
    },
    {
      "id": "TASK-2",
      "name": "Milestone 2: Automated GitHub Actions CI/CD Pipeline",
      "desc": "Automate code testing, linting, and zero-downtime production deployment on Git push.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 1.",
      "time": "8–10 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Write GitHub Actions workflow file (.github/workflows/deploy.yml)",
        "Configure automated test runner and linter checks on pull requests",
        "Manage production API keys and credentials using encrypted GitHub Secrets",
        "Deploy automatically to staging and production environments on merge"
      ]
    },
    {
      "id": "TASK-3",
      "name": "Milestone 3: Docker Containerization & Microservice Orchestration",
      "desc": "Containerize multi-service applications using multi-stage Docker builds and Docker Compose.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 2.",
      "time": "10–12 hrs",
      "difficulty": "Intermediate",
      "steps": [
        "Write production Dockerfile utilizing multi-stage builds to minimize image size (< 150MB)",
        "Configure non-root container user execution for container security compliance",
        "Orchestrate database, backend API, and reverse proxy using Docker Compose",
        "Test container restart policies and volume persistence across reboots"
      ]
    },
    {
      "id": "TASK-4",
      "name": "Milestone 4: Infrastructure as Code & Serverless Database Architecture",
      "desc": "Manage serverless relational database instances (Cloudflare D1 / Neon) with automated migrations.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Locked. Requires Milestone 3.",
      "time": "10–12 hrs",
      "difficulty": "Advanced",
      "steps": [
        "Provision serverless relational databases using CLI / Terraform scripts",
        "Automate schema migrations in CI/CD pipeline with backward-compatible rollbacks",
        "Implement database connection pooling and query caching layers",
        "Configure automated daily backup snapshots and point-in-time recovery"
      ]
    },
    {
      "id": "TASK-5",
      "name": "Milestone 5: System Observability, Telemetry & Disaster Recovery Runbook",
      "desc": "Instrument Prometheus/Grafana or Cloudflare analytics, alerts, and incident runbooks.",
      "status": "pending",
      "grade": "Not Submitted",
      "submittedDate": "--",
      "proofUrl": "",
      "feedback": "Final milestone. Unlocks verified certificate verification upon review.",
      "time": "12–14 hrs",
      "difficulty": "Capstone",
      "steps": [
        "Set up real-time telemetry tracking CPU, memory, 4xx/5xx error rates, and p95 latency",
        "Configure automated PagerDuty / Slack webhook alerting on abnormal error spikes",
        "Draft a step-by-step Disaster Recovery Runbook detailing rollback and failover procedures",
        "Submit architecture diagrams and incident runbook for ISO certificate evaluation"
      ]
    }
  ]
};

  // State
  const STATE = {
    isAuthenticated: false,
    student: {
      id: 'ABSS-STUDENT',
      name: 'Student Intern',
      email: 'student@abssnexus.in',
      mobile: '',
      college: 'Enrolled University',
      domain: 'Web Development',
      domainSlug: 'web-development',
      joinedDate: 'Active Session',
      validThrough: 'Current Cohort',
      status: 'Active Intern',
      tokens: 0.0,
      referralCredits: 0,
      upiId: '',
      skills: 'Web Development, Programming'
    },
    activePanel: 'overview',
    taskFilter: 'all',
    taskSearch: '',
    availableDomains: AVAILABLE_DOMAINS,
    tasks: JSON.parse(JSON.stringify(DOMAIN_TASKS['web-development'])),
    submissions: [],
    chatMessages: [
      {
        sender: 'ai',
        text: 'Welcome to ABSS Nexus Academy! I am your AI Career Coach. I track your curriculum milestones, assist with code architecture, technical interview preparation, and portfolio reviews. Which milestone are you working on today?',
        time: '10:00 AM'
      }
    ],
    tickets: []
  };

  const DOMAIN_ICONS = {
    'web-development': '🌐',
    'data-science': '📊',
    'machine-learning': '🤖',
    'data-analyst': '📈',
    'cyber-security': '🔒',
    'software-development': '💻',
    'prompt-engineering': '✍️',
    'agent-engineering': '⚡',
    'ai-engineering': '🧠',
    'android-development': '📱',
    'product-management': '🎯',
    'ui-ux-design': '🎨',
    'graphics-design': '🖌️',
    'human-resources': '👥',
    'digital-marketing': '📢',
    'content-writing': '📝',
    'cloud-devops': '☁️'
  };

  function renderDomainChips() {
    const containers = document.querySelectorAll('.domain-chips-scroll');
    containers.forEach((container) => {
      const icon = DOMAIN_ICONS[STATE.student.domainSlug] || '💼';
      container.innerHTML = `<span class="enrolled-track-badge" style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:#e0f2fe; color:#0284c7; border-radius:999px; font-weight:700; font-size:0.85rem;">${icon} ${STATE.student.domain} (Enrolled Track)</span>`;
    });

    const topbarTrackBadge = document.getElementById('topbar-track-badge');
    if (topbarTrackBadge) {
      topbarTrackBadge.textContent = STATE.student.domain;
    }

    const topbarSelect = document.getElementById('topbar-track-select');
    if (topbarSelect) {
      if (topbarSelect.options.length <= 1) {
        topbarSelect.innerHTML = AVAILABLE_DOMAINS.map((d) => {
          const isSelected = (STATE.student.domainSlug === d.slug) ? 'selected' : '';
          return `<option value="${d.slug}" ${isSelected}>${d.name}</option>`;
        }).join('');
      } else {
        topbarSelect.value = STATE.student.domainSlug;
      }
    }
  }

  function switchDomain(domainSlugOrName, suppressToast = false) {
    if (!domainSlugOrName) return;
    const clean = String(domainSlugOrName).trim().toLowerCase();
    const matched = AVAILABLE_DOMAINS.find(
      (d) => d.slug.toLowerCase() === clean ||
             d.name.toLowerCase() === clean ||
             d.id.toLowerCase() === clean ||
             clean.includes(d.slug.toLowerCase()) ||
             clean.includes(d.name.toLowerCase())
    ) || AVAILABLE_DOMAINS[0];

    STATE.student.domain = matched.name;
    STATE.student.domainSlug = matched.slug;
    STATE.student.skills = matched.name + ', Technical Deliverables, ISO Credential Standards';

    const templateTasks = DOMAIN_TASKS[matched.slug] || DOMAIN_TASKS['web-development'];

    try {
      const savedTasks = localStorage.getItem('abss_tasks_' + matched.slug);
      if (savedTasks) {
        STATE.tasks = JSON.parse(savedTasks);
      } else {
        STATE.tasks = JSON.parse(JSON.stringify(templateTasks));
      }
    } catch (e) {
      STATE.tasks = JSON.parse(JSON.stringify(templateTasks));
    }

    try {
      const savedSubs = localStorage.getItem('abss_subs_' + matched.slug);
      if (savedSubs) {
        STATE.submissions = JSON.parse(savedSubs);
      } else {
        STATE.submissions = [];
      }
    } catch (e) {
      STATE.submissions = [];
    }

    try {
      localStorage.setItem('abss_active_domain', matched.slug);
    } catch (e) {}

    renderStudentState();
    renderTasks();
    renderSubmissions();
    renderDomainChips();

    if (!suppressToast && typeof showToast === 'function') {
      showToast(`Switched workspace to ${matched.name} (5 milestones loaded)`);
    }
  }


  // DOM Init
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupEventListeners();
    await checkSession();
    renderDomainChips();
    renderStudentState();
    renderTasks();
    renderSubmissions();
    renderChatMessages();
    renderTickets();
    setupModals();
    handleUrlPanel();
    hideLoading();
  }

  function hideLoading() {
    const loader = document.getElementById('dashboard-loading');
    if (loader) {
      loader.setAttribute('hidden', 'true');
    }
  }

  // Session & Data Sync (Strictly Locked to Enrolled Track)
  async function checkSession() {
    let enrolledTrack = null;

    try {
      const res = await fetch('/api/internships/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data && (data.student || data.user)) {
          const s = data.student || data.user;
          STATE.isAuthenticated = true;
          STATE.student.name = s.name || s.fullName || STATE.student.name;
          STATE.student.email = s.email || STATE.student.email;
          STATE.student.id = 'ABSS-' + (s.id || '2026-WD-8421').slice(-8).toUpperCase();
          if (s.track || s.domain || s.programSlug || s.enrolledTrack) {
            enrolledTrack = s.track || s.domain || s.programSlug || s.enrolledTrack;
          }
        }
      }
    } catch (e) {
      console.log('Running in client state mode.');
    }

    // Try fetching overview from server to lock to student's applied application
    try {
      const overviewRes = await fetch('/api/internships/dashboard/overview');
      if (overviewRes.ok) {
        const overviewData = await overviewRes.json();
        if (overviewData && overviewData.applications && overviewData.applications.length > 0) {
          const latest = overviewData.applications[0];
          if (latest.programSlug || latest.track || latest.programTitle) {
            enrolledTrack = latest.programSlug || latest.track || latest.programTitle;
          }
        }
      }
    } catch (e) {}

    // Check stored user track or query parameter if not yet determined
    if (!enrolledTrack) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        enrolledTrack = urlParams.get('track') || urlParams.get('domain') || localStorage.getItem('abss_user_track') || localStorage.getItem('abss_active_domain');
      } catch (e) {}
    }

    if (enrolledTrack) {
      switchDomain(enrolledTrack, true);
    }
  }

  function renderStudentState() {
    // Topbar & Sidebar
    const initials = getInitials(STATE.student.name);
    setText('sidebar-name', STATE.student.name);
    setText('sidebar-domain', STATE.student.domain);
    setText('sidebar-avatar', initials);
    setText('topbar-avatar', initials);
    setText('current-workspace-name', STATE.student.domain);
    setText('sidebar-id', STATE.student.id);
    setText('roadmap-domain-name', `${STATE.student.domain} Sprint Track`);

    const coachTrackEl = document.getElementById('coach-tailored-track');
    if (coachTrackEl) {
      coachTrackEl.innerHTML = `● Online &bull; Tailored to ${STATE.student.domain}`;
    }

    const topbarTrackBadge = document.getElementById('topbar-track-badge');
    if (topbarTrackBadge) {
      topbarTrackBadge.textContent = STATE.student.domain;
    }

    document.querySelectorAll('.enrolled-track-display-name').forEach((el) => {
      el.textContent = STATE.student.domain;
    });

    const topbarTrackSelect = document.getElementById('topbar-track-select');
    if (topbarTrackSelect && topbarTrackSelect.value !== STATE.student.domainSlug) {
      topbarTrackSelect.value = STATE.student.domainSlug;
    }

    document.querySelectorAll('.domain-chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.domainSlug === STATE.student.domainSlug);
    });

    // Tokens & Credits
    setText('top-token-balance', STATE.student.tokens.toFixed(1));
    setText('wallet-total', STATE.student.tokens.toFixed(1));
    setText('wallet-free', '2.0');
    setText('wallet-purchased', (STATE.student.tokens - 2.0 > 0 ? (STATE.student.tokens - 2.0).toFixed(1) : '0.0'));
    setText('referral-available-credits', '₹' + STATE.student.referralCredits);
    setText('referral-total-credits', '₹' + STATE.student.referralCredits);
    setText('overview-referral-earned', STATE.student.referralCredits);

    // Digital ID
    setText('id-avatar', initials);
    setText('id-name', STATE.student.name);
    setText('id-domain', STATE.student.domain);
    setText('id-number', STATE.student.id);
    setText('id-joined', STATE.student.joinedDate);
    setText('id-status', STATE.student.status);
    setText('id-valid-through', STATE.student.validThrough);

    // Profile Settings Form
    setValue('settings-name-input', STATE.student.name);
    setText('settings-email', STATE.student.email);
    setText('settings-mobile', STATE.student.mobile);
    setValue('settings-college', STATE.student.college);
    setValue('settings-skills', STATE.student.skills);
    setValue('career-skills', STATE.student.skills);
    setValue('upi-id', STATE.student.upiId);

    // Generate dynamic QR Code for ID card
    renderQrCode();

    // Stats calculations
    const approved = STATE.tasks.filter((t) => t.status === 'approved').length;
    const underReview = STATE.tasks.filter((t) => t.status === 'in-progress').length;
    const remaining = STATE.tasks.length - approved;
    const pct = Math.round((approved / STATE.tasks.length) * 100);

    setText('stat-approved', approved);
    setText('stat-approved-detail', `of ${STATE.tasks.length} milestones`);
    setText('stat-review', underReview);
    setText('stat-remaining', remaining);
    setText('stat-end-date', STATE.student.validThrough);
    setText('roadmap-progress', pct + '%');

    // Populate Task Select Dropdown in Submission form
    const taskSelect = document.getElementById('submission-task');
    if (taskSelect) {
      taskSelect.innerHTML = STATE.tasks
        .map((t) => `<option value="${t.id}">${t.name} (${t.status.toUpperCase()})</option>`)
        .join('');
    }

    // Set referral link
    const refLink = `${window.location.origin}/internships/register?ref=${STATE.student.id}`;
    setText('overview-referral-link', refLink);
    setValue('referral-link', refLink);
  }

  function renderQrCode() {
    const qrContainer = document.getElementById('digital-id-qr');
    if (!qrContainer) return;
    const verifyUrl = `${window.location.origin}/verify-certificate?id=${STATE.student.id}`;
    // Generate clean SVG QR-style data placeholder or canvas
    qrContainer.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%" shape-rendering="crispEdges">
        <rect width="100" height="100" fill="#ffffff" />
        <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M20,20 h10 v10 h-10 z" fill="#061129" />
        <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M70,20 h10 v10 h-10 z" fill="#061129" />
        <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M20,70 h10 v10 h-10 z" fill="#061129" />
        <rect x="50" y="20" width="5" height="10" fill="#061129" />
        <rect x="65" y="55" width="20" height="8" fill="#061129" />
        <rect x="55" y="70" width="10" height="15" fill="#061129" />
        <rect x="75" y="75" width="15" height="15" fill="#061129" />
      </svg>
    `;
  }

  // Navigation Panel Switching
  function switchPanel(panelId) {
    if (!panelId) return;
    STATE.activePanel = panelId;

    // Update Sidebar & Bottom Nav active states
    document.querySelectorAll('[data-panel-target]').forEach((btn) => {
      const match = btn.dataset.panelTarget === panelId;
      btn.classList.toggle('is-active', match);
      if (match) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });

    // Update Views
    document.querySelectorAll('.portal-view').forEach((view) => {
      view.classList.remove('is-active');
    });

    const targetView = document.getElementById(`panel-${panelId}`);
    if (targetView) {
      targetView.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Topbar page title
    const titles = {
      overview: 'Student Workspace Overview',
      roadmap: 'Curriculum & Task Roadmap',
      submit: 'Submit Project Deliverable',
      'id-card': 'Digital Student ID',
      certificate: 'ISO Certificate & Evaluation',
      referrals: 'Refer & Earn Rewards',
      career: 'AI Career Coach',
      'career-plan': '30-Day Career Action Plan',
      resume: 'Interactive Resume Builder',
      interview: 'Mock Technical Interview',
      opportunities: 'Matched Remote Opportunities',
      wallet: 'Career AI Tokens',
      support: 'Mentor Support Desk',
      settings: 'Student Profile & Settings'
    };
    setText('page-title', titles[panelId] || 'Student Workspace');

    // Update history URL quietly
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('panel', panelId);
    window.history.replaceState({}, '', newUrl);
  }

  function handleUrlPanel() {
    const params = new URLSearchParams(window.location.search);
    const panel = params.get('panel');
    if (panel) {
      switchPanel(panel);
    }
  }

  // Tasks List Rendering
  function renderTasks() {
    const list = document.getElementById('task-list');
    if (!list) return;

    let filtered = STATE.tasks;
    if (STATE.taskFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === STATE.taskFilter);
    }
    if (STATE.taskSearch) {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(STATE.taskSearch) ||
        t.desc.toLowerCase().includes(STATE.taskSearch)
      );
    }

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--portal-muted);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h3>No milestones found matching criteria</h3>
          <p>Try switching filters or clearing your search phrase.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered
      .map((task) => {
        const badgeClass =
          task.status === 'approved'
            ? 'state-badge-success'
            : task.status === 'in-progress'
            ? 'state-badge-active'
            : 'state-badge-neutral';
        const badgeText =
          task.status === 'approved'
            ? 'Approved ✓'
            : task.status === 'in-progress'
            ? 'In Progress ⏳'
            : 'Pending 🔒';

        const actionBtn =
          task.status === 'approved'
            ? `<span style="color: var(--portal-teal); font-weight: 700; font-size: 13px;">✓ Approved (${task.grade})</span>`
            : task.status === 'in-progress'
            ? `<button class="portal-button portal-button-secondary" data-submit-task="${task.id}" type="button">Resubmit Proof</button>`
            : `<button class="portal-button portal-button-primary" data-submit-task="${task.id}" type="button">Start &amp; Submit</button>`;

        return `
          <article class="task-card">
            <div class="task-card-header">
              <div class="task-card-title-group">
                <span class="portal-eyebrow">${task.id} &bull; ${task.difficulty} &bull; Est. ${task.time}</span>
                <h3>${task.name}</h3>
              </div>
              <span class="state-badge ${badgeClass}">${badgeText}</span>
            </div>
            <p class="task-card-desc">${task.desc}</p>
            <ul class="task-steps-list">
              ${task.steps
                .map(
                  (step) => `
                <li>
                  <span class="task-step-check ${task.status === 'approved' ? 'is-completed' : ''}">${task.status === 'approved' ? '✓' : '•'}</span>
                  <span>${step}</span>
                </li>
              `
                )
                .join('')}
            </ul>
            <div class="task-card-footer">
              <div>
                <strong>Mentor Feedback: </strong>
                <span>${task.feedback}</span>
              </div>
              <div>${actionBtn}</div>
            </div>
          </article>
        `;
      })
      .join('');

    // Bind task card submit buttons
    list.querySelectorAll('[data-submit-task]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const taskId = btn.dataset.submitTask;
        const select = document.getElementById('submission-task');
        if (select) select.value = taskId;
        switchPanel('submit');
      });
    });
  }

  // Submissions Rendering
  function renderSubmissions() {
    const tbody = document.getElementById('submission-history');
    if (!tbody) return;

    if (STATE.submissions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--portal-muted); padding: 24px;">No submissions yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = STATE.submissions
      .map((s) => {
        const isApproved = s.status === 'Approved';
        const badge = isApproved ? 'state-badge-success' : 'state-badge-active';
        return `
          <tr>
            <td><strong>${s.task}</strong></td>
            <td><span class="state-badge ${badge}">${s.status}</span></td>
            <td style="color: var(--portal-muted); max-width: 300px;">${s.feedback}</td>
            <td style="font-family: var(--font-mono); font-size: 12px;">${s.date}</td>
            <td><a href="${s.url}" target="_blank" rel="noopener noreferrer" style="color: var(--portal-cyan); text-decoration: underline; font-weight: 600;">View Proof &rarr;</a></td>
          </tr>
        `;
      })
      .join('');
  }

  // Chat Messages Rendering
  function renderChatMessages() {
    const container = document.getElementById('career-coach-messages');
    if (!container) return;

    container.innerHTML = STATE.chatMessages
      .map(
        (m) => `
        <div class="coach-msg coach-msg-${m.sender}">
          <div class="coach-msg-bubble">
            ${m.text}
            <div style="font-size: 10px; opacity: 0.6; margin-top: 6px; text-align: right;">${m.time}</div>
          </div>
        </div>
      `
      )
      .join('');

    container.scrollTop = container.scrollHeight;
  }

  // Tickets Rendering
  function renderTickets() {
    const list = document.getElementById('ticket-list');
    if (!list) return;

    list.innerHTML = STATE.tickets
      .map(
        (t) => `
        <div style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--portal-line-subtle); border-radius: 12px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="portal-eyebrow">${t.id} &bull; ${t.date}</span>
            <span class="state-badge state-badge-success">${t.status}</span>
          </div>
          <h4 style="margin: 0 0 10px; color: #fff; font-size: 15px;">${t.subject}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            ${t.messages
              .map(
                (m) => `
              <div style="padding: 8px 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <strong style="color: var(--portal-cyan);">${m.sender}: </strong>
                <span style="color: var(--portal-muted);">${m.text}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // Event Listeners
  function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('[data-panel-target]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchPanel(btn.dataset.panelTarget);
      });
    });

    // Domain Track is strictly locked to student's enrolled application
    // Arbitrary track switching is disabled as per institutional academic policy

    // Task Filter Buttons
    document.querySelectorAll('[data-task-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-task-filter]').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        STATE.taskFilter = btn.dataset.taskFilter;
        renderTasks();
      });
    });

    // Task Search
    const searchInput = document.getElementById('task-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        STATE.taskSearch = e.target.value.toLowerCase().trim();
        renderTasks();
      });
    }

    // Refresh Dashboard
    const refreshBtn = document.getElementById('refresh-dashboard');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        showToast('Workspace telemetry refreshed');
        renderStudentState();
        renderTasks();
      });
    }

    // Logout
    const logoutBtn = document.getElementById('db-btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await fetch('/api/internships/auth/logout', { method: 'POST' });
        } catch (e) {}
        window.location.href = '/internships/login';
      });
    }

    // Submission Form
    const subForm = document.getElementById('submission-form');
    if (subForm) {
      subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskId = getValue('submission-task');
        const proofUrl = getValue('submission-proof');
        const msgEl = document.getElementById('submission-form-message');

        // 1. Basic URL format check
        if (!proofUrl || (!proofUrl.startsWith('http://') && !proofUrl.startsWith('https://'))) {
          if (msgEl) {
            msgEl.textContent = 'Please enter a valid HTTP/HTTPS project URL.';
            msgEl.style.color = '#ef4444';
          }
          showToast('Invalid URL format');
          return;
        }

        // 2. Reject generic root/homepage URLs
        const cleanUrl = proofUrl.trim().toLowerCase();
        const genericRoots = [
          'https://google.com', 'http://google.com', 'https://www.google.com',
          'https://github.com', 'http://github.com', 'https://www.github.com',
          'https://gitlab.com', 'https://www.gitlab.com',
          'https://youtube.com', 'https://www.youtube.com',
          'https://facebook.com', 'https://www.facebook.com',
          'https://instagram.com', 'https://www.instagram.com',
          'https://linkedin.com', 'https://www.linkedin.com',
          'https://figma.com', 'https://www.figma.com',
          'https://twitter.com', 'https://x.com'
        ];
        const trimmed = cleanUrl.replace(/\/+$/, '');
        if (genericRoots.includes(trimmed)) {
          const errMsg = 'Generic URL Rejected: Please provide a link to your specific repository, project branch, or live deployment — not a generic homepage.';
          if (msgEl) {
            msgEl.textContent = errMsg;
            msgEl.style.color = '#ef4444';
          }
          showToast('Generic homepage link rejected. Provide specific project link.');
          return;
        }

        // 3. Reject duplicate links across milestones in this track
        const isDuplicate = STATE.tasks.some(
          (t) => t.id !== taskId && t.proofUrl && t.proofUrl.trim().toLowerCase() === cleanUrl
        );
        if (isDuplicate) {
          const errMsg = 'Duplicate Link Detected: You have already submitted this URL for another milestone. Each milestone requires its specific deliverable or unique branch/PR.';
          if (msgEl) {
            msgEl.textContent = errMsg;
            msgEl.style.color = '#ef4444';
          }
          showToast('Duplicate link rejected. Each milestone requires a unique deliverable.');
          return;
        }

        const task = STATE.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = 'in-progress';
          task.proofUrl = proofUrl;
          task.submittedDate = 'Just now';
          task.feedback = 'Project deliverable received! Mentor review assigned.';
        }

        STATE.submissions.unshift({
          task: task ? task.name : 'Custom Deliverable',
          status: 'Under Review',
          feedback: 'Deliverable submitted. Evaluation will be finalized shortly.',
          date: 'Just now',
          url: proofUrl
        });

        try {
          localStorage.setItem('abss_tasks_' + STATE.student.domainSlug, JSON.stringify(STATE.tasks));
          localStorage.setItem('abss_subs_' + STATE.student.domainSlug, JSON.stringify(STATE.submissions));

          // Real-time backend sync so admin mentor queue receives the deliverable immediately
          fetch('/api/internships/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentName: STATE.student.name || 'Intern Student',
              studentEmail: STATE.student.email || localStorage.getItem('abss_user_email') || 'student@abss.io',
              trackSlug: STATE.student.domainSlug || 'web-development',
              trackName: STATE.student.domain || 'Web Development',
              taskId: taskId,
              taskName: task ? task.name : taskId,
              prUrl: proofUrl,
              demoUrl: '',
              notes: 'Submitted via student dashboard deliverable modal.'
            })
          }).catch((err) => {
            console.warn('Background submission API sync fallback:', err);
          });
        } catch (e) {}

        renderTasks();
        renderSubmissions();
        renderStudentState();
        subForm.reset();
        showToast('Milestone submitted for review!');
        if (msgEl) {
          msgEl.textContent = 'Submission recorded for mentor review!';
          msgEl.style.color = 'var(--portal-teal)';
        }
      });
    }

    // AI Career Coach Prompt Starters
    document.querySelectorAll('[data-coach-prompt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prompt = btn.dataset.coachPrompt;
        sendChatMessage(prompt);
      });
    });

    // AI Career Coach Composer Form
    const coachForm = document.getElementById('career-coach-form');
    if (coachForm) {
      coachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('career-coach-input');
        if (input && input.value.trim()) {
          sendChatMessage(input.value.trim());
          input.value = '';
        }
      });
    }

    // Career 30-Day Plan Assessment
    const planForm = document.getElementById('career-assessment-form');
    if (planForm) {
      planForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateCareerPlan();
      });
    }

    // Resume Save Draft
    const resumeForm = document.getElementById('career-profile-form');
    if (resumeForm) {
      resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Resume draft saved successfully!');
      });
    }

    // Resume Print
    const printBtn = document.getElementById('career-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Interview Practice Form
    const interviewForm = document.getElementById('interview-start-form');
    if (interviewForm) {
      interviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        startInterviewPractice();
      });
    }

    // Referrals UPI Form
    const upiForm = document.getElementById('upi-form');
    if (upiForm) {
      upiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const upi = getValue('upi-id');
        STATE.student.upiId = upi;
        showToast('UPI ID saved! Payout link activated.');
        const msg = document.getElementById('upi-message');
        if (msg) msg.textContent = 'UPI ID saved successfully!';
        const linkCard = document.getElementById('referral-link-card');
        if (linkCard) linkCard.removeAttribute('hidden');
      });
    }

    // Copy Referral Link
    const copyRefBtn = document.getElementById('copy-referral-link');
    if (copyRefBtn) {
      copyRefBtn.addEventListener('click', () => {
        const link = getValue('referral-link');
        navigator.clipboard.writeText(link).then(() => {
          showToast('Referral link copied to clipboard!');
        });
      });
    }

    const overviewCopyBtn = document.getElementById('overview-copy-referral');
    if (overviewCopyBtn) {
      overviewCopyBtn.addEventListener('click', () => {
        const link = getValue('referral-link');
        navigator.clipboard.writeText(link).then(() => {
          showToast('Referral link copied!');
        });
      });
    }

    // Support Ticket Form
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = getValue('ticket-subject');
        const message = getValue('ticket-message');
        if (!subject || !message) return;

        STATE.tickets.unshift({
          id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
          subject,
          status: 'Open',
          date: 'Just now',
          messages: [{ sender: 'Student', text: message, time: 'Just now' }]
        });

        renderTickets();
        ticketForm.reset();
        showToast('Support ticket created. A mentor will respond soon.');
      });
    }

    // Settings Profile Form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        STATE.student.name = getValue('settings-name-input') || STATE.student.name;
        STATE.student.college = getValue('settings-college') || STATE.student.college;
        STATE.student.skills = getValue('settings-skills') || STATE.student.skills;
        renderStudentState();
        showToast('Profile information saved successfully!');
      });
    }

    // State CTA buttons
    const stateAction = document.getElementById('state-action');
    if (stateAction) {
      stateAction.addEventListener('click', () => switchPanel('roadmap'));
    }

    const nextTaskAction = document.getElementById('next-task-action');
    if (nextTaskAction) {
      nextTaskAction.addEventListener('click', () => switchPanel('submit'));
    }

    // Offer Letter Download Simulation
    const dlOffer = document.getElementById('download-offer');
    if (dlOffer) {
      dlOffer.addEventListener('click', () => {
        downloadDocument('ABSS_Nexus_Offer_Letter.pdf', 'Offer Letter Generated and Downloaded!');
      });
    }

    const dlCert = document.getElementById('download-certificate');
    if (dlCert) {
      dlCert.addEventListener('click', () => {
        downloadDocument('ABSS_Nexus_ISO_Certificate.pdf', 'ISO Certificate Downloaded!');
      });
    }

    // LinkedIn Share Action
    document.querySelectorAll('[data-linkedin-share]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.linkedinShare;
        const text =
          type === 'offer'
            ? `I am thrilled to announce that I have joined ABSS Nexus Academy as a ${STATE.student.domain} Intern! Excited to build high-performance web systems and learn from industry mentors. #ABSSNexus #Engineering #Internship`
            : `Proud to receive my ISO-certified Internship Completion Credential in ${STATE.student.domain} from ABSS Nexus Academy! Check my verified portfolio credentials here: ${window.location.origin}/verify-certificate?id=${STATE.student.id} #Certified #Developer`;

        navigator.clipboard.writeText(text).then(() => {
          showToast('LinkedIn post text copied! Opening LinkedIn...');
          window.open('https://www.linkedin.com/feed/', '_blank');
        });
      });
    });
  }

  // Modals setup
  function setupModals() {
    // Workspace switcher modal with category filtering and instant search
    const wsBtn = document.getElementById('btn-open-workspace-modal');
    const wsModal = document.getElementById('workspace-switcher-modal');
    const wsClose = document.getElementById('ws-modal-close');
    const wsList = document.getElementById('workspace-modal-list');

    if (wsBtn && wsModal) {
      let modalCategoryFilter = 'all';
      let modalSearchQuery = '';

      function renderWorkspaceModalList() {
        if (!wsList) return;

        let filtered = AVAILABLE_DOMAINS;
        if (modalCategoryFilter !== 'all') {
          filtered = filtered.filter(d => d.category === modalCategoryFilter);
        }
        if (modalSearchQuery) {
          const q = modalSearchQuery.toLowerCase();
          filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
        }

        const categories = ['all', 'Engineering & Dev', 'AI & Data', 'Design & Creative', 'Business & Strategy', 'Marketing & Growth'];

        let html = `
          <div style="margin-bottom: 14px;">
            <input type="text" id="ws-filter-input" placeholder="Search 16+ tracks (e.g. Cyber Security, AI, Android, HR)..." value="${modalSearchQuery}" style="width: 100%; padding: 10px 14px; border: 1px solid var(--portal-line); border-radius: 10px; background: rgba(0,0,0,0.25); color: #fff; font-size: 13.5px; box-sizing: border-box; outline: none;" />
          </div>
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 12px; scrollbar-width: none;">
            ${categories.map(cat => `
              <button type="button" class="ws-cat-pill" data-cat="${cat}" style="padding: 5px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 600; white-space: nowrap; cursor: pointer; border: 1px solid var(--portal-line); ${modalCategoryFilter === cat ? 'background: #0066cc; color: #fff; border-color: #0066cc;' : 'background: rgba(255,255,255,0.06); color: var(--portal-muted);'}">
                ${cat === 'all' ? 'All Tracks (16+)' : cat}
              </button>
            `).join('')}
          </div>
          <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
            ${filtered.length === 0 ? '<div style="text-align: center; color: var(--portal-muted); padding: 24px;">No matching internship tracks found.</div>' : ''}
            ${filtered.map(d => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--portal-line); border-radius: 12px; cursor: pointer; transition: all 0.2s ease;" data-switch-domain="${d.slug}">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 22px;">${d.icon}</span>
                  <div>
                    <strong style="color: #fff; font-size: 13.5px; display: block;">${d.name}</strong>
                    <div style="font-size: 11.5px; color: var(--portal-muted);">${d.category} &bull; ${d.count} Milestones</div>
                  </div>
                </div>
                <span class="state-badge ${d.name === STATE.student.domain || d.slug === STATE.student.domainSlug ? 'state-badge-active' : 'state-badge-neutral'}">
                  ${d.name === STATE.student.domain || d.slug === STATE.student.domainSlug ? 'Active' : 'Switch'}
                </span>
              </div>
            `).join('')}
          </div>
        `;

        wsList.innerHTML = html;

        // Search input binding
        const searchInput = wsList.querySelector('#ws-filter-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.setSelectionRange(modalSearchQuery.length, modalSearchQuery.length);
          searchInput.addEventListener('input', (e) => {
            modalSearchQuery = e.target.value;
            renderWorkspaceModalList();
          });
        }

        // Category pill binding
        wsList.querySelectorAll('.ws-cat-pill').forEach(btn => {
          btn.addEventListener('click', () => {
            modalCategoryFilter = btn.dataset.cat;
            renderWorkspaceModalList();
          });
        });

        // Item selection binding
        wsList.querySelectorAll('[data-switch-domain]').forEach(item => {
          item.addEventListener('click', () => {
            const slug = item.dataset.switchDomain;
            switchDomain(slug);
            wsModal.setAttribute('hidden', 'true');
          });
        });
      }

      wsBtn.addEventListener('click', () => {
        renderWorkspaceModalList();
        wsModal.removeAttribute('hidden');
      });
    }

    if (wsClose && wsModal) {
      wsClose.addEventListener('click', () => wsModal.setAttribute('hidden', 'true'));
      wsModal.addEventListener('click', (e) => {
        if (e.target === wsModal) wsModal.setAttribute('hidden', 'true');
      });
    }

    // Instant certificate dialog
    const instantDialog = document.getElementById('instant-certificate-dialog');
    document.querySelectorAll('[data-open-instant-certificate]').forEach((b) => {
      b.addEventListener('click', () => {
        if (instantDialog) instantDialog.removeAttribute('hidden');
      });
    });
  }

  // AI Career Coach Interaction
  function sendChatMessage(text) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    STATE.chatMessages.push({ sender: 'user', text, time: timeNow });
    renderChatMessages();

    // Deduct simulated token cost
    if (STATE.student.tokens >= 0.2) {
      STATE.student.tokens = Math.max(0, STATE.student.tokens - 0.2);
      setText('top-token-balance', STATE.student.tokens.toFixed(1));
    }

    // Dynamic AI response simulation based on user intent
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('next') || lower.includes('focus') || lower.includes('task')) {
        aiReply = `Based on your telemetry, you have completed Milestone 1 with an A+! Your immediate next focus should be **Milestone 2: RESTful API Integration & Client State**. Make sure to write comprehensive error handling for failed network requests and test on slow 3G networks.`;
      } else if (lower.includes('skill') || lower.includes('learn')) {
        aiReply = `For ${STATE.student.domain}, the top 3 high-impact skills employers are seeking right now are: **1) TypeScript with React 19**, **2) Cloudflare Workers / Edge Serverless**, and **3) Automated Vitest / Playwright End-to-End Testing**. Mastering these will set you apart from 90% of applicants!`;
      } else if (lower.includes('resume') || lower.includes('portfolio')) {
        aiReply = `To make your resume standout to engineering leads: Quantify your results in your project bullet points. For example: *"Engineered asynchronous API caching layer, reducing page load latency by 45% and eliminating redundant network fetches."* You can preview and edit your draft right now in our **Resume Builder** tab!`;
      } else if (lower.includes('interview')) {
        aiReply = `For technical frontend/full-stack interviews, prioritize practicing: **1) JavaScript Closures & Event Loop**, **2) Optimizing Core Web Vitals (LCP, INP, CLS)**, and **3) System design for a live search autocomplete component**. Check out our **Interview Practice** tab for 5 real-world questions!`;
      } else {
        aiReply = `Great question regarding ${STATE.student.domain}! When tackling this in production, focus on modular architecture, accessible semantic UI, and clean documentation. Would you like specific code examples or a step-by-step checklist?`;
      }

      STATE.chatMessages.push({ sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      renderChatMessages();
    }, 600);
  }

  // Career 30-Day Plan Generation
  function generateCareerPlan() {
    const resultsContainer = document.getElementById('career-results');
    if (!resultsContainer) return;

    resultsContainer.removeAttribute('hidden');
    resultsContainer.innerHTML = `
      <div style="padding: 24px; background: rgba(0, 119, 255, 0.12); border: 1px solid var(--portal-line); border-radius: 16px; margin-bottom: 24px;">
        <span class="portal-eyebrow">Personalized 30-Day Action Roadmap</span>
        <h3 style="margin: 4px 0 16px; color: #fff; font-size: 20px;">Your Tailored Engineering Growth Plan</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-cyan);">Week 1: Foundations & Architecture</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Master state flow, complete Milestone 2 API integration, and audit Core Web Vitals metrics.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-teal);">Week 2: Backend & Database Schema</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Implement normalized relational D1 SQL tables, write JWT auth guard middlewares.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-purple);">Week 3: Production CI/CD & Cloud</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Scaffold GitHub Actions workflow, automate pull-request preview builds and security linting.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-amber);">Week 4: Capstone, Resume & Viva</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Finalize public portfolio URL, complete technical viva interview, claim ISO certificate.</p>
          </div>
        </div>
      </div>
    `;
    showToast('30-Day Career Plan generated!');
  }

  // Interview Practice Questions
  function startInterviewPractice() {
    const qContainer = document.getElementById('interview-questions');
    const form = document.getElementById('interview-answer-form');
    if (!qContainer || !form) return;

    const role = getValue('interview-role') || 'Full-Stack Developer';
    const questions = [
      `1. Explain how the JavaScript Event Loop handles Promises (Microtasks) versus setTimeout (Macrotasks).`,
      `2. What strategies do you use to diagnose and fix a slow Largest Contentful Paint (LCP) in modern web applications?`,
      `3. How do you prevent SQL Injection and Cross-Site Scripting (XSS) in serverless RESTful endpoints?`,
      `4. Describe your approach to managing relational state versus caching in distributed edge environments.`,
      `5. Walk me through a challenging bug you diagnosed in a web project and how you verified the fix.`
    ];

    qContainer.innerHTML = questions
      .map(
        (q, idx) => `
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 700; color: #fff; margin-bottom: 8px;">${q}</label>
          <textarea rows="3" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--portal-line); border-radius: 10px; color: #fff;" placeholder="Type your structured technical answer here..."></textarea>
        </div>
      `
      )
      .join('');

    form.removeAttribute('hidden');
    showToast(`Interview loaded for ${role}. Type your answers to receive mentor evaluation!`);
  }

  // Document download helper
  function downloadDocument(filename, msg) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('ABSS NEXUS ACADEMY OFFICIAL DOCUMENT - ' + filename));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(msg);
  }

  // Toast System
  function showToast(message) {
    let toast = document.getElementById('portal-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portal-toast';
      toast.className = 'portal-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.removeAttribute('hidden');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      toast.setAttribute('hidden', 'true');
    }, 3200);
  }

  // Utilities
  function getInitials(name) {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
})();
