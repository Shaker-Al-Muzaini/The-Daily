import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Package, FolderOpen, Eye, TrendingUp, ArrowUpRight, Plus, Calendar, ShoppingBag, Clock, Users } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import NeuralAnalytics from '@/Components/NeuralAnalytics';

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
        pending_requests: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const statCards = [
        {
            label: t('dash_total_posts'),
            value: stats.total_posts,
            icon: Package,
            color: 'text-[#C5A059]',
            bg: isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5',
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
            label: isRtl ? 'الأقسام' : 'Categories',
            value: stats.total_categories,
            icon: FolderOpen,
            color: 'text-blue-500',
            bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
            change: '+3%',
        },
        {
            label: t('dash_pending_requests'),
            value: stats.pending_requests,
            icon: ShoppingBag,
            color: 'text-orange-500',
            bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
            change: stats.pending_requests > 0 ? `+${stats.pending_requests}` : '0',
            href: route('admin.requests.index'),
        },
    ];

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-10">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden p-6 md:p-8 rounded-[24px] border shadow-xl group ${isDark ? 'bg-[#0D0F14] border-white/5' : 'bg-white border-gray-100'}`}
                >
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className={`text-3xl font-black tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                {isRtl ? 'مرحباً بك مجدداً!' : 'Welcome back!'}
                            </h2>
                            <p className={`text-sm leading-relaxed font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {t('dash_welcome_desc')}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.posts.create')}
                                className="flex items-center gap-2 bg-[#C5A059] text-black px-6 py-3 rounded-xl font-black hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 hover:scale-105 active:scale-95 text-sm"
                            >
                                <Plus className="w-5 h-5" />
                                {t('dash_create_post')}
                            </Link>
                        </div>
                    </div>
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                        <div className="absolute top-[-50%] right-[-10%] w-1/2 h-[200%] bg-[#C5A059]/10 rotate-[25deg] blur-[120px] group-hover:bg-[#C5A059]/15 transition-colors duration-1000" />
                        <div className="absolute bottom-[-50%] left-[-10%] w-1/3 h-[150%] bg-blue-500/5 rotate-[-25deg] blur-[100px]" />
                    </div>
                </motion.div>

                {/* Advanced Neural Analytics Section */}

                {/* Advanced Neural Analytics Section */}
                <NeuralAnalytics stats={stats} />

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Posts List */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`lg:col-span-2 rounded-[32px] border overflow-hidden ${isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className={`flex items-center justify-between px-8 py-6 border-b ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-100 bg-gray-50/50'}`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#C5A059]/10 rounded-lg">
                                    <Package className="w-5 h-5 text-[#C5A059]" />
                                </div>
                                <h3 className={`font-black text-xl ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_recent_posts')}</h3>
                            </div>
                            <Link
                                href={route('admin.posts.index')}
                                className="text-[#C5A059] text-sm font-black hover:underline flex items-center gap-1 group"
                            >
                                {t('dash_view_all')} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>

                        {stats.recent_posts.length === 0 ? (
                            <div className="p-20 text-center">
                                <FileText className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-gray-800' : 'text-gray-200'}`} />
                                <p className={`text-lg font-bold mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('dash_no_posts')}</p>
                                <Link
                                    href={route('admin.posts.create')}
                                    className="inline-flex items-center gap-2 bg-[#C5A059] text-black px-6 py-3 rounded-2xl font-black text-sm hover:bg-[#B48F48] transition-all"
                                >
                                    <Plus className="w-4 h-4" /> {t('dash_create_post')}
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-white/5">
                                {stats.recent_posts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className={`flex items-center justify-between px-8 py-6 transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50/50'}`}
                                    >
                                        <div className="flex items-center gap-5 flex-1 min-w-0">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                <Package className="w-6 h-6 text-[#C5A059]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`font-black text-lg truncate ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                    {isRtl ? post.title.ar : post.title.en}
                                                </p>
                                                <div className="flex items-center gap-4 mt-1.5">
                                                    {post.category && (
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${isDark ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#C5A059]/5 text-[#C5A059]'}`}>
                                                            {isRtl ? post.category.name.ar : post.category.name.en}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                                        <Clock className="w-3.5 h-3.5" /> {post.created_at}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight ${post.is_published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                {post.is_published ? t('dash_published') : t('dash_draft')}
                                            </span>
                                            <Link
                                                href={route('admin.posts.edit', { id: post.id })}
                                                className={`p-3 rounded-xl transition-all ${isDark ? 'bg-white/5 text-gray-500 hover:text-[#C5A059] hover:bg-[#C5A059]/10' : 'bg-gray-100 text-gray-400 hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
                                            >
                                                <TrendingUp className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Quick Actions / Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-8"
                    >
                        {/* Quick Stats/Activity */}
                        <div className={`rounded-[32px] border p-8 ${isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <h3 className={`font-black text-xl mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{isRtl ? 'نظرة سريعة' : 'Quick Glance'}</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-gray-500">{isRtl ? 'المستخدمين الجدد' : 'New Users'}</span>
                                            <span className="text-xs font-black text-blue-500">+12</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full w-[65%] bg-blue-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-[#C5A059]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-gray-500">{isRtl ? 'معدل التفاعل' : 'Engagement'}</span>
                                            <span className="text-xs font-black text-[#C5A059]">84%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full w-[84%] bg-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Mini List */}
                        <div className={`rounded-[32px] border p-8 ${isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <h3 className={`font-black text-xl mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{isRtl ? 'النشاط الأخير' : 'Recent Activity'}</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-full border-2 border-[#C5A059]/20 flex items-center justify-center text-[10px] font-black ${isDark ? 'text-[#C5A059]' : 'text-[#C5A059]'}`}>
                                            JD
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-[#1a1f36]'}`}>
                                                {isRtl ? 'قام Shaker بطلب منتج جديد' : 'Shaker requested a new product'}
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
