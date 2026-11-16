/**
 * ABSS Nexus Technologies - Official Internship Cohort Schedule & Parameters
 * Single source of truth for upcoming batch dates, deadlines, and capacities.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.INTERNSHIP_CONFIG = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const INTERNSHIP_CONFIG = {
    currentBatch: "January 2026",
    applicationDeadline: "December 31, 2025",
    batchStartDate: "January 15, 2026",
    capacity: 50,
    cohortYear: 2026,
  };
  return INTERNSHIP_CONFIG;
});
