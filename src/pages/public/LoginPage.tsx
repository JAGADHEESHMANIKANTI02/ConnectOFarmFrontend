import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/services/authService';
import { getDashboardPath } from '../../utils/authUtils';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { AuthenticationRequest } from '../../types';
import './AuthPage.css';
export default function LoginPage() {
    const { login, isAuthenticated, role } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState<AuthenticationRequest>({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(getDashboardPath(role), { replace: true });
        }
    }, [isAuthenticated, role, navigate]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { token } = await authService.login(form);
            const user = login(token);

            if (user) {
                toast.success(`Welcome back, ${user.name || user.role}! 👋`);
                navigate(getDashboardPath(user.role), { replace: true });
            } else {
                setError('Authentication failed. Please try again.');
            }
        } catch {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__card animate-fade-in">
                <div className="auth-page__header">
                    <div className="auth-page__logo"><Leaf size={32} /></div>
                    <h1 className="auth-page__title">Welcome back</h1>
                    <p className="auth-page__sub">Sign in to your ConnectOFarm account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
                    <Input
                        label="Email address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                    />
                    {error && (
                        <div className="auth-page__error" role="alert">{error}</div>
                    )}
                    <Button type="submit" fullWidth size="lg" loading={loading} leftIcon={<LogIn size={18} />}>
                        Sign In
                    </Button>
                </form>

                <p className="auth-page__switch">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-page__link">Create one</Link>
                </p>
            </div>
        </div>
    );
}