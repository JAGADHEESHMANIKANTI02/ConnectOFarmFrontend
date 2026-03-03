# ConnectoFarmo Frontend - Developer Troubleshooting Guide

Comprehensive troubleshooting guide for common issues and advanced debugging scenarios.

---

## 🔍 Diagnosis Checklist

Before troubleshooting, gather information:

```bash
# System Information
node --version
npm --version
git --version

# Project Status
npm list react
git status
git log --oneline -5

# Browser
# Open DevTools (F12) and note:
- Browser version
- Console errors (red messages)
- Network tab status
- LocalStorage contents
```

---

## 🚀 Installation & Setup Issues

### NPM Installation Fails

**Symptoms:**

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

```bash
# Option 1: Clear cache and try again
npm cache clean --force
npm install

# Option 2: Use --legacy-peer-deps flag
npm install --legacy-peer-deps

# Option 3: Update npm itself
npm install -g npm@latest
npm install

# Option 4: Use npm ci instead (cleaner)
npm ci
```

### Permission Errors (macOS/Linux)

**Symptoms:**

```
npm ERR! Error: EACCES: permission denied
```

**Solution:**

```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then add to ~/.bash_profile or ~/.zshrc:
export PATH=~/.npm-global/bin:$PATH
```

### Slow Installation

**Symptoms:**

- Takes > 10 minutes to install
- "Sill idealTree buildDep" message

**Solutions:**

```bash
# Use npm ci (faster, uses lock file)
npm ci

# Increase timeout
npm install --fetch-timeout=120000

# Try different npm registry
npm install --registry https://registry.npmjs.org/

# Check network
ping registry.npmjs.org
```

---

## 🖥️ Development Server Issues

### Port Already in Use

**Symptoms:**

```
EADDRINUSE: address already in use :::5173
```

**Solutions:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :5173
# Output: TCP  0.0.0.0:5173  0.0.0.0:0  LISTENING  12345
taskkill /PID 12345 /F

# macOS/Linux
lsof -i :5173
# Output: node 12345 user  12u  IPv4 0x123...
kill -9 12345

# Or use a different port
npm run dev -- --port 3000
```

### Dev Server Hangs/Won't Start

**Symptoms:**

- `npm run dev` command hangs
- No "ready in" message
- Takes > 1 minute to start

**Solutions:**

```bash
# Check memory
# Windows: Task Manager (Ctrl+Shift+Esc)
# macOS: Activity Monitor
# Linux: htop

# Give more memory to Node
NODE_OPTIONS=--max-old-space-size=4096 npm run dev

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Hot Module Replacement (HMR) Not Working

**Symptoms:**

- Changes in code don't reflect in browser
- Must manually refresh page

**Solutions:**

```bash
# 1. Check file was saved
# Look for dot after filename in editor

# 2. Check Vite config
cat vite.config.ts
# Ensure plugins are configured

# 3. Restart dev server
# Ctrl+C to stop
npm run dev

# 4. Clear browser cache
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (macOS)

# 5. Hard refresh
# Ctrl+F5 (Windows/Linux)
# Cmd+Shift+R (macOS)

# 6. Check Vite HMR settings
# In vite.config.ts:
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})
```

---

## 🔑 Authentication Issues

### Can't Login

**Symptoms:**

- Login form submits but nothing happens
- Error: "Invalid credentials"
- Blank page after login attempt

**Debug Steps:**

```bash
# Step 1: Check backend is accessible
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Step 2: Check browser console (F12)
# Look for error messages
# Check Network tab for failed requests

# Step 3: Verify credentials
# Ensure email/password is correct
# Check backend logs for error details

# Step 4: Check .env.local
cat .env.local
# Ensure VITE_API_URL is correct
```

**Solutions:**

```bash
# If backend is not running:
cd ../connectoFarmoBackend
./mvnw spring-boot:run  # Or mvn spring-boot:run

# If CORS issue:
# Check backend has CORS configured
# Should allow http://localhost:5173

# If token not stored:
# Open DevTools -> Application -> SessionStorage
# Check for auth token
```

