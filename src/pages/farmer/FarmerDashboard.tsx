import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import postService from '../../api/services/postService';
import orderService from '../../api/services/orderService';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import type { PostDto, OrderDto } from '../../types';
import { StatusBadge } from '../../components/ui/Badge';
import './Dashboard.css';

export default function FarmerDashboard() {
    const [posts, setPosts] = useState<PostDto[]>([]);
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([postService.getMyPosts(), orderService.getMyOrdersAsFarmer()])
            .then(([p, o]) => { setPosts(p); setOrders(o); })
            .finally(() => setLoading(false));
    }, []);

    const pending = orders.filter(o => o.status === 'PENDING').length;
    const completed = orders.filter(o => o.status === 'COMPLETED').length;

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">🌱 Farmer Dashboard</h1>
                    <p className="dashboard__sub">Track your listings and incoming orders</p>
                </div>
                <Link to="/farmer/posts/create">
                    <Button variant="primary" leftIcon={<Plus size={16} />}>New Post</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="dashboard__stats">
                {[
                    { label: 'Total Listings', value: posts.length, color: '#2D6A4F' },
                    { label: 'Pending Orders', value: pending, color: '#D97706' },
                    { label: 'Completed', value: completed, color: '#16A34A' },
                    { label: 'Total Orders', value: orders.length, color: '#2563EB' },
                ].map(({ label, value, color }) => (
                    <div className="stat-card" key={label} style={{ '--stat-color': color } as React.CSSProperties}>
                        <span className="stat-card__value">{value}</span>
                        <span className="stat-card__label">{label}</span>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <section className="dashboard__section">
                <h2 className="dashboard__section-title">Recent Orders</h2>
                {orders.length === 0 ? (
                    <p className="dashboard__empty">No orders yet. Share your listings to get started!</p>
                ) : (
                    <div className="dashboard__table-wrap">
                        <table className="dashboard__table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Consumer</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 8).map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.postTitle}</td>
                                        <td>{order.consumerName}</td>
                                        <td>{order.quantity}</td>
                                        <td>₹{order.totalPrice.toFixed(2)}</td>
                                        <td><StatusBadge status={order.status} /></td>
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
