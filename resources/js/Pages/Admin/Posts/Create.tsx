import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import { FormEvent, useRef } from 'react';

interface Category {
    id: number;
    name: { en: string; ar: string };
}

export default function PostCreate({ categories }: { categories: Category[] }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: { en: '', ar: '' },
        content: { en: '', ar: '' },
        excerpt: { en: '', ar: '' },
        category_id: '',
        is_published: false,
        featured_image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title[en]', data.title.en);
        formData.append('title[ar]', data.title.ar);
        formData.append('content[en]', data.content.en);
        formData.append('content[ar]', data.content.ar);
        formData.append('excerpt[en]', data.excerpt.en);
        formData.append('excerpt[ar]', data.excerpt.ar);
        formData.append('category_id', data.category_id);
        formData.append('is_published', data.is_published ? '1' : '0');
        if (data.featured_image) {
            formData.append('featured_image', data.featured_image);
        }
        post(route('admin.posts.store'), {
            data: formData as any,
            forceFormData: true,
        });
    };

    const inputClass = `w-full rounded-xl py-3 px-4 text-sm border transition-all focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`;
    const labelClass = `block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <DashboardLayout>
            <Head title={t('dash_create_post')} />

            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={route('admin.posts.index')}
                            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
                        >
                            <ArrowLeft className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{t('dash_create_post')}</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className={`rounded-2xl border p-6 space-y-5 ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                            {/* Titles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>{t('dash_title_en')}</label>
                                    <input
                                        type="text"
                                        value={data.title.en}
                                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                        className={inputClass}
                                        dir="ltr"
                                    />
                                    {errors['title.en'] && <p className="text-red-500 text-xs mt-1">{errors['title.en']}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>{t('dash_title_ar')}</label>
                                    <input
                                        type="text"
                                        value={data.title.ar}
                                        onChange={(e) => setData('title', { ...data.title, ar: e.target.value })}
                                        className={inputClass}
                                        dir="rtl"
                                    />
                                    {errors['title.ar'] && <p className="text-red-500 text-xs mt-1">{errors['title.ar']}</p>}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>{t('dash_content_en')}</label>
                                    <textarea
                                        value={data.content.en}
                                        onChange={(e) => setData('content', { ...data.content, en: e.target.value })}
                                        rows={8}
                                        className={inputClass}
                                        dir="ltr"
                                    />
                                    {errors['content.en'] && <p className="text-red-500 text-xs mt-1">{errors['content.en']}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>{t('dash_content_ar')}</label>
                                    <textarea
                                        value={data.content.ar}
                                        onChange={(e) => setData('content', { ...data.content, ar: e.target.value })}
                                        rows={8}
                                        className={inputClass}
                                        dir="rtl"
                                    />
                                    {errors['content.ar'] && <p className="text-red-500 text-xs mt-1">{errors['content.ar']}</p>}
                                </div>
                            </div>

                            {/* Excerpts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>{t('dash_excerpt_en')}</label>
                                    <textarea
                                        value={data.excerpt.en}
                                        onChange={(e) => setData('excerpt', { ...data.excerpt, en: e.target.value })}
                                        rows={3}
                                        className={inputClass}
                                        dir="ltr"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t('dash_excerpt_ar')}</label>
                                    <textarea
                                        value={data.excerpt.ar}
                                        onChange={(e) => setData('excerpt', { ...data.excerpt, ar: e.target.value })}
                                        rows={3}
                                        className={inputClass}
                                        dir="rtl"
                                    />
                                </div>
                            </div>

                            {/* Category & Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>{t('dash_select_category')}</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">{t('dash_select_category')}</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {locale === 'ar' ? cat.name.ar : cat.name.en}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>{t('dash_featured_image')}</label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-full rounded-xl py-3 px-4 text-sm border-2 border-dashed transition-all flex items-center justify-center gap-2 font-medium ${isDark ? 'border-white/10 text-gray-400 hover:border-[#C5A059]/50 hover:text-[#C5A059]' : 'border-gray-200 text-gray-400 hover:border-[#C5A059]/50 hover:text-[#C5A059]'}`}
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        {data.featured_image ? data.featured_image.name : t('dash_featured_image')}
                                    </button>
                                </div>
                            </div>

                            {/* Publish Toggle */}
                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#C5A059]/50 rounded-full peer peer-checked:bg-[#C5A059] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:bg-gray-700"></div>
                                </label>
                                <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('dash_publish')}</span>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center gap-3 justify-end">
                            <Link
                                href={route('admin.posts.index')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {t('dash_cancel')}
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-[#C5A059] text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#B48F48] transition-all shadow-lg shadow-[#C5A059]/20 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" /> {t('dash_save')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
