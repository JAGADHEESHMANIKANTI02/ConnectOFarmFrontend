import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import orderService from '../../api/services/orderService';
import { OrderCard } from '../../components/order/OrderCard';
import { Spinner } from '../../components/ui/Spinner';
import type { OrderDto } from '../../types';
import './Dashboard.css';

export default function FarmerOrdersPage() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState<number | null>(null);

    useEffect(() => {
        orderService.getMyOrdersAsFarmer().then(setOrders).finally(() => setLoading(false));
    }, []);

    const handleConfirm = useCallback(async (id: number) => {
        setConfirmingId(id);
        try {
            const updated = await orderService.confirmOrder(id);
            setOrders(prev => prev.map(o => o.id === id ? updated : o));
            toast.success('Order confirmed! ✅');
        } catch {
            toast.error('Failed to confirm order.');
        } finally {
            setConfirmingId(null);
        }
    }, []);

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    const pending = orders.filter(o => o.status === 'PENDING');
    const completed = orders.filter(o => o.status !== 'PENDING');

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">Incoming Orders</h1>
                    <p className="dashboard__sub">{pending.length} pending · {completed.length} completed</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <p className="dashboard__empty">No orders yet. Your orders will appear here once consumers start buying.</p>
            ) : (
                <>
                    {pending.length > 0 && (
                        <section className="dashboard__section">
                            <h2 className="dashboard__section-title">⏳ Pending Orders</h2>
                            <div className="auto-grid">
                                {pending.map(order => (
                                    <OrderCard key={order.id} order={order} onConfirm={handleConfirm} confirming={confirmingId === order.id} />
                                ))}
                            </div>
                        </section>
                    )}
                    {completed.length > 0 && (
                        <section className="dashboard__section">
                            <h2 className="dashboard__section-title">✅ Completed Orders</h2>
                            <div className="auto-grid">
                                {completed.map(order => <OrderCard key={order.id} order={order} />)}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
