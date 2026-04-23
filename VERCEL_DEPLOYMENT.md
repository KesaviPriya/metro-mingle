# Vercel Deployment Instructions

## Your Supabase Credentials (Already Configured)
✅ Supabase URL: https://lzgbysellzpqiqctapce.supabase.co
✅ Supabase Key: Configured in .env.local

---

## STEP 1: Create Database Tables in Supabase

1. Go to: https://lzgbysellzpqiqctapce.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste this entire SQL code:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Event bookings table
CREATE TABLE IF NOT EXISTS event_bookings (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  area TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  budget TEXT NOT NULL,
  event_type TEXT NOT NULL,
  addons TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create bookings" ON event_bookings;
CREATE POLICY "Anyone can create bookings" ON event_bookings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read own bookings" ON event_bookings;
CREATE POLICY "Users can read own bookings" ON event_bookings
  FOR SELECT USING (true);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  event TEXT NOT NULL,
  card_name TEXT NOT NULL,
  card_last4 TEXT NOT NULL,
  exp_month TEXT NOT NULL,
  exp_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create payments" ON payments;
CREATE POLICY "Anyone can create payments" ON payments
  FOR INSERT WITH CHECK (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can send messages" ON contact_messages;
CREATE POLICY "Anyone can send messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

5. Click "Run" (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"
7. Verify tables created:
   - Click "Table Editor" in left sidebar
   - You should see: users, event_bookings, payments, contact_messages

---

## STEP 2: Enable Authentication in Supabase

1. In Supabase dashboard, click "Authentication" in left sidebar
2. Click "Providers" tab
3. Find "Email" provider
4. Toggle it ON (should be green)
5. Scroll down and click "Save"

---

## STEP 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login
# Enter email: kesavipriya2006@gmail.com
# Check your email and click verification link

# Deploy
cd D:\metro-mingle
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **metro-mingle** (or press Enter)
- Directory? **.** (press Enter)
- Override settings? **N**

### Option B: Using Vercel Dashboard

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Connect your GitHub account
4. Select "KesaviPriya/metro-mingle"
5. Click "Import"
6. Click "Deploy"

---

## STEP 4: Add Environment Variables to Vercel

### After deployment completes:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your "metro-mingle" project
3. Click "Settings" tab
4. Click "Environment Variables" in left sidebar
5. Add these two variables:

**Variable 1:**
- Key: `SUPABASE_URL`
- Value: `https://lzgbysellzpqiqctapce.supabase.co`
- Environment: Check all three boxes (Production, Preview, Development)
- Click "Save"

**Variable 2:**
- Key: `SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2J5c2VsbHpwcWlxY3RhcGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjA0OTgsImV4cCI6MjA5MjUzNjQ5OH0.5svkXg93nouKt-IMT7wd98K5nvkZJrqz3aVs9K776fU`
- Environment: Check all three boxes (Production, Preview, Development)
- Click "Save"

---

## STEP 5: Redeploy with Environment Variables

### Option A: Using CLI
```bash
vercel --prod
```

### Option B: Using Dashboard
1. Go to "Deployments" tab
2. Click "..." menu on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache"
5. Click "Redeploy"

---

## STEP 6: Configure Supabase Site URL

1. Go back to Supabase dashboard
2. Click "Authentication" → "URL Configuration"
3. In "Site URL" field, enter your Vercel URL:
   - Example: `https://metro-mingle.vercel.app`
4. In "Redirect URLs" section, add:
   - `https://metro-mingle.vercel.app/**`
5. Click "Save"

---

## STEP 7: Test Your Deployment

Visit your Vercel URL (you'll get it after deployment)

### Test Checklist:
- [ ] Homepage loads without 404 error
- [ ] CSS styling is applied
- [ ] Navigation works
- [ ] Go to events page and submit booking form
- [ ] Check Supabase Table Editor → event_bookings (should see your entry)
- [ ] Submit contact form
- [ ] Check Supabase Table Editor → contact_messages (should see your entry)
- [ ] Try signup/login

---

## Troubleshooting

### Forms return 500 error?
- Check environment variables are set correctly in Vercel
- Verify tables exist in Supabase
- Check browser console (F12) for detailed errors

### "Module not found" errors?
```bash
npm install
git add package-lock.json
git commit -m "Add dependencies"
git push origin main
vercel --prod
```

### Still getting 404?
- Ensure index.html exists in root
- Check vercel.json is properly configured
- Try: `vercel --prod --force`

---

## Your Deployment URLs

After deployment, you'll have:
- **Production URL**: https://metro-mingle.vercel.app (or similar)
- **Supabase Dashboard**: https://lzgbysellzpqiqctapce.supabase.co

Save these URLs for future reference!

---

## Next Steps After Successful Deployment

1. **Add Images**: Upload event photos to `pic/` folder
2. **Custom Domain**: Add your own domain in Vercel settings
3. **Email Notifications**: Set up email service for booking confirmations
4. **Payment Gateway**: Integrate Stripe or Razorpay
5. **Analytics**: Add Google Analytics or Vercel Analytics
