import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { Spinner } from '../components/ui/Spinner';
import { getDashboardPath } from '../utils/authUtils';

// ─── Layouts ──────────────────────────────────────────────────────────────────
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// ─── Lazy Loaded Pages ────────────────────────────────────────────────────────
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'));
const MarketplacePage = lazy(() => import('../pages/public/MarketplacePage'));
const PostDetailPage = lazy(() => import('../pages/public/PostDetailPage'));
const UnauthorizedPage = lazy(() => import('../pages/public/UnauthorizedPage'));

const FarmerDashboard = lazy(() => import('../pages/farmer/FarmerDashboard'));
const MyPostsPage = lazy(() => import('../pages/farmer/MyPostsPage'));
const CreatePostPage = lazy(() => import('../pages/farmer/CreatePostPage'));
const FarmerOrdersPage = lazy(() => import('../pages/farmer/FarmerOrdersPage'));

const ConsumerDashboard = lazy(() => import('../pages/consumer/ConsumerDashboard'));
const MyOrdersPage = lazy(() => import('../pages/consumer/MyOrdersPage'));

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const UsersPage = lazy(() => import('../pages/admin/UsersPage'));

// ─── Role-based Home Redirect ─────────────────────────────────────────────────
function RoleRedirect() {
    const { role, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Navigate to={getDashboardPath(role)} replace />;
}

const Loading = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="lg" />
    </div>
);

export function AppRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#fff',
                            color: '#1C1C1E',
                            borderRadius: '10px',
                            border: '1px solid #E5E0D8',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            fontFamily: 'Inter, sans-serif',
                        },
                    }}
                />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {/* ── Public ── */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/marketplace" element={<MarketplacePage />} />
                            <Route path="/posts/:id" element={<PostDetailPage />} />
                            <Route path="/unauthorized" element={<UnauthorizedPage />} />
                        </Route>

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<RoleRedirect />} />

                        {/* ── Farmer ── */}
                        <Route element={<PrivateRoute allowedRoles={['FARMER']} />}>
                            <Route element={<DashboardLayout />}>
                                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                                <Route path="/farmer/posts" element={<MyPostsPage />} />
                                <Route path="/farmer/posts/create" element={<CreatePostPage />} />
                                <Route path="/farmer/orders" element={<FarmerOrdersPage />} />
                            </Route>
                        </Route>

                        {/* ── Consumer ── */}
                        <Route element={<PrivateRoute allowedRoles={['CONSUMER']} />}>
                            <Route element={<DashboardLayout />}>
                                <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
                                <Route path="/consumer/orders" element={<MyOrdersPage />} />
                            </Route>
                        </Route>

                        {/* ── Admin ── */}
                        <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
                            <Route element={<DashboardLayout />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/users" element={<UsersPage />} />
                            </Route>
                        </Route>

                        {/* Catch-all */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    );
}
