# ConnectoFarmo Frontend - Quick Reference

A handy cheat sheet for common commands, workflows, and solutions.

---

## ⚡ Essential Commands

### Project Setup

```bash
npm install              # Install all dependencies
npm run dev              # Start dev server on http://localhost:5173
npm run build            # Create production build
npm run preview          # Test production build locally
npm run lint             # Check code quality
npm run lint -- --fix    # Auto-fix linting issues
```

### Git Workflow

```bash
git status               # Check current status
git add .                # Stage changes for commit
git commit -m "message"  # Commit changes
git push origin branch   # Push to remote
git pull origin main     # Get latest changes
```

---

## 🗂️ File Structure Quick Map

```
src/
├── api/services/         → API calls (services)
├── components/           → React components
├── context/              → Global state (AuthContext)
├── layouts/              → Page layouts
├── pages/                → Page components
├── routes/               → Routing config
├── styles/               → Global CSS
├── types/                → TypeScript types
└── utils/                → Helper functions

Root Files:
├── .env.local            → Environment variables (create this)
├── .env.example          → Example env variables
├── package.json          → Dependencies
├── tsconfig.json         → TypeScript config
├── vite.config.ts        → Vite config
├── README.md             → Full documentation
├── SETUP.md              → Setup guide
├── ARCHITECTURE.md       → Architecture details
└── CONTRIBUTING.md       → Contribution guidelines
```

---

## 🔧 Quick Troubleshooting

### Issue: Port Already in Use

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Issue: Dependencies Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Changes Not Showing

```bash
# Restart dev server
# Ctrl+C to stop, then:
npm run dev

# Or hard refresh browser:
Ctrl+Shift+Delete  # Clear cache
Ctrl+F5            # Hard refresh
```

### Issue: TypeScript/Build Errors

```bash
npm run lint -- --fix    # Fix auto-fixable issues
npm run build            # Check for build errors
```

### Issue: Backend Connection Failed

```bash
# Test backend is running
curl http://localhost:8080

# Check .env.local has correct API URL
cat .env.local | grep VITE_API_URL

# Ensure backend CORS is enabled
```

---

## 📝 Useful Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8080
VITE_API_TIMEOUT=30000
VITE_ENV=development
VITE_ENABLE_ANALYTICS=true
```

---

## 🚀 Common Workflows

### Local Development

```bash
# 1. Start dev server
npm run dev

# 2. Make code changes (auto-reloads)

# 3. Test in browser
# Open http://localhost:5173

# 4. Check quality
npm run lint

# 5. Commit when done
git add .
git commit -m "feat: description"
```

### Creating a Feature Branch

```bash
# Create and switch to new branch
git checkout -b feature/my-feature

# Make your changes...
# Test locally (npm run dev)

# Stage and commit
git add .
git commit -m "feat(scope): description"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Building for Production

```bash
# Create optimized build
npm run build

# Preview the built version
npm run preview

# Output is in dist/ folder
```

### Code Review Checklist

Before committing:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Tested manually in browser
- [ ] Commit message is clear
- [ ] No `console.log()` left
- [ ] No hardcoded values without explanation

---

## 🎯 Common Code Patterns

### Fetch Data in Component

```tsx
import { useEffect, useState } from "react";
import { postService } from "@/api/services/postService";
import type { PostDto } from "@/types";

export default function MyComponent() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Use Authentication

```tsx
import { useAuth } from "@/context/AuthContext";

export default function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Form Input with State

```tsx
import { useState } from "react";
import { Input } from "@/components/ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call login API
      console.log("Logging in:", email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
    </form>
  );
}
```

### Protected Route Example

```tsx
// In AppRouter.tsx
<Route element={<PrivateRoute allowedRoles={["FARMER"]} />}>
  <Route path="/farmer/*" element={<FarmerDashboard />} />
</Route>
```

---

## 🐛 Debug Tips

### Browser DevTools (F12)

**Console Tab:**

- View error messages
- Run JavaScript: `localStorage.getItem('token')`
- Check AuthContext: `window.__AUTH_STATE__` (if exposed)

**Network Tab:**

