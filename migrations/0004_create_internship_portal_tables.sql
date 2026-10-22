-- Migration: 0004_create_internship_portal_tables.sql
-- Description: Additive schema for Internship Portal (programs, students, verification tokens, and sessions)
-- Compatibility: SQLite / Cloudflare D1
-- Safety: Additive only. Preserves all existing tables (leads, projects, clients, tickets, pricing, activity, internship_applications).

PRAGMA foreign_keys = ON;

-- 1. Internship Programs catalog
CREATE TABLE IF NOT EXISTS internship_programs (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT,
  learning_outcomes TEXT,
  duration TEXT NOT NULL,
  work_mode TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  fee_paise INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_internship_programs_slug ON internship_programs (slug);
CREATE INDEX IF NOT EXISTS idx_internship_programs_status ON internship_programs (status);

-- 2. Registered Students
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'active', 'suspended')),
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_students_email ON students (email);
CREATE INDEX IF NOT EXISTS idx_students_status ON students (status);

-- 3. Student Verification and Password Reset Tokens (storing token hashes only)
CREATE TABLE IF NOT EXISTS student_verification_tokens (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  token_type TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_reset')),
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_student_tokens_lookup ON student_verification_tokens (token_hash, token_type);
CREATE INDEX IF NOT EXISTS idx_student_tokens_student ON student_verification_tokens (student_id);

-- 4. Student Authenticated Sessions
CREATE TABLE IF NOT EXISTS student_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  session_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_student_sessions_hash ON student_sessions (session_hash);
CREATE INDEX IF NOT EXISTS idx_student_sessions_student ON student_sessions (student_id);
