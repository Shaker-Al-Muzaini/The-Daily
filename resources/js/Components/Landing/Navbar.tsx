import { Link, router } from '@inertiajs/react';
import { useAppStore } from '@/Stores/useAppStore';
import { Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Navbar({ auth }: { auth: any }) {
    const { theme, toggleTheme, locale, setLocale } = useAppStore();
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLocaleChange = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        setLocale(newLocale);
        router.get(route('language.switch', { locale: newLocale }), {}, {
            preserveScroll: true,
        });
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-[#0A0C10]/90 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 shadow-sm' : 'bg-transparent'}`}>
            <div className="flex items-center gap-12">
                <Link href="/" className="text-4xl font-extrabold tracking-tighter text-[#1a1f36] dark:text-white select-none">
                    {locale === 'ar' ? 'اليوم' : 'the daily'}
                </Link>
                <div className="hidden lg:flex items-center gap-10">
                    <Link href="#" className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}>{t('nav_products')}</Link>
                    <Link href="#" className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}>{t('nav_solutions')}</Link>
                    <Link href="#" className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}>{t('nav_developers')}</Link>
                    <Link href="#" className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}>{t('nav_resources')}</Link>
                    <Link href="#" className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}>{t('nav_pricing')}</Link>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6">
                    <button 
                        onClick={handleLocaleChange}
                        className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-[#1a1f36]/70'}`}
                    >
                        <Globe className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-[#1a1f36]/70'}`}
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                </div>
                
                <div className="flex items-center gap-8">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="bg-[#C5A059] text-black px-5 py-2 rounded-full text-[14px] font-bold hover:bg-[#B48F48] transition-all shadow-md shadow-[#C5A059]/20"
                        >
                            {t('nav_dashboard')}
                        </Link>
                    ) : (
                        <>
                            <Link 
                                href={route('login')} 
                                className={`text-[14px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}
                            >
                                {t('nav_signin')}
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-[#C5A059] text-black px-6 py-2 rounded-full text-[14px] font-bold hover:bg-[#B48F48] transition-all flex items-center gap-2 group"
                            >
                                {t('nav_signup')} <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
