# Archived Internship & Academy Portal
## ABSS Nexus Technologies

Yeh folder **Internship Academy & Student Learning Portal** ke saare modules aur files ko securely archive karke rakhta hai.
Jab bhi aap future mein technical internships launch karna chahein, aap yahan se easily restore kar sakte hain.

---

### Folder Contents
1. **`pages/`**:
   - `internships.html` & all 16 domain tracks (`internships-program-*.html`)
   - About, Details, FAQ, Support, Application Status, Payment Status
   - Student portal (`student-*.html`: Dashboard, Tasks, Submissions, Certificates, etc.)
   - `verify-certificate.html` (Tamper-proof certificate verification)
2. **`root_internships/`**:
   - Canonical root `/internships` router & static assets
3. **`components/`**:
   - `internship-header.html`
   - `internship-footer.html`
4. **`admin/`**:
   - Mentor Console (`admin-students.html`, `admin-certificates.html`, `admin-tasks.html`, `admin-submissions.html`, `admin-programs.html`, `admin-applications.html`, etc.)
   - `admin/internships/` multi-view application
5. **Config & Styles**:
   - `internship-dates.js`
   - `student-dashboard.js`
   - `domain-tasks-data.json`
   - `internship-portal.min.css`, `student-workspace.css`, `student-workspace.min.css`

---

### How to Restore
Jab future me internship wapas add karni ho:
1. `archive/internships/pages/*` files ko wapas `src/pages/` me move karein.
2. `archive/internships/components/*` files ko `src/components/` me move karein.
3. `archive/internships/admin/*` files ko `src/admin/` me move karein.
4. `archive/internships/root_internships` ko root directory me `internships` naam se move karein.
5. Header aur Footer navigation me `/internships` links restore karein.
6. `npm run build` run karein.
