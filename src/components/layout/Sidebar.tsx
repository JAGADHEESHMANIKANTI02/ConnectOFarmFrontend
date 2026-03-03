import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, Plus, ListOrdered, Users,
    LogOut, Leaf, X, ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const farmerLinks = [
    { to: '/farmer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/farmer/posts', icon: ListOrdered, label: 'My Posts' },
    { to: '/farmer/posts/create', icon: Plus, label: 'Create Post' },
    { to: '/farmer/orders', icon: ShoppingBag, label: 'Incoming Orders' },
];

const consumerLinks = [
    { to: '/consumer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Browse Market' },
    { to: '/consumer/orders', icon: ListOrdered, label: 'My Orders' },
];

const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/users', icon: Users, label: 'All Users' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { role, user, logout } = useAuth();
    const navigate = useNavigate();

    const links =
        role === 'FARMER' ? farmerLinks :
            role === 'CONSUMER' ? consumerLinks :
                role === 'ADMIN' ? adminLinks : [];

    const roleLabel =
        role === 'FARMER' ? '🌱 Farmer' :
            role === 'CONSUMER' ? '🛒 Consumer' :
                role === 'ADMIN' ? '⚙️ Admin' : '';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="Sidebar navigation">
                <div className="sidebar__header">
                    <div className="sidebar__brand">
                        <Leaf size={22} className="sidebar__brand-icon" />
                        <span className="sidebar__brand-text">ConnectOFarm</span>
                    </div>
                    <button className="sidebar__close" onClick={onClose} aria-label="Close sidebar">
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar__user">
                    <div className="sidebar__avatar" aria-hidden="true">
                        {user?.email?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                        <p className="sidebar__user-email">{user?.email}</p>
                        <p className="sidebar__user-role">{roleLabel}</p>
                    </div>
                </div>

                <nav className="sidebar__nav" aria-label="Role navigation">
                    {links.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                            }
                            onClick={onClose}
                        >
                            <Icon size={18} aria-hidden="true" />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button className="sidebar__logout" onClick={handleLogout} aria-label="Logout">
                    <LogOut size={18} aria-hidden="true" />
                    <span>Logout</span>
                </button>
            </aside>
        </>
    );
}
