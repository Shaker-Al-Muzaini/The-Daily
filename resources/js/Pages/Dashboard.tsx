import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-green-500' },
        { label: 'Subscriptions', value: '+2,350', change: '+180.1%', icon: Users, color: 'text-blue-500' },
        { label: 'Sales', value: '+12,234', change: '+19%', icon: TrendingUp, color: 'text-purple-500' },
    ];

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-gray-500 mt-1">Welcome back to your stripe-clone dashboard.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                        Download Report
                    </button>
                </div>

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm h-80 flex items-center justify-center">
                        <p className="text-gray-500 italic">Revenue Chart Placeholder</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm h-80 flex items-center justify-center">
                        <p className="text-gray-500 italic">Recent Transactions Placeholder</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
