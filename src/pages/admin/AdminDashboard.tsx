import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../api/services/userService';
import { Spinner } from '../../components/ui/Spinner';
import type { UserDto } from '../../types';
import '../farmer/Dashboard.css';

export default function AdminDashboard() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getAllUsers().then(setUsers).finally(() => setLoading(false));
    }, []);

    const farmers = users.filter(u => u.role === 'FARMER').length;
    const consumers = users.filter(u => u.role === 'CONSUMER').length;

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">⚙️ Admin Overview</h1>
                    <p className="dashboard__sub">Monitor the ConnectOFarm platform</p>
                </div>
                <Link to="/admin/users" className="btn btn--primary btn--md" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    Manage Users
                </Link>
            </div>

            <div className="dashboard__stats">
                {[
                    { label: 'Total Users', value: users.length, color: '#2D6A4F' },
                    { label: 'Farmers', value: farmers, color: '#16A34A' },
                    { label: 'Consumers', value: consumers, color: '#2563EB' },
                    { label: 'Admins', value: users.length - farmers - consumers, color: '#7C3AED' },
                ].map(({ label, value, color }) => (
                    <div className="stat-card" key={label} style={{ '--stat-color': color } as React.CSSProperties}>
                        <span className="stat-card__value">{value}</span>
                        <span className="stat-card__label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