### Token Expired / Auto Logout

**Symptoms:**

- Logged in but suddenly redirected to login
- Error: "401 Unauthorized"

**Debug:**

```javascript
// In browser console (F12)
// Check token expiration
const token = localStorage.getItem("token"); // or from AuthContext
const decoded = jwtDecode(token);
console.log("Expires:", new Date(decoded.exp * 1000));

// Check if expired
Date.now() > decoded.exp * 1000; // true = expired
```

**Solutions:**

```bash
# Ensure backend token has longer expiration
# Check AuthContext logout logic
# Ensure token refresh endpoint exists

# Manually test in Postman:
# POST /api/auth/refresh
# With valid token in Authorization header
```

### Can't Access Protected Routes

**Symptoms:**

- Redirected to /unauthorized
- Can't see dashboard even though logged in
- "Access Denied" message

**Debug Steps:**

```javascript
// In browser console (F12)
// Check authentication state
const authState = sessionStorage.getItem("auth"); // or check React DevTools
console.log(authState);

// Check user role
// Look in AuthContext or localStorage
const token = localStorge.getItem("token");
jwtDecode(token).role; // Should be 'FARMER', 'CONSUMER', or 'ADMIN'
```

**Solutions:**

```bash
# Verify route protection in AppRouter.tsx
# Check PrivateRoute component logic
# Ensure role matches allowed roles for route

# Re-login with correct user role
# Check backend returned correct role in JWT
```

---

## 🌐 API & Network Issues

### Backend Connection Failed

**Symptoms:**

```
GET http://localhost:8080/api/posts 500 (Internal Server Error)
GET http://localhost:8080/api/... net::ERR_CONNECTION_REFUSED
```

**Diagnostic:**

```bash
# Check if backend is running
curl http://localhost:8080
# Should show response (not "Connection refused")

# Check specific endpoint
curl http://localhost:8080/api/posts

# Using Windows:
Test-NetConnection -ComputerName localhost -Port 8080
```

**Solutions:**

```bash
# 1. Start backend server
cd ../connectoFarmoBackend
./mvnw spring-boot:run  # mvn spring-boot:run on Windows

# 2. Check backend port
# Verify it's running on 8080
# Look at backend output: "Tomcat started on port(s): 8080"

# 3. Verify API URL in .env.local
cat .env.local | grep VITE_API_URL
# Should be: http://localhost:8080

# 4. Check firewall
# Windows Firewall might block port 8080
# Allow it through Settings > Firewall

# 5. Try accessing directly
# Open browser: http://localhost:8080/api/health (if exists)
```

### CORS Errors

**Symptoms:**

```
Access to XMLHttpRequest at 'http://localhost:8080/api/posts'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**

Ensure backend has CORS enabled:

```java
// In Spring Boot backend
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ApiController {
    // ...
}

// Or global CORS config
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Slow API Responses

**Symptoms:**

- Requests take > 5 seconds
- Spinner shows for long time
- User thinks app is frozen

**Debug:**

```bash
# Check Network tab (F12)
# Look at request/response time
# Yellow bar = waiting for server
# Blue bar = downloading

# Check backend performance
# Look at backend logs for slow queries
```

**Solutions:**

```bash
# 1. Increase timeout if needed
# In .env.local:
VITE_API_TIMEOUT=60000  # 60 seconds instead of 30

# 2. Check backend database
# Might be doing expensive queries
# Check database indexing

# 3. Add caching if appropriate
# Cache frequently accessed data

# 4. Add pagination
# Don't load all data at once
```

### 404 Not Found Errors

**Symptoms:**

```
GET http://localhost:8080/api/posts 404 (Not Found)
```

**Solutions:**

```bash
# 1. Check endpoint URL
# Typo in service URL?
cat src/api/services/postService.ts

# 2. Check backend has endpoint
# Make request directly:
curl http://localhost:8080/api/posts

# 3. Check route mapping
# Backend might have different path
# Might need /api/v1/posts or similar

# 4. Check request method
# Maybe need POST instead of GET
```

---

