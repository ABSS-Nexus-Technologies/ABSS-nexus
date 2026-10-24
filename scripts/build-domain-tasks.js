const fs = require("fs");
const path = require("path");

const DOMAIN_TASKS = {
  "web-development": [
    {
      id: "TASK-1",
      name: "Milestone 1: Responsive Semantic Interface & Design System",
      desc: "Build a responsive, mobile-first web interface using semantic HTML5, modern CSS Grid/Flexbox, and accessibility standards.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit your GitHub repository and live deployment URL.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Create semantic HTML5 layout with landmark tags (header, nav, main, section, footer)",
        "Implement responsive CSS design tokens (colors, typography, spacing) without heavy frameworks",
        "Test responsiveness across viewports (320px to 1440px) and WCAG AA contrast standards",
        "Deploy to GitHub Pages, Netlify, or Vercel and verify Core Web Vitals"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Asynchronous API Integration & Client State",
      desc: "Implement dynamic asynchronous data fetching, error boundary handling, and client-side caching.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Unlocked after completing Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Integrate async Fetch requests with loading spinners and skeleton screens",
        "Implement client-side state handling and localStorage fallback",
        "Handle HTTP error codes (400, 404, 500) gracefully with user-friendly alerts",
        "Document API contracts in repository README"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Interactive Component Architecture & Form Validation",
      desc: "Build accessible interactive modals, dropdowns, and form validation using the native Constraint Validation API.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Build accessible modal dialogs with keyboard navigation (Esc to close, tab trap)",
        "Implement real-time form validation with custom regex and instant visual feedback",
        "Add subtle CSS micro-animations with prefers-reduced-motion media query",
        "Write component documentation and usage examples"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Backend API & Serverless Function Wiring",
      desc: "Connect frontend client with serverless endpoints or Node.js backend with JSON payloads and authentication.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Build serverless functions on Cloudflare Pages or Express endpoints",
        "Implement JWT token validation and secure HTTP-only cookies",
        "Configure CORS headers and input sanitization to block XSS attacks",
        "Write integration tests validating HTTP response status codes"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Capstone Production Deployment & Lighthouse Audit",
      desc: "Final production release, Core Web Vitals audit (LCP < 2.5s, CLS < 0.1), and portfolio case study submission.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Perform Lighthouse audit ensuring 90+ scores across Performance, Accessibility, and SEO",
        "Configure production custom domain with SSL and security headers",
        "Record a 3-minute video walkthrough explaining project architecture",
        "Submit live application URL and GitHub link for ISO credential issuance"
      ]
    }
  ],

  "data-science": [
    {
      id: "TASK-1",
      name: "Milestone 1: Data Acquisition & Exploratory Data Analysis (EDA)",
      desc: "Ingest multi-source tabular datasets, handle missing values, and calculate statistical distribution metrics.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Jupyter Notebook (.ipynb) with markdown explanations and visualization charts.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Load raw CSV/JSON datasets into Pandas DataFrames and audit data types and missing values",
        "Generate descriptive statistics (mean, median, IQR, variance, skewness)",
        "Produce distribution histograms, box plots, and scatter matrices using Seaborn & Matplotlib",
        "Document 5 key analytical insights discovered from initial exploration"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Feature Engineering & Preprocessing Pipeline",
      desc: "Build an automated data cleaning and feature engineering transformation pipeline.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Implement one-hot and target encoding for high-cardinality categorical variables",
        "Apply standard/min-max feature scaling and power transformations",
        "Detect and treat multi-variate outliers using IQR and Z-score methods",
        "Assemble transformations into a reproducible Scikit-Learn Pipeline object"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Predictive Modeling & Baseline Evaluation",
      desc: "Train supervised classification and regression algorithms, establishing rigorous benchmark baselines.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Split data using stratified k-fold cross-validation to prevent data leakage",
        "Train Logistic Regression, Random Forest, and Gradient Boosting baseline models",
        "Calculate accuracy, precision, recall, F1-score, and ROC-AUC metrics",
        "Plot confusion matrix and precision-recall trade-off curves"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Hyperparameter Optimization & Model Explainability",
      desc: "Fine-tune model hyperparameters using Optuna/GridSearch and explain feature importance with SHAP.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Run Bayesian hyperparameter search using Optuna across learning rate and tree depth",
        "Compute SHAP (SHapley Additive exPlanations) summary plots and feature importance",
        "Perform residual analysis to diagnose model bias and heteroscedasticity",
        "Serialize best performing model using Joblib with schema versioning"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Interactive Streamlit Dashboard & Executive Insights Deck",
      desc: "Deploy an interactive web dashboard for non-technical stakeholders with live inference.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Develop interactive Streamlit/Gradio web application with dynamic filter sliders",
        "Allow users to upload CSVs or enter features to receive real-time predictions",
        "Deploy application to Streamlit Community Cloud or Hugging Face Spaces",
        "Draft executive summary report with business recommendations"
      ]
    }
  ],

  "machine-learning": [
    {
      id: "TASK-1",
      name: "Milestone 1: Mathematical Foundations & Supervised Algorithms",
      desc: "Implement fundamental machine learning algorithms from scratch and evaluate loss function optimization.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Python scripts with vectorized NumPy operations and gradient descent plots.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Code Linear Regression with batch gradient descent from first principles in NumPy",
        "Implement Logistic Regression with binary cross-entropy loss and sigmoid activation",
        "Compare scratch implementation convergence against Scikit-Learn benchmarks",
        "Document learning rate schedules and gradient norms"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Ensemble Learning & Gradient Boosting Machines",
      desc: "Build high-accuracy ensemble classifiers using Random Forests, XGBoost, and LightGBM.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Train and tune Random Forest and XGBoost classifiers on complex tabular datasets",
        "Address severe class imbalance using SMOTE and focal loss weights",
        "Evaluate feature interaction terms and permutation importance",
        "Benchmark inference latency across CPU and GPU threads"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Deep Neural Networks & Backpropagation",
      desc: "Construct deep multi-layer neural networks using PyTorch with regularization techniques.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Build a custom PyTorch nn.Module with AdamW optimizer and CosineAnnealingLR",
        "Implement Dropout, Batch Normalization, and early stopping callbacks",
        "Track training vs validation loss curves to identify overfitting boundaries",
        "Export trained model weights to ONNX format"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Model Evaluation, Bias & Drift Monitoring",
      desc: "Perform rigorous error analysis, subgroup parity audits, and data drift detection.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Calculate demographic parity and equalized odds metrics for fairness audits",
        "Implement Evidently AI or PSI (Population Stability Index) drift tests",
        "Generate SHAP waterfall plots for individual sample inference explanations",
        "Document model governance card following IEEE standards"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Production Inference Microservice with FastAPI & Docker",
      desc: "Package and deploy a production-ready ML model as a containerized REST API.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Develop high-throughput FastAPI inference endpoint with Pydantic payload validation",
        "Write unit tests with pytest ensuring sub-50ms inference response times",
        "Build optimized Docker image with multi-stage builds and non-root user",
        "Deploy container to cloud (Render / AWS ECS) and submit live test documentation"
      ]
    }
  ],

  "data-analyst": [
    {
      id: "TASK-1",
      name: "Milestone 1: Advanced SQL Data Extraction & Optimization",
      desc: "Query complex multi-table relational databases using CTEs, window functions, and indexing strategies.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit SQL queries and query execution plan (EXPLAIN ANALYZE) screenshots.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Write multi-table INNER, LEFT, and FULL OUTER JOINs with filtering predicates",
        "Implement Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)",
        "Construct Common Table Expressions (CTEs) for recursive and hierarchical queries",
        "Optimize query performance by inspecting execution plans and creating indexes"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Data Cleaning, Transformation & Quality Audit",
      desc: "Audit raw unstructured business data for anomalies, inconsistencies, and null distributions.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Perform automated data profiling to identify missing, duplicate, and corrupt values",
        "Normalize address, currency, and date formats into standardized ISO schemas",
        "Write automated SQL assertions and data validation checks",
        "Generate a Data Quality Scorecard for stakeholders"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Cohort Retention & Customer Lifetime Value (LTV) Modeling",
      desc: "Calculate vital business growth metrics including cohort churn, retention curves, and MRR.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Build monthly user cohort retention heatmap analyzing 12-month customer behavior",
        "Compute Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV) ratios",
        "Perform RFM (Recency, Frequency, Monetary) customer segmentation",
        "Summarize churn risk factors in a quarterly business report"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Interactive Business Intelligence Dashboard (Power BI / Tableau)",
      desc: "Build an interactive, drill-down dashboard with dynamic parameters and executive KPI cards.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Design a Star Schema data model with Fact and Dimension tables in Power BI / Tableau",
        "Write DAX measures for Year-over-Year (YoY) growth, MTD, and rolling 30-day averages",
        "Add interactive cross-filtering, slicers, and drill-through pages",
        "Publish interactive dashboard and publish accessible public link"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Executive Stakeholder Presentation & Data Storytelling",
      desc: "Present business insights and actionable strategic recommendations to executive leadership.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Assemble 10-slide executive presentation translating technical metrics into ROI recommendations",
        "Highlight 3 immediate revenue growth opportunities backed by statistical significance",
        "Record 5-minute video presentation communicating findings clearly",
        "Submit slide deck, dashboard link, and video presentation for evaluation"
      ]
    }
  ],

  "cyber-security": [
    {
      id: "TASK-1",
      name: "Milestone 1: Linux System Hardening & Network Packet Analysis",
      desc: "Configure secure firewall rules, analyze network packet captures, and audit open ports.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit packet capture (.pcap) analysis and firewall hardening audit report.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Perform network reconnaissance using Nmap service version and OS detection scripts",
        "Capture and inspect network protocols (DNS, HTTP, TLS handshake) in Wireshark",
        "Configure UFW / iptables firewall rules and disable legacy Telnet/FTP services",
        "Harden SSH daemon by disabling root login and enforcing ED25519 key authentication"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Web Application Vulnerability Assessment (OWASP Top 10)",
      desc: "Identify, reproduce, and remediate critical web vulnerabilities like SQLi, XSS, and CSRF.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Audit web targets for Cross-Site Scripting (Reflected, Stored, DOM-based XSS)",
        "Test for SQL Injection vulnerabilities using parameterized queries as mitigation",
        "Inspect cookie security flags (Secure, HttpOnly, SameSite=Strict)",
        "Implement Content Security Policy (CSP) headers to block malicious script injection"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Cryptography & Cryptographic Key Management",
      desc: "Implement modern cryptographic primitives, digital signatures, and token security.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Implement AES-256-GCM symmetric authenticated encryption for sensitive payloads",
        "Generate and verify RSA-4096 / ECC digital signatures for tamper detection",
        "Audit password hashing algorithms using Argon2id / bcrypt with high work factors",
        "Document secret management policies avoiding hardcoded credentials in Git"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Penetration Testing & Threat Modeling",
      desc: "Perform authorized penetration testing using Burp Suite and construct a STRIDE threat model.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Intercept and manipulate HTTP requests with Burp Suite / OWASP ZAP proxy",
        "Conduct broken object-level authorization (BOLA/IDOR) testing on API endpoints",
        "Build a STRIDE threat matrix mapping spoofing, tampering, and elevation of privilege risks",
        "Prioritize discovered attack vectors using CVSS 3.1 scoring formulas"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Enterprise Security Audit Report & Incident Response Plan",
      desc: "Publish an industry-standard penetration test report and incident response playbook.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Compile executive vulnerability assessment report with severity classifications",
        "Provide code-level remediation snippets for each confirmed security finding",
        "Draft a 6-step Incident Response Plan (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned)",
        "Submit final security audit deliverable for ISO certification review"
      ]
    }
  ],

  "software-development": [
    {
      id: "TASK-1",
      name: "Milestone 1: OOP Architecture, Clean Code & Unit Testing",
      desc: "Structure scalable object-oriented software following SOLID principles and automated testing.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit GitHub repo with unit test coverage report.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Implement clean domain models applying Single Responsibility and Dependency Inversion",
        "Use Factory and Repository design patterns for modular code organization",
        "Write unit tests with Jest / Mocha achieving > 85% branch coverage",
        "Configure ESLint and Prettier for automated code quality enforcement"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: RESTful API Engineering with CRUD & Strict Validations",
      desc: "Build robust RESTful backend services with input validation and centralized error handlers.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Design modular Express/Fastify route controllers with async/await patterns",
        "Enforce strict schema validation using Zod or Joi to prevent malformed requests",
        "Implement centralized error handling middleware returning standardized error schemas",
        "Generate automated Swagger / OpenAPI 3.0 API documentation"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Relational Database Schema Design & Migrations",
      desc: "Model relational database schemas with foreign key constraints, indexes, and transactions.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Design 3NF normalized schema for e-commerce or booking platform with proper foreign keys",
        "Write idempotent up/down SQL migration scripts using Prisma or Drizzle ORM",
        "Execute ACID database transactions for multi-step monetary or inventory operations",
        "Profile queries with EXPLAIN to eliminate slow sequential table scans"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Authentication, Authorization & Security Middlewares",
      desc: "Implement enterprise JWT token authentication, refresh tokens, and rate limiting.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Build dual-token auth flow (short-lived JWT access token + secure refresh token)",
        "Implement Role-Based Access Control (RBAC) middleware for Admin, Mentor, and Student roles",
        "Enforce IP rate-limiting using Redis or memory stores to prevent brute-force attacks",
        "Add Helmet security headers (HSTS, X-Frame-Options, CSP)"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Full-Stack Integration, Dockerization & CI/CD Pipeline",
      desc: "Containerize the full-stack system and deploy through automated GitHub Actions CI/CD.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Connect backend REST API with frontend client interface with full error handling",
        "Write Dockerfile and docker-compose.yml orchestrating database and API services",
        "Set up GitHub Actions workflow to run tests, linting, and automated cloud deploy",
        "Submit production URL and architecture diagram for certification evaluation"
      ]
    }
  ],

  "prompt-engineering": [
    {
      id: "TASK-1",
      name: "Milestone 1: Foundational System Prompts & Structured JSON Outputs",
      desc: "Design deterministic system prompts and enforce valid JSON schema responses from LLMs.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit prompt templates, schema definitions, and validation test suite.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Write clear system instructions establishing role, scope, constraints, and edge cases",
        "Enforce structured JSON output formatting with explicit JSON schema parameters",
        "Benchmark zero-shot vs few-shot in-context examples for error reduction",
        "Build a Python script validating LLM outputs against Pydantic models"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Advanced Reasoning Prompts (CoT, ReAct & Tree-of-Thought)",
      desc: "Implement advanced cognitive reasoning techniques to solve complex multi-step reasoning problems.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Implement Chain-of-Thought (CoT) prompting for arithmetic and logical reasoning tasks",
        "Construct ReAct (Reason + Act) prompting loops combining thought and action steps",
        "Design Tree-of-Thought prompt branches for evaluating multiple prospective solutions",
        "Measure accuracy improvements over direct prompting baselines"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Automated Prompt Evaluation & Benchmarking Suite",
      desc: "Build an automated evaluation framework to measure prompt accuracy, hallucination, and latency.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Create a benchmark dataset of 50 edge-case test prompts and ground truth targets",
        "Implement automated LLM-as-a-Judge scoring with rubrics for relevance and clarity",
        "Calculate BLEU, ROUGE, and semantic embedding similarity scores across prompt versions",
        "Generate a comparative performance scorecard tracking cost per prompt run"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: RAG Prompting & Context Window Compression",
      desc: "Optimize retrieval context insertion, avoid needle-in-a-haystack lost-in-the-middle degradation.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Structure RAG prompt headers with clear source citation markers and instructions",
        "Implement prompt compression techniques (LLMLingua) to eliminate redundant tokens",
        "Position crucial facts at the start and end of context to prevent attention loss",
        "Validate answer groundedness to eliminate hallucinated assertions"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Adversarial Robustness, Jailbreak Defense & Guardrails",
      desc: "Test LLM prompts against prompt injection attacks and build defense guardrails.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Simulate 10 distinct prompt injection techniques (ignore instructions, roleplay, hex encoding)",
        "Implement defensive delimiter boundaries (XML tags, triple quotes) and input sanitization",
        "Integrate Llama Guard or NeMo Guardrails to filter sensitive PII and policy violations",
        "Submit adversarial audit report with mitigation proof for certification review"
      ]
    }
  ],

  "agent-engineering": [
    {
      id: "TASK-1",
      name: "Milestone 1: Function Calling & Tool Augmentation Pipeline",
      desc: "Connect an LLM to external APIs and deterministic code tools using structured function calling.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Python repository demonstrating function execution and error handling.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Define tool schemas with JSON Schema descriptions for calculators, web search, and weather APIs",
        "Implement tool execution dispatcher mapping model function calls to Python functions",
        "Handle missing arguments, tool execution timeouts, and API exceptions gracefully",
        "Demonstrate end-to-end question answering using real-time tool data"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Agent Memory Systems & Conversation Persistence",
      desc: "Build short-term episodic and long-term semantic memory architectures for stateful agents.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Implement sliding window conversation buffer memory with automated summarization",
        "Build long-term vector semantic memory using Chroma / SQLite to recall user preferences",
        "Design memory retrieval filters prioritizing recency and semantic relevance",
        "Persist agent session states across multi-turn interactions"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Hierarchical Multi-Agent Team Orchestration",
      desc: "Coordinate specialized collaborative agents using CrewAI or LangGraph for complex task execution.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Define 3 specialized agent roles: Research Analyst, Technical Writer, and Quality Auditor",
        "Implement inter-agent message passing and state handoff protocols in LangGraph",
        "Build consensus checking and automated revision loops until quality thresholds are met",
        "Visualize execution graphs and dependency flows"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Human-in-the-Loop & Execution Guardrails",
      desc: "Add human approval checkpoints, recursion limits, and sandboxed code execution.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Implement human approval breakpoints before destructive actions (sending emails, DB writes)",
        "Enforce strict recursion depth limits and budget controls to prevent infinite agent loops",
        "Execute dynamic code in an isolated Docker sandbox container",
        "Log full step-by-step trace events for auditability"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Autonomous End-to-End Task Agent Deployment",
      desc: "Deploy a production-grade autonomous agent capable of solving complex multi-day workflows.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Build an autonomous market intelligence or automated bug triage agent",
        "Deploy agent backend on cloud with webhook triggers and scheduled cron runs",
        "Instrument agent with Langfuse or Arize Phoenix for real-time observability",
        "Submit video walkthrough, repository URL, and execution logs for certification"
      ]
    }
  ],

  "ai-engineering": [
    {
      id: "TASK-1",
      name: "Milestone 1: Vector Embeddings & Semantic Search Engine",
      desc: "Generate dense text embeddings and build a semantic similarity search engine with indexing.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Python code, vector database connection, and query benchmark results.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Generate text embeddings using HuggingFace / OpenAI embedding models",
        "Store and index document chunks in a vector database (Chroma, Qdrant, or Pinecone)",
        "Implement cosine similarity and Euclidean distance search queries",
        "Evaluate top-k retrieval precision on technical documentation queries"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Production Retrieval-Augmented Generation (RAG) System",
      desc: "Build an end-to-end RAG pipeline with hybrid search, re-ranking, and citation generation.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Implement recursive character text splitting with domain-aware chunk overlaps",
        "Build Hybrid Search combining BM25 keyword matching with dense vector retrieval",
        "Add a Cross-Encoder Re-ranker (Cohere / BGE-Reranker) to refine top results",
        "Generate answers with strict markdown citation links to original source documents"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: AI Observability, Tracing & Latency Optimization",
      desc: "Instrument AI pipelines with real-time tracing, token cost accounting, and streaming responses.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Integrate OpenTelemetry or Langfuse tracing across every LLM and tool invocation",
        "Implement Server-Sent Events (SSE) streaming for real-time token delivery",
        "Set up semantic response caching with Redis to reduce duplicate API costs by > 40%",
        "Measure and optimize Time-to-First-Token (TTFT) and total generation latency"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Parameter-Efficient Fine-Tuning (PEFT / LoRA)",
      desc: "Fine-tune an open-source LLM (Llama 3 / Mistral) on a domain dataset using QLoRA.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "12–14 hrs",
      difficulty: "Advanced",
      steps: [
        "Curate, clean, and validate 500+ instruction-response training pairs in JSONL format",
        "Configure 4-bit quantization and LoRA rank/alpha adapter parameters using HuggingFace PEFT",
        "Train model on Google Colab / GPU instance and track loss curves on Weights & Biases",
        "Evaluate fine-tuned adapter against base model on out-of-distribution test prompts"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Production AI Microservice Architecture & Release",
      desc: "Deploy a scalable, containerized AI service with rate limiting, fallbacks, and SLA monitoring.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Build production FastAPI microservice supporting streaming inference and health checks",
        "Implement multi-provider fallback logic (e.g. OpenAI -> Anthropic -> OpenRouter)",
        "Deploy service using Docker on AWS / GCP / Cloudflare with autoscaling policies",
        "Submit architecture documentation and live API test endpoint for certification"
      ]
    }
  ],

  "android-development": [
    {
      id: "TASK-1",
      name: "Milestone 1: Modern Android UI with Jetpack Compose & Material 3",
      desc: "Build responsive, declarative Android user interfaces with Jetpack Compose and Material Design 3.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Android Studio project repository and running app screen recordings.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Build composable layouts using Column, Row, Box, and LazyColumn with scroll state",
        "Implement Material Design 3 theming (dynamic color schemes, dark mode, typography)",
        "Manage UI state with remember, mutableStateOf, and state hoisting patterns",
        "Ensure edge-to-edge layout display across various mobile screen densities"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Multi-Screen Navigation & Architecture Components (MVVM)",
      desc: "Implement Jetpack Navigation Compose and structure app architecture using MVVM.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Configure NavHostController with type-safe route arguments and transitions",
        "Implement ViewModel lifecycle architecture retaining state across screen rotations",
        "Expose reactive UI state using Kotlin StateFlow and SharedFlow",
        "Add Bottom Navigation bar and top app bar with contextual action icons"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Asynchronous REST Networking with Retrofit & Coroutines",
      desc: "Connect mobile client to remote REST APIs using Retrofit, Moshi/Gson, and Kotlin Coroutines.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Build Retrofit HTTP client with OkHttp logging interceptors and authorization headers",
        "Consume asynchronous API endpoints safely inside CoroutineScope / viewModelScope",
        "Display shimmer loading effects and handle network disconnection with retry buttons",
        "Implement image caching and asynchronous loading using Coil library"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Offline-First Local Persistence with Room Database",
      desc: "Implement local database caching using Room ORM with repository pattern architecture.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Create Room Entities, DAOs, and AppDatabase with primary keys and indexes",
        "Implement a Single Source of Truth Repository pattern synchronizing remote and local data",
        "Write unit tests verifying database CRUD operations with in-memory Room instances",
        "Support automated schema migrations without user data loss"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: App Optimization, Unit Testing & Signed APK Release",
      desc: "Optimize APK size with Proguard/R8 and export signed production Android App Bundle (AAB/APK).",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Write ViewModel and Repository unit tests with MockK and Turbine library",
        "Enable code shrinking and obfuscation with Proguard / R8 rules",
        "Generate cryptographically signed Release APK / Android App Bundle (AAB)",
        "Submit signed APK and demonstration video for ISO certificate evaluation"
      ]
    }
  ],

  "product-management": [
    {
      id: "TASK-1",
      name: "Milestone 1: Market Research, Problem Statement & User Personas",
      desc: "Conduct competitive teardowns, quantitative user interviews, and formalize user persona boards.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit comprehensive user research report in PDF or Notion doc format.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Perform competitive teardown of top 3 industry alternatives identifying key gaps",
        "Formulate validated problem statements using jobs-to-be-done (JTBD) framework",
        "Construct 2 detailed user personas outlining demographics, goals, pain points, and workflows",
        "Summarize market opportunity and addressable market size (TAM/SAM/SOM)"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Product Requirement Document (PRD) Drafting",
      desc: "Author an industry-standard Product Requirement Document (PRD) with engineering specifications.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Structure PRD defining executive summary, strategic objectives, and target metrics",
        "Detail functional feature specifications with explicit user story acceptance criteria",
        "Outline non-functional requirements (security, performance latency, internationalization)",
        "Document out-of-scope items and edge-case error scenarios"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Feature Backlog Prioritization (RICE & MoSCoW)",
      desc: "Apply quantitative prioritization frameworks to build an actionable MVP release roadmap.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Score a 20-feature backlog using the RICE framework (Reach x Impact x Confidence / Effort)",
        "Categorize requirements into MoSCoW buckets (Must-have, Should-have, Could-have, Won't-have)",
        "Build a multi-sprint Agile release Gantt timeline for engineering handover",
        "Document trade-off rationale and stakeholder consensus notes"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: User Journey Mapping & Low-Fidelity Wireframes",
      desc: "Map the end-to-end customer onboarding journey and sketch wireframes of key screen transitions.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Create visual user journey map tracking user emotions, actions, and friction points across steps",
        "Design low-fidelity wireframes in Figma / Whimsical covering the complete core flow",
        "Define trigger states, confirmation modals, and empty states",
        "Conduct peer review walk-through with design and engineering leads"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Go-to-Market (GTM) Strategy & Product Analytics Dashboard",
      desc: "Define the North Star metric, pirate metrics (AARRR), and a launch communication playbook.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Establish North Star Metric and build an AARRR funnel framework (Acquisition to Referral)",
        "Design product telemetry event taxonomy (Mixpanel / PostHog tracking plan)",
        "Draft Go-to-Market (GTM) launch schedule with email announcements and release notes",
        "Submit complete PM portfolio bundle for ISO credential evaluation"
      ]
    }
  ],

  "ui-ux-design": [
    {
      id: "TASK-1",
      name: "Milestone 1: User Research, Competitive Audit & Persona Mapping",
      desc: "Conduct heuristic evaluations of existing products and document target user pain points.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Figma research board with competitive screenshots and persona cards.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Perform Jakob Nielsen 10 Heuristics evaluation on competing digital products",
        "Synthesize user interview quotes into empathy maps (Says, Thinks, Does, Feels)",
        "Create 2 detailed user personas with primary workflow objectives",
        "Document design opportunities and problem statements"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Information Architecture & Low-Fidelity Wireframes",
      desc: "Structure product sitemaps, task flow diagrams, and low-fidelity grayscale wireframes.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Map hierarchical application sitemap and core navigation structures",
        "Design user task flow diagrams showing critical user paths and decision branches",
        "Assemble low-fidelity grayscale wireframes covering mobile and desktop layouts",
        "Test low-fidelity flow with 3 target users for navigation clarity"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Scalable Design System & Tokenized Component Library",
      desc: "Construct an accessible design system in Figma with auto-layout and design tokens.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Create color palettes with accessible WCAG AA (4.5:1) contrast ratios",
        "Define typography hierarchy, modular spacing tokens, and 8px grid system",
        "Build reusable master components (Buttons, Inputs, Cards, Navbars) with interactive states",
        "Implement Figma auto-layout 5.0 and component variant properties"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: High-Fidelity Clickable Interactive Prototype",
      desc: "Assemble a responsive high-fidelity interactive prototype with realistic animations.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Convert wireframes into pixel-perfect high-fidelity screens applying the design system",
        "Add micro-interactions, smart animate transitions, and dynamic overlay modals",
        "Prototype realistic mobile gestures (drag, swipe, toggle, bottom sheets)",
        "Validate accessibility with screen reader simulator and contrast checkers"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Usability Testing Synthesis & Developer Handover Specs",
      desc: "Conduct moderated usability testing, document findings, and export developer-ready specs.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Conduct usability testing with 5 participants measuring task completion rates and time-on-task",
        "Synthesize usability issues into a severity matrix (Critical, Major, Minor)",
        "Annotate design files with developer spacing specs, responsive rules, and asset exports",
        "Submit Figma link, case study walkthrough, and design portfolio for certification"
      ]
    }
  ],

  "graphics-design": [
    {
      id: "TASK-1",
      name: "Milestone 1: Brand Identity Design & Visual Moodboard",
      desc: "Design brand logo marks, color psychology schemes, and typography pairing guidelines.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit vector logo assets (.svg / .ai / .eps) and brand identity sheet.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Create brand moodboard exploring visual direction, texture, and aesthetic themes",
        "Sketch 10 logo concepts and vectorize top 3 marks in vector software (Illustrator/Figma)",
        "Select primary and secondary brand color palette based on color psychology",
        "Establish font pairings (Heading + Body) with strict hierarchy rules"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Social Media Marketing Creatives & Banners",
      desc: "Design high-converting social media creative suites across Instagram, LinkedIn, and YouTube.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Design 5 cohesive Instagram carousel slides utilizing visual hierarchy and hooks",
        "Create YouTube thumbnail and LinkedIn banner with bold focal points and clean margins",
        "Ensure text legibility on small mobile viewports with contrasting drop shadows",
        "Export assets in optimized WebP and high-res PNG formats"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Custom Vector Iconography & Storytelling Illustrations",
      desc: "Create a 12-piece vector icon set and digital storytelling spot illustrations.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Design a 12-icon set based on a 24px grid with consistent stroke weight and corner radii",
        "Create 2 custom spot illustrations depicting teamwork and technology",
        "Export SVG files with clean paths and minimized XML metadata",
        "Document icon usage guidelines in a visual style guide"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Print & Marketing Collateral (CMYK Standards)",
      desc: "Design business stationery, marketing brochures, and event roll-up banners with print bleeds.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Design double-sided corporate business card with 3mm bleed and safe margins",
        "Design trifold promotional brochure formatted for standard A4 CMYK print",
        "Ensure vector resolution at 300 DPI with embedded fonts or converted outlines",
        "Generate print-ready PDF/X-1a files with crop marks"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Comprehensive Design Portfolio & Brand Book Presentation",
      desc: "Assemble high-resolution 3D mockups into a Behance-ready brand identity presentation.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Apply designs to photorealistic 3D product and stationery mockups",
        "Compile a comprehensive 15-page Brand Guidelines Book (Logo rules, clear space, color codes)",
        "Publish polished case study on Behance / Dribbble / PDF portfolio",
        "Submit portfolio link and high-res export files for certification evaluation"
      ]
    }
  ],

  "human-resources": [
    {
      id: "TASK-1",
      name: "Milestone 1: Technical Job Description Writing & Talent Sourcing Strategy",
      desc: "Draft role specifications and create multi-channel Boolean search strings on LinkedIn.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit Job Descriptions and Boolean sourcing strategy document.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Write 2 high-converting job descriptions for technical and creative roles with clear requirements",
        "Craft Boolean search strings (AND, OR, NOT, site:) for LinkedIn and GitHub talent mining",
        "Design personalized candidate outreach email templates achieving high response rates",
        "Map competitive salary benchmarks using industry compensation databases"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Candidate Screening & Structured Interview Rubric",
      desc: "Build competency-based interview questions and scoring matrices to eliminate evaluation bias.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Design an initial 15-minute phone screening questionnaire assessing culture and basic fit",
        "Formulate behavioral interview questions using the STAR methodology (Situation, Task, Action, Result)",
        "Construct an objective 5-point evaluation rubric for technical and soft skills",
        "Conduct mock screening interview and document candidate scorecards"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Employee Onboarding & 30-60-90 Day Orientation SOP",
      desc: "Architect an end-to-end onboarding experience for new hires from day one to 90 days.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Create pre-boarding checklist covering hardware provisioning, email access, and paperwork",
        "Design First-Week Orientation schedule including team welcomes and buddy pairing",
        "Formulate a 30-60-90 day goal-setting framework with measurable performance milestones",
        "Assemble Employee Welcome Guide covering core communication channels and tools"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Performance Management Framework & HR Policies Formulation",
      desc: "Develop quarterly OKR templates, POSH guidelines, and remote-work workplace policies.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Draft quarterly Objectives and Key Results (OKR) review templates for individual contributors",
        "Author formal workplace policy documentation (Remote Work, Leave, Code of Conduct, POSH)",
        "Design 360-degree peer feedback questionnaires and performance calibration guidelines",
        "Document step-by-step grievance escalation matrix"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: HR Analytics Dashboard & Talent Retention Strategy",
      desc: "Analyze recruitment and attrition metrics to recommend actionable employee retention strategies.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Build spreadsheet/dashboard tracking Time-to-Hire, Cost-per-Hire, Offer Acceptance Rate, and eNPS",
        "Analyze employee turnover trends identifying top departure reasons",
        "Draft a proactive Employee Retention & Recognition proposal to reduce attrition by 15%",
        "Submit complete HR documentation bundle and executive presentation for certification"
      ]
    }
  ],

  "digital-marketing": [
    {
      id: "TASK-1",
      name: "Milestone 1: Comprehensive SEO Audit & High-Intent Keyword Matrix",
      desc: "Perform on-page and technical SEO audits and curate keyword targeting spreadsheets.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit SEO audit spreadsheet with actionable remediation recommendations.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Crawl target website using Screaming Frog / Lighthouse to identify broken links and missing meta tags",
        "Conduct keyword research identifying 30 high-intent, low-difficulty transactional keywords",
        "Audit site architecture, XML sitemaps, robots.txt, and URL slug structures",
        "Document on-page title and meta description recommendations for top 5 key landing pages"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Content Marketing Funnel & 30-Day Editorial Calendar",
      desc: "Design full-funnel content strategies across Top, Middle, and Bottom of Funnel (TOFU/MOFU/BOFU).",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Map content topics across TOFU (educational blogs), MOFU (comparison guides), and BOFU (case studies)",
        "Build 30-day editorial calendar specifying platforms, publish dates, captions, and CTAs",
        "Write 2 high-converting social media posts designed for organic engagement and click-throughs",
        "Establish content distribution workflow across LinkedIn, Twitter/X, and Quora"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Paid Advertising Strategy (Meta Ads & Google Search Ads)",
      desc: "Structure high-ROI paid ad campaigns with audience targeting, ad copy, and budgeting.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Set up Google Search Ad campaign plan with negative keywords and exact-match ad groups",
        "Design Meta (Facebook/Instagram) audience targeting matrix with custom lookalike audiences",
        "Write 3 variations of ad copy using PAS (Problem-Agitate-Solution) and emotional triggers",
        "Model a ₹25,000 monthly ad spend budget forecasting CPC, CTR, CPA, and projected ROAS"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Email Marketing Automation & Lead Nurturing Sequence",
      desc: "Build automated email drip sequences that convert new leads into paying customers.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "8–10 hrs",
      difficulty: "Advanced",
      steps: [
        "Draft a 5-part email welcome and nurturing sequence with compelling subject lines",
        "Set up behavioral automation triggers (lead magnet download, abandoned cart, demo request)",
        "Conduct A/B test planning across subject line variants and button CTAs",
        "Ensure email deliverability best practices (SPF, DKIM, DMARC compliance, unsubscribe links)"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Google Analytics 4 (GA4) Tracking & Growth Campaign ROI Report",
      desc: "Configure conversion event measurement in GA4 and publish a full-funnel campaign performance report.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Configure custom conversion events in Google Analytics 4 via Google Tag Manager",
        "Build a multi-channel attribution model tracking user conversions across search, social, and direct",
        "Compile a comprehensive marketing performance deck calculating CAC, ROAS, and LTV",
        "Submit campaign portfolio and strategic optimization roadmap for certification"
      ]
    }
  ],

  "content-writing": [
    {
      id: "TASK-1",
      name: "Milestone 1: Research-Backed 1,500+ Word In-Depth SEO Blog Article",
      desc: "Write an authoritative, high-ranking SEO blog post with original research and clear structure.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit article Google Doc with target keyword density and readability score.",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Conduct competitive content research and identify content gaps in top 3 ranking Google results",
        "Write 1,500+ word article with logical H2/H3 hierarchy, bulleted takeaways, and statistics",
        "Integrate primary and secondary keywords naturally (1-2% density) without keyword stuffing",
        "Optimize readability using Hemingway Editor achieving Grade 8-9 clarity score"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: High-Converting Landing Page Copywriting (AIDA / PAS)",
      desc: "Write persuasive, conversion-focused copy for a modern SaaS or tech services landing page.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Craft 5 compelling hero section headlines and subheadings using the AIDA framework",
        "Write feature-to-benefit transformation copy emphasizing customer outcomes over technical specs",
        "Author customer social proof case snippets and objection-busting FAQ answers",
        "Design action-oriented Call to Action (CTA) buttons with high perceived value"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Technical Case Study & Product Documentation Guide",
      desc: "Document a complex technical project into a digestible customer success story and user guide.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Structure a Problem-Solution-Outcome customer case study highlighting measurable percentages",
        "Interview technical stakeholders and translate engineering jargon into business value",
        "Write step-by-step product walkthrough documentation with clear annotations",
        "Produce executive summary and key takeaway callout boxes"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Thought Leadership Content & Viral Social Media Threads",
      desc: "Ghostwrite high-impact LinkedIn thought leadership posts and educational Twitter/X threads.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "8–10 hrs",
      difficulty: "Advanced",
      steps: [
        "Write 3 high-engagement LinkedIn posts utilizing pattern interrupts and storytelling hooks",
        "Draft a 7-tweet educational thread breaking down an emerging industry trend",
        "Format copy with whitespace, formatting rhythm, and clear mobile readability",
        "Incorporate discussion prompts encouraging genuine audience commentary"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: Brand Voice Style Guide & Multi-Format Writing Portfolio",
      desc: "Publish a comprehensive editorial tone-of-voice guide and showcase a bylined writing portfolio.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "10–12 hrs",
      difficulty: "Capstone",
      steps: [
        "Author a 10-page Brand Editorial Style Guide (Tone, Voice, Grammar rules, Do & Don'ts)",
        "Compile all written samples into a public digital writing portfolio (Notion / Medium / Substack)",
        "Write a reflective meta-essay analyzing copywriting principles applied across tasks",
        "Submit portfolio link and documentation for ISO certificate review"
      ]
    }
  ],

  "cloud-devops": [
    {
      id: "TASK-1",
      name: "Milestone 1: High-Availability Edge Routing & Serverless Deployment",
      desc: "Deploy serverless edge workers, configure DNS records, and enforce strict security headers.",
      status: "in-progress",
      grade: "Under Review",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Submit live edge URL and security header test report (securityheaders.com).",
      time: "6–8 hrs",
      difficulty: "Beginner-Friendly",
      steps: [
        "Deploy serverless functions on Cloudflare Pages/Workers with edge caching",
        "Configure custom domain DNS (A, CNAME, TXT) and strict SSL/TLS encryption",
        "Implement HTTP security response headers (HSTS, CSP, X-Frame-Options)",
        "Verify 100% global uptime using multi-region synthetic pings"
      ]
    },
    {
      id: "TASK-2",
      name: "Milestone 2: Automated GitHub Actions CI/CD Pipeline",
      desc: "Automate code testing, linting, and zero-downtime production deployment on Git push.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 1.",
      time: "8–10 hrs",
      difficulty: "Intermediate",
      steps: [
        "Write GitHub Actions workflow file (.github/workflows/deploy.yml)",
        "Configure automated test runner and linter checks on pull requests",
        "Manage production API keys and credentials using encrypted GitHub Secrets",
        "Deploy automatically to staging and production environments on merge"
      ]
    },
    {
      id: "TASK-3",
      name: "Milestone 3: Docker Containerization & Microservice Orchestration",
      desc: "Containerize multi-service applications using multi-stage Docker builds and Docker Compose.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 2.",
      time: "10–12 hrs",
      difficulty: "Intermediate",
      steps: [
        "Write production Dockerfile utilizing multi-stage builds to minimize image size (< 150MB)",
        "Configure non-root container user execution for container security compliance",
        "Orchestrate database, backend API, and reverse proxy using Docker Compose",
        "Test container restart policies and volume persistence across reboots"
      ]
    },
    {
      id: "TASK-4",
      name: "Milestone 4: Infrastructure as Code & Serverless Database Architecture",
      desc: "Manage serverless relational database instances (Cloudflare D1 / Neon) with automated migrations.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Locked. Requires Milestone 3.",
      time: "10–12 hrs",
      difficulty: "Advanced",
      steps: [
        "Provision serverless relational databases using CLI / Terraform scripts",
        "Automate schema migrations in CI/CD pipeline with backward-compatible rollbacks",
        "Implement database connection pooling and query caching layers",
        "Configure automated daily backup snapshots and point-in-time recovery"
      ]
    },
    {
      id: "TASK-5",
      name: "Milestone 5: System Observability, Telemetry & Disaster Recovery Runbook",
      desc: "Instrument Prometheus/Grafana or Cloudflare analytics, alerts, and incident runbooks.",
      status: "pending",
      grade: "Not Submitted",
      submittedDate: "--",
      proofUrl: "",
      feedback: "Final milestone. Unlocks verified certificate verification upon review.",
      time: "12–14 hrs",
      difficulty: "Capstone",
      steps: [
        "Set up real-time telemetry tracking CPU, memory, 4xx/5xx error rates, and p95 latency",
        "Configure automated PagerDuty / Slack webhook alerting on abnormal error spikes",
        "Draft a step-by-step Disaster Recovery Runbook detailing rollback and failover procedures",
        "Submit architecture diagrams and incident runbook for ISO certificate evaluation"
      ]
    }
  ]
};

