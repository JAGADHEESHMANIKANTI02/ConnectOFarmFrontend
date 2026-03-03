# ConnectoFarmo Frontend - Architecture Guide

This document describes the overall architecture, design patterns, and structure of the ConnectoFarmo Frontend application.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│               React Application                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │         Presentation Layer (Components)     │   │
│  │  ┌──────────────┐  ┌──────────────────┐   │   │
│  │  │ Pages        │  │ Components       │   │   │
│  │  └──────────────┘  └──────────────────┘   │   │
│  └─────────────────────────────────────────────┘   │
│                          │                          │
│  ┌─────────────────────────────────────────────┐   │
│  │      State Management Layer                 │   │
│  │  ┌──────────────────────────────────────┐  │   │
│  │  │ Context (AuthContext)                │  │   │
│  │  └──────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────┘   │
│                          │                          │
│  ┌─────────────────────────────────────────────┐   │
│  │      API/Services Layer                     │   │
│  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌──────────────┐ │   │
│  │  │Auth│ │User│ │Post│ │Order│ │Axios Instance│ │   │
│  │  └───┘ └───┘ └───┘ └───┘ └──────────────┘ │   │
│  └─────────────────────────────────────────────┘   │
│                          │                          │
│  ┌─────────────────────────────────────────────┐   │
│  │  Utilities & Types                          │   │
│  │  ┌──────────────┐ ┌──────────────────────┐ │   │
│  │  │ Types (TS)   │ │ Auth Utils           │ │   │
│  │  └──────────────┘ └──────────────────────┘ │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
    ┌───▼────┐                      ┌──────▼──────┐
    │ Backend │                      │Browser APIs │
    │ (REST)  │                      │ (LocalStorage│
    └─────────┘                      │ etc)        │
                                     └─────────────┘
```

---

## 🏗️ Layered Architecture

### 1. Presentation Layer (Components)

**Responsibility:** Render UI and handle user interactions

**Structure:**

```
components/
├── ui/              # Atomic components (Button, Input, Modal, etc.)
├── common/          # Shared components (ImageDisplay, etc.)
├── layout/          # Layout components (Navbar, Sidebar)
├── order/           # Order domain features
├── post/            # Product post domain features
└── admin/           # Admin domain features
```

**Pattern:** Functional components with React Hooks

**Data Flow:**

- Receive props from parent/page
- Manage local state with `useState`
- Fetch data via services
- Render and handle user actions

### 2. State Management Layer

**Responsibility:** Manage global application state

**Implementation:**

- **AuthContext**: Authentication state (user, token, role)
- **Local State**: Component-level state with `useState`
- **URL State**: Route parameters and query strings

**Pattern:** React Context API with custom hooks

```tsx
// Usage in components
const { user, token, isAuthenticated } = useAuth();
```

### 3. API/Services Layer

**Responsibility:** Handle all backend communication

**Structure:**

```
api/
├── axiosInstance.ts    # HTTP client configuration
└── services/
    ├── authService.ts  # Login, register, logout
    ├── userService.ts  # User CRUD operations
    ├── postService.ts  # Product posts CRUD
    └── orderService.ts # Order CRUD operations
```

**Pattern:** Service Layer with Axios

**Features:**

- Centralized API configuration
- Request/response interceptors
- Error handling
- JWT token management

### 4. Types Layer

**Responsibility:** Define TypeScript types and interfaces

**File:** `types/index.ts`

**Contains:**

- Data Transfer Objects (DTOs)
- Type definitions
- Enums (Role, OrderStatus)
- Interface definitions

### 5. Utilities Layer

**Responsibility:** Helper functions and utilities

**Contains:**

- Authentication utilities
- Format helpers
- Validation functions
- Constants

---

## 🔄 Data Flow

### Authentication Flow

```
1. User Submits Login Form
   │
   ├─ LoginPage collects credentials
   └─ Calls authService.login(email, password)

2. authService makes HTTP POST request
   │
   ├─ Axios adds Authorization header
   └─ Backend validates credentials

3. Backend Returns JWT Token
   │
   ├─ Token contains user info and role
   └─ Token returned to frontend

4. Update AuthContext
   │
   ├─ Store token in context
   ├─ Decode token to extract user data
   └─ Update isAuthenticated = true

5. Redirect to Dashboard
   │
   ├─ Router redirects to role-appropriate dashboard
   └─ User is now authenticated for future requests
