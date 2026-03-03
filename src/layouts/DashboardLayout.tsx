import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import './DashboardLayout.css';

export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="dashboard-layout__body">
                <header className="dashboard-header">
                    <button
                        className="dashboard-header__toggle"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open navigation"
                    >
                        <Menu size={22} />
                    </button>
                    <span className="dashboard-header__brand">ConnectOFarm</span>
                </header>
                <main className="dashboard-layout__main">
                    <div className="dashboard-layout__content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
