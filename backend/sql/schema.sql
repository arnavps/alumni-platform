-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'FACULTY', 'ALUMNI', 'STUDENT')),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Alumni profiles
CREATE TABLE IF NOT EXISTS alumni_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  graduation_year INT,
  department TEXT,
  degree TEXT,
  current_position TEXT,
  company TEXT,
  industry TEXT,
  startup_name TEXT,
  startup_description TEXT,
  is_open_to_mentorship BOOLEAN DEFAULT FALSE,
  is_open_to_referrals BOOLEAN DEFAULT FALSE
);

-- Student profiles
CREATE TABLE IF NOT EXISTS student_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_program TEXT,
  year_of_study INT,
  department TEXT,
  cgpa NUMERIC,
  interests TEXT[]
);

-- Alumni verification
CREATE TABLE IF NOT EXISTS alumni_verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES users(id),
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Opportunities
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('JOB', 'INTERNSHIP', 'MENTORSHIP', 'EVENT')),
  title TEXT NOT NULL,
  company TEXT,
  location TEXT,
  remote BOOLEAN DEFAULT FALSE,
  domain TEXT,
  role TEXT,
  description TEXT,
  apply_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referral requests
CREATE TABLE IF NOT EXISTS referral_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES users(id),
  alumni_id UUID NOT NULL REFERENCES users(id),
  opportunity_id UUID REFERENCES opportunities(id),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'DECLINED', 'GUIDANCE_PROVIDED')),
  message TEXT,
  response_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Monthly request limits
CREATE TABLE IF NOT EXISTS monthly_request_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  year_month DATE NOT NULL,
  referral_request_count INT NOT NULL DEFAULT 0,
  mentorship_request_count INT NOT NULL DEFAULT 0,
  UNIQUE (user_id, year_month)
);

-- Mentorship sessions
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES users(id),
  mentee_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('REQUESTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED')),
  topic TEXT,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Interview experiences
CREATE TABLE IF NOT EXISTS interview_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id),
  company TEXT,
  role TEXT,
  domain TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
