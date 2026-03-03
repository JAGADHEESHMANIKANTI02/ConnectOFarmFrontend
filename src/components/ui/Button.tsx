import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
            disabled={disabled ?? loading}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <span className="btn__spinner" aria-hidden="true" />
            ) : leftIcon ? (
                <span className="btn__icon">{leftIcon}</span>
            ) : null}
            {children}
            {!loading && rightIcon && <span className="btn__icon">{rightIcon}</span>}
        </button>
    );
}
