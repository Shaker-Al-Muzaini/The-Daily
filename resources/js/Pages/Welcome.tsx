import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Shield,
    Zap,
    BarChart3,
    TrendingUp,
    MessageCircle,
    ArrowRight,
    Star,
    CheckCircle2,
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
        { icon: Shield, title: t('feat_secure'), desc: t('feat_secure_desc') },
        { icon: Zap, title: t('feat_fast'), desc: t('feat_fast_desc') },
        { icon: BarChart3, title: t('feat_scalable'), desc: t('feat_scalable_desc') },
    ];

    const portfolioImages = [
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Analytics Dashboard' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Data Visualization' },
        { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Workspace' },
        { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Team collaboration' },
        { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Meeting' },
        { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=500&h=300', alt: 'Technology' },
    ];

    const trustedBy = [
        { name: 'Google' },
        { name: 'Microsoft' },
        { name: 'Airbnb' },
        { name: 'Amazon' },
        { name: 'HubSpot' },
        { name: 'Slack' },
        { name: 'Spotify' },
    ];

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen selection:bg-[#C5A059]/30 transition-colors duration-500 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-white text-gray-900'}`}>
            <Head title="The Daily | All-in-one digital platform" />
            <Navbar auth={auth} />

            <main>
                {/* Hero Section */}
                <section className={`pt-28 pb-20 px-6 ${isDark ? 'bg-[#0A0C10]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 mb-8"
                                >
                                    <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                                    <span className="text-[#C5A059] text-xs font-bold tracking-wide uppercase">{t('hero_badge')}</span>
                                </motion.div>

                                <h1 className={`text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                    {t('hero_title_1')}
                                    <br />
                                    <span className="text-[#C5A059]">{t('hero_title_accent')}</span>
                                    <br />
                                    {t('hero_title_2')}
                                </h1>

                                <p className={`text-lg mb-10 leading-relaxed max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {t('hero_desc')}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4 mb-14">
                                    <Link
                                        href={route('register')}
                                        className="group px-8 py-3.5 bg-[#C5A059] hover:bg-[#B48F48] text-black rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-[#C5A059]/25 flex items-center gap-2"
                                    >
                                        {t('hero_cta')}
                                        <ArrowRight className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                    </Link>
                                    <Link
                                        href={route('solutions')}
                                        className={`px-8 py-3.5 border-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${isDark ? 'border-white/20 hover:border-[#C5A059] text-white hover:text-[#C5A059]' : 'border-gray-200 hover:border-[#C5A059] text-gray-700 hover:text-[#C5A059]'}`}
                                    >
                                        {t('hero_explore')}
                                    </Link>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-3 gap-6">
                                    {features.map((feature, i) => (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className="group"
                                        >
                                            <div className={`p-2.5 rounded-xl w-fit mb-3 transition-colors ${isDark ? 'bg-[#C5A059]/10 group-hover:bg-[#C5A059]/20' : 'bg-[#C5A059]/5 group-hover:bg-[#C5A059]/15'}`}>
                                                <feature.icon className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{feature.title}</h3>
                                            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{feature.desc}</p>
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
                                <div className={`rounded-3xl p-6 shadow-2xl ${isDark ? 'bg-gradient-to-br from-[#12141a] to-[#0A0C10] border border-[#C5A059]/20 shadow-[#C5A059]/5' : 'bg-white border border-gray-200 shadow-gray-200/50'}`}>
                                    {/* Browser Tabs */}
                                    <div className={`flex items-center gap-2 mb-5 pb-5 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-100'}`}>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#C5A059]/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <div className={`flex-1 mx-4 h-7 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}></div>
                                    </div>

                                    {/* Image Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {portfolioImages.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + i * 0.08 }}
                                                className={`rounded-xl overflow-hidden border transition-all relative group h-[130px] ${isDark ? 'border-white/10 hover:border-[#C5A059]/50' : 'border-gray-100 hover:border-[#C5A059]/40'}`}
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Stats Row */}
                                    <div className={`flex items-center justify-between rounded-2xl p-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('growth')}</p>
                                                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('growth_val')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center">
                                                <MessageCircle className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <div>
                                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('support')}</p>
                                                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('support_val')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Uptime Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className={`absolute top-20 -right-5 rounded-2xl px-4 py-3 text-center shadow-xl ${isDark ? 'bg-[#0A0C10] border-2 border-[#C5A059] shadow-[#C5A059]/20' : 'bg-white border-2 border-[#C5A059] shadow-[#C5A059]/10'}`}
                                    >
                                        <p className="text-[#C5A059] font-extrabold text-xl">99%</p>
                                        <p className="text-xs text-[#C5A059]/70 font-medium">{t('uptime')}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className={`py-20 px-6 ${isDark ? 'bg-[#0A0C10] border-t border-white/5' : 'bg-gray-50 border-t border-gray-100'}`}>
                    <div className="max-w-7xl mx-auto text-center">
                        <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-10 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            {t('trusted_by')}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
                            {trustedBy.map((company, i) => (
                                <motion.div
                                    key={company.name}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className={`text-xl font-extrabold tracking-tight transition-colors cursor-default ${isDark ? 'text-gray-700 hover:text-[#C5A059]' : 'text-gray-300 hover:text-[#C5A059]'}`}
                                >
                                    {company.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className={`py-24 px-6 ${isDark ? 'bg-[#0A0C10]' : 'bg-white'}`}>
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={`text-3xl md:text-4xl font-extrabold mb-5 tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                {t('newsletter_title')}
                            </h2>
                            <p className={`mb-10 text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {t('newsletter_desc')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder={t('newsletter_placeholder')}
                                    className={`flex-1 px-5 py-3.5 rounded-full border text-sm font-medium transition-all focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                />
                                <button className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#B48F48] text-black rounded-full font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[#C5A059]/25 whitespace-nowrap">
                                    {t('newsletter_button')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={`py-24 px-6 ${isDark ? 'bg-gradient-to-b from-[#0A0C10] to-[#12141a]' : 'bg-gradient-to-b from-white to-gray-50'}`}>
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={`p-12 md:p-16 rounded-[40px] relative overflow-hidden ${isDark ? 'bg-[#12141a] border border-white/10' : 'bg-white border border-gray-100 shadow-xl shadow-gray-100/50'}`}>
                                <div className="relative z-10">
                                    <h2 className={`text-3xl md:text-4xl font-extrabold mb-5 tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                        {t('cta_title')}
                                    </h2>
                                    <p className={`mb-10 text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {t('cta_desc')}
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Link
                                            href={route('register')}
                                            className="group px-8 py-3.5 bg-[#C5A059] hover:bg-[#B48F48] text-black rounded-full font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[#C5A059]/25 flex items-center gap-2"
                                        >
                                            {t('cta_trial')}
                                            <ArrowRight className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
                                        </Link>
                                        <Link
                                            href={route('pricing')}
                                            className={`px-8 py-3.5 border-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${isDark ? 'border-white/20 hover:border-[#C5A059] text-white hover:text-[#C5A059]' : 'border-gray-200 hover:border-[#C5A059] text-gray-700 hover:text-[#C5A059]'}`}
                                        >
                                            {t('cta_plans')}
                                        </Link>
                                    </div>
                                </div>
                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C5A059]/5 blur-[100px] rounded-full pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`py-12 px-6 ${isDark ? 'bg-[#0A0C10] border-t border-white/5' : 'bg-white border-t border-gray-100'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className={`text-2xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {locale === 'ar' ? 'اليوم' : 'the daily'}
                        </div>
                        <div className="flex items-center gap-8">
                            <Link href={route('products')} className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-[#C5A059]' : 'text-gray-400 hover:text-[#C5A059]'}`}>{t('nav_products')}</Link>
                            <Link href={route('solutions')} className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-[#C5A059]' : 'text-gray-400 hover:text-[#C5A059]'}`}>{t('nav_solutions')}</Link>
                            <Link href={route('pricing')} className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-[#C5A059]' : 'text-gray-400 hover:text-[#C5A059]'}`}>{t('nav_pricing')}</Link>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            © 2026 The Daily. {t('footer_rights')}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
