# Login Fix Guide - Vercel Deployment

## Problem
PHP files (SIGNUP.php, log.php, login.php) return 403 errors on Vercel because Vercel doesn't support PHP.

## Solution
Migrated to serverless API routes with Supabase authentication.

## What Changed

### 1. New HTML Files (Use These Instead)
- `login-new.html` - Replaces log.php and login.php
- `signup-new.html` - Replaces SIGNUP.php

### 2. API Routes (Already Created)
- `/api/login.js` - Handles login
- `/api/signup.js` - Handles signup

### 3. URL Redirects
The vercel.json now redirects old PHP URLs to new HTML files:
- `/SIGNUP.php` → `/signup-new.html`
- `/log.php` → `/login-new.html`
- `/login.php` → `/login-new.html`

## Setup Steps

### 1. Configure Supabase Environment Variables
In your Vercel dashboard, add these environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public key

Get these from: https://app.supabase.com → Your Project → Settings → API

### 2. Update Links in Your Site
Replace any links to PHP files:
- Change `href="SIGNUP.php"` to `href="signup-new.html"`
- Change `href="log.php"` to `href="login-new.html"`
- Change `href="login.php"` to `href="login-new.html"`

### 3. Deploy to Vercel
```bash
git add .
git commit -m "Fix login - migrate from PHP to serverless API"
git push
```

## Testing
1. Visit your site: https://metro-mingle-tau.vercel.app
2. Try signup: https://metro-mingle-tau.vercel.app/signup-new.html
3. Try login: https://metro-mingle-tau.vercel.app/login-new.html

## How It Works
- HTML forms submit to `/api/login` or `/api/signup`
- API routes use Supabase for authentication
- On success, user is redirected to main1.html
- Session data is stored in localStorage

## Troubleshooting
- If you get "Server error", check Vercel logs for API errors
- Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in Vercel
- Check that your Supabase project is active
