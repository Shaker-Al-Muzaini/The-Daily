import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Hero() {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    
    const logos = [
        { name: 'CHRONICLE' },
        { name: 'GLOBE' },
        { name: 'METRO' },
        { name: 'POST' },
        { name: 'TIMES' },
    ];

    return (
        <section className="relative pt-10 pb-20 overflow-hidden">
            {/* Real Stripe/Daily Aurora Background */}
            <div className="absolute top-0 right-0 w-full h-[1000px] -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[120%] rotate-[-12deg]">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C5A059]/10 via-[#0A0C10] to-transparent blur-[120px] opacity-70" />
                    <div className="absolute top-[20%] right-[10%] w-[80%] h-[80%] bg-gradient-to-bl from-blue-900/20 via-[#0A0C10] to-transparent blur-[100px] opacity-60" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10 relative">
                <div className="flex flex-col items-center text-center">

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="relative w-full max-w-6xl mt-6 group"
                    >
                        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(197,160,89,0.15)] bg-black/40 backdrop-blur-3xl">
                            {/* Abstract Neural Background */}
                            <div className="absolute inset-0 opacity-40">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(197,160,89,0.1),transparent_70%)]" />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            </div>

                            {/* Floating UI Elements (Stripe-style) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-[80%] h-[70%] bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden p-8 flex flex-col gap-6"
                                >
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="w-32 h-2 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="flex gap-6 h-full overflow-hidden relative">
                                        {/* Animated News Stream - Smoother & More Professional */}
                                        <motion.div 
                                            animate={{ 
                                                y: [0, -450] 
                                            }}
                                            transition={{ 
                                                duration: 35, 
                                                repeat: Infinity, 
                                                ease: "linear" 
                                            }}
                                            className="grid grid-cols-3 gap-6 w-full px-2"
                                        >
                                            {/* Column 1 - Major Stories */}
                                            <div className="space-y-6">
                                                <div className="h-48 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative group/card">
                                                    <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-70 group-hover/card:scale-105 transition-transform duration-1000" alt="Global News" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent p-5 flex flex-col justify-end">
                                                        <div className="w-16 h-1.5 bg-[#C5A059] rounded-full mb-3" />
                                                        <div className="w-full h-2 bg-white/20 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="h-64 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative group/card">
                                                    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-50 group-hover/card:scale-105 transition-transform duration-1000" alt="Tech News" />
                                                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="w-24 h-2 bg-white/30 rounded-full" />
                                                            <div className="w-32 h-1.5 bg-white/10 rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Column 2 - Featured Insights */}
                                            <div className="space-y-6 pt-12">
                                                <div className="h-56 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative group/card">
                                                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60 group-hover/card:scale-105 transition-transform duration-1000" alt="Business" />
                                                    <div className="absolute inset-0 bg-black/40 p-5 flex flex-col justify-end">
                                                        <div className="w-20 h-2 bg-blue-500 rounded-full mb-3" />
                                                        <div className="w-full h-2 bg-white/20 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="h-44 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative">
                                                    <img src="https://images.unsplash.com/photo-1444653300346-679907c126d4?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-40" alt="City" />
                                                </div>
                                            </div>

                                            {/* Column 3 - Trending Reports */}
                                            <div className="space-y-6 pt-6">
                                                <div className="h-40 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative group/card">
                                                    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-50 group-hover/card:scale-105 transition-transform duration-1000" alt="Media" />
                                                </div>
                                                <div className="h-72 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden relative group/card">
                                                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-40 group-hover/card:scale-105 transition-transform duration-1000" alt="Office" />
                                                    <div className="absolute inset-0 p-5 flex flex-col gap-3">
                                                        <div className="w-full h-2 bg-white/10 rounded-full" />
                                                        <div className="w-full h-2 bg-white/10 rounded-full" />
                                                        <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Repeat for Loop */}
                                            <div className="col-span-3 h-20" />
                                        </motion.div>
                                        
                                        {/* Premium Glass Overlays */}
                                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0A0C10] to-transparent pointer-events-none z-20" />
                                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0C10] to-transparent pointer-events-none z-20" />
                                    </div>
                                </motion.div>

                                {/* Mini Floaties - Stabilized for Premium Feel */}
                                <motion.div 
                                    className="absolute top-[10%] right-[5%] p-6 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 backdrop-blur-xl shadow-2xl z-30"
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#C5A059] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-[#C5A059]/20">
                                        99%
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="absolute bottom-[5%] left-[5%] p-5 rounded-2xl bg-blue-600/10 border border-blue-600/30 backdrop-blur-xl shadow-2xl z-30"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="w-16 h-2 bg-white/30 rounded-full" />
                                            <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* New Floating Card at bottom right - Stable */}
                                <motion.div 
                                    className="absolute bottom-[-2%] right-[8%] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl z-30"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-[#C5A059]/20 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-[#C5A059]" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-20 h-2 bg-white/20 rounded-full" />
                                            <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative glow behind the illustration */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#C5A059]/20 to-blue-600/20 blur-[100px] -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
