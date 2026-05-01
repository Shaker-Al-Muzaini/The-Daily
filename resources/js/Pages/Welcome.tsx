import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ChevronRight, 
    ArrowRight, 
    Globe, 
    BookOpen,
    PenTool,
    MessageSquare,
    ArrowUpRight,
    Search
} from 'lucide-react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useEffect } from 'react';
import Hero from '@/Components/Landing/Hero';
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

    const categories = [
        { title: t('cat_tech_title'), desc: t('cat_tech_desc'), icon: BookOpen },
        { title: t('cat_biz_title'), desc: t('cat_biz_desc'), icon: BookOpen },
        { title: t('cat_life_title'), desc: t('cat_life_desc'), icon: MessageSquare },
        { title: t('cat_sci_title'), desc: t('cat_sci_desc'), icon: Globe },
    ];

    const insights = [
        {
            title: "The Future of AI in Journalism",
            desc: "How generative models are changing the way we consume news and verify facts.",
            category: "Technology",
            date: "May 12, 2026",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Sustainable Living in Mega Cities",
            desc: "New architectural trends focused on vertical farming and renewable energy integration.",
            category: "Lifestyle",
            date: "May 10, 2026",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "The Decentralized Economy",
            desc: "Understanding the shift towards peer-to-peer financial systems and digital assets.",
            category: "Business",
            date: "May 08, 2026",
            image: "https://images.unsplash.com/photo-1518186239751-6467fd502f76?auto=format&fit=crop&q=80&w=800",
        }
    ];

    return (
        <div className={`min-h-screen selection:bg-blue-500/30 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0C10] text-white' : 'bg-white text-[#1a1f36]'}`}>
            <Head title="The Daily | Premium Digital Journalism" />
            
            <Navbar auth={auth} />

            <main>
                <Hero />

                {/* Latest Insights Section */}
                <section className="py-24 border-t border-gray-500/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-3xl font-bold">{t('latest_insights')}</h2>
                            <button className="text-blue-600 font-bold flex items-center gap-2 group">
                                {t('read_more')} <ArrowRight className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {insights.map((post, i) => (
                                <motion.div
                                    key={post.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-blue-600 text-sm font-bold mb-3">{post.date}</p>
                                    <h4 className="text-2xl font-bold mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h4>
                                    <p className={`line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {post.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-24 bg-gray-500/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('newsletter_title')}</h2>
                            <p className={`text-xl mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('newsletter_desc')}
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <input 
                                    type="email" 
                                    placeholder={t('newsletter_placeholder')}
                                    className={`flex-1 px-6 py-4 rounded-full border border-gray-500/10 focus:ring-2 focus:ring-blue-600 outline-none ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}
                                />
                                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/25">
                                    {t('newsletter_button')}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className={`p-12 md:p-20 rounded-[40px] relative overflow-hidden bg-[#1a1f36] text-white flex flex-col md:flex-row items-center justify-between gap-12`}>
                            <div className="max-w-xl">
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{t('cta_title')}</h2>
                                <p className="text-xl text-blue-100/80 mb-10">
                                    {t('cta_desc')}
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href={route('register')} className="px-8 py-4 bg-[#635bff] text-white rounded-full font-bold text-lg hover:scale-105 transition-all">
                                        {t('cta_trial')}
                                    </Link>
                                    <Link href="#" className="px-8 py-4 border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                                        {t('cta_plans')}
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Decorative background for CTA */}
                            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                                <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-blue-500 rotate-[15deg] blur-[100px]" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`py-20 border-t ${theme === 'dark' ? 'border-white/5 bg-[#050608]' : 'border-gray-100 bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                        <div className="col-span-2">
                            <h2 className="text-2xl font-bold mb-8 lowercase tracking-tighter">the daily</h2>
                            <div className="space-y-4">
                                <p className="flex items-center gap-2 text-sm opacity-60">
                                    <Globe className="w-4 h-4" /> Global Reach
                                </p>
                                <p className="flex items-center gap-2 text-sm opacity-60">
                                    <Globe className="w-4 h-4" /> English (United States)
                                </p>
                            </div>
                        </div>
                        {[
                            { title: 'Sections', links: ['Technology', 'Business', 'Lifestyle', 'Science'] },
                            { title: 'About', links: ['Our Story', 'Careers', 'Press', 'Contact'] },
                            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="font-bold mb-6">{col.title}</h4>
                                <ul className="space-y-4 opacity-60 text-sm">
                                    {col.links.map(link => (
                                        <li key={link}><Link href="#" className="hover:opacity-100 transition-opacity">{link}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-20 pt-8 border-t border-gray-500/10 text-sm opacity-40">
                        © 2026 The Daily. {t('footer_rights')}
                    </div>
                </div>
            </footer>
        </div>
    );
}
