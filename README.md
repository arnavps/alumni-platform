# Alumni Engagement & Networking Platform

A comprehensive full-stack web application that enables universities to build a verified alumni ecosystem for networking, mentorship, referrals, and analytics. This platform connects students with alumni for career guidance, interview preparation, and professional opportunities through a role-based system.

## 🚀 Key Features

- **Role-based Access Control**: Student, Alumni, and Faculty views with tailored functionality
- **Interview Preparation System**: Domain-specific prep content with progress tracking
- **Knowledge Sharing Platform**: Alumni contribute hiring insights and interview experiences
- **Mentorship Matching**: Automated pairing with performance analytics
- **Referral Management**: Streamlined job/internship referral workflow
- **Analytics Dashboard**: Role-specific success metrics and platform health monitoring

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with SaaS-style dashboard
- **State Management**: React Hooks
- **Build Tool**: Turbopack

### Backend
- **Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT with RBAC
- **API Documentation**: RESTful endpoints

### Infrastructure
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render
- **Database**: Supabase Managed PostgreSQL

## 📁 Project Structure

```
alumni-platform/
├── frontend/                    # Next.js application
│   ├── app/                     # App Router pages
│   │   ├── dashboard/           # Main dashboard with role-specific views
│   │   │   ├── analytics/       # Role-based analytics dashboard
│   │   │   ├── interview-prep/  # Student interview preparation (Students only)
│   │   │   ├── interview-insights/ # Alumni content contribution (Alumni only)
│   │   │   ├── interviews/      # Shared interview experiences (All roles)
│   │   │   ├── mentorship/      # Mentorship matching system
│   │   │   ├── opportunities/   # Job/internship listings
│   │   │   ├── referrals/       # Referral tracking and management
│   │   │   └── page.tsx         # Main dashboard overview
│   │   ├── login/               # Authentication pages
│   │   ├── register/
│   │   └── demo/                # Judge-ready demo system
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Page layout components
│   │   └── ui/                  # Base UI components (card, button, badge)
│   ├── lib/                     # Utility functions and mock data
│   └── public/                  # Static assets
├── backend/                     # Express API server
│   ├── src/
│   │   ├── config/              # Database and environment configuration
│   │   ├── middleware/          # Auth, error handling, RBAC middleware
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   └── opportunities/   # Opportunities management
│   │   ├── utils/               # JWT and password utilities
│   │   └── index.ts             # Server entry point
│   ├── sql/                     # Database schema and migrations
│   └── .env.example             # Environment variable template
├── .gitignore                   # Git ignore configuration
└── package.json                 # Root package configuration
```

## 🎯 System Architecture

### Role-Based Design Philosophy

The platform follows a "Knowledge Asset" approach where interview experiences are treated as structured learning content rather than personal logs.

#### Student Experience
- **Purpose**: Am I progressing toward opportunities and readiness?
- **Key Metrics**: 
  - Career Readiness Progress (75% target)
  - Mentorship Requests vs Acceptance Rate
  - Referral Request to Referral Received Funnel
  - Interview Preparation Coverage by Domain
  - Profile Completion Percentage

#### Alumni Experience  
- **Purpose**: Is my contribution impactful and efficient?
- **Key Metrics**:
  - Students Mentored (12 this quarter)
  - Active Mentorships (3 currently)
  - Referral Success Rate (42% vs 35% industry average)
  - Interview Conversion Rate (45% from referrals)
  - Content Impact Metrics (views, ratings, bookmarks)

#### Faculty Experience
- **Purpose**: Is the ecosystem healthy, fair, and effective?
- **Key Metrics**:
  - Alumni Participation Rate (64% active)
  - Student Engagement Rate
  - Mentorship Match Rate
  - Content Freshness (65% recent)
  - Platform Health Indicators

### Core Modules

#### 1. Interview Preparation System
**Student-Facing (`/dashboard/interview-prep`)**
- Curated interview prep content library
- Filter by company, role, domain, difficulty
- Domain coverage tracking (DSA, System Design, HR, etc.)
- Practice activity monitoring (coding problems solved, mock interviews)
- Bookmarking and saved content management
- Preparation checklists and weak-area recommendations

