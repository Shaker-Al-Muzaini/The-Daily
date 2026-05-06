import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CheckCircle2, XCircle, Clock, User, Mail, Package } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAppStore } from '@/Stores/useAppStore';

interface ProductRequest {
    id: number;
    user_name: string;
    user_email: string;
    post_title: { en: string; ar: string };
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export default function RequestsIndex({ requests }: { requests: ProductRequest[] }) {
    const { t } = useTranslation();
    const { locale, theme } = useAppStore();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const handleStatusUpdate = (id: number, status: string) => {
        router.patch(route('admin.requests.update_status', { id }), { status });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle2 className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <DashboardLayout>
            <Head title={isRtl ? 'طلبات المنتجات' : 'Product Requests'} />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {isRtl ? 'طلبات المنتجات' : 'Product Requests'}
                        </h1>
                        <p className={`mt-1 text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isRtl ? 'إدارة ومراجعة طلبات المستخدمين للمنتجات.' : 'Manage and review user requests for products.'}
                        </p>
                    </div>
                </div>

                <div className={`rounded-[32px] border overflow-hidden ${isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500 bg-white/5' : 'text-gray-400 bg-gray-50'}`}>
                                    <th className="px-6 py-4 text-start">{isRtl ? 'المستخدم' : 'User'}</th>
                                    <th className="px-6 py-4 text-start">{isRtl ? 'المنتج' : 'Product'}</th>
                                    <th className="px-6 py-4 text-start">{isRtl ? 'الحالة' : 'Status'}</th>
                                    <th className="px-6 py-4 text-start">{isRtl ? 'التاريخ' : 'Date'}</th>
                                    <th className="px-6 py-4 text-end">{isRtl ? 'الإجراءات' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                                <AnimatePresence mode="popLayout">
                                    {requests.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <ShoppingBag className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-800' : 'text-gray-200'}`} />
                                                <p className={`font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {isRtl ? 'لا توجد طلبات بعد' : 'No requests yet'}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        requests.map((req, i) => (
                                            <motion.tr
                                                key={req.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50/50'}`}
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-white/5 text-[#C5A059]' : 'bg-gray-100 text-[#C5A059]'}`}>
                                                            {req.user_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{req.user_name}</p>
                                                            <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{req.user_email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className={`text-sm font-bold max-w-[200px] truncate ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                        {isRtl ? req.post_title.ar : req.post_title.en}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(req.status)}`}>
                                                        {getStatusIcon(req.status)}
                                                        {isRtl 
                                                            ? (req.status === 'approved' ? 'مقبول' : req.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار')
                                                            : req.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-xs font-medium text-gray-500">
                                                    {req.created_at}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {req.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(req.id, 'approved')}
                                                                    className={`p-2 rounded-xl text-green-500 transition-all hover:bg-green-500/10 border border-transparent hover:border-green-500/20`}
                                                                    title={isRtl ? 'قبول' : 'Approve'}
                                                                >
                                                                    <CheckCircle2 className="w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(req.id, 'rejected')}
                                                                    className={`p-2 rounded-xl text-red-500 transition-all hover:bg-red-500/10 border border-transparent hover:border-red-500/20`}
                                                                    title={isRtl ? 'رفض' : 'Reject'}
                                                                >
                                                                    <XCircle className="w-5 h-5" />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            className={`p-2 rounded-xl transition-all ${isDark ? 'text-gray-500 hover:bg-white/5 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}
                                                        >
                                                            <User className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
