# Complete Deployment Guide - MetroMingle

## Current Status
✅ 404 Error Fixed
✅ All CSS/JS files created
✅ API endpoints created
✅ Code committed to Git
⚠️ Git push blocked (authentication issue)
❌ Not deployed yet
❌ Forms won't work (no database)

---

## STEP-BY-STEP: Make Project Fully Functional

### STEP 1: Fix Git Push (Choose One Method)

#### Method A: Use GitHub Desktop (Easiest)
1. Download: https://desktop.github.com/
2. Install and sign in with **KesaviPriya** account
3. File → Add Local Repository → Select `D:\metro-mingle`
4. Click "Push origin" button
5. ✅ Done!

#### Method B: Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "metro-mingle"
4. Check: ✅ repo (all permissions)
5. Click "Generate token"
6. **COPY THE TOKEN**
7. Run in terminal:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/KesaviPriya/metro-mingle.git
git push origin main
```

---

### STEP 2: Deploy to Vercel

#### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 2.2 Login to Vercel
```bash
vercel login
```
Enter email: **kesavipriya2006@gmail.com**
Check your email and click the verification link.

#### 2.3 Deploy
```bash
cd D:\metro-mingle
vercel --prod
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **metro-mingle**
- Directory? **.** (press Enter)
- Override settings? **N**

✅ You'll get a URL like: `https://metro-mingle.vercel.app`

#### 2.4 Test Deployment
Visit your Vercel URL. You should see:
- ✅ Homepage loads (no 404!)
- ✅ CSS styling works
- ✅ Navigation works
- ⚠️ Forms show errors (expected - need database)

---

### STEP 3: Setup Supabase Database

#### 3.1 Create Supabase Account
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or Google
4. Create new organization: "MetroMingle"
5. Create new project:
   - Name: **metro-mingle**
   - Database Password: (create strong password - SAVE IT!)
   - Region: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

#### 3.2 Get API Keys
1. In Supabase dashboard, go to: Settings → API
2. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (long string starting with "eyJ...")

