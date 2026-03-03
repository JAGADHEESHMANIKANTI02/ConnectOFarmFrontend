import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AuthUser, Role, JwtPayload } from '../types';

// ─── Context Shape ────────────────────────────────────────────────────────────
interface AuthContextValue {
    token: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    role: Role | null;
    login: (token: string) => AuthUser | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helper: decode JWT safely ────────────────────────────────────────────────
function decodeToken(token: string): AuthUser | null {
    try {
        const payload = jwtDecode<JwtPayload>(token);

        if (payload.exp * 1000 < Date.now()) {
            return null;
        }

        // Try to get role from payload.role (singular) or payload.roles (plural array)
        let normalizedRole: Role | undefined;

        if (payload.role) {
            normalizedRole = payload.role as Role;
        } else if (payload.roles && payload.roles.length > 0) {
            normalizedRole = payload.roles[0] as Role;
        }

        if (!normalizedRole || !['ADMIN', 'FARMER', 'CONSUMER'].includes(normalizedRole)) {
            return null;
        }

        return {
            email: payload.sub,
            role: normalizedRole,
            exp: payload.exp,
            id: payload.id,
            name: payload.name,
        };
    } catch (err) {
        return null;
    }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);

    // Restore session on mount
    useEffect(() => {
        const saved = localStorage.getItem('cof_token');
        if (saved) {
            const decoded = decodeToken(saved);
            if (decoded) {
                setToken(saved);
                setUser(decoded);
            } else {
                // Token expired — clean up
                localStorage.removeItem('cof_token');
            }
        }
    }, []);

    const login = useCallback((newToken: string): AuthUser | null => {
        const decoded = decodeToken(newToken);
        if (!decoded) return null;
        localStorage.setItem('cof_token', newToken);
        setToken(newToken);
        setUser(decoded);
        return decoded;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('cof_token');
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!user,
                role: user?.role ?? null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
