# 🚀 Quick Start - Deploy in 10 Minutes

## ✅ What's Already Done
- [x] 404 error fixed
- [x] All CSS/JS files created
- [x] API endpoints created
- [x] Supabase credentials configured
- [x] Dependencies installed
- [x] Code committed to Git

## 🎯 What You Need to Do Now

### 1️⃣ Create Database Tables (5 minutes)

1. Open: https://lzgbysellzpqiqctapce.supabase.co
2. Click "SQL Editor" → "New query"
3. Copy the SQL from `VERCEL_DEPLOYMENT.md` (Step 1)
4. Click "Run"
5. Verify in "Table Editor" - you should see 4 tables

### 2️⃣ Enable Authentication (1 minute)

1. In Supabase: Authentication → Providers
2. Toggle "Email" to ON
3. Click "Save"

### 3️⃣ Deploy to Vercel (4 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login
# Use: kesavipriya2006@gmail.com

# Deploy
vercel --prod
```

Follow the prompts (press Enter for defaults).

### 4️⃣ Add Environment Variables (2 minutes)

After deployment:
1. Go to: https://vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. Add these two:

**SUPABASE_URL**
```
https://lzgbysellzpqiqctapce.supabase.co
```

**SUPABASE_ANON_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2J5c2VsbHpwcWlxY3RhcGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjA0OTgsImV4cCI6MjA5MjUzNjQ5OH0.5svkXg93nouKt-IMT7wd98K5nvkZJrqz3aVs9K776fU
```

Check all 3 environments for both.

### 5️⃣ Redeploy (1 minute)

```bash
vercel --prod
```

### 6️⃣ Test (2 minutes)

Visit your Vercel URL and test:
- Homepage loads ✅
- Submit event booking form ✅
- Check Supabase → event_bookings table ✅

---

## 🎉 Done!

Your site is now fully functional!

## 📚 Detailed Guides

- **Full deployment guide**: `VERCEL_DEPLOYMENT.md`
- **Complete setup**: `COMPLETE_DEPLOYMENT_GUIDE.md`
- **Git push issues**: `GIT_PUSH_FIX.md`

## 🆘 Need Help?

Common issues:
- **Forms return errors**: Check environment variables in Vercel
- **500 errors**: Verify database tables exist in Supabase
- **404 errors**: Run `vercel --prod --force`
