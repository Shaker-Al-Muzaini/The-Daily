import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, FileText, Edit3, Trash2, Eye, Calendar, Search } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Post {
    id: number;
    title: { en: string; ar: string };
    slug: string;
    excerpt: { en: string; ar: string } | null;
    featured_image: string | null;
    is_published: boolean;
    category: { id: number; name: { en: string; ar: string } } | null;
    created_at: string;
}

export default function PostsIndex({ posts }: { posts: Post[] }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const title = locale === 'ar' ? post.title.ar : post.title.en;
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDelete = (id: number) => {
        Swal.fire({
            title: t('dash_confirm_delete'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#C5A059',
            cancelButtonColor: '#6b7280',
            confirmButtonText: t('dash_yes_delete'),
            cancelButtonText: t('dash_cancel'),
            background: isDark ? '#12141a' : '#fff',
            color: isDark ? '#fff' : '#1a1f36',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.posts.destroy', { id }));
            }
        });
    };

    return (
        <DashboardLayout>
            <Head title={t('dash_all_posts')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_all_posts')}</h1>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{filteredPosts.length} {t('dash_posts').toLowerCase()}</p>
                    </div>
                    <Link
                        href={route('admin.posts.create')}
                        className="inline-flex items-center gap-2 bg-[#C5A059] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 hover:scale-105"
                    >
                        <Plus className="w-4 h-4" /> {t('dash_create_post')}
                    </Link>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('dash_search')}
                        className={`w-full border-none rounded-xl py-2.5 text-sm ${locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:ring-2 focus:ring-[#C5A059]/50 ${isDark ? 'bg-white/5 text-white placeholder:text-gray-600' : 'bg-white text-gray-900 placeholder:text-gray-400 shadow-sm'}`}
                    />
                </div>

                {/* Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`rounded-2xl border p-16 text-center ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100'}`}
                    >
                        <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
                        <p className={`text-lg font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('dash_no_posts')}</p>
                        <Link
                            href={route('admin.posts.create')}
                            className="inline-flex items-center gap-2 mt-4 bg-[#C5A059] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all"
                        >
                            <Plus className="w-4 h-4" /> {t('dash_create_post')}
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl ${isDark ? 'bg-zinc-900 border-white/10 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5' : 'bg-white border-gray-100 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5'}`}
                            >
                                {/* Image */}
                                <div className={`h-40 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    {post.featured_image ? (
                                        <img src={`/storage/${post.featured_image}`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FileText className={`w-10 h-10 ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        {post.category && (
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isDark ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#C5A059]/5 text-[#C5A059]'}`}>
                                                {locale === 'ar' ? post.category.name.ar : post.category.name.en}
                                            </span>
                                        )}
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${post.is_published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {post.is_published ? t('dash_published') : t('dash_draft')}
                                        </span>
                                    </div>

                                    <h3 className={`font-bold text-base mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                        {locale === 'ar' ? post.title.ar : post.title.en}
                                    </h3>

                                    <div className="flex items-center gap-1.5 mb-4">
                                        <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{post.created_at}</span>
                                    </div>

                                    <div className={`flex items-center gap-2 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-50'}`}>
                                        <Link
                                            href={route('admin.posts.edit', { id: post.id })}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-[#C5A059]/10 hover:text-[#C5A059]' : 'bg-gray-50 text-gray-500 hover:bg-[#C5A059]/5 hover:text-[#C5A059]'}`}
                                        >
                                            <Edit3 className="w-3.5 h-3.5" /> {t('dash_edit')}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-red-500/10 hover:text-red-400' : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500'}`}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> {t('dash_delete')}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
