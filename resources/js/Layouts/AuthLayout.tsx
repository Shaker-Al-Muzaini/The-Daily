import { useAppStore } from '@/Stores/useAppStore';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { theme, locale } = useAppStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    }, [theme, locale]);

    return (
        <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Left Side: Brand & Info */}
            <div className="md:w-1/2 p-12 flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/" className="text-3xl font-extrabold tracking-tight">FINFLOW</Link>
                </div>
                
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Built for growth</h2>
                    <p className="text-xl text-blue-100/80 max-w-md">
                        Join millions of businesses that rely on our platform to manage their financial infrastructure.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-blue-200/60">
                    © 2026 Stripe Clone. All rights reserved.
                </div>

                {/* Decorative background circles */}
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            </div>

            {/* Right Side: Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
