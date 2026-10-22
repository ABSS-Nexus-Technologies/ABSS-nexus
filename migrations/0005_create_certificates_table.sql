-- Migration: 0005_create_certificates_table.sql
-- Description: Additive schema for Certificate Credential Registry
-- Compatibility: SQLite / Cloudflare D1
-- Safety: Additive only. Preserves all existing tables.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  program TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  grade TEXT NOT NULL DEFAULT 'Grade A (Distinction)',
  status TEXT NOT NULL DEFAULT 'Authentic',
  verification_hash TEXT NOT NULL,
  skills_json TEXT,
  issuer TEXT NOT NULL DEFAULT 'ABSS Nexus Technologies',
  verification_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_certificates_student ON certificates (student_name);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates (status);
