import type { Role } from '../types';

/**
 * Returns the default dashboard path for a given role.
 */
export function getDashboardPath(role: Role | null): string {
    switch (role) {
        case 'ADMIN':
            return '/admin/dashboard';
        case 'FARMER':
            return '/farmer/dashboard';
        case 'CONSUMER':
            return '/consumer/dashboard';
        default:
            return '/';
    }
}