```

### Data Fetching Flow

```
Component Mounts
   │
   └─ useEffect Hook
      │
      ├─ Calls service method (e.g., postService.getAllPosts())
      ├─ Shows loading state (optional)
      └─ Await response

Service Method Executes
   │
   ├─ Axios makes HTTP request
   ├─ Request interceptor adds JWT token
   └─ Await response

Response Received
   │
   ├─ Response interceptor processes data
   ├─ Return data to component
   └─ useEffect sets state

Component Re-renders
   │
   └─ Display fetched data
```

### Form Submission Flow

```
User Fills Form
   │
   └─ Form inputs bound to state

User Submits (onClick)
   │
   ├─ Validate form data locally
   ├─ Show loading state
   └─ Call API service method

Service Processes Request
   │
   ├─ Axios makes HTTP request
   ├─ JWT included automatically
   └─ Await response

Handle Response
   │
   ├─ Success: Update state, show success toast
   ├─ Error: Show error message/toast
   └─ Finally: Hide loading state

Update UI
   │
   └─ Component re-renders with new data
```

---

## 🔐 Routing Architecture

### Route Structure

```
AppRouter
├── Public Routes (no auth required)
│   ├── /              (HomePage)
│   ├── /login         (LoginPage)
│   ├── /register      (RegisterPage)
│   ├── /marketplace   (MarketplacePage)
│   └── /posts/:id     (PostDetailPage)
│
├── Farmer Routes (role-based: FARMER)
│   ├── /farmer/dashboard
│   ├── /farmer/posts
│   ├── /farmer/posts/create
│   └── /farmer/orders
│
├── Consumer Routes (role-based: CONSUMER)
│   ├── /consumer/dashboard
│   └── /consumer/orders
│
└── Admin Routes (role-based: ADMIN)
    ├── /admin/dashboard
    └── /admin/users
```

### Route Protection

**PrivateRoute Component:**

```tsx
<Route element={<PrivateRoute allowedRoles={["FARMER"]} />}>
  <Route path="/farmer/*" element={<FarmerDashboard />} />
</Route>
```

**Protection Logic:**

1. Check if user is authenticated
2. Verify user role matches allowed roles
3. Redirect to /login if not authenticated
4. Redirect to /unauthorized if role doesn't match
5. Render component if all checks pass

---

## 🎯 Design Patterns

### 1. Container/Presentational Components

**Container Component (Smart):**

- Fetches data
- Manages state
- Handles business logic
- Example: `FarmerDashboard.tsx`

```tsx
function FarmerDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await postService.getUserPosts();
    setPosts(data);
  };

  return <PostsList posts={posts} />;
}
```

**Presentational Component (Dumb):**

- Receives data as props
- Renders UI
- No business logic
- Example: `PostCard.tsx`

```tsx
interface PostCardProps {
  post: PostDto;
  onSelect: (id: number) => void;
}

function PostCard({ post, onSelect }: PostCardProps) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <button onClick={() => onSelect(post.id)}>View</button>
    </div>
  );
}
```

### 2. Custom Hooks

**Create reusable logic:**

```tsx
// hooks/useAuth.ts
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// Usage in component
function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  // ...
}
```

### 3. Service Pattern

**Centralize API calls:**

```tsx
// services/postService.ts
class PostService {
  async getAllPosts(): Promise<PostDto[]> {
    const response = await axiosInstance.get("/posts");
    return response.data;
  }

  async createPost(data: CreatePostRequest): Promise<PostDto> {
    const response = await axiosInstance.post("/posts", data);
    return response.data;
  }
}

export const postService = new PostService();
```

### 4. Interceptor Pattern

**Handle cross-cutting concerns:**

```tsx
// Axios interceptor for JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken(); // from AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📊 State Management Strategy

### AuthContext Structure

```tsx
interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  role: Role | null;
  login: (token: string) => AuthUser | null;
  logout: () => void;
}
```

### State Scope Decision

| State Type              | Location         | Reason                       |
| ----------------------- | ---------------- | ---------------------------- |
| Auth state              | Context          | Global, needed everywhere    |
| Form data               | Component        | Local, specific to component |
| Fetched data            | Component state  | Updates frequently           |
| UI flags (modals, etc.) | Component        | Local visibility             |
| Theme                   | Context (future) | Global preference            |
| Filters                 | URL params       | Preservable, shareable       |