## 🔴 Build & Compilation Issues

### Build Fails

**Symptoms:**

```
npm run build fails
Error: '@/types' module not found
Type 'X' is not assignable to type 'Y'
```

**Solutions:**

```bash
# Clear build cache
rm -rf dist

# Check TypeScript errors
npx tsc --noEmit  # Show all TS errors

# Check linting
npm run lint

# Try verbose mode
npm run build -- --debug

# Check tsconfig.json
cat tsconfig.json
# Ensure paths are configured correctly
```

### TypeScript Errors

**Common Issues:**

```tsx
// ❌ Error: Cannot find module '@/types'
// Fix: Check tsconfig.json has path alias
// "paths": { "@/*": ["./src/*"] }

// ❌ Error: Property 'X' does not exist on type 'Y'
// Fix: Check type definition matches actual data structure

// ❌ Error: Type 'string' is not assignable to type 'never'
// Fix: Add type annotation to useState
const [value, setValue] = useState<string>("");

// ❌ Error: 'any' used
// Fix: Replace 'any' with proper type
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
```

**Solutions:**

```bash
# Show all errors
npm run build

# Fix auto-fixable issues
npm run lint -- --fix

# Use VS Code error explorer
# Ctrl+Shift+M for Problems panel
```

---

## 🎨 UI & Styling Issues

### Styles Not Applying

**Symptoms:**

- CSS changes don't show up
- Component renders but no styling

**Solutions:**

```bash
# 1. Check CSS file is imported
import './MyComponent.css';

# 2. Check class names match
// Component:
<div className="my-component">

// CSS:
.my-component { color: red; }

# 3. Check specificity
// More specific selectors override less specific
.my-component.active { color: blue; }  /* Applied */
.my-component { color: red; }

# 4. Clear browser cache
Ctrl+Shift+Delete  # Clear cache
Ctrl+F5            # Hard refresh

# 5. Check CSS syntax
# Use browser DevTools (F12) to inspect element
# Look at Styles tab to see applied rules
```

### Responsive Design Not Working

**Symptoms:**

- Layout looks good on desktop
- Mobile view is broken
- Width doesn't adjust

**Debug:**

```html
<!-- Add to HTML for testing -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Should already be in index.html -->
```

**Solutions:**

```bash
# Check media queries
grep -r "@media" src/

# Test in browser DevTools
# F12 -> Toggle device toolbar (Ctrl+Shift+M)
# Select different screen sizes

# Common breakpoints
@media (max-width: 640px) { }    /* Mobile */
@media (max-width: 1024px) { }   /* Tablet */
@media (min-width: 1200px) { }   /* Desktop */
```

---

## 🐛 Component/Logic Issues

### Component Won't Render

**Symptoms:**

- Page shows blank/white
- Component doesn't appear
- No error message

**Debug Steps:**

```javascript
// Add logging
function MyComponent() {
  console.log("MyComponent rendered"); // Check if renders

  return null; // START
  // Gradually add back JSX to find issue
}
```

**Solutions:**

```tsx
// ✅ Check return statement exists
function MyComponent() {
  // ❌ Missing return
  <div>Content</div>;

  // ✅ Add return
  return <div>Content</div>;
}

// ✅ Check conditional rendering
function MyComponent({ show }) {
  if (!show) return null; // OK
  return <div>Content</div>;
}
```

### Data Not Updating

**Symptoms:**

- Fetched data shows but won't update
- Changes don't reflect in UI
- State seems stuck

**Solutions:**

```tsx
// ❌ Problem: Missing dependency array
useEffect(() => {
  fetchData();
}); // Runs on every render

// ✅ Solution: Add dependency array
useEffect(() => {
  fetchData();
}, [id]); // Runs when id changes

// ❌ Problem: Mutating state directly
const items = [1, 2, 3];
items.push(4); // Won't trigger re-render

// ✅ Solution: Create new array
const items = [1, 2, 3];
setItems([...items, 4]); // Creates new array, triggers update
```

### Memory Leaks

**Symptoms:**

- Console warnings about memory
- Performance degrades over time
- "Can't perform React state update on unmounted component"

