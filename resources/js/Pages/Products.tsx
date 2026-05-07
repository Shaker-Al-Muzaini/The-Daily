import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface Post {
    id: number;
    title: { en: string; ar: string };
    slug: string;
    excerpt: { en: string; ar: string } | null;
    featured_image: string | null;
    category: { id: number; name: { en: string; ar: string } } | null;
    created_at: string;
}

interface Category {
    id: number;
    name: { en: string; ar: string };
    slug: string;
    posts_count: number;
}

interface ProductsProps {
    auth: any;
    posts: Post[];
    categories: Category[];
}

export default function Products({ auth, posts, categories }: ProductsProps) {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = activeCategory === null || post.category?.id === activeCategory;
        const title = isRtl ? post.title.ar : post.title.en;
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
        }),
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Head title={`${t('products_title')} - The Daily`} />
            <Navbar auth={auth} />

            {/* Hero */}
            <section className="relative pt-36 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-[#C5A059]/8' : 'bg-[#C5A059]/5'}`} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 border" style={{ background: isDark ? 'rgba(197,160,89,0.1)' : 'rgba(197,160,89,0.08)', borderColor: 'rgba(197,160,89,0.25)', color: '#C5A059' }}>
                        <BookOpen className="w-3.5 h-3.5" />
                        {isRtl ? 'أحدث منتجاتنا المتميزة' : 'Our Latest Premium Products'}
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                        {t('products_title')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`text-lg max-w-2xl mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('products_desc')}
                    </motion.p>

                    {/* Search */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-lg mx-auto relative">
                        <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className={`w-full ${isRtl ? 'pr-12 pl-5' : 'pl-12 pr-5'} py-3.5 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm'}`}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${activeCategory === null
                                ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-lg shadow-[#C5A059]/20'
                                : isDark
                                    ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-[#C5A059]/40 hover:text-[#C5A059] shadow-sm'
                            }`}
                        >
                            {t('products_all')}
                            <span className={`ms-2 text-xs px-1.5 py-0.5 rounded-md ${activeCategory === null ? 'bg-black/20' : isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                {posts.length}
                            </span>
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${activeCategory === cat.id
                                    ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-lg shadow-[#C5A059]/20'
                                    : isDark
                                        ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-[#C5A059]/40 hover:text-[#C5A059] shadow-sm'
                                }`}
                            >
                                {isRtl ? cat.name.ar : cat.name.en}
                                <span className={`ms-2 text-xs px-1.5 py-0.5 rounded-md ${activeCategory === cat.id ? 'bg-black/20' : isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    {cat.posts_count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {filteredPosts.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`rounded-3xl p-24 text-center border ${isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}
                            >
                                <BookOpen className={`w-14 h-14 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                                <p className={`text-lg font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {t('products_no_results')}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {isRtl ? 'حاول تغيير الفلتر أو البحث بكلمة مختلفة' : 'Try changing the filter or search with a different keyword'}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredPosts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Link
                                            href={route('post.show', { slug: post.slug })}
                                            className={`group block rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isDark ? 'bg-[#12141a] border-white/5 hover:border-[#C5A059]/20 hover:shadow-[#C5A059]/5' : 'bg-white border-gray-100 hover:border-[#C5A059]/20 hover:shadow-[#C5A059]/10 shadow-sm'}`}
                                        >
                                            {/* Image */}
                                            <div className={`aspect-[16/9] overflow-hidden relative ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image.startsWith('http') ? post.featured_image : `/storage/${post.featured_image}`}
                                                        alt={isRtl ? post.title.ar : post.title.en}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-white/5 to-[#C5A059]/5' : 'bg-gradient-to-br from-gray-50 to-[#C5A059]/5'}`}>
                                                        <BookOpen className={`w-10 h-10 ${isDark ? 'text-white/10' : 'text-gray-200'}`} />
                                                    </div>
                                                )}
                                                {post.category && (
                                                    <div className="absolute top-4 start-4">
                                                        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#C5A059] text-black">
                                                            {isRtl ? post.category.name.ar : post.category.name.en}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h2 className={`text-lg font-extrabold mb-3 line-clamp-2 leading-snug transition-colors group-hover:text-[#C5A059] ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                    {isRtl ? post.title.ar : post.title.en}
                                                </h2>
                                                {post.excerpt && (
                                                    <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                        {isRtl ? post.excerpt.ar : post.excerpt.en}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {post.created_at}
                                                    </div>
                                                    <span className={`flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-all group-hover:gap-2`}>
                                                        {t('read_more')}
                                                        <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
