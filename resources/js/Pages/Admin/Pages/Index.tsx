import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

interface Page {
    id: number;
    slug: string;
    title: { [key: string]: string };
    created_at: string;
}

export default function Index({ pages }: { pages: Page[] }) {
    const { t } = useTranslation();

    return (
        <DashboardLayout>
            <Head title="Manage Pages" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Site Pages</h2>
                        <p className="text-gray-500 mt-1">Manage all static pages and content.</p>
                    </div>
                    <Link
                        href={route('admin.pages.create')}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Page
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                <th className="px-6 py-4 text-sm font-bold">Title</th>
                                <th className="px-6 py-4 text-sm font-bold">Slug</th>
                                <th className="px-6 py-4 text-sm font-bold">Created At</th>
                                <th className="px-6 py-4 text-sm font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{page.title.en}</div>
                                        <div className="text-xs text-gray-500">{page.title.ar}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs font-mono">/{page.slug}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(page.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <Link href={route('admin.pages.edit', page.id)} className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
