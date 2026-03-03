# ConnectoFarmo Frontend - Quick Setup Guide

A step-by-step guide to get ConnectoFarmo Frontend running locally in minutes.

---

## ⚡ Quick Start (5 minutes)

### 1️⃣ Prerequisites Check

First, verify you have Node.js and npm installed:

```bash
node --version    # Should be v16+
npm --version     # Should be v8+
```

**Don't have them?** [Download Node.js](https://nodejs.org/) (npm comes included)

### 2️⃣ Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd connectoFarmoFrontend

# Install dependencies (takes ~2-3 minutes)
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

**That's it!** Open **http://localhost:5173** in your browser.

---

## 🔧 Full Setup Instructions

### Step 1: Verify Installation

Before proceeding, ensure all prerequisites are met:

```bash
# Check Node.js version
node --version
# Expected: v16.0.0 or higher (ideally v18+)

# Check npm version
npm --version
# Expected: v8.0.0 or higher

# Check Git is installed
git --version
# Expected: version output
```

If any of these fail, install the missing tools.

### Step 2: Clone the Repository

**Using HTTPS (recommended for most users):**

```bash
git clone https://github.com/your-org/connectoFarmoFrontend.git
cd connectoFarmoFrontend
```

**Using SSH (if you have SSH keys configured):**

```bash
git clone git@github.com:your-org/connectoFarmoFrontend.git
cd connectoFarmoFrontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs all packages from `package.json`:

- React & React DOM
- React Router for navigation
- Axios for HTTP requests
- TypeScript & dev tools
- Vite & build utilities

**Expected output:**

```
up to date, audited 150 packages in 3.5s
```

**Troubleshooting:**

- If you get permission errors on macOS/Linux, try `sudo npm install` instead
- If installation hangs, clear cache: `npm cache clean --force`
- For proxy issues: Configure npm proxy settings

### Step 4: Environment Setup

The application needs environment variables to connect to the backend API.

#### Option A: Using .env.local (Recommended)

Create `.env.local` in the root directory:

```bash
# Linux/macOS
touch .env.local

# Windows (PowerShell)
New-Item -Path .env.local -Type File
```

**Add this content to `.env.local`:**

```env
# Backend API Configuration
VITE_API_URL=http://localhost:8080

# Request timeout in milliseconds
VITE_API_TIMEOUT=30000

# Environment
VITE_ENV=development

# Feature flags
VITE_ENABLE_ANALYTICS=true
```

#### Option B: Using .env.example

If `.env.example` exists in the repository:

```bash
# Copy the example file
cp .env.example .env.local

# Edit to match your backend configuration
# (Use your editor of choice)
```

### Step 5: Configure Backend Connection

Verify your backend API is accessible:

```bash
# Test if backend is running (default port 8080)
curl http://localhost:8080

# Or check a specific endpoint
curl http://localhost:8080/api/health
```

**Expected:** Some response from backend (not "Connection refused")

**If connection fails:**

1. Start your backend server (Spring Boot application)
2. Verify it's running on port 8080 (or update VITE_API_URL)
3. Check firewall isn't blocking the port
4. Verify CORS is enabled in backend

### Step 6: Start Development Server

```bash
npm run dev
```

**Expected output:**

```
VITE v7.3.1  ready in 345 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

**Open the application:**

- Automatic browser open, OR
- Manually navigate to: **http://localhost:5173**

---

## 📋 Verification Checklist

After setup, verify everything works:

- [ ] Terminal shows "ready" message without errors
- [ ] Browser opens to http://localhost:5173
- [ ] Home page loads successfully
- [ ] Navbar and navigation visible
- [ ] Links work (click around the public pages)
- [ ] Can navigate to Login page
- [ ] No red errors in browser console (F12)

---

## 🛠️ Common Setup Issues

### Issue: Port 5173 Already in Use

**Error:** `EADDRINUSE: address already in use :::5173`

**Solution:**

```bash
# Windows (PowerShell)
netstat -ano | findstr :5173
# Find the PID number, then:
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>

# Or use a different port:
npm run dev -- --port 3000
```

### Issue: Module Not Found / Dependencies Missing

**Error:** `Cannot find module 'react'`

**Solution:**

```bash
# Delete installed packages and lock file
rm -rf node_modules package-lock.json

# Reinstall cleanly
npm install
```

### Issue: Backend Connection Failed

**Error:** `GET http://localhost:8080/api/... 500 (Internal Server Error)`

**Solutions:**

1. **Check backend is running:**

   ```bash
   # Try to access backend directly
   curl http://localhost:8080
   ```

2. **Verify VITE_API_URL in .env.local:**

   ```env
   # Check if this matches your backend URL
   VITE_API_URL=http://localhost:8080
   ```

3. **Check CORS configuration in backend:**
   - Backend must allow requests from http://localhost:5173
   - Look for @CrossOrigin annotation in Spring Boot code

4. **Check firewall/network:**
   - Verify port 8080 isn't blocked
   - Try accessing backend URL in browser directly

### Issue: TypeScript/Build Errors

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solution:**

```bash
# Run linter to see all issues
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check types more carefully
npm run build  # This runs type checking
```

### Issue: Changes Not Reflecting