---

## 🌐 Backend API Contract

### Request/Response Pattern

**Request Example:**

```json
{
  "method": "POST",
  "url": "/api/posts",
  "headers": {
    "Authorization": "Bearer eyJhbGc...",
    "Content-Type": "application/json"
  },
  "body": {
    "title": "Fresh Tomatoes",
    "cropName": "Tomato",
    "quantity": 100,
    "price": 25.5
  }
}
```

**Response Example:**

```json
{
  "id": 1,
  "title": "Fresh Tomatoes",
  "cropName": "Tomato",
  "quantityAvailable": 100,
  "pricePerUnit": 25.5,
  "createdAt": "2024-03-03T10:30:00",
  "userId": 5,
  "farmerName": "John Farmer"
}
```

### API Endpoints

| Method | Endpoint             | Purpose           |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | User login        |
| POST   | `/api/auth/register` | User registration |
| GET    | `/api/users`         | List all users    |
| GET    | `/api/posts`         | List all products |
| POST   | `/api/posts`         | Create product    |
| GET    | `/api/orders`        | List orders       |
| POST   | `/api/orders`        | Create order      |

---

## 🧩 Component Composition Example

```
App (Root)
│
└── AppRouter
    ├── AuthProvider (Context)
    │   │
    │   └── Routes
    │       ├── PublicLayout
    │       │   ├── HomePage
    │       │   ├── MarketplacePage
    │       │   │   └── PostCard (multiple)
    │       │   └── PostDetailPage
    │       │
    │       └── PrivateRoute (role check)
    │           └── DashboardLayout
    │               ├── Navbar
    │               ├── Sidebar
    │               └── Main Content
    │                   ├── FarmerDashboard
    │                   │   └── PostsList
    │                   │       └── PostCard (multiple)
    │                   ├── ConsumerDashboard
    │                   │   └── OrdersList
    │                   │       └── OrderCard (multiple)
    │                   └── AdminDashboard
    │                       └── UserTable
```

---

## 🔌 Extending the Architecture

### Adding a New Feature

1. **Create Types** (`src/types/index.ts`)

   ```tsx
   export interface NewFeatureDto {
     /* ... */
   }
   ```

2. **Create Service** (`src/api/services/newFeatureService.ts`)

   ```tsx
   class NewFeatureService {
     async getItems() {
       /* ... */
     }
   }
   export const newFeatureService = new NewFeatureService();
   ```

3. **Create Page** (`src/pages/NewFeaturePage.tsx`)

   ```tsx
   export default function NewFeaturePage() {
     const [data, setData] = useState([]);
     // Fetch and display data
   }
   ```

4. **Add Route** (`src/routes/AppRouter.tsx`)

   ```tsx
   <Route path="/feature" element={<NewFeaturePage />} />
   ```

5. **Create Components** (`src/components/newfeature/`)
   ```tsx
   function FeatureCard({ item }) {
     /* ... */
   }
   ```

---

## 📈 Performance Optimization

### Implemented Optimizations

1. **Lazy Loading**: Route-based code splitting

   ```tsx
   const HomePage = lazy(() => import("../pages/HomePage"));
   ```

2. **Suspense Boundaries**: Show loading state during code load

   ```tsx
   <Suspense fallback={<Spinner />}>
     <Routes>...</Routes>
   </Suspense>
   ```

3. **React Router Optimization**: Efficient route matching
4. **Component Memoization**: For heavy components (future)

### Recommended Enhancements

- Add React.memo for list items
- Implement pagination for large data sets
- Add image lazy loading
- Cache API responses with React Query

---

## 🧪 Testing Architecture

### Recommended Test Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── services/
│   ├── authService.ts
│   └── authService.test.ts
└── hooks/
    ├── useAuth.ts
    └── useAuth.test.ts
```

### Test Types

1. **Unit Tests**: Individual functions/components
2. **Integration Tests**: Multiple components together
3. **E2E Tests**: Full user workflows

---

## 📝 Summary

ConnectoFarmo Frontend follows a **layered architecture** with:

- **Presentation**: React components organized by domain
- **State**: Context API for global auth state
- **Services**: Axios-based API service layer
- **Routing**: React Router with role-based protection
- **Types**: Full TypeScript type safety

This architecture ensures:

- ✅ Separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Testability
- ✅ Code reusability

---

**Last Updated:** March 3, 2026
