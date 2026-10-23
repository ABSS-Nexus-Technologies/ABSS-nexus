/**
 * ============================================================================
 * ABSS Nexus Technologies — Official Google Sheets Live Sync Script (Apps Script)
 * ============================================================================
 * 
 * Instructions to Setup in 60 Seconds:
 * 1. Open Google Sheets (https://sheets.new) in your browser.
 * 2. Name your spreadsheet: "ABSS Nexus Technologies - Live Database"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in Code.gs and PASTE ALL CODE BELOW.
 * 5. Click the "Save" (floppy disk) icon.
 * 6. Click "Deploy" (top right blue button) -> "New deployment"
 * 7. In "Select type" (gear icon) -> select "Web app"
 * 8. Set:
 *    - Description: ABSS Live Sync
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone (MANDATORY so your website can send rows)
 * 9. Click "Deploy" -> "Authorize Access" -> choose your Google Account -> "Advanced" -> "Go to (unsafe)" -> "Allow".
 * 10. Copy the Web app URL (starts with: https://script.google.com/macros/s/.../exec).
 * 11. Open your ABSS Admin Settings (https://abssnexus.in/admin/admin-settings), paste the URL in "Option B: Google Sheets Live Webhook", and click "Save Webhook"!
 * 
 * Done! Every inquiry, student enrollment, and project will automatically create a new live row in this spreadsheet!
 */

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var type = String(data.type || "lead").toLowerCase();
    var sheetName = "Company_Leads";

    if (type.indexOf("student") !== -1) {
      sheetName = "Internship_Students";
    } else if (type.indexOf("app") !== -1) {
      sheetName = "Internship_Applications";
    } else if (type.indexOf("project") !== -1) {
      sheetName = "Company_Projects";
    } else if (type.indexOf("client") !== -1) {
      sheetName = "Company_Clients";
    } else if (type.indexOf("cert") !== -1) {
      sheetName = "Certificates";
    } else if (type.indexOf("task") !== -1) {
      sheetName = "Internship_Tasks";
    }

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);

      // Auto-generate header columns based on collection type
      var headers = [];
      if (sheetName === "Company_Leads") {
        headers = ["Date & Time (IST)", "Lead ID", "Client Name", "Email", "Phone", "Service", "Budget", "Message", "Status"];
      } else if (sheetName === "Internship_Students") {
        headers = ["Date & Time (IST)", "Student ID", "Full Name", "Email", "Phone", "Track", "Duration", "Status"];
      } else if (sheetName === "Internship_Applications") {
        headers = ["Date & Time (IST)", "App ID", "Applicant Name", "Email", "Phone", "College", "Track", "Notes", "Status"];
      } else if (sheetName === "Company_Projects") {
        headers = ["Date & Time (IST)", "Project ID", "Project Name", "Client", "Service", "Value (INR)", "Status"];
      } else if (sheetName === "Company_Clients") {
        headers = ["Date & Time (IST)", "Client ID", "Client Name", "Email", "Phone", "Service", "Status"];
      } else if (sheetName === "Certificates") {
        headers = ["Date & Time (IST)", "Certificate ID", "Student Name", "Program", "Grade", "Status", "Verification URL"];
      } else {
        headers = ["Date & Time (IST)", "Item ID", "Title / Name", "Category", "Details", "Status"];
      }

      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0066cc")
        .setFontColor("#ffffff")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm:ss a");

    if (sheetName === "Company_Leads") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.client || data.name || "Client Inquiry",
        data.email || "",
        data.phone || "",
        data.service || "General Inquiry",
        data.budget || data.budgetLabel || "",
        data.message || "",
        data.status || "New"
      ]);
    } else if (sheetName === "Internship_Students") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.name || "Student",
        data.email || "",
        data.phone || "",
        data.track || "Web Development",
        data.duration || "4 Weeks",
        data.status || "Enrolled"
      ]);
    } else if (sheetName === "Internship_Applications") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.fullName || data.name || "Applicant",
        data.email || "",
        data.phone || "",
        data.college || "",
        data.internshipProgram || data.track || "",
        data.notes || data.adminNotes || "",
        data.status || "New"
      ]);
    } else if (sheetName === "Company_Projects") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.name || "Project",
        data.client || "",
        data.service || "",
        data.value || 0,
        data.status || "In Development"
      ]);
    } else if (sheetName === "Company_Clients") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.name || "Client",
        data.email || "",
        data.phone || "",
        data.service || "",
        data.status || "Active"
      ]);
    } else if (sheetName === "Certificates") {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.studentName || "",
        data.program || "",
        data.grade || "",
        data.status || "Authentic",
        data.verificationUrl || ""
      ]);
    } else {
      sheet.appendRow([
        timestamp,
        data.id || "",
        data.title || data.name || "",
        data.track || data.type || "",
        JSON.stringify(data),
        "Recorded"
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", sheet: sheetName, timestamp: timestamp }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("ABSS Nexus Technologies Google Sheets Webhook is Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
