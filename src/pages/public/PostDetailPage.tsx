import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MapPin, Phone, Mail, Package, IndianRupee, ArrowLeft } from 'lucide-react';
import postService from '../../api/services/postService';
import orderService from '../../api/services/orderService';
import { ImageDisplay } from '../../components/common/ImageDisplay';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';
import type { PostDto } from '../../types';
import './PostDetailPage.css';

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [post, setPost] = useState<PostDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState('1');
    const [ordering, setOrdering] = useState(false);

    useEffect(() => {
        if (!id) return;
        postService.getPostById(Number(id))
            .then(setPost)
            .catch(() => navigate('/marketplace'))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    const handleOrder = async () => {
        if (!post) return;
        setOrdering(true);
        try {
            await orderService.placeOrder({ postId: post.id, quantity: Number(quantity) });
            toast.success('Order placed successfully! 🎉');
            setModalOpen(false);
        } catch {
            toast.error('Failed to place order. Please try again.');
        } finally {
            setOrdering(false);
        }
    };

    if (loading) return <div className="post-detail__loading"><Spinner size="lg" /></div>;
    if (!post) return null;

    const total = (Number(quantity) * post.pricePerUnit).toFixed(2);

    return (
        <div className="container post-detail animate-fade-in">
            <button className="post-detail__back" onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowLeft size={18} /> Back
            </button>

            <div className="post-detail__grid">
                <div className="post-detail__image-col">
                    <ImageDisplay
                        imageData={post.image}
                        alt={post.title}
                        className="post-detail__image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                    />
                </div>

                <div className="post-detail__info-col">
                    <span className="post-detail__crop">{post.cropName}</span>
                    <h1 className="post-detail__title">{post.title}</h1>
                    <p className="post-detail__desc">{post.description}</p>

                    <div className="post-detail__price-row">
                        <span className="post-detail__price">₹{post.pricePerUnit.toFixed(2)}</span>
                        <span className="post-detail__price-unit">per unit</span>
                    </div>

                    <div className="post-detail__meta-box">
                        <div className="post-detail__meta-item"><Package size={16} /> {post.quantityAvailable} units available</div>
                        {post.farmerName && <div className="post-detail__meta-item"><MapPin size={16} /> {post.farmerName}</div>}
                        {post.farmerPhone && <div className="post-detail__meta-item"><Phone size={16} /> {post.farmerPhone}</div>}
                        {post.farmerEmail && <div className="post-detail__meta-item"><Mail size={16} /> {post.farmerEmail}</div>}
                    </div>

                    {role === 'CONSUMER' ? (
                        <Button size="lg" variant="accent" fullWidth onClick={() => setModalOpen(true)} leftIcon={<IndianRupee size={18} />}>
                            Place Order
                        </Button>
                    ) : !role ? (
                        <Button size="lg" variant="secondary" fullWidth onClick={() => navigate('/login')}>
                            Login to Order
                        </Button>
                    ) : null}
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Place Order">
                <div className="modal-order">
                    <div className="modal-order__post">
                        <strong>{post.title}</strong>
                        <span>₹{post.pricePerUnit.toFixed(2)} / unit</span>
                    </div>
                    <Input
                        label="Quantity (units)"
                        type="number"
                        min="1"
                        max={String(post.quantityAvailable)}
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <div className="modal-order__total">
                        <span>Estimated Total</span>
                        <span className="modal-order__total-price">₹{total}</span>
                    </div>
                    <div className="modal-order__actions">
                        <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button variant="accent" loading={ordering} onClick={handleOrder}>Confirm Order</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
