import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FileText, FolderOpen, Eye, TrendingUp, ArrowUpRight, Plus, Calendar } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';

interface DashboardProps {
    stats: {
        total_posts: number;
        published_posts: number;
        total_categories: number;
        recent_posts: Array<{
            id: number;
            title: { en: string; ar: string };
            slug: string;
            is_published: boolean;
            category: { name: { en: string; ar: string } } | null;
            created_at: string;
        }>;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';

    const statCards = [
        {
            label: t('dash_total_posts'),
            value: stats.total_posts,
            icon: FileText,
            color: 'text-blue-500',
            bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
            change: '+12%',
        },
        {
            label: t('dash_published_posts'),
            value: stats.published_posts,
            icon: Eye,
            color: 'text-green-500',
            bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
            change: '+8%',
        },
        {
            label: t('dash_total_categories'),
            value: stats.total_categories,
            icon: FolderOpen,
            color: 'text-purple-500',
            bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
            change: '+3%',
        },
    ];

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden p-8 md:p-10 rounded-3xl border shadow-xl group ${isDark ? 'bg-[#0A0C10] border-white/5' : 'bg-white border-gray-100'}`}
                >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                {t('dash_welcome_back')}
                            </h2>
                            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {t('dash_welcome_desc')}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('admin.posts.create')}
                                className="flex items-center gap-2 bg-[#C5A059] text-black px-6 py-3 rounded-2xl font-bold hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 hover:scale-105 active:scale-95 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                {t('dash_create_post')}
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                        <div className="absolute top-[-50%] right-[-10%] w-1/2 h-[200%] bg-[#C5A059]/10 rotate-[25deg] blur-[100px] group-hover:bg-[#C5A059]/15 transition-colors duration-1000" />
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {statCards.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                    {stat.change} <ArrowUpRight className="w-3 h-3" />
                                </span>
                            </div>
                            <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                            <h3 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Posts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_recent_posts')}</h3>
                        <Link
                            href={route('admin.posts.index')}
                            className="text-[#C5A059] text-sm font-bold hover:underline flex items-center gap-1"
                        >
                            {t('dash_view_all')} <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {stats.recent_posts.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                            <p className={`font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('dash_no_posts')}</p>
                            <Link
                                href={route('admin.posts.create')}
                                className="inline-flex items-center gap-2 mt-4 bg-[#C5A059] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all"
                            >
                                <Plus className="w-4 h-4" /> {t('dash_create_post')}
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                            {stats.recent_posts.map((post) => (
                                <div key={post.id} className={`flex items-center justify-between px-6 py-4 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'}`}>
                                            <FileText className="w-4 h-4 text-[#C5A059]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                {locale === 'ar' ? post.title.ar : post.title.en}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                {post.category && (
                                                    <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {locale === 'ar' ? post.category.name.ar : post.category.name.en}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar className="w-3 h-3" /> {post.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${post.is_published ? 'bg-green-500/10 text-green-500' : (isDark ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-50 text-yellow-600')}`}>
                                            {post.is_published ? t('dash_published') : t('dash_draft')}
                                        </span>
                                        <Link
                                            href={route('admin.posts.edit', { id: post.id })}
                                            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
                                        >
                                            <TrendingUp className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
