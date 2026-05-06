import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, FolderOpen, Edit3, Trash2, Search, Save, X } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';

interface Category {
    id: number;
    name: { en: string; ar: string };
    slug: string;
    posts_count: number;
    created_at: string;
}

export default function CategoriesIndex({ categories }: { categories: Category[] }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, reset, errors } = useForm({
        name: { en: '', ar: '' },
    });

    const filteredCategories = categories.filter((cat) => {
        const name = locale === 'ar' ? cat.name.ar : cat.name.en;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleOpenModal = (category?: Category) => {
        if (category) {
            setEditingId(category.id);
            setData('name', category.name);
        } else {
            setEditingId(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingId(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(route('admin.categories.update', { id: editingId }), {
                onSuccess: () => handleCloseModal(),
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => handleCloseModal(),
            });
        }
    };

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
                router.delete(route('admin.categories.destroy', { id }));
            }
        });
    };

    const inputClass = `w-full rounded-xl py-3 px-4 text-sm border transition-all focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`;
    const labelClass = `block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <DashboardLayout>
            <Head title={t('dash_all_categories')} />

            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_all_categories')}</h1>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{filteredCategories.length} {t('dash_categories').toLowerCase()}</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center gap-2 bg-[#C5A059] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 hover:scale-105"
                    >
                        <Plus className="w-4 h-4" /> {t('dash_create_category')}
                    </button>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCategories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`group rounded-2xl border p-5 transition-all hover:scale-[1.02] hover:shadow-xl ${isDark ? 'bg-zinc-900 border-white/10 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5' : 'bg-white border-gray-100 hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/5'}`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'}`}>
                                    <FolderOpen className="w-6 h-6 text-[#C5A059]" />
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                        {locale === 'ar' ? cat.name.ar : cat.name.en}
                                    </h3>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {cat.posts_count} {t('dash_posts')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className={`flex items-center gap-2 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-50'}`}>
                                <button
                                    onClick={() => handleOpenModal(cat)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-[#C5A059]/10 hover:text-[#C5A059]' : 'bg-gray-50 text-gray-500 hover:bg-[#C5A059]/5 hover:text-[#C5A059]'}`}
                                >
                                    <Edit3 className="w-3.5 h-3.5" /> {t('dash_edit')}
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-red-500/10 hover:text-red-400' : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500'}`}
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> {t('dash_delete')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`relative w-full max-w-md rounded-3xl shadow-2xl p-6 ${isDark ? 'bg-[#12141a] border border-white/10' : 'bg-white'}`}
                    >
                        <button onClick={handleCloseModal} className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} p-2 rounded-full ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                            <X className="w-5 h-5" />
                        </button>
                        
                        <h2 className={`text-xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {editingId ? t('dash_edit') : t('dash_create_category')}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={labelClass}>{t('dash_name_en')}</label>
                                <input type="text" value={data.name.en} onChange={(e) => setData('name', { ...data.name, en: e.target.value })} className={inputClass} dir="ltr" />
                                {errors['name.en'] && <p className="text-red-500 text-xs mt-1">{errors['name.en']}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>{t('dash_name_ar')}</label>
                                <input type="text" value={data.name.ar} onChange={(e) => setData('name', { ...data.name, ar: e.target.value })} className={inputClass} dir="rtl" />
                                {errors['name.ar'] && <p className="text-red-500 text-xs mt-1">{errors['name.ar']}</p>}
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button type="button" onClick={handleCloseModal} className={`px-5 py-2.5 rounded-xl font-bold text-sm ${isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                                    {t('dash_cancel')}
                                </button>
                                <button type="submit" className="bg-[#C5A059] text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 flex items-center gap-2">
                                    <Save className="w-4 h-4" /> {t('dash_save')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </DashboardLayout>
    );
}
