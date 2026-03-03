import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import './PublicLayout.css';

export function PublicLayout() {
    return (
        <div className="public-layout">
            <Navbar />
            <main className="public-layout__main">
                <Outlet />
            </main>
            <footer className="public-layout__footer">
                <div className="container">
                    <p>© 2025 ConnectOFarm. Bridging farmers and consumers.</p>
                </div>
            </footer>
        </div>
    );
}
