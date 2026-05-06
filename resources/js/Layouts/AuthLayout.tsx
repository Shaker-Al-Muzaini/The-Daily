import { useAppStore } from '@/Stores/useAppStore';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { theme, locale } = useAppStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    }, [theme, locale]);

    return (
        <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Left Side: Brand & Info */}
            <div className={`md:w-1/2 p-12 flex flex-col justify-between relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#12141a]' : 'bg-white border-e border-gray-100'}`}>
                <div className="relative z-10">
                    <Link href="/" className={`text-3xl font-extrabold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-[#1a1f36]'}`}>
                        {locale === 'ar' ? 'اليوم' : 'the daily'}
                    </Link>
                </div>
                
                <div className="relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {locale === 'ar' ? (
                                <>نحن نساعدك على <span className="text-[#C5A059]">النمو</span> في العالم الرقمي</>
                            ) : (
                                <>Empowering your <span className="text-[#C5A059]">digital</span> future</>
                            )}
                        </h2>
                        <p className={`text-xl max-w-md leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {locale === 'ar' 
                                ? 'انضم إلى آلاف المستخدمين الذين يثقون في منصتنا لإدارة محتواهم الرقمي وتنمية أعمالهم.'
                                : 'Join thousands of users who trust our platform to manage their digital content and grow their business.'}
                        </p>
                    </motion.div>
                </div>

                <div className={`relative z-10 text-sm font-medium ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                    © {new Date().getFullYear()} The Daily. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                </div>

                {/* Decorative background elements */}
                <div className={`absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[120px] pointer-events-none ${theme === 'dark' ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'}`} />
                <div className={`absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full blur-[100px] pointer-events-none ${theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/[0.03]'}`} />
            </div>

            {/* Right Side: Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
                <div className="w-full max-w-md space-y-8 relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
