import { Link } from 'react-router-dom';
import { Leaf, ShoppingBasket, TrendingUp, Shield, ArrowRight, Sprout } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="home">
            {/* Hero */}
            <section className="home__hero">
                <div className="home__hero-bg" aria-hidden="true" />
                <div className="container home__hero-content animate-fade-in">
                    <div className="home__hero-badge">
                        <Sprout size={14} />
                        <span>Farm-to-Table Direct Marketplace</span>
                    </div>
                    <h1 className="home__hero-headline">
                        Fresh Crops,<br />
                        <span className="home__hero-highlight">Direct from Farmers</span>
                    </h1>
                    <p className="home__hero-sub">
                        ConnectOFarm bridges the gap between local farmers and conscious consumers.
                        Buy fresh, support farmers, skip the middleman.
                    </p>
                    <div className="home__hero-actions">
                        <Link to="/marketplace">
                            <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />}>
                                Browse Marketplace
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button size="lg" variant="secondary">
                                Join as a Farmer
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="home__stats">
                <div className="container home__stats-grid">
                    {[
                        { label: 'Active Farmers', value: '500+' },
                        { label: 'Products Listed', value: '2,000+' },
                        { label: 'Happy Consumers', value: '10,000+' },
                        { label: 'States Covered', value: '15+' },
                    ].map(({ label, value }) => (
                        <div className="home__stat" key={label}>
                            <span className="home__stat-value">{value}</span>
                            <span className="home__stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="section home__how">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
                        <h2 className="home__section-title">How It Works</h2>
                        <p className="home__section-sub">Simple, transparent, and fair for everyone.</p>
                    </div>
                    <div className="home__how-grid">
                        {[
                            { icon: Sprout, step: '01', title: 'Farmers Post Crops', desc: 'Farmers list their fresh produce with pricing, quantity, and images directly on the platform.' },
                            { icon: ShoppingBasket, step: '02', title: 'Consumers Browse', desc: 'Consumers browse the marketplace, view post details, and contact farmers before ordering.' },
                            { icon: TrendingUp, step: '03', title: 'Orders & Confirmation', desc: 'Place an order instantly. Farmers confirm and dispatch directly to you without middlemen.' },
                            { icon: Shield, step: '04', title: 'Secure & Transparent', desc: 'JWT-secured accounts, role-based access, and full order tracking from placement to delivery.' },
                        ].map(({ icon: Icon, step, title, desc }) => (
                            <div className="home__how-card" key={step}>
                                <div className="home__how-step">{step}</div>
                                <div className="home__how-icon"><Icon size={28} /></div>
                                <h3 className="home__how-title">{title}</h3>
                                <p className="home__how-desc">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="home__cta">
                <div className="container text-center">
                    <Leaf size={40} className="home__cta-icon" />
                    <h2 className="home__cta-title">Ready to get started?</h2>
                    <p className="home__cta-sub">Create a free account as a FARMER or CONSUMER today.</p>
                    <div className="home__hero-actions" style={{ justifyContent: 'center' }}>
                        <Link to="/register">
                            <Button size="lg" variant="accent">Create Account</Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="secondary">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
