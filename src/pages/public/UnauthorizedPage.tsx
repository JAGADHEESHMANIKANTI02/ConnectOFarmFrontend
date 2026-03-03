import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import './UnauthorizedPage.css';

export default function UnauthorizedPage() {
    return (
        <div className="unauthorized">
            <ShieldOff size={64} className="unauthorized__icon" />
            <h1 className="unauthorized__title">Access Denied</h1>
            <p className="unauthorized__sub">You don't have permission to view this page.</p>
            <Link to="/dashboard" className="unauthorized__link">Go to Dashboard</Link>
        </div>
    );
}
