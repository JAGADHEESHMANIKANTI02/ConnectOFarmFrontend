# ConnectoFarmo Frontend

A modern React/TypeScript web application connecting farmers and consumers in a direct marketplace platform. Built with Vite for fast development and optimal performance.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Environment Configuration](#environment-configuration)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Available Scripts](#available-scripts)
- [Authentication System](#authentication-system)
- [Role-Based Access Control](#role-based-access-control)
- [API Integration](#api-integration)
- [Component Architecture](#component-architecture)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

ConnectoFarmo is a digital marketplace platform that bridges the gap between farmers and consumers. The platform enables farmers to list their agricultural products, manage orders, and connect directly with consumers while allowing consumers to browse products, place orders, and track their purchases.

**Platform URL:** [Your deployed URL here]

---

## ✨ Key Features

### For Farmers

- **Post Management**: Create, edit, and delete product listings with images
- **Order Management**: View and manage incoming orders from consumers
- **Dashboard**: Real-time insights and analytics
- **Product Visibility**: List agricultural products with detailed information
- **Direct Communication**: Connect with interested consumers

### For Consumers

- **Product Browsing**: Explore available agricultural products
- **Search & Filter**: Find products by location and category
- **Order Placement**: Place orders with real-time quantity tracking
- **Order History**: View past and ongoing orders
- **Wishlist**: Save favorite products (expandable feature)

### For Administrators

- **User Management**: Monitor and manage all platform users
- **Platform Analytics**: View overall platform statistics
- **User Moderation**: Handle user accounts and permissions
- **System Health**: Monitor platform performance

---

## 🛠️ Technology Stack

### Frontend Framework

- **React** (v19.2.0) - UI library with hooks-based architecture
- **TypeScript** (v5.9.3) - Type-safe JavaScript
- **Vite** (v7.3.1) - Fast build tool and dev server

### Routing & State Management

- **React Router DOM** (v7.13.0) - Client-side routing with lazy loading
- **React Context API** - Authentication and global state management
- **Custom Hooks** - Reusable logic encapsulation

### HTTP & Authentication

- **Axios** (v1.13.5) - HTTP client with interceptors
- **JWT Decode** (v4.0.0) - JWT token parsing and validation
- **JWT-based Authentication** - Secure token-based auth system

### UI & UX

- **Lucide React** (v0.575.0) - Modern icon library
- **React Hot Toast** (v2.6.0) - Toast notifications
- **CSS Modules & Custom CSS** - Styling approach

### Development & Code Quality

- **ESLint** (v9.39.1) - Code linting
- **Typescript-eslint** - TypeScript specific linting rules
- **Vite Dev Server** - Hot Module Replacement (HMR)

---

## 📁 Project Structure

```
connectoFarmoFrontend/
├── src/
│   ├── api/                      # API configuration and services
│   │   ├── axiosInstance.ts      # Axios instance with interceptors
│   │   └── services/
│   │       ├── authService.ts    # Authentication API calls
│   │       ├── userService.ts    # User management API calls
│   │       ├── postService.ts    # Product listing API calls
│   │       └── orderService.ts   # Order management API calls
│   │
│   ├── components/               # Reusable React components
│   │   ├── admin/                # Admin-specific components
│   │   │   └── UserTable.tsx     # User management table
│   │   ├── common/               # Shared components
│   │   │   └── ImageDisplay.tsx  # Image rendering component
│   │   ├── layout/               # Layout components
│   │   │   ├── Navbar.tsx        # Top navigation bar
│   │   │   └── Sidebar.tsx       # Side navigation menu
│   │   ├── order/                # Order-related components
│   │   │   └── OrderCard.tsx     # Order display card
│   │   ├── post/                 # Product post components
│   │   │   └── PostCard.tsx      # Product listing card
│   │   └── ui/                   # Reusable UI elements
│   │       ├── Button.tsx        # Button component
│   │       ├── Input.tsx         # Input field component
│   │       ├── Modal.tsx         # Modal dialog component
│   │       ├── Badge.tsx         # Badge component
│   │       └── Spinner.tsx       # Loading spinner component
│   │
│   ├── context/                  # React Context (state management)
│   │   └── AuthContext.tsx       # Authentication context
│   │
│   ├── layouts/                  # Page layout wrappers
│   │   ├── PublicLayout.tsx      # Layout for public pages
│   │   └── DashboardLayout.tsx   # Layout for authenticated pages
│   │
│   ├── pages/                    # Page components (route targets)
│   │   ├── admin/                # Admin pages
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── UsersPage.tsx
│   │   ├── consumer/             # Consumer pages
│   │   │   ├── ConsumerDashboard.tsx
│   │   │   └── MyOrdersPage.tsx
│   │   ├── farmer/               # Farmer pages
│   │   │   ├── FarmerDashboard.tsx
│   │   │   ├── MyPostsPage.tsx
│   │   │   ├── CreatePostPage.tsx
│   │   │   └── FarmerOrdersPage.tsx
│   │   └── public/               # Public pages (no auth required)
│   │       ├── HomePage.tsx
│   │       ├── LoginPage.tsx
│   │       ├── RegisterPage.tsx
│   │       ├── MarketplacePage.tsx
│   │       ├── PostDetailPage.tsx
│   │       └── UnauthorizedPage.tsx
│   │
│   ├── routes/                   # Routing configuration
│   │   ├── AppRouter.tsx         # Main router setup
│   │   └── PrivateRoute.tsx      # Route protection wrapper
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css           # Global CSS variables and styles
│   │
│   ├── types/                    # TypeScript interfaces & types
│   │   └── index.ts              # All type definitions
│   │
│   ├── utils/                    # Utility functions
│   │   └── authUtils.ts          # Auth helper functions
│   │
│   ├── App.tsx                   # Root React component
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite environment types
│
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node-specific TS config
├── vite.config.ts                # Vite configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

---

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
node --version      # Should show v16.0.0 or higher
npm --version       # Should show v8.0.0 or higher
git --version       # Should show installed version
```

---

## 🚀 Setup Guide

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd connectoFarmoFrontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:

- React and React DOM
- React Router for navigation
- Axios for HTTP requests
- Vite and build tools
- TypeScript and development dependencies

**Expected Output:**

```
up to date, audited 150 packages in 2.45s
```

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Linux/macOS
cp .env.example .env.local

# Windows PowerShell
copy .env.example .env.local
```

If no `.env.example` exists, create `.env.local` manually:

```env
# API Configuration
VITE_API_URL=http://localhost:8080
VITE_API_TIMEOUT=30000

# Environment
VITE_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=true
```

### Step 4: Verify Backend Connection

Ensure your backend API server is running on the configured URL:

```bash
# Test API connectivity
curl http://localhost:8080/api/health
# Or use Postman to test the endpoint
```

### Step 5: Start Development Server

```bash
npm run dev
```

**Expected Output:**

```
VITE v7.3.1  ready in 345 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

Access the application: **http://localhost:5173/**

---

## ⚙️ Environment Configuration

### Available Environment Variables

| Variable                | Default                 | Description               |
| ----------------------- | ----------------------- | ------------------------- |
| `VITE_API_URL`          | `http://localhost:8080` | Backend API base URL      |
| `VITE_API_TIMEOUT`      | `30000`                 | API request timeout in ms |
| `VITE_ENV`              | `development`           | Environment mode          |
| `VITE_ENABLE_ANALYTICS` | `true`                  | Enable analytics tracking |

### Production Configuration

For production deployment, create a `.env.production` file:

```env
VITE_API_URL=https://api.connectofarmo.com
VITE_API_TIMEOUT=30000
VITE_ENV=production
VITE_ENABLE_ANALYTICS=true
```

---

## 💻 Development Workflow

### Running the Development Server

```bash
npm run dev
```

- Automatically opens at `http://localhost:5173/`
- Hot Module Replacement (HMR) enabled - changes reflect instantly
- TypeScript errors shown in terminal and browser console

### Code Quality & Linting

```bash
# Run ESLint to check code quality
npm run lint

# Fix auto-fixable linting issues
npm run lint -- --fix
```

### Project Navigation

**Key Keyboard Shortcuts in Terminal:**

```
h        Show help message
c        Clear console
q        Quit Vite dev server
r        Restart server
[space]  Show keyboard shortcuts
```

### TypeScript Compilation

TypeScript is automatically compiled during development. Check errors in:

- VS Code Problems panel (Ctrl+Shift+M)
- Terminal output
- Browser console

---

## 🏗️ Building for Production

### Create Optimized Build

```bash
npm run build
```

**Process:**

1. TypeScript compilation
2. Code bundling and minification
3. CSS optimization
4. Asset compression
5. Tree-shaking unused code

**Output Location:** `dist/` directory

### Test Production Build Locally

```bash
npm run preview
```

Serves the built application at `http://localhost:4173/` (read-only)

### Build Analysis

The build includes:

- **Code Splitting**: Automatic chunking for optimal load times
- **Lazy Loading**: Route-based code splitting
- **Asset Optimization**: Images and CSS are minimized
- **Source Maps**: For production debugging (if enabled)

---

## 📝 Available Scripts

| Command           | Purpose                           | Usage                |
| ----------------- | --------------------------------- | -------------------- |
| `npm run dev`     | Start development server with HMR | Active development   |
| `npm run build`   | Create optimized production build | Before deployment    |
| `npm run preview` | Preview production build locally  | Testing build output |
| `npm run lint`    | Analyze code quality              | Code review          |

---

## 🔐 Authentication System

### Overview

The application uses JWT (JSON Web Tokens) for secure authentication:

```
User Login → Backend validates → Returns JWT token → Stored in state
↓
Each API request includes token in Authorization header
↓
Backend validates token before processing request
```

### How It Works

1. **Login**: User submits credentials to `/login` endpoint
2. **Token Reception**: Backend returns JWT token containing user info
3. **Token Storage**: Stored in AuthContext (in-memory state)
4. **Token Usage**: Axios interceptor adds token to all API requests
5. **Token Validation**: JWT parsed to extract user role and permissions
6. **Token Expiry**: Automatic logout when token expires

### Token Structure

JWT tokens contain these claims:

```json
{
  "sub": "user@example.com",
  "id": 1,
  "name": "John Farmer",
  "role": "FARMER",
  "roles": ["FARMER"],
  "exp": 1704067200
}
```

### Implementation Files

- **[AuthContext.tsx](src/context/AuthContext.tsx)** - Authentication state
- **[authService.ts](src/api/services/authService.ts)** - Auth API calls
- **[PrivateRoute.tsx](src/routes/PrivateRoute.tsx)** - Route protection
- **[AppRouter.tsx](src/routes/AppRouter.tsx)** - Route configuration

---

## 🔑 Role-Based Access Control

### Three User Roles

#### 1. **FARMER**

- **Access**: Farmer-specific dashboard and pages
- **Permissions**:
  - Create, edit, delete product listings
  - View incoming orders
  - Manage product inventory
  - View farmer dashboard with analytics
- **Routes**:
  - `/farmer/dashboard`
  - `/farmer/posts` (My Posts)
  - `/farmer/posts/create`
  - `/farmer/orders`

#### 2. **CONSUMER**

- **Access**: Consumer-specific dashboard and pages
- **Permissions**:
  - Browse marketplace
  - Place orders
  - View order history
  - Track order status
- **Routes**:
  - `/consumer/dashboard`
  - `/consumer/orders`
  - `/marketplace`
  - `/posts/:id` (view details)

#### 3. **ADMIN**

- **Access**: Admin-specific management pages
- **Permissions**:
  - View all users
  - Manage user accounts
  - Monitor platform activity
  - View system analytics
- **Routes**:
  - `/admin/dashboard`
  - `/admin/users`

### Route Protection

Protected routes use `PrivateRoute` component:

```tsx
<Route element={<PrivateRoute allowedRoles={["FARMER"]} />}>
  <Route path="/farmer/*" element={<FarmerDashboard />} />
</Route>
```

**Protection Logic:**

- Checks if user is authenticated
- Verifies user role matches allowed roles
- Redirects to `/unauthorized` if access denied
- Redirects to `/login` if not authenticated

---

## 🌐 API Integration

### Axios Instance

Configured in [axiosInstance.ts](src/api/services/axiosInstance.ts):

```typescript
- Base URL: Configured from environment
- Timeout: 30 seconds default
- Interceptors: Auto-add JWT token to requests
- Error Handling: Centralized error responses
```

### Service Layer

API calls organized by domain:

**[authService.ts](src/api/services/authService.ts)** - Authentication

```typescript
-login(email, password) - register(userData) - logout();
```

**[userService.ts](src/api/services/userService.ts)** - User Management

```typescript
-getUsers() - getUserById(id) - updateUser(id, data);
```

**[postService.ts](src/api/services/postService.ts)** - Product Posts

```typescript
-getAllPosts() -
  getPostById(id) -
  createPost(postData) -
  updatePost(id, data) -
  deletePost(id);
```

**[orderService.ts](src/api/services/orderService.ts)** - Orders

```typescript
-getAllOrders() -
  getOrdersByUser(userId) -
  createOrder(orderData) -
  updateOrder(id, status);
```

### Error Handling

Axios interceptors handle:

- 401 (Unauthorized) - Auto logout
- 403 (Forbidden) - Redirect to unauthorized page
- 5xx (Server errors) - Toast notifications
- Network errors - Connection error handling

---

## 🏗️ Component Architecture

### Components Organization

**UI Components** (`components/ui/`)

- Reusable, unstyled building blocks
- Button, Input, Modal, Badge, Spinner
- Controlled components for form inputs

**Feature Components** (`components/`)

- Domain-specific components
- OrderCard, PostCard, UserTable
- Combine UI components

**Layout Components** (`layouts/`)

- Page structure wrappers
- PublicLayout (public pages)
- DashboardLayout (authenticated pages)

### Component Patterns

**Functional Components:**

```tsx
export default function MyComponent({ prop1, prop2 }: Props) {
  const [state, setState] = useState("");

  return <div>...</div>;
}
```

**Custom Hooks:**

```tsx
const useAuth = () => useContext(AuthContext);
const usePost = (id: number) => {
  /* form logic */
};
```

---

## 🎨 Styling

### CSS Strategy

- **Global Styles**: [globals.css](src/styles/globals.css)
- **Component Styles**: Component-specific CSS files
- **CSS Variables**: Defined in globals.css for theming

### Color Palette

```css
--primary: #10b981 /* Green */ --secondary: #f59e0b /* Amber */
  --danger: #ef4444 /* Red */ --text-primary: #1c1c1e --bg-primary: #ffffff
  --border: #e5e0d8;
```

### Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

---

## 🐛 Troubleshooting

### Common Issues

#### **Port Already in Use**

Error: `EADDRINUSE: address already in use :::5173`

**Solution:**

```bash
# Windows: Find process using port 5173
netstat -ano | findstr :5173

# Kill process (Windows)
taskkill /PID <PID> /F

# Linux/macOS: Use lsof
lsof -i :5173
kill -9 <PID>
```

#### **Dependencies Not Installed**

Error: `Cannot find module 'react'`

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

#### **Backend Connection Failed**

Error: `GET http://localhost:8080/api/... NET::ERR_CONNECTION_REFUSED`

**Solution:**

1. Verify backend is running
2. Check `VITE_API_URL` in `.env.local`
3. Ensure backend CORS allows frontend URL
4. Check network firewall settings

#### **TypeScript Errors**

Error: `Type '...' is not assignable to type '...'`

**Solution:**

1. Check [types/index.ts](src/types/index.ts) for correct types
2. Verify data structure matches interface
3. Use `as const` for literal types if needed
4. Run `npm run lint -- --fix`

#### **Hot Module Replacement Not Working**

Symptoms: Changes don't reflect without full refresh

**Solution:**

1. Restart dev server: `npm run dev`
2. Check file was saved
3. Verify Vite config includes changes
4. Clear browser cache (Ctrl+Shift+Delete)

#### **Build Fails**

Error: `vite build` command fails

**Solution:**

```bash
# Clear build cache
rm -rf dist

# Verbose output to debug
npm run build -- --debug

# Check for TypeScript errors
npm run lint
```

#### **Performance Issues**

Slow development server:

**Solutions:**

- Reduce concurrent operations
- Check for memory leaks
- Restart dev server
- Check system resources (Task Manager on Windows)

### Debug Mode

Enable detailed logging:

```tsx
// In development
if (import.meta.env.DEV) {
  console.log("Debug info:", data);
}
```

### Support & Resources

- **Issues**: Check [Troubleshooting](#troubleshooting) section
- **Backend Issues**: Consult backend repository
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/

---

## 📚 Additional Resources

### Documentation

- [React Documentation](https://react.dev/)
- [React Router Guide](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Axios Documentation](https://axios-http.com/)

### Tools & Extensions

- **VS Code Extensions** (Recommended):
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Vue Plugin
  - ESLint
  - Prettier - Code formatter
  - REST Client (for API testing)

---

## 📄 License

[Add your license information here]

---

## 👥 Contributing

Please follow these guidelines when contributing:

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m 'Add YourFeature'`
3. Push to branch: `git push origin feature/YourFeature`
4. Submit a pull request with clear description

---

## 📞 Contact & Support

For questions or issues, please contact:

- **Development Team**: [dev-team@connectofarmo.com]
- **Issue Tracker**: [GitHub Issues]
- **Documentation**: [Wiki/Documentation Site]

---

**Last Updated**: March 3, 2026  
**Version**: 1.0.0
