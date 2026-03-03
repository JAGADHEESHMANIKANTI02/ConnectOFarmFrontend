import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { RegisterRequest, Role } from '../../types';
import './AuthPage.css';

const ROLES: Role[] = ['FARMER', 'CONSUMER'];

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterRequest>({
        name: '', email: '', password: '', phone: '', location: '', role: 'CONSUMER',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        setLoading(true);
        try {
            const { token } = await authService.register(form);
            login(token);
            toast.success('Account created! Welcome to ConnectOFarm 🌱');
            navigate('/dashboard');
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: string } }).response?.data;
            setError(typeof msg === 'string' ? msg : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__card auth-page__card--wide animate-fade-in">
                <div className="auth-page__header">
                    <div className="auth-page__logo"><Leaf size={32} /></div>
                    <h1 className="auth-page__title">Create account</h1>
                    <p className="auth-page__sub">Join ConnectOFarm as a Farmer or Consumer</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
                    <div className="auth-page__grid">
                        <Input label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="Ravi Kumar" required />
                        <Input label="Email address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required autoComplete="new-password" />
                        <Input label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                        <Input label="Location / City" name="location" value={form.location} onChange={handleChange} placeholder="Bangalore, Karnataka" />

                        <div className="input-group">
                            <label htmlFor="role-select" className="input-label">I am a <span className="input-required" aria-hidden>*</span></label>
                            <select
                                id="role-select"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                {ROLES.map(r => <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>)}
                            </select>
                        </div>
                    </div>

                    {error && <div className="auth-page__error" role="alert">{error}</div>}

                    <Button type="submit" fullWidth size="lg" loading={loading} leftIcon={<UserPlus size={18} />}>
                        Create Account
                    </Button>
                </form>

                <p className="auth-page__switch">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-page__link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
