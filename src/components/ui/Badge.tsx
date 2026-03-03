import type { OrderStatus, Role } from '../../types';
import './Badge.css';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
}

function statusToBadge(status: OrderStatus): BadgeVariant {
    if (status === 'COMPLETED') return 'success';
    if (status === 'CANCELLED') return 'danger';
    return 'warning'; // PENDING
}

function roleToBadge(role: Role): BadgeVariant {
    if (role === 'ADMIN') return 'danger';
    if (role === 'FARMER') return 'primary';
    return 'info'; // CONSUMER
}

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
    return <span className={`badge badge--${variant}`}>{label}</span>;
}

export function StatusBadge({ status }: { status: OrderStatus }) {
    return <Badge label={status} variant={statusToBadge(status)} />;
}

export function RoleBadge({ role }: { role: Role }) {
    return <Badge label={role} variant={roleToBadge(role)} />;
}
