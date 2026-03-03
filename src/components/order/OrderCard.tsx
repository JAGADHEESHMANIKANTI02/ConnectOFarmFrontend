import { Package, User, IndianRupee } from 'lucide-react';
import type { OrderDto } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import './OrderCard.css';

interface OrderCardProps {
    order: OrderDto;
    onConfirm?: (id: number) => void;
    confirming?: boolean;
}

export function OrderCard({ order, onConfirm, confirming = false }: OrderCardProps) {
    return (
        <article className="order-card animate-fade-in" aria-label={`Order #${order.id}`}>
            <div className="order-card__header">
                <div>
                    <span className="order-card__id">Order #{order.id}</span>
                    <h3 className="order-card__title">{order.postTitle}</h3>
                </div>
                <StatusBadge status={order.status} />
            </div>

            <div className="order-card__details">
                <div className="order-card__detail">
                    <Package size={16} />
                    <span><strong>{order.quantity}</strong> units</span>
                </div>
                <div className="order-card__detail">
                    <IndianRupee size={16} />
                    <span>Total: <strong>₹{order.totalPrice.toFixed(2)}</strong></span>
                </div>
                {order.consumerName && (
                    <div className="order-card__detail">
                        <User size={16} />
                        <span>{order.consumerName} · {order.consumerPhone}</span>
                    </div>
                )}
            </div>

            {onConfirm && order.status === 'PENDING' && (
                <div className="order-card__actions">
                    <Button
                        variant="primary"
                        size="sm"
                        loading={confirming}
                        onClick={() => onConfirm(order.id)}
                    >
                        Confirm Order
                    </Button>
                </div>
            )}
        </article>
    );
}