**Error:** Code changes don't appear in browser

**Solution:**

1. Restart dev server: Press `Ctrl+C` then `npm run dev`
2. Check file was actually saved (look for dot next to filename in editor)
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Try hard refresh: `Ctrl+F5`

### Issue: Node Modules Installation Fails

**Error:** `npm ERR!` with various messages

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Use npm ci for cleaner install (uses package-lock.json)
npm ci

# If using slow internet, increase timeout
npm install --fetch-timeout=120000
```

---

## 📝 Environment Variables Reference

| Variable                | Purpose              | Default               | Required |
| ----------------------- | -------------------- | --------------------- | -------- |
| `VITE_API_URL`          | Backend API base URL | http://localhost:8080 | Yes      |
| `VITE_API_TIMEOUT`      | Request timeout (ms) | 30000                 | No       |
| `VITE_ENV`              | Environment mode     | development           | No       |
| `VITE_ENABLE_ANALYTICS` | Enable analytics     | true                  | No       |

---

## 🚀 Next Steps After Setup

### 1. Test Login

1. Navigate to http://localhost:5173/login
2. Use test credentials (from your backend):
   - **Farmer**: farmer@test.com / password123
   - **Consumer**: consumer@test.com / password123
   - **Admin**: admin@test.com / password123

3. You should be redirected to the appropriate dashboard

### 2. Explore the App

- **Farmer**: Create a product post, view orders
- **Consumer**: Browse marketplace, place an order
- **Admin**: View all users

### 3. Understand the Structure

Read [README.md](README.md) sections:

- [Project Structure](#project-structure) - Folder organization
- [Role-Based Access Control](#role-based-access-control) - Permission system
- [API Integration](#api-integration) - Backend communication

### 4. Start Development

- Edit files in `src/` folder
- Changes automatically reload (HMR)
- Check browser console (F12) for errors

---

## 💡 Development Tips

### Run Multiple Services

Keep terminal windows organized:

```bash
# Terminal 1: Frontend
cd connectoFarmoFrontend
npm run dev

# Terminal 2: Run backend (if needed)
cd ../connectoFarmoBackend
./mvnw spring-boot:run

# Terminal 3: Optional - use Git
git status
git commit -m "message"
```

### Use Browser DevTools

Press `F12` to open Developer Tools:

- **Console tab**: See error messages
- **Network tab**: Monitor API calls
- **Application tab**: View stored data
- **Elements tab**: Inspect HTML structure

### Keyboard Shortcuts in Dev Server

```
h      Help - show all shortcuts
r      Restart the dev server
c      Clear console
q      Quit
```

### Enable Debug Output

Set environment variable for verbose logs:

```bash
# Linux/macOS
DEBUG=* npm run dev

# Windows (PowerShell)
$env:DEBUG = '*'; npm run dev
```

---

## 📚 Useful Commands

| Command                 | What it does                              |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start development server with auto-reload |
| `npm run build`         | Create production build in `dist/` folder |
| `npm run preview`       | View production build locally             |
| `npm run lint`          | Check code quality with ESLint            |
| `npm run lint -- --fix` | Auto-fix linting issues                   |

---

## 🔄 Daily Development Workflow

**Starting work:**

```bash
# Pull latest changes
git pull origin main

# Ensure dependencies are up to date
npm install

# Start development server
npm run dev
```

**During development:**

```bash
# Check code quality periodically
npm run lint

# Make commits as you work
git add .
git commit -m "Feature: description"
```

**Before pushing:**

```bash
# Run full build to check for errors
npm run build

# Linting and type checking
npm run lint
```

**Pushing changes:**

```bash
# Push to repository
git push origin feature-branch

# Create Pull Request via GitHub/GitLab UI
```

---

## 🆘 Getting Help

### Check Documentation

1. **This file** - Setup & common issues
2. **[README.md](README.md)** - Full project documentation
3. **[Vite Docs](https://vitejs.dev/)** - Build tool help
4. **[React Docs](https://react.dev/)** - Framework reference
5. **[TypeScript Docs](https://www.typescriptlang.org/)** - Language help

### Debug Steps

1. Check browser console (F12)
2. Check terminal output
3. Verify .env.local is correct
4. Ensure backend is running
5. Clear cache: `npm cache clean --force`
6. Restart dev server: `Ctrl+C` then `npm run dev`

### Ask for Help

Include these details when asking for help:

- Node version: `node --version`
- npm version: `npm --version`
- Error message (full, with context)
- Steps you've already tried
- Operating system (Windows/macOS/Linux)

---

## ✅ Success Indicators

After successful setup, you should see:

✅ `npm run dev` starts without errors  
✅ Browser opens automatically to http://localhost:5173  
✅ Home page displays correctly  
✅ No red errors in console (F12)  
✅ Navigation links work  
✅ Can navigate to /login page  
✅ API calls appear in Network tab (F12)

---

## 📞 Support Contacts

- **Technical Issues**: Create issue on GitHub
- **Backend Issues**: Check backend repository
- **General Questions**: Check README.md troubleshooting section

---

**Last Updated:** March 3, 2026

**Version:** 1.0.0

Need more help? Refer to [README.md](README.md) for detailed documentation on every aspect of the project!