#### 3.3 Create Database Tables
1. In Supabase, go to: SQL Editor
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Event bookings table
CREATE TABLE event_bookings (
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

CREATE POLICY "Anyone can create bookings" ON event_bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read own bookings" ON event_bookings
  FOR SELECT USING (email = auth.jwt()->>'email');

-- Payments table
CREATE TABLE payments (
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

CREATE POLICY "Anyone can create payments" ON payments
  FOR INSERT WITH CHECK (true);

-- Contact messages table
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

4. Click "Run" (or press Ctrl+Enter)
5. You should see: "Success. No rows returned"

---

### STEP 4: Connect Supabase to Vercel

#### 4.1 Add Environment Variables
1. Go to: https://vercel.com/dashboard
2. Select your **metro-mingle** project
3. Go to: Settings → Environment Variables
4. Add these two variables:

**Variable 1:**
- Name: `SUPABASE_URL`
- Value: (paste your Project URL from step 3.2)
- Environment: ✅ Production ✅ Preview ✅ Development
- Click "Save"

**Variable 2:**
- Name: `SUPABASE_ANON_KEY`
- Value: (paste your anon public key from step 3.2)
- Environment: ✅ Production ✅ Preview ✅ Development
- Click "Save"

#### 4.2 Redeploy
```bash
vercel --prod
```

Or in Vercel dashboard:
- Go to Deployments tab
- Click "..." on latest deployment
- Click "Redeploy"

---

### STEP 5: Enable Supabase Authentication

#### 5.1 Configure Email Auth
1. In Supabase: Authentication → Providers
2. Find "Email" provider
3. Toggle: ✅ Enable Email provider
4. Confirm email: ✅ Enabled
5. Click "Save"

#### 5.2 Configure Site URL
1. In Supabase: Authentication → URL Configuration
2. Site URL: `https://your-vercel-url.vercel.app`
3. Redirect URLs: Add:
   - `https://your-vercel-url.vercel.app/main1.html`
   - `https://your-vercel-url.vercel.app/**`
4. Click "Save"

---

### STEP 6: Add Images (Optional but Recommended)

#### 6.1 Find Free Images
Go to these sites and download event-related images:
- https://unsplash.com (search: "party", "event", "celebration")
- https://pexels.com (search: "birthday", "wedding", "meeting")

#### 6.2 Add to Project
Save images in `pic/` folder:
- `home1.jpg` to `home6.jpg` (homepage slider - 1920x1080)
- `gallery1.jpg` to `gallery8.png` (services - 800x600)
- `about.jpg` (about section - 1200x800)
- `card_img.png` (payment cards icon)

#### 6.3 Deploy Images
```bash
git add pic/
git commit -m "Add images"
git push origin main
vercel --prod
```

---

### STEP 7: Test Everything

#### 7.1 Test Homepage
Visit: `https://your-vercel-url.vercel.app`
- ✅ Page loads without 404
- ✅ CSS styling applied
- ✅ Navigation works
- ✅ Smooth scrolling works

#### 7.2 Test Event Booking
1. Click "Book Event" or go to `events_index.html`
2. Fill out the form
3. Click "Submit"
4. Should see: "Booking saved successfully!"
5. Verify in Supabase:
   - Go to: Table Editor → event_bookings
   - You should see your booking

#### 7.3 Test Contact Form
1. Go to main page, scroll to Contact section
2. Fill out form
3. Click "Send Message"
4. Should see: "Message sent successfully!"
5. Verify in Supabase:
   - Table Editor → contact_messages

#### 7.4 Test Signup/Login
1. Go to: `signup.html`
2. Create account
3. Check email for confirmation
4. Click confirmation link
5. Go to: `login.html`
6. Login with credentials
7. Should redirect to main page

---

## TROUBLESHOOTING

### Forms Still Not Working?
1. Check browser console (F12) for errors
2. Verify environment variables in Vercel
3. Check Supabase API keys are correct
4. Ensure tables were created successfully

### Images Not Showing?
1. Check file names match exactly (case-sensitive)
2. Verify images are in `pic/` folder
3. Check browser console for 404 errors
4. Use placeholder service temporarily: `https://via.placeholder.com/800x600`

### Authentication Not Working?
1. Check Supabase Auth is enabled
2. Verify Site URL matches your Vercel URL
3. Check email confirmation is enabled
4. Look for errors in Supabase logs

---

## FINAL CHECKLIST

- [ ] Git push successful
- [ ] Deployed to Vercel
- [ ] Supabase account created
- [ ] Database tables created
- [ ] Environment variables added to Vercel
- [ ] Redeployed after adding env vars
- [ ] Authentication enabled
- [ ] Event booking form works
- [ ] Contact form works
- [ ] Payment form works
- [ ] Signup/Login works
- [ ] Images added (optional)

---

## ESTIMATED TIME

- Step 1 (Git): 5 minutes
- Step 2 (Vercel): 10 minutes
- Step 3 (Supabase): 15 minutes
- Step 4 (Connect): 5 minutes
- Step 5 (Auth): 5 minutes
- Step 6 (Images): 30 minutes (optional)
- Step 7 (Testing): 15 minutes

**Total: ~1 hour** (without images: ~30 minutes)

---

## NEXT LEVEL FEATURES (After Basic Functionality)

1. **Payment Integration**
   - Integrate Stripe or Razorpay
   - Process real payments

2. **Email Notifications**
   - Send booking confirmations
   - Send contact form responses

3. **Admin Dashboard**
   - View all bookings
   - Manage events
   - View analytics

4. **User Dashboard**
   - View booking history
   - Edit profile
   - Cancel bookings

5. **Advanced Features**
   - Calendar integration
   - Real-time availability
   - Photo gallery upload
   - Reviews and ratings
