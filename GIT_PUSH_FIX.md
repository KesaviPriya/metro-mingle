# Fix Git Push 403 Error

## Problem
You're logged in as `Mohith-c7` but trying to push to `KesaviPriya/metro-mingle`

## Solution 1: Use Personal Access Token (Recommended)

### Step 1: Create GitHub Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "metro-mingle-deploy"
4. Select scopes: ✅ repo (all)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Update Remote URL with Token
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/KesaviPriya/metro-mingle.git
```

Replace `YOUR_TOKEN` with the token you copied.

### Step 3: Push
```bash
git push origin main
```

## Solution 2: Use SSH (Alternative)

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "kesavipriya2006@gmail.com"
```
Press Enter 3 times (default location, no passphrase)

### Step 2: Copy SSH Key
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the entire output

### Step 3: Add to GitHub
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Paste the key
4. Click "Add SSH key"

### Step 4: Change Remote to SSH
```bash
git remote set-url origin git@github.com:KesaviPriya/metro-mingle.git
```

### Step 5: Push
```bash
git push origin main
```

## Solution 3: Use GitHub Desktop (Easiest)

1. Download: https://desktop.github.com/
2. Sign in with KesaviPriya account
3. Add repository: File → Add Local Repository
4. Select D:\metro-mingle
5. Click "Push origin"

## Quick Fix (Temporary)
If you just need to push once, use credential manager:

```bash
# Clear cached credentials
git credential-manager-core erase https://github.com

# Then push (will prompt for login)
git push origin main
```

When prompted:
- Username: KesaviPriya
- Password: Use Personal Access Token (not your GitHub password)
