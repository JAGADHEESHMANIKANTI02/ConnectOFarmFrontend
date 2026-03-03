import './Spinner.css';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export function Spinner({ size = 'md' }: SpinnerProps) {
    return (
        <span
            className={`spinner spinner--${size}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </span>
    );
}
