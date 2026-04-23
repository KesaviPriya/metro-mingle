# Supabase Setup Guide

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Google
4. Create a new project (choose region closest to you)

## Step 2: Get API Keys
1. Go to Project Settings > API
2. Copy these values:
   - `Project URL` → This is your `SUPABASE_URL`
   - `anon public` key → This is your `SUPABASE_ANON_KEY`

## Step 3: Create Database Tables

Go to SQL Editor in Supabase and run these queries:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### Event Bookings Table
```sql
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
```

### Payments Table
```sql
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
```

### Contact Messages Table
```sql
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

## Step 4: Configure Vercel Environment Variables

In your Vercel project dashboard:
1. Go to Settings > Environment Variables
2. Add these variables:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon public key

## Step 5: Update HTML Forms

Forms need to handle JSON responses. Add this script before `</body>`:

```html
<script>
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        window.location.href = 'main1.html'; // Redirect on success
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  });
});
</script>
```

## Step 6: Deploy
```bash
npm install
vercel --prod
```

## Migration from MySQL

Your current data in CSV files can be imported:
1. Export CSV to JSON
2. Use Supabase Dashboard > Table Editor > Insert rows
3. Or use the Supabase API to bulk insert

## Authentication Flow

### Signup
- User submits form → `/api/signup`
- Creates auth user + stores profile in `users` table
- Returns success

### Login
- User submits form → `/api/login`
- Returns session token
- Store token in localStorage for authenticated requests

## Next Steps
1. Add client-side auth state management
2. Protect routes that require login
3. Add password reset functionality
4. Enable social logins (Google, Facebook)
