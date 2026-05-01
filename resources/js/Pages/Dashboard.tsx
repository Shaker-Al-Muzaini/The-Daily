import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Dashboard() {
    const { t } = useTranslation();
    const stats = [
        { label: t('dash_total_revenue'), value: '$45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-green-500' },
        { label: t('dash_subscriptions'), value: '+2,350', change: '+180.1%', icon: Users, color: 'text-blue-500' },
        { label: t('dash_sales'), value: '+12,234', change: '+19%', icon: TrendingUp, color: 'text-purple-500' },
    ];

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-10">
                {/* Premium Neural Welcome Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden p-8 md:p-12 rounded-[40px] bg-[#0A0C10] border border-white/5 shadow-2xl group"
                >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                                {t('dash_welcome_back')}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {t('dash_welcome_desc')}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="bg-[#C5A059] text-black px-8 py-4 rounded-2xl font-bold hover:bg-[#B48F48] transition-all shadow-xl shadow-[#C5A059]/20 hover:scale-105 active:scale-95">
                                {t('dash_download_report')}
                            </button>
                        </div>
                    </div>

                    {/* Decorative neural elements */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                        <div className="absolute top-[-50%] right-[-10%] w-1/2 h-[200%] bg-[#C5A059]/10 rotate-[25deg] blur-[100px] group-hover:bg-[#C5A059]/20 transition-colors duration-1000" />
                        <div className="absolute bottom-[-50%] left-[-10%] w-1/3 h-[150%] bg-blue-500/5 rotate-[-15deg] blur-[80px]" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-3 rounded-xl bg-gray-50 dark:bg-white/5", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                                    {stat.change} <ArrowUpRight className="w-3 h-3" />
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
