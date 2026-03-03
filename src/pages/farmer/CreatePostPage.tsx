import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import postService from '../../api/services/postService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { PostDto } from '../../types';
import './Dashboard.css';

type FormState = Omit<PostDto, 'id' | 'createdAt' | 'image' | 'userId' | 'farmerName' | 'farmerPhone' | 'farmerEmail'>;

const INITIAL: FormState = { title: '', description: '', cropName: '', quantityAvailable: 0, pricePerUnit: 0 };

export default function CreatePostPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'quantityAvailable' || name === 'pricePerUnit' ? Number(value) : value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.cropName.trim()) newErrors.cropName = 'Crop name is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        if (form.pricePerUnit <= 0) newErrors.pricePerUnit = 'Price must be > 0';
        if (form.quantityAvailable <= 0) newErrors.quantityAvailable = 'Quantity must be > 0';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(form)], { type: 'application/json' }));
        if (image) formData.append('image', image);

        setLoading(true);
        try {
            await postService.createPost(formData);
            toast.success('Post created successfully! 🌾');
            navigate('/farmer/posts');
        } catch {
            toast.error('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard animate-fade-in">
            <div className="dashboard__head">
                <div>
                    <h1 className="dashboard__title">Create New Listing</h1>
                    <p className="dashboard__sub">List your fresh produce on the marketplace</p>
                </div>
            </div>

            <div className="create-post__layout">
                <form onSubmit={handleSubmit} className="create-post__form">
                    <div className="create-post__card">
                        <h2 className="create-post__section">Product Details</h2>
                        <div className="create-post__grid">
                            <Input label="Post Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Organic Basmati Rice" error={errors.title} required />
                            <Input label="Crop Name" name="cropName" value={form.cropName} onChange={handleChange} placeholder="e.g. Basmati Rice" error={errors.cropName} required />
                            <Input label="Price per Unit (₹)" name="pricePerUnit" type="number" min="0" step="0.01" value={form.pricePerUnit || ''} onChange={handleChange} placeholder="0.00" error={errors.pricePerUnit} required />
                            <Input label="Quantity Available (units)" name="quantityAvailable" type="number" min="0" value={form.quantityAvailable || ''} onChange={handleChange} placeholder="0" error={errors.quantityAvailable} required />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="description">Description <span className="input-required" aria-hidden>*</span></label>
                            <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe your crop, farming method, harvest date, etc." className="input-field create-post__textarea" rows={4} />
                            {errors.description && <span className="input-error">{errors.description}</span>}
                        </div>
                    </div>

                    <div className="create-post__card">
                        <h2 className="create-post__section">Product Image</h2>
                        <label className="create-post__upload" htmlFor="image-upload">
                            <Upload size={24} />
                            <span>{image ? image.name : 'Click to upload image (optional)'}</span>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                        </label>
                        {preview && <img src={preview} alt="Preview" className="create-post__preview" />}
                    </div>

                    <Button type="submit" size="lg" variant="primary" fullWidth loading={loading}>
                        Publish Listing
                    </Button>
                </form>
            </div>
        </div>
    );
}
