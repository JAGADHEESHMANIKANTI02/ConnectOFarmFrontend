import { useState, useEffect } from 'react';
import orderService from '../../api/services/orderService';
import { OrderCard } from '../../components/order/OrderCard';
import { Spinner } from '../../components/ui/Spinner';
import type { OrderDto } from '../../types';
import '../farmer/Dashboard.css';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderService.getMyOrdersAsConsumer().then(setOrders).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">My Orders</h1>
                    <p className="dashboard__sub">{orders.length} order(s) placed</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <p className="dashboard__empty">No orders yet. Head to the marketplace to order fresh produce!</p>
            ) : (
                <div className="auto-grid">
                    {orders.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
            )}
        </div>
    );
}
