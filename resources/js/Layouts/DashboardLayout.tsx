import { useState, useEffect } from 'react';
import { useAppStore } from '@/Stores/useAppStore';
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    LogOut, 
    Menu, 
    X, 
    Search, 
    Bell, 
    User,
    ChevronDown,
    ChevronRight,
    Globe,
    Moon,
    Sun
} from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme, locale, setLocale } = useAppStore();
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { auth } = usePage().props as any;

    const handleLocaleChange = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        setLocale(newLocale);
        router.get(route('language.switch', { locale: newLocale }), {}, {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', locale);
    }, [theme, locale]);

    const menuItems = [
        { label: t('dash_dashboard'), icon: LayoutDashboard, href: route('dashboard') },
        { label: t('dash_users'), icon: Users, href: '#' },
        { label: t('dash_settings'), icon: Settings, href: '#' },
    ];

    return (
        <div className={cn(
            "min-h-screen transition-colors duration-300",
            theme === 'dark' ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"
        )}>
            {/* Sidebar */}
            <aside className={cn(
                "fixed top-0 bottom-0 z-40 transition-all duration-300 border-e border-gray-200 dark:border-white/10",
                theme === 'dark' ? "bg-zinc-900" : "bg-white",
                isSidebarOpen ? "w-72" : "w-20",
                locale === 'ar' ? "right-0" : "left-0"
            )}>
                <div className="h-20 flex items-center justify-between px-6">
                    <Link href="/" className={cn("font-extrabold text-2xl tracking-tighter text-[#1a1f36] dark:text-white select-none", !isSidebarOpen && "hidden")}>
                        {locale === 'ar' ? 'اليوم' : 'the daily'}
                    </Link>
                    {!isSidebarOpen && <span className="text-[#C5A059] font-bold text-2xl">D</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                                "hover:bg-[#C5A059] hover:text-black",
                                !isSidebarOpen && "justify-center px-0"
                            )}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            {isSidebarOpen && <span className="font-bold">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-0 right-0 p-4">
                    <button 
                        className={cn(
                            "flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all",
                            !isSidebarOpen && "justify-center px-0"
                        )}
                        onClick={() => router.post(route('logout'))}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="font-bold">{t('dash_logout')}</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "transition-all duration-300 min-h-screen",
                isSidebarOpen ? (locale === 'ar' ? "mr-72" : "ml-72") : (locale === 'ar' ? "mr-20" : "ml-20")
            )}>
                {/* Header */}
                <header className={cn(
                    "h-20 border-b border-gray-200 dark:border-white/10 sticky top-0 z-30 backdrop-blur-md transition-colors",
                    theme === 'dark' ? "bg-zinc-950/80" : "bg-white/80"
                )}>
                    <div className="h-full px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative max-w-md w-full">
                                <Search className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                                <input 
                                    type="text" 
                                    placeholder={t('dash_search')}
                                    className={`w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-2 ${locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:ring-2 focus:ring-[#C5A059] transition-all`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={handleLocaleChange} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                                <Globe className="w-5 h-5" />
                            </button>
                            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
                            </button>

                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#C5A059] flex items-center justify-center text-black font-bold">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <div className="hidden md:block text-start">
                                        <p className="text-sm font-bold leading-none">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{t('dash_admin')}</p>
                                    </div>
                                    <ChevronDown className={cn("w-4 h-4 transition-transform", isProfileOpen && "rotate-180")} />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                                            <p className="text-sm font-bold">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                                        </div>
                                        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5">
                                            <User className="w-4 h-4" /> {t('dash_profile')}
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5">
                                            <Settings className="w-4 h-4" /> {t('dash_settings')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
