import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing({ auth }: { auth: any }) {
    const { theme } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';

    const plans = [
        {
            name: t('pricing_starter'),
            price: t('pricing_starter_price'),
            popular: false,
            features: [
                t('pricing_feature_1'),
                t('pricing_feature_2'),
                t('pricing_feature_3'),
                t('pricing_feature_4'),
            ]
        },
        {
            name: t('pricing_pro'),
            price: t('pricing_pro_price'),
            popular: true,
            features: [
                t('pricing_feature_5'),
                t('pricing_feature_6'),
                t('pricing_feature_7'),
                t('pricing_feature_8'),
                t('pricing_feature_9'),
            ]
        },
        {
            name: t('pricing_enterprise'),
            price: t('pricing_enterprise_price'),
            popular: false,
            features: [
                t('pricing_feature_10'),
                t('pricing_feature_11'),
                t('pricing_feature_12'),
                t('pricing_feature_13'),
                t('pricing_feature_14'),
                t('pricing_feature_15'),
            ]
        }
    ];

    return (
        <div className={`min-h-screen selection:bg-[#C5A059]/30 transition-colors duration-500 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Head title={`Pricing - The Daily`} />
            <Navbar auth={auth} />
            
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                        {t('pricing_title')}
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('pricing_desc')}
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl border transition-all ${plan.popular ? (isDark ? 'bg-gradient-to-b from-[#1a1f2e] to-[#12141a] border-[#C5A059] shadow-2xl shadow-[#C5A059]/10 transform md:-translate-y-4' : 'bg-white border-[#C5A059] shadow-2xl shadow-[#C5A059]/20 transform md:-translate-y-4') : (isDark ? 'bg-[#12141a] border-white/5' : 'bg-white border-gray-100 shadow-sm')}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-[#C5A059] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {t('pricing_most_popular')}
                                    </span>
                                </div>
                            )}

                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{plan.price}</span>
                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('pricing_monthly')}</span>
                            </div>

                            <Link
                                href={route('register')}
                                className={`block w-full text-center py-3 rounded-xl font-bold mb-8 transition-all ${plan.popular ? 'bg-[#C5A059] text-black hover:bg-[#B48F48] shadow-lg shadow-[#C5A059]/20 hover:scale-105' : (isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200')}`}
                            >
                                {plan.popular ? t('pricing_get_started') : t('pricing_contact_sales')}
                            </Link>

                            <ul className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-[#C5A059] shrink-0" />
                                        <span className={`text-sm leading-tight ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
