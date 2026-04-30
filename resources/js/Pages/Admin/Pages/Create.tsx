import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en');
    const { data, setData, post, processing, errors } = useForm({
        slug: '',
        title: { en: '', ar: '' },
        content: { en: '', ar: '' },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pages.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Create Page" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.pages.index')} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight">Create Page</h2>
                    </div>
                    <button
                        onClick={submit}
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Page
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold">Page Slug (URL)</label>
                            <div className="flex items-center">
                                <span className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-e-0 border-gray-200 dark:border-white/10 rounded-s-xl text-gray-500">/</span>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-e-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
                                    placeholder="about-us"
                                />
                            </div>
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>
                    </div>

                    {/* Translatable Content */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                        <div className="flex items-center border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4">
                            <button
                                onClick={() => setActiveTab('en')}
                                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'en' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                            >
                                <Globe className="w-4 h-4" /> English
                            </button>
                            <button
                                onClick={() => setActiveTab('ar')}
                                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'ar' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                            >
                                <Globe className="w-4 h-4" /> Arabic (العربية)
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-bold">Page Title ({activeTab.toUpperCase()})</label>
                                <input
                                    type="text"
                                    value={data.title[activeTab]}
                                    onChange={e => setData('title', { ...data.title, [activeTab]: e.target.value })}
                                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
                                    placeholder={activeTab === 'en' ? 'Enter title...' : 'أدخل العنوان...'}
                                    dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                />
                                {errors[`title.${activeTab}` as any] && <p className="text-red-500 text-xs mt-1">{errors[`title.${activeTab}` as any]}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold">Content ({activeTab.toUpperCase()})</label>
                                <textarea
                                    rows={10}
                                    value={data.content[activeTab]}
                                    onChange={e => setData('content', { ...data.content, [activeTab]: e.target.value })}
                                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
                                    placeholder={activeTab === 'en' ? 'Enter page content...' : 'أدخل محتوى الصفحة...'}
                                    dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                />
                                {errors[`content.${activeTab}` as any] && <p className="text-red-500 text-xs mt-1">{errors[`content.${activeTab}` as any]}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
