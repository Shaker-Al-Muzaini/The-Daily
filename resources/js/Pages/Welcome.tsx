import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Shield,
    Zap,
    BarChart3,
    TrendingUp,
    MessageCircle,
    Globe
} from 'lucide-react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useEffect } from 'react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Welcome({ auth }: { auth: any }) {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', locale);
    }, [theme, locale]);

    const features = [
        {
            icon: Shield,
            title: 'Secure',
            desc: 'Enterprise-grade security',
        },
        {
            icon: Zap,
            title: 'Fast',
            desc: 'Built for speed and performance',
        },
        {
            icon: BarChart3,
            title: 'Scalable',
            desc: 'Grow without limitations',
        },
    ];

    const portfolioImages = [
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Team collaboration' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Team meeting' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Workspace' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Design work' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Development' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Project showcase' },
    ];

    const trustedBy = [
        { name: 'Google', logo: '🔍' },
        { name: 'Microsoft', logo: '◼' },
        { name: 'Airbnb', logo: 'Ⓐ' },
        { name: 'Amazon', logo: '◀' },
        { name: 'HubSpot', logo: 'Ⓗ' },
        { name: 'Slack', logo: '▪' },
        { name: 'Spotify', logo: '◉' },
    ];

    return (
        <div className={`min-h-screen selection:bg-yellow-500/30 transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-white'}`}>
            <Head title="The Daily | All-in-one digital platform" />

            <Navbar auth={auth} />

            <main>
                {/* Hero Section */}
                <section className="pt-20 pb-16 px-6 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="pt-4"
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/50 mb-6">
                                    <span className="text-yellow-500 text-sm">⭐</span>
                                    <span className="text-yellow-400 text-xs font-semibold">All-in-one digital platform</span>
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                                    Empowering
                                    <br />
                                    <span className="text-yellow-400">digital experiences</span>
                                    <br />
                                    that drive results.
                                </h1>

                                {/* Description */}
                                <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-lg">
                                    The Daily is your all-in-one platform to build, manage, and grow exceptional digital products with ease and confidence.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-3 mb-12">
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25"
                                    >
                                        Get started
                                    </Link>
                                    <button className="px-6 py-2.5 border-2 border-white/20 hover:border-white/50 text-white rounded-full font-bold text-sm transition-all">
                                        Explore solutions
                                    </button>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-3 gap-6">
                                    {features.map((feature, i) => (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex flex-col items-start"
                                        >
                                            <div className="text-yellow-500 mb-3">
                                                <feature.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                                            <p className="text-gray-500 text-xs">{feature.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right Content - Portfolio Grid */}
                            <motion.div
                                initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                {/* Mockup Frame */}
                                <div className="bg-gradient-to-br from-slate-900/40 to-black/40 border border-yellow-500/30 rounded-3xl p-5 shadow-2xl shadow-yellow-500/10">
                                    {/* Browser Tabs */}
                                    <div className="flex items-center gap-2 mb-5 pb-5 border-b border-yellow-500/20">
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>

                                    {/* Image Grid - 3x2 Regular Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {portfolioImages.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="rounded-lg overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 transition-all relative group h-[140px]"
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Stats Row */}
                                    <div className="flex items-center justify-between bg-slate-800/40 rounded-xl p-4 border border-yellow-500/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                                <TrendingUp className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Growth</p>
                                                <p className="font-bold text-white">+24% this month</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MessageCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400">Support</p>
                                                <p className="font-bold text-white">We're here to help</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Uptime Badge */}
                                    <div className="absolute top-16 -right-6 bg-black border-2 border-yellow-500 rounded-xl px-3 py-2 text-center shadow-lg shadow-yellow-500/20">
                                        <p className="text-yellow-400 font-bold text-lg">99%</p>
                                        <p className="text-xs text-yellow-500/70">Uptime</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="py-16 px-6 bg-black border-t border-gray-800">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
                            TRUSTED BY INNOVATIVE COMPANIES
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-60 hover:opacity-100 transition-opacity">
                            {trustedBy.map((company, i) => (
                                <motion.div
                                    key={company.name}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-2xl font-bold text-gray-400 hover:text-white transition-colors"
                                >
                                    {company.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-16 px-6 bg-black border-t border-gray-800">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                    © 2026 The Daily. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
