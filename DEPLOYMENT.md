# Deployment Guide

## 🚀 Deployment Instructions

### Frontend Deployment (Vercel)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
     ```
   - Deploy!

### Backend Deployment (Render)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Prepare backend for deployment"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - Name: `alumni-platform-backend`
     - Build command: `npm install && npm run build`
     - Start command: `npm start`
     - Environment variables:
       ```
       SUPABASE_DB_URL=your_production_database_url
       JWT_ACCESS_SECRET=your_production_secret
       JWT_REFRESH_SECRET=your_production_refresh_secret
       NODE_ENV=production
       ```

### Environment Variables Required

**Frontend (Vercel)**
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-service.onrender.com
```

**Backend (Render)**
```
SUPABASE_DB_URL=your_supabase_connection_string
JWT_ACCESS_SECRET=your_strong_secret_key
JWT_REFRESH_SECRET=your_strong_refresh_key
NODE_ENV=production
```

## 📋 Pre-deployment Checklist

- [ ] Update all environment variables
- [ ] Test application locally with production configs
- [ ] Ensure database schema is deployed
- [ ] Verify all API endpoints work
- [ ] Test role-based access controls
- [ ] Confirm demo functionality works
- [ ] Check mobile responsiveness
- [ ] Validate security headers
- [ ] Test error handling
- [ ] Verify analytics and tracking

## 🔧 Post-deployment Verification

1. **Frontend Health Check**
   - Visit your Vercel deployment URL
   - Test all three demo roles
   - Verify navigation works
   - Check responsive design

2. **Backend Health Check**
   - Visit `https://your-backend.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"...","service":"alumni-platform-backend"}`
   - Test authentication endpoints
   - Verify database connections

3. **Integration Testing**
   - Test login with demo accounts
   - Verify role-specific content loads
   - Check analytics dashboard
   - Test interview preparation features
   - Validate referral workflows

## 🆘 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Ensure frontend URL is in backend CORS configuration
2. **Database Connection**: Verify Supabase credentials and network access
3. **Environment Variables**: Double-check all required variables are set
4. **Build Failures**: Check Node.js version compatibility (18.x recommended)

**Support Resources:**
- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs
- Supabase Documentation: https://supabase.com/docs