- Monitor API requests
- Check request headers (Authorization, Content-Type)
- Verify response structure
- Check response status (200, 401, 403, 500)

**Application Tab (previously Storage):**

- View localStorage
- Check cookies
- Inspect IndexedDB

### TypeScript Errors

```bash
# See all type errors
npm run build

# More details in VS Code
# Ctrl+Shift+M for Problems panel

# Fix issues
npm run lint -- --fix
```

### API Issues

```tsx
// Add temporary logging in service
async getAllPosts() {
  console.log('Fetching posts...');
  const response = await axiosInstance.get('/posts');
  console.log('Response:', response.data);
  return response.data;
}

// Then check browser console (F12)
```

---

## 📚 Documentation Quick Links

- **Setup Help**: See [SETUP.md](SETUP.md)
- **Full Docs**: See [README.md](README.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🔑 Key Concepts

### Components

- Functional components with hooks
- Props for input data
- State for internal data
- Effects for side effects (data fetching, etc.)

### Services

- Centralized API communication
- Axios for HTTP requests
- JWT token in headers automatically
- Error handling

### Context

- Global state management
- AuthContext for user/auth data
- useContext hook for access
- Wrapped around whole app

### Routing

- React Router v7
- Lazy-loaded pages (code splitting)
- Protected routes with role check
- Role-based redirects

---

## 🎨 CSS Quick Tips

### Use Global Variables

```css
/* In globals.css */
:root {
  --primary: #10b981;
  --secondary: #f59e0b;
  --text-primary: #1c1c1e;
  --bg-primary: #ffffff;
}

/* In component CSS */
.button {
  background-color: var(--primary);
  color: var(--bg-primary);
}
```

### BEM Naming

```css
/* Block */
.card {
}

/* Element */
.card__header {
}
.card__body {
}
.card__footer {
}

/* Modifier */
.card--active {
}
.card--disabled {
}
```

### Responsive

```css
.container {
  padding: 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 2rem; /* Tablet+ */
  }
}
```

---

## 🚨 Don't Forget

- ✅ Add `.env.local` to `.gitignore` (sensitive data)
- ✅ Never commit API keys or tokens
- ✅ Remove `console.log()` before committing
- ✅ Test in multiple browsers
- ✅ Check responsive design (mobile view)
- ✅ Run tests before pushing
- ✅ Update documentation for new features
- ✅ Keep commits atomic and focused

---

## 💡 Best Practices

### Writing Components

```tsx
// ✅ Good
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    loadUser();
  }, [userId]);

  // ...
}

// ❌ Avoid
function UserProfile(props) {
  const [user, setUser] = useState(null);
  // No dependency array, implicit prop access
}
```

### Naming Variables

```tsx
// ✅ Good
const isLoading = true;
const isProfessional = user.role === "FARMER";
const getUserName = () => user.name;

// ❌ Avoid
const loading = true; // Is it a string or boolean?
const prof = user.role === "FARMER"; // Not clear
const getUser = () => user.name; // Misleading
```

### Error Handling

```tsx
// ✅ Good
try {
  const data = await postService.getPost(id);
  setPost(data);
} catch (err) {
  setError("Failed to load post. Please try again.");
  console.error(err);
}

// ❌ Avoid
try {
  // ...
} catch (err) {
  // Silently fail
}
```

---

## 🔗 Useful Resources

| Topic        | Link                            |
| ------------ | ------------------------------- |
| React Docs   | https://react.dev/              |
| React Router | https://reactrouter.com/        |
| TypeScript   | https://www.typescriptlang.org/ |
| Vite         | https://vitejs.dev/             |
| Axios        | https://axios-http.com/         |
| Git Docs     | https://git-scm.com/doc         |

---

## 📞 Getting Help

1. **Check existing docs** - README.md, SETUP.md, ARCHITECTURE.md
2. **Search Google** - Most issues are common
3. **Check browser console** (F12) - Error messages are usually helpful
4. **Read error messages carefully** - They often point to the solution
5. **Ask on team Slack/Discord** - With error details and what you've tried

---

**Version**: 1.0.0  
**Last Updated**: March 3, 2026

Happy Coding! 🚀
