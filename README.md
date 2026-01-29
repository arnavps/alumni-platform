## Alumni Engagement & Networking Platform

A production-focused full-stack web application that helps universities build a verified alumni ecosystem for networking, mentorship, referrals, and analytics.

This repository uses a **Next.js (App Router) + Tailwind** frontend and an **Express + TypeScript** backend backed by **Supabase (PostgreSQL)**.

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase (managed PostgreSQL)
- **Auth**: JWT-based authentication with role-based access control (RBAC)

---

## Project Structure

- **frontend/** – Next.js app (App Router) with Tailwind and SaaS-style dashboard UI
- **backend/** – Express + TypeScript API server, connects to Supabase Postgres
- **backend/sql/schema.sql** – Database schema for users, profiles, opportunities, referrals, mentorship, interview experiences, and audit logs

---

## Prerequisites

- Node.js (LTS)
- npm
- Supabase project (for the managed Postgres database)

---

## Backend Setup (`backend/`)

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a Supabase project and run the schema:
   - In the Supabase dashboard, open the SQL editor.
   - Paste and run the contents of `backend/sql/schema.sql`.

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in:
     - `SUPABASE_DB_URL` – Supabase Postgres connection string
     - `JWT_ACCESS_SECRET` – secret for access tokens
     - `JWT_REFRESH_SECRET` – secret for refresh tokens
     - Rate limit and request limit values as desired

4. Run the backend in development mode:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000` by default.

---

## Frontend Setup (`frontend/`)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env.local` file and point it to the backend API:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

3. Run the Next.js dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

---

## High-Level Features

- **Role-based access** (Admin/Faculty, Alumni, Student) with JWT
- **Alumni & Student profiles** stored in Supabase Postgres
- **Opportunities** module (jobs, internships, mentorship, events)
- **Authentication flows** (register, login) wired between frontend and backend
- **Dashboard shell** with sidebar navigation and overview cards

Additional modules such as referrals, mentorship sessions, interview experiences, verification workflows, and analytics are structured in the backend and can be extended following the existing patterns.
