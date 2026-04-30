import { Link, router } from '@inertiajs/react';
import { useAppStore } from '@/Stores/useAppStore';
import { Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar({ auth }: { auth: any }) {
    const { theme, toggleTheme, locale, setLocale } = useAppStore();
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
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 shadow-sm' : 'bg-transparent'}`}>
            <div className="flex items-center gap-12">
                <Link href="/" className="text-3xl font-extrabold tracking-tighter text-[#1a1f36] dark:text-white lowercase select-none">
                    finflow
                </Link>
                <div className="hidden lg:flex items-center gap-10">
                    {['Products', 'Solutions', 'Developers', 'Resources', 'Pricing'].map((item) => (
                        <Link 
                            key={item} 
                            href="#" 
                            className={`text-[15px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-[#1a1f36]/80 hover:text-[#1a1f36]'}`}
                        >
                            {item}
                        </Link>
                    ))}
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
                            className="bg-[#635bff] text-white px-5 py-2 rounded-full text-[14px] font-bold hover:bg-[#534acc] transition-all shadow-md shadow-[#635bff]/20"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link 
                                href={route('login')} 
                                className={`text-[14px] font-bold transition-colors ${theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-[#1a1f36]/80 hover:text-[#1a1f36]'}`}
                            >
                                Sign in
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-[#635bff] text-white px-6 py-2 rounded-full text-[14px] font-bold hover:bg-[#534acc] transition-all flex items-center gap-2 group"
                            >
                                Sign up <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
