# MetroMingle - Event Booking Platform

## Deployment Instructions

### Current Status
✅ Configured for Vercel deployment
✅ Serverless API endpoints created
⚠️ Database integration needed

### What's Fixed
1. Created `index.html` as entry point
2. Converted PHP to Vercel Serverless Functions
3. Updated form actions to use `/api/*` endpoints
4. Added proper `vercel.json` configuration

### What Still Needs Work

#### 1. Database Setup (Required)
Choose one and integrate:
- **Supabase** (Recommended - Free tier, PostgreSQL)
- **MongoDB Atlas** (Free tier, NoSQL)
- **PlanetScale** (Free tier, MySQL)
- **Firebase** (Free tier, NoSQL)

#### 2. Missing Assets
Create these folders and add files:
- `css/styles.css`
- `css/styles1.css`
- `css/php.css`
- `css/style-reg.css`
- `pic/` folder with images
- `about.jpg`
- `app.js`

#### 3. Authentication
Replace PHP login/signup with:
- Supabase Auth
- Firebase Auth
- Auth0
- NextAuth.js

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables Needed
Add in Vercel dashboard:
- `DATABASE_URL` - Your database connection string
- `JWT_SECRET` - For authentication

### API Endpoints
- `POST /api/event-booking` - Event bookings
- `POST /api/payment` - Payment processing
- `POST /api/contact` - Contact form

### Next Steps
1. Add missing CSS/JS/image files
2. Set up database (Supabase recommended)
3. Integrate authentication
4. Add payment gateway (Stripe/Razorpay)
5. Deploy to Vercel
