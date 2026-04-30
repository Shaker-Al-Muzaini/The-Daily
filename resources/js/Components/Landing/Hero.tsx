import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Hero() {
    const logos = [
        { name: 'OpenAI', url: '#' },
        { name: 'amazon', url: '#' },
        { name: 'NVIDIA', url: '#' },
        { name: 'Ford', url: '#' },
        { name: 'coinbase', url: '#' },
        { name: 'Google', url: '#' },
        { name: 'shopify', url: '#' },
    ];

    return (
        <section className="relative pt-20 pb-20 overflow-hidden">
            {/* Real Stripe Aurora Background */}
            <div className="absolute top-0 right-0 w-full h-[800px] -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[120%] rotate-[-12deg]">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent blur-[120px] opacity-70 animate-pulse" />
                    <div className="absolute top-[20%] right-[10%] w-[80%] h-[80%] bg-gradient-to-bl from-blue-400/30 via-indigo-600/20 to-transparent blur-[100px] opacity-60" />
                    <div className="absolute bottom-[20%] left-[20%] w-[60%] h-[60%] bg-gradient-to-tr from-pink-500/20 via-rose-500/10 to-transparent blur-[80px] opacity-50" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-20 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-bold mb-8 hover:bg-blue-500/20 cursor-pointer transition-all border border-blue-500/10">
                            <span className="hidden sm:inline">New:</span> 
                            <span>FinFlow Checkout now supports 100+ payment methods</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                        
                        <h1 className="text-6xl md:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] mb-8 text-[#1a1f36] dark:text-white">
                            Financial <br />
                            <span className="text-blue-600">infrastructure</span> <br />
                            for the internet
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                            Millions of companies of all sizes—from startups to Fortune 500s—use FinFlow’s software and APIs to accept payments, send payouts, and manage their businesses online.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[#635bff] hover:bg-[#534acc] text-white px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-[#635bff]/20 hover:scale-105 active:scale-95 group">
                                Start now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-gray-100 dark:bg-white/10 text-[#1a1f36] dark:text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex items-center gap-2 group">
                                Contact sales
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: Abstract Aurora Splash (Matching Real Stripe) */}
                    <div className="relative h-[600px] hidden lg:block">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            {/* Complex animated gradient shapes */}
                            <div className="absolute top-0 right-0 w-[150%] h-full rotate-[-15deg] translate-x-[20%]">
                                <div className="absolute top-0 left-0 w-full h-[100%] bg-gradient-to-r from-[#80e9ff] via-[#7f7fd5] to-[#86a8e7] blur-[100px] opacity-40 animate-pulse" />
                                <div className="absolute top-[20%] left-[10%] w-[80%] h-[80%] bg-gradient-to-br from-[#ff0080] via-[#7928ca] to-transparent blur-[120px] opacity-30" />
                                <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tr from-[#ff9a9e] via-[#fecfef] to-transparent blur-[80px] opacity-40" />
                            </div>
                            
                            {/* Subtle light streaks */}
                            <div className="absolute top-[10%] right-[5%] w-1 h-[400px] bg-white/20 blur-sm rotate-45" />
                            <div className="absolute top-[30%] right-[15%] w-1 h-[300px] bg-white/10 blur-md rotate-45" />
                        </motion.div>
                    </div>
                </div>

                {/* Company Logos */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-32 border-t border-gray-100 dark:border-white/5 pt-12"
                >
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-700">
                        {logos.map((logo) => (
                            <span key={logo.name} className="text-2xl font-bold tracking-tighter grayscale hover:grayscale-0 transition-all cursor-default">
                                {logo.name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
