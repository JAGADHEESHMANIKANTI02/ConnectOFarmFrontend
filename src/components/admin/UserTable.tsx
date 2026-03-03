import { Trash2 } from 'lucide-react';
import type { UserDto } from '../../types';
import { RoleBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import './UserTable.css';

interface UserTableProps {
    users: UserDto[];
    onDelete?: (id: number) => void;
    deletingId?: number | null;
}

export function UserTable({ users, onDelete, deletingId }: UserTableProps) {
    if (users.length === 0) {
        return (
            <div className="user-table__empty">
                <p>No users found.</p>
            </div>
        );
    }

    return (
        <div className="user-table__wrapper">
            <table className="user-table" role="table" aria-label="Users table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Location</th>
                        <th scope="col">Role</th>
                        {onDelete && <th scope="col">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={user.id} className="user-table__row">
                            <td className="user-table__id">{idx + 1}</td>
                            <td className="user-table__name">{user.name}</td>
                            <td className="user-table__email">{user.email}</td>
                            <td>{user.phone ?? '—'}</td>
                            <td>{user.location ?? '—'}</td>
                            <td><RoleBadge role={user.role} /></td>
                            {onDelete && (
                                <td>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        leftIcon={<Trash2 size={14} />}
                                        loading={deletingId === user.id}
                                        onClick={() => onDelete(user.id)}
                                        aria-label={`Delete user ${user.name}`}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
