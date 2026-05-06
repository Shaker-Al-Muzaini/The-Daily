import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';
import { motion } from 'framer-motion';
import { BarChart3, Shield, Cloud, Bot, Users, Code2 } from 'lucide-react';

export default function Solutions({ auth }: { auth: any }) {
    const { theme } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';

    const solutions = [
        { icon: BarChart3, title: t('sol_analytics_title'), desc: t('sol_analytics_desc') },
        { icon: Shield, title: t('sol_security_title'), desc: t('sol_security_desc') },
        { icon: Cloud, title: t('sol_cloud_title'), desc: t('sol_cloud_desc') },
        { icon: Bot, title: t('sol_ai_title'), desc: t('sol_ai_desc') },
        { icon: Users, title: t('sol_collab_title'), desc: t('sol_collab_desc') },
        { icon: Code2, title: t('sol_api_title'), desc: t('sol_api_desc') },
    ];

    return (
        <div className={`min-h-screen selection:bg-[#C5A059]/30 transition-colors duration-500 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Head title={`Solutions - The Daily`} />
            <Navbar auth={auth} />
            
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                        {t('solutions_title')}
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('solutions_desc')}
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((sol, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-8 rounded-3xl border transition-all hover:scale-[1.02] ${isDark ? 'bg-[#12141a] border-white/5 hover:border-[#C5A059]/30' : 'bg-white border-gray-100 shadow-sm hover:border-[#C5A059]/30'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'}`}>
                                <sol.icon className="w-7 h-7 text-[#C5A059]" />
                            </div>
                            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{sol.title}</h3>
                            <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{sol.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
