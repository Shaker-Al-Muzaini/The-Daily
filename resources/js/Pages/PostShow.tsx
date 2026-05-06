import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, ArrowRight, BookOpen, Share2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Post {
    id: number;
    title: { en: string; ar: string };
    slug: string;
    content: { en: string; ar: string };
    excerpt: { en: string; ar: string } | null;
    featured_image: string | null;
    category: { id: number; name: { en: string; ar: string } } | null;
    created_at: string;
}

interface RelatedPost {
    id: number;
    title: { en: string; ar: string };
    slug: string;
    excerpt: { en: string; ar: string } | null;
    featured_image: string | null;
    created_at: string;
}

interface PostShowProps {
    auth: any;
    post: Post;
    relatedPosts: RelatedPost[];
}

export default function PostShow({ auth, post, relatedPosts }: PostShowProps) {
    const { flash } = usePage().props as any;
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const title = isRtl ? post.title.ar : post.title.en;
    const content = isRtl ? post.content.ar : post.content.en;
    const excerpt = post.excerpt ? (isRtl ? post.excerpt.ar : post.excerpt.en) : '';
    const categoryName = post.category ? (isRtl ? post.category.name.ar : post.category.name.en) : null;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: isRtl ? 'تم بنجاح!' : 'Success!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#C5A059',
                background: isDark ? '#12141a' : '#fff',
                color: isDark ? '#fff' : '#1a1f36',
            });
        }
    }, [flash.success]);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Head title={`${title} - The Daily`} />
            <Navbar auth={auth} />

            {/* Hero */}
            <section className="relative pt-32 pb-0 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-[#C5A059]/6' : 'bg-[#C5A059]/4'}`} />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-2 text-xs font-medium mb-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                    >
                        <Link href="/" className="hover:text-[#C5A059] transition-colors">{isRtl ? 'الرئيسية' : 'Home'}</Link>
                        <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                        <Link href={route('products')} className="hover:text-[#C5A059] transition-colors">{t('nav_products')}</Link>
                        <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                        <span className="truncate max-w-[200px]">{title}</span>
                    </motion.nav>

                    {/* Category Badge */}
                    {categoryName && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: 'rgba(197,160,89,0.12)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.2)' }}>
                                <Tag className="w-3 h-3" />
                                {categoryName}
                            </span>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}
                    >
                        {title}
                    </motion.h1>

                    {/* Excerpt */}
                    {excerpt && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className={`text-xl leading-relaxed mb-8 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            {excerpt}
                        </motion.p>
                    )}

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`flex items-center justify-between pb-8 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                    >
                        <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            <span className={`flex items-center gap-1.5 font-medium`}>
                                <Calendar className="w-4 h-4" />
                                {post.created_at}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleShare}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-[#C5A059]/40 hover:text-[#C5A059] shadow-sm'}`}
                            >
                                <Share2 className="w-3.5 h-3.5" />
                                {isRtl ? 'مشاركة' : 'Share'}
                            </button>

                            {auth.user ? (
                                <Link
                                    method="post"
                                    href={route('product.request', { id: post.id })}
                                    as="button"
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all bg-[#C5A059] text-black hover:bg-[#B48F48] shadow-lg shadow-[#C5A059]/20 hover:scale-105`}
                                >
                                    <Tag className="w-4 h-4" />
                                    {isRtl ? 'طلب هذا المنتج' : 'Request this product'}
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border-2 border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black hover:scale-105`}
                                >
                                    <Tag className="w-4 h-4" />
                                    {isRtl ? 'سجل لطلب المنتج' : 'Login to request'}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            {post.featured_image && (
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="px-6 py-10"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="rounded-3xl overflow-hidden aspect-[16/7]">
                            <img
                                src={post.featured_image.startsWith('http') ? post.featured_image : `/storage/${post.featured_image}`}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Article Content */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-6 pb-16"
            >
                <div className="max-w-4xl mx-auto">
                    <div
                        className={`prose prose-lg max-w-none leading-relaxed
                            ${isRtl ? 'text-right' : 'text-left'}
                            ${isDark
                                ? 'prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-[#C5A059] prose-blockquote:border-[#C5A059] prose-blockquote:text-gray-400 prose-code:text-[#C5A059]'
                                : 'prose-p:text-gray-600 prose-headings:text-[#1a1f36] prose-a:text-[#C5A059] prose-blockquote:border-[#C5A059]'
                            }
                        `}
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {content ? content.split('\n').map((paragraph, i) =>
                            paragraph.trim() ? (
                                <p key={i} className={`mb-4 text-base leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {paragraph}
                                </p>
                            ) : <br key={i} />
                        ) : (
                            <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                                {isRtl ? 'لا يوجد محتوى.' : 'No content available.'}
                            </p>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Back Button */}
            <section className="px-6 pb-16">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={route('products')}
                        className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#C5A059]/40 hover:text-[#C5A059] shadow-sm'}`}
                    >
                        <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        {isRtl ? 'العودة إلى المقالات' : 'Back to Articles'}
                    </Link>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className={`px-6 py-16 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className={`text-2xl font-extrabold mb-8 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {isRtl ? 'مقالات ذات صلة' : 'Related Articles'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {relatedPosts.map((related, i) => (
                                <motion.div
                                    key={related.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={route('post.show', { slug: related.slug })}
                                        className={`group block rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-[#12141a] border-white/5 hover:border-[#C5A059]/20 hover:shadow-[#C5A059]/5' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#C5A059]/20'}`}
                                    >
                                        <div className={`aspect-[16/9] overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                            {related.featured_image ? (
                                                <img
                                                    src={related.featured_image.startsWith('http') ? related.featured_image : `/storage/${related.featured_image}`}
                                                    alt={isRtl ? related.title.ar : related.title.en}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className={`w-8 h-8 ${isDark ? 'text-white/10' : 'text-gray-200'}`} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className={`text-sm font-bold line-clamp-2 mb-3 transition-colors group-hover:text-[#C5A059] ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                {isRtl ? related.title.ar : related.title.en}
                                            </h3>
                                            <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {related.created_at}
                                                </span>
                                                <span className="flex items-center gap-1 font-bold text-[#C5A059]">
                                                    {t('read_more')}
                                                    <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
