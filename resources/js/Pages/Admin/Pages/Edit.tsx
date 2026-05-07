import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Globe } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';
import { useState, FormEvent } from 'react';

interface Page {
    id: number;
    slug: string;
    title: { en: string; ar: string };
    content: { en: string; ar: string };
}

export default function Edit({ page }: { page: Page }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';
    const [activeTab, setActiveTab] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    const { data, setData, put, processing, errors } = useForm({
        slug: page.slug,
        title: { en: page.title.en, ar: page.title.ar },
        content: { en: page.content.en, ar: page.content.ar },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.pages.update', { id: page.id }));
    };

    const inputClass = `w-full rounded-xl py-3 px-4 text-sm border transition-all focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`;
    const labelClass = `block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <DashboardLayout>
            <Head title={`${isRtl ? 'تعديل صفحة' : 'Edit Page'}: ${isRtl ? page.title.ar : page.title.en}`} />

            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={route('admin.pages.index')}
                            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
                        >
                            <ArrowLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{isRtl ? 'تعديل الصفحة' : 'Edit Page'}</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Slug */}
                        <div className={`rounded-2xl border p-6 ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <label className={labelClass}>{isRtl ? 'رابط الصفحة (Slug)' : 'Page Slug (URL)'}</label>
                            <div className="flex items-center">
                                <span className={`px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 ${isRtl ? 'rounded-e-xl border-s-0' : 'rounded-s-xl border-e-0'}`}>/</span>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className={`${inputClass} ${isRtl ? 'rounded-s-xl rounded-e-none' : 'rounded-e-xl rounded-s-none'}`}
                                    dir="ltr"
                                />
                            </div>
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>

                        {/* Content Tabs */}
                        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className={`flex items-center border-b ${isDark ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'} px-2`}>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('en')}
                                    className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'en' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-gray-500'}`}
                                >
                                    <Globe className="w-4 h-4" /> English
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('ar')}
                                    className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'ar' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-gray-500'}`}
                                >
                                    <Globe className="w-4 h-4" /> العربية
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className={labelClass}>{isRtl ? 'عنوان الصفحة' : 'Page Title'}</label>
                                    <input
                                        type="text"
                                        value={data.title[activeTab]}
                                        onChange={e => setData('title', { ...data.title, [activeTab]: e.target.value })}
                                        className={inputClass}
                                        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    {(errors as Record<string, string>)[`title.${activeTab}`] && <p className="text-red-500 text-xs mt-1">{(errors as Record<string, string>)[`title.${activeTab}`]}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{isRtl ? 'محتوى الصفحة' : 'Page Content'}</label>
                                    <textarea
                                        rows={12}
                                        value={data.content[activeTab]}
                                        onChange={e => setData('content', { ...data.content, [activeTab]: e.target.value })}
                                        className={inputClass}
                                        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    {(errors as Record<string, string>)[`content.${activeTab}`] && <p className="text-red-500 text-xs mt-1">{(errors as Record<string, string>)[`content.${activeTab}`]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center gap-3 justify-end">
                            <Link
                                href={route('admin.pages.index')}
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
