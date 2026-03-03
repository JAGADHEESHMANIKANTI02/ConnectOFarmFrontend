import { MapPin, Phone, Tag, Package } from 'lucide-react';
import type { PostDto } from '../../types';
import { ImageDisplay } from '../common/ImageDisplay';
import { Button } from '../ui/Button';
import './PostCard.css';

interface PostCardProps {
    post: PostDto;
    onAction?: (post: PostDto) => void;
    actionLabel?: string;
    showFarmerInfo?: boolean;
    onDelete?: (id: number) => void;
}

export function PostCard({
    post,
    onAction,
    actionLabel = 'View Details',
    showFarmerInfo = true,
    onDelete,
}: PostCardProps) {
    return (
        <article className="post-card animate-fade-in" aria-label={`Product: ${post.title}`}>
            <div className="post-card__image-wrap">
                <ImageDisplay imageData={post.image} alt={post.title} className="post-card__image" />
                <span className="post-card__crop-tag">
                    <Tag size={12} />
                    {post.cropName}
                </span>
            </div>

            <div className="post-card__body">
                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__desc">{post.description}</p>

                <div className="post-card__meta">
                    <div className="post-card__meta-item">
                        <Package size={14} />
                        <span>{post.quantityAvailable} units available</span>
                    </div>
                    {showFarmerInfo && post.farmerName && (
                        <div className="post-card__meta-item">
                            <MapPin size={14} />
                            <span>{post.farmerName}</span>
                        </div>
                    )}
                    {showFarmerInfo && post.farmerPhone && (
                        <div className="post-card__meta-item">
                            <Phone size={14} />
                            <span>{post.farmerPhone}</span>
                        </div>
                    )}
                </div>

                <div className="post-card__footer">
                    <span className="post-card__price">
                        ₹{post.pricePerUnit.toFixed(2)}
                        <span className="post-card__price-unit"> / unit</span>
                    </span>

                    <div className="post-card__actions">
                        {onAction && (
                            <Button size="sm" variant="primary" onClick={() => onAction(post)}>
                                {actionLabel}
                            </Button>
                        )}
                        {onDelete && (
                            <Button size="sm" variant="danger" onClick={() => onDelete(post.id)}>
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
