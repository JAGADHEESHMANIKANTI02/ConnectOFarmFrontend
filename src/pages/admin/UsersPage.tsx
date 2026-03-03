import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import userService from '../../api/services/userService';
import { UserTable } from '../../components/admin/UserTable';
import { Spinner } from '../../components/ui/Spinner';
import type { UserDto } from '../../types';
import '../farmer/Dashboard.css';
import './UsersPage.css';

type Tab = 'ALL' | 'FARMER' | 'CONSUMER';

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('ALL');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        const fetcher =
            activeTab === 'FARMER' ? userService.getFarmers :
                activeTab === 'CONSUMER' ? userService.getConsumers :
                    userService.getAllUsers;
        setLoading(true);
        fetcher().then(setUsers).finally(() => setLoading(false));
    }, [activeTab]);

    const handleDelete = useCallback(async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        setDeletingId(id);
        // Note: No delete endpoint currently in backend. Show advisory toast.
        toast.error('Delete endpoint not yet available on backend.');
        setDeletingId(null);
    }, []);

    const TABS: { key: Tab; label: string }[] = [
        { key: 'ALL', label: 'All Users' },
        { key: 'FARMER', label: 'Farmers' },
        { key: 'CONSUMER', label: 'Consumers' },
    ];

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">User Management</h1>
                    <p className="dashboard__sub">{users.length} users in this category</p>
                </div>
            </div>

            <div className="users-tabs" role="tablist" aria-label="Filter users by role">
                {TABS.map(({ key, label }) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={activeTab === key}
                        className={`users-tab ${activeTab === key ? 'users-tab--active' : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="dashboard__loading"><Spinner size="lg" /></div>
            ) : (
                <UserTable users={users} onDelete={handleDelete} deletingId={deletingId} />
            )}
        </div>
    );
}
