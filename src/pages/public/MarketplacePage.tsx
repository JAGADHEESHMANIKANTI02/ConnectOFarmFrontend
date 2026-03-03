import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import postService from '../../api/services/postService';
import { PostCard } from '../../components/post/PostCard';
import { Spinner } from '../../components/ui/Spinner';
import type { PostDto } from '../../types';
import './MarketplacePage.css';

export default function MarketplacePage() {
    const [posts, setPosts] = useState<PostDto[]>([]);
    const [filtered, setFiltered] = useState<PostDto[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        postService.getAllPosts()
            .then(data => { setPosts(data); setFiltered(data); })
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value.toLowerCase();
        setSearch(q);
        setFiltered(posts.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.cropName.toLowerCase().includes(q) ||
            p.farmerName?.toLowerCase().includes(q)
        ));
    }, [posts]);

    return (
        <div className="marketplace">
            <div className="marketplace__hero">
                <div className="container">
                    <h1 className="marketplace__title">🌾 Fresh Produce Marketplace</h1>
                    <p className="marketplace__sub">Directly from farmers across India</p>
                    <div className="marketplace__search-wrap">
                        <Search size={18} className="marketplace__search-icon" />
                        <input
                            className="marketplace__search"
                            type="search"
                            placeholder="Search crops, farmers, or products…"
                            value={search}
                            onChange={handleSearch}
                            aria-label="Search marketplace"
                        />
                    </div>
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <div className="marketplace__loading"><Spinner size="lg" /></div>
                ) : filtered.length === 0 ? (
                    <div className="marketplace__empty">
                        <p>{search ? `No results for "${search}"` : 'No products listed yet. Check back soon!'}</p>
                    </div>
                ) : (
                    <>
                        <p className="marketplace__count">{filtered.length} products found</p>
                        <div className="auto-grid marketplace__grid animate-fade-in">
                            {filtered.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onAction={() => navigate(`/posts/${post.id}`)}
                                    actionLabel="View & Order"
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
