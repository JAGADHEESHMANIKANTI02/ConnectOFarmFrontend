interface ImageDisplayProps {
    imageData: string | null | undefined;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Renders a post image from a Base64-encoded string (Java byte[] → JSON → base64).
 * Falls back to a styled placeholder if no image is provided.
 */
export function ImageDisplay({ imageData, alt, className = '', style }: ImageDisplayProps) {
    if (!imageData) {
        return (
            <div
                className={`img-placeholder ${className}`}
                role="img"
                aria-label={`${alt} - No image available`}
                style={{
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    fontSize: '2.5rem',
                    ...style,
                }}
            >
                🌾
            </div>
        );
    }

    const src = imageData.startsWith('data:')
        ? imageData
        : `data:image/jpeg;base64,${imageData}`;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '';
            }}
        />
    );
}
