import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import postService from '../../api/services/postService';
import { PostCard } from '../../components/post/PostCard';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import type { PostDto } from '../../types';
import './Dashboard.css';

export default function MyPostsPage() {
    const [posts, setPosts] = useState<PostDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        postService.getMyPosts().then(setPosts).finally(() => setLoading(false));
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        if (!window.confirm('Delete this post? This cannot be undone.')) return;
        setDeletingId(id);
        try {
            await postService.deletePost(id);
            setPosts(prev => prev.filter(p => p.id !== id));
            toast.success('Post deleted.');
        } catch {
            toast.error('Failed to delete post.');
        } finally {
            setDeletingId(null);
        }
    }, []);

    if (loading) return <div className="dashboard__loading"><Spinner size="lg" /></div>;

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">My Listings</h1>
                    <p className="dashboard__sub">{posts.length} products listed</p>
                </div>
                <Link to="/farmer/posts/create">
                    <Button variant="primary" leftIcon={<Plus size={16} />}>Add Listing</Button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="dashboard__empty-hero">
                    <p>You haven't listed any products yet.</p>
                    <Link to="/farmer/posts/create">
                        <Button variant="accent" leftIcon={<Plus size={16} />}>Create Your First Post</Button>
                    </Link>
                </div>
            ) : (
                <div className="auto-grid">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            showFarmerInfo={false}
                            onDelete={deletingId === null ? handleDelete : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
