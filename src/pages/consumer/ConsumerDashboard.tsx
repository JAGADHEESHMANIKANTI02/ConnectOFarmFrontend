import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import orderService from '../../api/services/orderService';
import { Spinner } from '../../components/ui/Spinner';
import { StatusBadge } from '../../components/ui/Badge';
import type { OrderDto } from '../../types';
import '../farmer/Dashboard.css';

export default function ConsumerDashboard() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderService.getMyOrdersAsConsumer().then(setOrders).finally(() => setLoading(false));
    }, []);

    const pending = orders.filter(o => o.status === 'PENDING').length;
    const completed = orders.filter(o => o.status === 'COMPLETED').length;
    const total = orders.reduce((s, o) => s + o.totalPrice, 0);

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">🛒 Consumer Dashboard</h1>
                    <p className="dashboard__sub">Track your orders and explore fresh produce</p>
                </div>
                <Link to="/marketplace" className="btn btn--accent btn--md" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <ShoppingBag size={16} /> Browse Market
                </Link>
            </div>

            <div className="dashboard__stats">
                {[
                    { label: 'Total Orders', value: orders.length, color: '#2563EB' },
                    { label: 'Pending', value: pending, color: '#D97706' },
                    { label: 'Completed', value: completed, color: '#16A34A' },
                    { label: 'Total Spent (₹)', value: `₹${total.toFixed(0)}`, color: '#7C3AED' },
                ].map(({ label, value, color }) => (
                    <div className="stat-card" key={label} style={{ '--stat-color': color } as React.CSSProperties}>
                        <span className="stat-card__value">{value}</span>
                        <span className="stat-card__label">{label}</span>
                    </div>
                ))}
            </div>

            <section className="dashboard__section">
                <h2 className="dashboard__section-title">Recent Orders</h2>
                {orders.length === 0 ? (
                    <p className="dashboard__empty">No orders yet. Browse the marketplace and place your first order!</p>
                ) : (
                    <div className="dashboard__table-wrap">
                        <table className="dashboard__table">
                            <thead><tr><th>Order</th><th>Product</th><th>Qty</th><th>Total</th><th>Status</th></tr></thead>
                            <tbody>
                                {orders.slice(0, 8).map(o => (
                                    <tr key={o.id}>
                                        <td>#{o.id}</td>
                                        <td>{o.postTitle}</td>
                                        <td>{o.quantity}</td>
                                        <td>₹{o.totalPrice.toFixed(2)}</td>
                                        <td><StatusBadge status={o.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
