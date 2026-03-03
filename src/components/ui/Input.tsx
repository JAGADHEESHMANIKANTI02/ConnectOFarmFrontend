import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export function Input({ label, error, hint, id, className = '', required, ...props }: InputProps) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
            {label && (
                <label className="input-label" htmlFor={inputId}>
                    {label} {required && <span className="input-required" aria-hidden>*</span>}
                </label>
            )}
            <input
                id={inputId}
                className="input-field"
                aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                aria-invalid={!!error}
                required={required}
                {...props}
            />
            {hint && !error && <span id={`${inputId}-hint`} className="input-hint">{hint}</span>}
            {error && <span id={`${inputId}-error`} role="alert" className="input-error">{error}</span>}
        </div>
    );
}
