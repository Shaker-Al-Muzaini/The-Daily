import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { Package, FolderOpen, ShoppingBag, Eye, TrendingUp, Calendar, FileText } from 'lucide-react';
import { useAppStore } from '@/Stores/useAppStore';

interface NeuralAnalyticsProps {
    stats: {
        total_posts: number;
        published_posts: number;
        total_categories: number;
        pending_requests: number;
        categories_breakdown: Array<{ name: { en: string; ar: string }; count: number }>;
        monthly_posts: Array<{ month: string; count: number }>;
    };
}

const COLORS = ['#00d2ff', '#ff00e5', '#c5fb6d', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function NeuralAnalytics({ stats }: NeuralAnalyticsProps) {
    const { locale } = useAppStore();
    const isRtl = locale === 'ar';

    const statCards = [
        { id: 1, value: stats.total_posts, label: isRtl ? 'إجمالي المنشورات' : 'Total Posts', icon: Package, color: '#00d2ff' },
        { id: 2, value: stats.published_posts, label: isRtl ? 'المنشورات المنشورة' : 'Published Posts', icon: Eye, color: '#c5fb6d' },
        { id: 3, value: stats.total_categories, label: isRtl ? 'الأقسام المتاحة' : 'Total Categories', icon: FolderOpen, color: '#ff00e5' },
        { id: 4, value: stats.pending_requests, label: isRtl ? 'الطلبات المعلقة' : 'Pending Requests', icon: ShoppingBag, color: '#f59e0b' },
    ];

    const pieData = stats.categories_breakdown.map((item, index) => ({
        name: isRtl ? item.name.ar : item.name.en,
        value: item.count,
        color: COLORS[index % COLORS.length]
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                    <p className="text-white font-bold mb-1">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-12 py-6 relative" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: stat.id * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="relative group cursor-default"
                    >
                        <div 
                            className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" 
                            style={{ backgroundColor: stat.color }}
                        ></div>
                        
                        <div className="relative h-full bg-[#0d111a]/80 backdrop-blur-xl border border-white/5 group-hover:border-white/10 rounded-2xl p-4 flex items-center gap-4 overflow-hidden transition-colors">
                            <div 
                                className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0"
                                style={{ color: stat.color, boxShadow: `0 0 10px ${stat.color}22` }}
                            >
                                <stat.icon size={18} strokeWidth={2.5} />
                            </div>
                            
                            <div className="min-w-0">
                                <h4 className="text-xl font-black tracking-tight leading-none mb-1" style={{ color: stat.color }}>
                                    {stat.value}
                                </h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Donut Chart - Content Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 bg-[#0d111a]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <FolderOpen size={20} className="text-blue-500" />
                            <h3 className="text-xl font-black text-white">{isRtl ? 'توزيع المحتوى حسب الأقسام' : 'Content by Category'}</h3>
                        </div>
                        
                        <div className="h-[320px] w-full">
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend 
                                            verticalAlign="bottom" 
                                            height={40} 
                                            iconType="circle"
                                            formatter={(value) => <span className="text-[11px] font-bold text-gray-400">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                                    {isRtl ? 'لا توجد بيانات متاحة' : 'No data available'}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Area Chart - Monthly Activity */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-7 bg-[#0d111a]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <Calendar size={20} className="text-cyan-500" />
                            <h3 className="text-xl font-black text-white">{isRtl ? 'نشاط النشر الشهري' : 'Monthly Publishing Activity'}</h3>
                        </div>
                        
                        <div className="h-[320px] w-full">
                            {stats.monthly_posts.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.monthly_posts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 700 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 700 }} 
                                        />
                                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area 
                                            type="monotone" 
                                            dataKey="count" 
                                            name={isRtl ? 'عدد المنشورات' : 'Post Count'} 
                                            stroke="#00d2ff" 
                                            strokeWidth={4} 
                                            fillOpacity={1} 
                                            fill="url(#colorCount)" 
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                                    {isRtl ? 'لا توجد بيانات لهذا العام' : 'No data for this year'}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
