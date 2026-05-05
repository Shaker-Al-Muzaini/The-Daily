import { Link, router } from '@inertiajs/react';
import { useAppStore } from '@/Stores/useAppStore';
import { Moon, Sun, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Navbar({ auth }: { auth: any }) {
    const { theme, toggleTheme, locale, setLocale } = useAppStore();
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const isDark = theme === 'dark';
    const navLinks = [
        { label: t('nav_products'), href: route('products') },
        { label: t('nav_solutions'), href: route('solutions') },
        { label: t('nav_developers'), href: '#' },
        { label: t('nav_resources'), href: '#' },
        { label: t('nav_pricing'), href: route('pricing') },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-[#0A0C10]/95 backdrop-blur-xl border-b border-white/10' : 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm') : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
                    <div className="flex items-center gap-12">
                        <Link href="/" className={`text-[26px] font-extrabold tracking-tighter select-none ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                            {locale === 'ar' ? 'اليوم' : 'the daily'}
                        </Link>
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-[14px] font-bold transition-colors ${isDark ? 'text-white/70 hover:text-[#C5A059]' : 'text-[#1a1f36]/70 hover:text-[#C5A059]'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center gap-1">
                            <button
                                onClick={handleLocaleChange}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}
                            >
                                <Globe className="w-[18px] h-[18px]" />
                            </button>
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}
                            >
                                {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-[#C5A059] text-black px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#B48F48] transition-all shadow-md shadow-[#C5A059]/20 hover:scale-105 flex items-center gap-2"
                                >
                                    {t('nav_dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className={`text-[14px] font-bold transition-colors ${isDark ? 'text-white/80 hover:text-[#C5A059]' : 'text-[#1a1f36]/80 hover:text-[#C5A059]'}`}
                                    >
                                        {t('nav_signin')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-[#C5A059] text-black px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#B48F48] transition-all shadow-md shadow-[#C5A059]/20 hover:scale-105 flex items-center gap-1.5"
                                    >
                                        {t('nav_signup')} <ChevronDown className="w-3.5 h-3.5" />
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`lg:hidden p-2 rounded-xl ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className={`fixed inset-0 z-40 pt-[72px] ${isDark ? 'bg-[#0A0C10]/98' : 'bg-white/98'} backdrop-blur-xl`}>
                    <div className="p-6 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-3 text-lg font-bold ${isDark ? 'text-white hover:text-[#C5A059]' : 'text-[#1a1f36] hover:text-[#C5A059]'} transition-colors`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className={`flex items-center gap-3 pt-5 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                            <button onClick={handleLocaleChange} className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                <Globe className="w-5 h-5" />
                            </button>
                            <button onClick={toggleTheme} className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="pt-4 space-y-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="block w-full text-center bg-[#C5A059] text-black py-3 rounded-full font-bold">
                                    {t('nav_dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className={`block w-full text-center py-3 rounded-full font-bold border-2 ${isDark ? 'border-white/20 text-white' : 'border-gray-200 text-gray-700'}`}>
                                        {t('nav_signin')}
                                    </Link>
                                    <Link href={route('register')} className="block w-full text-center bg-[#C5A059] text-black py-3 rounded-full font-bold">
                                        {t('nav_signup')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
