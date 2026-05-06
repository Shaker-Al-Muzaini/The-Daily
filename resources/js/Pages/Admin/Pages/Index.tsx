import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, FileStack, Edit3, Trash2, Search, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Page {
    id: number;
    slug: string;
    title: { en: string; ar: string };
    created_at: string;
}

export default function Index({ pages }: { pages: Page[] }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPages = pages.filter((page) => {
        const title = isRtl ? page.title.ar : page.title.en;
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
                router.delete(route('admin.pages.destroy', { id }));
            }
        });
    };

    return (
        <DashboardLayout>
            <Head title={t('dash_pages')} />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_pages')}</h1>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{filteredPages.length} {t('dash_pages').toLowerCase()}</p>
                    </div>
                    <Link
                        href={route('admin.pages.create')}
                        className="inline-flex items-center gap-2 bg-[#C5A059] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 hover:scale-105"
                    >
                        <Plus className="w-4 h-4" /> {isRtl ? 'إنشاء صفحة جديدة' : 'Create New Page'}
                    </Link>
                </div>

                <div className="relative max-w-sm">
                    <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('dash_search')}
                        className={`w-full border-none rounded-xl py-2.5 text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:ring-2 focus:ring-[#C5A059]/50 ${isDark ? 'bg-white/5 text-white placeholder:text-gray-600' : 'bg-white text-gray-900 placeholder:text-gray-400 shadow-sm'}`}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredPages.map((page, i) => (
                        <motion.div
                            key={page.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`group rounded-2xl border p-5 transition-all hover:scale-[1.02] hover:shadow-xl ${isDark ? 'bg-zinc-900 border-white/10 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5' : 'bg-white border-gray-100 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5'}`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'}`}>
                                    <FileStack className="w-6 h-6 text-[#C5A059]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                        {isRtl ? page.title.ar : page.title.en}
                                    </h3>
                                    <p className={`text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                        /{page.slug}
                                    </p>
                                </div>
                            </div>
                            
                            <div className={`flex items-center gap-2 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-50'}`}>
                                <Link
                                    href={route('admin.pages.edit', { id: page.id })}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-[#C5A059]/10 hover:text-[#C5A059]' : 'bg-gray-50 text-gray-500 hover:bg-[#C5A059]/5 hover:text-[#C5A059]'}`}
                                >
                                    <Edit3 className="w-3.5 h-3.5" /> {t('dash_edit')}
                                </Link>
                                <Link
                                    href={`/${page.slug}`}
                                    target="_blank"
                                    className={`flex items-center justify-center w-10 py-2 rounded-lg transition-colors ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(page.id)}
                                    className={`flex items-center justify-center w-10 py-2 rounded-lg transition-colors ${isDark ? 'bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400' : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