**Alumni-Facing (`/dashboard/interview-insights`)**
- Structured content contribution interface
- Interview insight upload form with validation
- Content impact analytics (views, helpfulness ratings)
- Freshness indicators and update recommendations
- Engagement insights and performance metrics

**Shared Experience (`/dashboard/interviews`)**
- Role-appropriate views for all users
- Knowledge asset approach to interview content
- Verification status tracking
- Community engagement metrics

#### 2. Analytics Dashboard (`/dashboard/analytics`)
- **Students**: Career readiness, mentorship progress, profile strength
- **Alumni**: Contribution impact, referral performance, content engagement
- **Faculty**: Platform health, participation rates, content moderation
- Auto-generated insights and recommendations
- Outcome-focused metrics (not vanity statistics)

#### 3. Mentorship System (`/dashboard/mentorship`)
- Automated matching algorithm
- Session scheduling and tracking
- Performance analytics
- Feedback collection system

#### 4. Referral Management (`/dashboard/referrals`)
- Streamlined referral request process
- Status tracking (Requested → Referred → Interview → Offer)
- Success rate analytics
- Company and role filtering

#### 5. Opportunities Board (`/dashboard/opportunities`)
- Job and internship listings
- Alumni-posted opportunities
- Application tracking
- Verification status indicators

## 🔧 Development Setup

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Supabase account for database
- Git for version control

### Backend Setup (`backend/`)

1. **Install Dependencies**:
```bash
cd backend
npm install
```

2. **Database Setup**:
   - Create a Supabase project
   - In Supabase SQL editor, run `backend/sql/schema.sql`
   - Note your database connection string

3. **Environment Configuration**:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
SUPABASE_DB_URL=your_supabase_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=4000
```

4. **Run Development Server**:
```bash
npm run dev
```
API available at `http://localhost:4000`

### Frontend Setup (`frontend/`)

1. **Install Dependencies**:
```bash
cd frontend
npm install
```

2. **Environment Configuration**:
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

3. **Run Development Server**:
```bash
npm run dev
```
App available at `http://localhost:3000`

### Running Both Services
```bash
# From root directory
npm run dev  # Starts both frontend and backend
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Prepare for Deployment**:
```bash
# Update .env.local for production
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
```

2. **Deploy to Vercel**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Backend Deployment (Render)

1. **Prepare for Deployment**:
```bash
# Update environment variables in Render dashboard
SUPABASE_DB_URL=your_production_db_url
JWT_ACCESS_SECRET=your_production_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
NODE_ENV=production
```

2. **Deploy to Render**:
   - Create new Web Service in Render dashboard
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install && npm run build`
   - Set start command: `npm run start`
   - Add environment variables

### Environment Variables Required

**Backend (.env)**:
```env
SUPABASE_DB_URL=your_production_database_url
JWT_ACCESS_SECRET=strong_secret_key_here
JWT_REFRESH_SECRET=strong_refresh_key_here
PORT=4000
NODE_ENV=production
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Students, Alumni, Faculty permissions
- **Input Validation**: Server-side validation for all endpoints
- **Rate Limiting**: API request throttling
- **Environment Isolation**: Separate configs for dev/production

## 📊 Demo System

The platform includes a judge-ready demo system accessible at `/login` with three prominent demo buttons:
- **Student Demo**: Pre-configured student profile with interview prep content
- **Alumni Demo**: Pre-configured alumni profile with contribution tools
- **Faculty Demo**: Pre-configured faculty profile with analytics and moderation

Each demo provides instant role simulation without registration, perfect for judging and demonstrations.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For support, email [your-email] or create an issue in the repository.

## 📈 Future Enhancements

- Real-time messaging system
- Advanced matching algorithms
- Mobile application
- Integration with university systems
- AI-powered recommendations
- Video interview preparation tools

---
*Built with ❤️ for educational institutions and career development*