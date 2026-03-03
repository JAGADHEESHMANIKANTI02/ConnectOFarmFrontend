import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import './Navbar.css';

export function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="navbar" role="banner">
            <div className="container navbar__inner">
                <Link to="/" className="navbar__brand" aria-label="ConnectOFarm Home">
                    <Leaf size={26} strokeWidth={2.5} className="navbar__logo-icon" />
                    <span className="navbar__brand-text">ConnectOFarm</span>
                </Link>

                <nav className="navbar__links" aria-label="Main navigation">
                    <Link to="/" className="navbar__link">Home</Link>
                    <Link to="/marketplace" className="navbar__link">Marketplace</Link>
                </nav>

                <div className="navbar__actions">
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="secondary"
                                size="sm"
                                leftIcon={<LayoutDashboard size={16} />}
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<LogOut size={16} />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<LogIn size={16} />}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                leftIcon={<UserPlus size={16} />}
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