**Solutions:**

```tsx
// ✅ Cleanup in useEffect
useEffect(() => {
  const handleResize = () => {
    // ...
  };

  window.addEventListener("resize", handleResize);

  // CLEANUP - remove listener
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

// ✅ Cancel fetch on unmount
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    const data = await api.get("/data");
    if (isMounted) {
      // Check component still mounted
      setData(data);
    }
  };

  fetchData();

  return () => {
    isMounted = false; // Component unmounted
  };
}, []);
```

---

## 💾 Data & Storage Issues

### Token Not Persisting

**Symptoms:**

- Logged out after page refresh
- Token lost after navigation

**Debug:**

```javascript
// Check where token is stored
console.log(localStorage.getItem("token"));
console.log(sessionStorage.getItem("token"));
console.log(sessionStorage.getItem("auth"));
```

**Solution:**

```tsx
// Ensure token is stored on login
function login(token: string) {
  localStorage.setItem("token", token); // Persist
  setToken(token);
}

// Restore on app load
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, []);
```

### LocalStorage Full / Size Exceeded

**Symptoms:**

```
QuotaExceededError: LocalStorage quota exceeded
```

**Solutions:**

```javascript
// Check storage size
console.log(new Blob(Object.values(localStorage)).size); // bytes

// Clear old data
localStorage.removeItem("old-key");

// Or clear all
localStorage.clear();

// Better: Use proper strategy
// Don't store large amounts in localStorage
// Use sessionStorage for temporary data
```

---

## 🔧 Advanced Debugging

### Browser DevTools Network Tab

**Important columns:**

- **Name**: API endpoint
- **Status**: HTTP status (200, 401, 404, 500)
- **Size**: Response size
- **Time**: Request duration

**Debug JWT:**

```javascript
// In Console tab
const token = localStorage.getItem("token");
jwtDecode(token);

// Output: { sub, id, name, role, exp, iat }
```

### VS Code Debugging

**Install Debugger:**

```bash
npm install --save-dev @react-native-community/open-debugger
```

**Launch Config** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### React DevTools

**Install Extension:**

- Chrome: React Developer Tools extension
- Firefox: React DevTools extension

**Usage:**

- Inspect components hierarchy
- Check props and state
- Trigger state changes manually
- Profile performance

---

## 🆘 When All Else Fails

### Nuclear Option: Clean Install

```bash
# Remove everything and start fresh
rm -rf node_modules package-lock.json dist .next .vite

# Reinstall
npm install

# Start clean
npm run dev
```

### Check Logs

```bash
# Frontend logs
# Check browser console (F12)
# Check terminal output

# Backend logs
# Look at backend server output
# Check backend log files if configured
# Check database server logs (if applicable)
```

### Get Help

When asking for help, include:

```
1. Error message (full, with context)
2. Steps to reproduce
3. What you've already tried
4. Environment info:
   - Node version: (node --version)
   - npm version: (npm --version)
   - OS: (Windows/Mac/Linux)
5. Backend running? (yes/no)
6. .env.local configured? (yes/no)
```

---

## ✅ Debugging Checklist

Use this when nothing works:

- [ ] Close and reopen browser tab
- [ ] Hard refresh (Ctrl+F5)
- [ ] Check browser console (F12) for errors
- [ ] Check browser Network tab for failed requests
- [ ] Verify backend is running
- [ ] Check .env.local is correct
- [ ] Check CORS is enabled in backend
- [ ] Restart dev server (Ctrl+C, npm run dev)
- [ ] Clear node_modules and reinstall
- [ ] Check for typos in code
- [ ] Verify TypeScript types match data
- [ ] Run npm run lint
- [ ] Run npm run build to check for errors

---

**Last Updated**: March 3, 2026  
**Version**: 1.0.0

Remember: Most issues are solved by:

1. Reading error message carefully
2. Restarting (dev server or browser)
3. Clearing cache (npm, browser)
4. Checking configuration (.env.local, vite config)
5. Verifying backend is running

Happy debugging! 🐛