const AVAILABLE_DOMAINS = [
  { id: "web-dev", slug: "web-development", name: "Web Development", category: "Engineering & Dev", icon: "💻", count: 5 },
  { id: "data-science", slug: "data-science", name: "Data Science", category: "AI & Data", icon: "🔬", count: 5 },
  { id: "machine-learning", slug: "machine-learning", name: "Machine Learning", category: "AI & Data", icon: "🧠", count: 5 },
  { id: "data-analyst", slug: "data-analyst", name: "Data Analyst", category: "AI & Data", icon: "📊", count: 5 },
  { id: "cyber-security", slug: "cyber-security", name: "Cyber Security", category: "Engineering & Dev", icon: "🛡️", count: 5 },
  { id: "software-dev", slug: "software-development", name: "Software Development", category: "Engineering & Dev", icon: "⚙️", count: 5 },
  { id: "prompt-eng", slug: "prompt-engineering", name: "Prompt Engineering", category: "AI & Data", icon: "✨", count: 5 },
  { id: "agent-eng", slug: "agent-engineering", name: "Agent Engineering", category: "AI & Data", icon: "🤖", count: 5 },
  { id: "ai-eng", slug: "ai-engineering", name: "AI Engineering", category: "AI & Data", icon: "🚀", count: 5 },
  { id: "android-dev", slug: "android-development", name: "Android Development", category: "Engineering & Dev", icon: "📱", count: 5 },
  { id: "product-mgmt", slug: "product-management", name: "Product Management", category: "Business & Strategy", icon: "📋", count: 5 },
  { id: "ui-ux", slug: "ui-ux-design", name: "UI/UX", category: "Design & Creative", icon: "🎨", count: 5 },
  { id: "graphics-design", slug: "graphics-design", name: "Graphics Design", category: "Design & Creative", icon: "🖌️", count: 5 },
  { id: "human-resources", slug: "human-resources", name: "Human Resources", category: "Business & Strategy", icon: "👥", count: 5 },
  { id: "digital-marketing", slug: "digital-marketing", name: "Digital Marketing", category: "Marketing & Growth", icon: "📈", count: 5 },
  { id: "content-writing", slug: "content-writing", name: "Content Writing", category: "Marketing & Growth", icon: "✍️", count: 5 },
  { id: "cloud-devops", slug: "cloud-devops", name: "Cloud Architecture & DevOps", category: "Engineering & Dev", icon: "☁️", count: 5 }
];

module.exports = { DOMAIN_TASKS, AVAILABLE_DOMAINS };

if (require.main === module) {
  const outputPath = path.resolve(__dirname, "..", "src", "scripts", "domain-tasks-data.json");
  fs.writeFileSync(outputPath, JSON.stringify({ DOMAIN_TASKS, AVAILABLE_DOMAINS }, null, 2), "utf8");
  console.log("Successfully generated:", outputPath);
  console.log("Total domain task sets:", Object.keys(DOMAIN_TASKS).length);
  console.log("Total available domains:", AVAILABLE_DOMAINS.length);
}
