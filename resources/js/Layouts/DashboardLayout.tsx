import { useState, useEffect } from 'react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Settings,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    User,
    ChevronDown,
    Globe,
    Moon,
    Sun,
    FileStack,
    ShoppingBag,
    Package,
} from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme, locale, setLocale } = useAppStore();
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { auth, pending_requests_count, latest_pending_requests } = usePage().props as any;
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

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

    const currentRoute = (window as any).route?.()?.current?.() ?? '';

    const menuItems = [
        { label: t('dash_dashboard'), icon: LayoutDashboard, href: route('dashboard'), active: currentRoute === 'dashboard' },
        { label: t('dash_posts'), icon: Package, href: route('admin.posts.index'), active: currentRoute?.startsWith?.('admin.posts') },
        { label: t('dash_categories'), icon: FolderOpen, href: route('admin.categories.index'), active: currentRoute?.startsWith?.('admin.categories') },
        { label: t('dash_pages'), icon: FileStack, href: route('admin.pages.index'), active: currentRoute?.startsWith?.('admin.pages') },
        { label: t('dash_requests'), icon: ShoppingBag, href: route('admin.requests.index'), active: currentRoute?.startsWith?.('admin.requests'), badge: pending_requests_count },
        { label: t('dash_settings'), icon: Settings, href: '#', active: false },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0A0C10] text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className={`fixed top-0 bottom-0 z-40 transition-all duration-300 border-e ${isDark ? 'bg-[#0D0F14] border-white/5' : 'bg-white border-gray-100'} ${isSidebarOpen ? 'w-[260px]' : 'w-[72px]'} ${locale === 'ar' ? 'right-0' : 'left-0'}`}>
                <div className="h-[72px] flex items-center justify-between px-5">
                    <Link href="/" className={`font-extrabold text-xl tracking-tighter select-none transition-opacity ${isDark ? 'text-white' : 'text-[#1a1f36]'} ${!isSidebarOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
                        {locale === 'ar' ? 'اليوم' : 'the daily'}
                    </Link>
                    {!isSidebarOpen && (
                        <span className="text-[#C5A059] font-extrabold text-xl mx-auto">D</span>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                        {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>

                <nav className="px-3 mt-2 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-bold ${item.active
                                ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
                                : isDark
                                    ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-[#1a1f36]'
                            } ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
                        >
                            <item.icon className="w-[18px] h-[18px] shrink-0" />
                            {isSidebarOpen && <span>{item.label}</span>}
                            {item.badge > 0 && (
                                <span className={`ms-auto flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${item.active ? 'bg-black text-[#C5A059]' : 'bg-[#C5A059] text-black'}`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-0 right-0 px-3">
                    <button
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 transition-all text-sm font-bold ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'} ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
                        onClick={() => router.post(route('logout'))}
                    >
                        <LogOut className="w-[18px] h-[18px] shrink-0" />
                        {isSidebarOpen && <span>{t('dash_logout')}</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 min-h-screen ${isSidebarOpen ? (locale === 'ar' ? 'mr-[260px]' : 'ml-[260px]') : (locale === 'ar' ? 'mr-[72px]' : 'ml-[72px]')}`}>
                {/* Header */}
                <header className={`h-[72px] border-b sticky top-0 z-30 backdrop-blur-xl transition-colors ${isDark ? 'bg-[#0A0C10]/80 border-white/5' : 'bg-white/80 border-gray-100'}`}>
                    <div className="h-full px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative max-w-sm w-full">
                                <Search className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                                <input
                                    type="text"
                                    placeholder={t('dash_search')}
                                    className={`w-full border-none rounded-xl py-2 text-sm ${locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} transition-all focus:ring-2 focus:ring-[#C5A059]/50 ${isDark ? 'bg-white/5 text-white placeholder:text-gray-600' : 'bg-gray-50 text-gray-900 placeholder:text-gray-400'}`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={handleLocaleChange} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}>
                                <Globe className="w-4 h-4" />
                            </button>
                            <button onClick={toggleTheme} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}>
                                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            </button>
                            <div className="relative">
                                <button 
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className={`p-2 rounded-xl relative transition-colors ${isDark ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}
                                >
                                    <Bell className="w-4 h-4" />
                                    {pending_requests_count > 0 && (
                                        <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 ${isDark ? 'border-[#0A0C10]' : 'border-white'}`} />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isNotificationsOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className={`absolute ${locale === 'ar' ? 'left-0' : 'right-0'} mt-2 w-80 rounded-3xl shadow-2xl z-50 border overflow-hidden ${isDark ? 'bg-[#12141a] border-white/10' : 'bg-white border-gray-100'}`}
                                            >
                                                <div className={`px-5 py-4 border-b flex items-center justify-between ${isDark ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                                                    <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                                                        {t('dash_notifications')}
                                                    </h3>
                                                    {pending_requests_count > 0 && (
                                                        <span className="text-[10px] font-bold bg-[#C5A059] text-black px-2 py-0.5 rounded-full">
                                                            {pending_requests_count} {t('dash_new')}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="max-h-[360px] overflow-y-auto">
                                                    {latest_pending_requests.length === 0 ? (
                                                        <div className="p-10 text-center">
                                                            <Bell className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-gray-800' : 'text-gray-200'}`} />
                                                            <p className={`text-xs font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                                                {t('dash_no_notifications')}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                                                            {latest_pending_requests.map((req: any) => (
                                                                <button
                                                                    key={req.id}
                                                                    onClick={() => {
                                                                        setIsNotificationsOpen(false);
                                                                        router.get(route('admin.requests.index'));
                                                                    }}
                                                                    className={`w-full text-start p-4 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                                                                >
                                                                    <div className="flex gap-3">
                                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${isDark ? 'bg-white/5 text-[#C5A059]' : 'bg-gray-100 text-[#C5A059]'}`}>
                                                                            {req.user_name.charAt(0)}
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-snug`}>
                                                                                <span className="font-bold text-[#C5A059]">{req.user_name}</span> {isRtl ? 'طلب' : 'requested'} <span className="font-bold text-white">{isRtl ? req.post_title.ar : req.post_title.en}</span>
                                                                            </p>
                                                                            <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{req.created_at}</p>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <Link
                                                    href={route('admin.requests.index')}
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                    className={`block w-full text-center py-3 text-xs font-bold transition-colors ${isDark ? 'bg-white/5 text-gray-400 hover:text-[#C5A059] hover:bg-white/10' : 'bg-gray-50 text-gray-500 hover:text-[#C5A059] hover:bg-gray-100'}`}
                                                >
                                                    {t('dash_view_all')}
                                                </Link>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={`h-6 w-px mx-1 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`} />

                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`flex items-center gap-2.5 p-1.5 rounded-xl transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-black font-bold text-sm">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <div className="hidden md:block text-start">
                                        <p className={`text-xs font-bold leading-none ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{auth.user.name}</p>
                                        <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('dash_admin')}</p>
                                    </div>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProfileOpen && (
                                    <div className={`absolute ${locale === 'ar' ? 'left-0' : 'right-0'} mt-2 w-52 rounded-2xl shadow-2xl py-1.5 z-50 border ${isDark ? 'bg-[#12141a] border-white/10' : 'bg-white border-gray-100'}`}>
                                        <div className={`px-4 py-3 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>{auth.user.name}</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{auth.user.email}</p>
                                        </div>
                                        <Link href={route('profile.edit')} className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}>
                                            <User className="w-4 h-4" /> {t('dash_profile')}
                                        </Link>
                                        <Link href="#" className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}>
                                            <Settings className="w-4 h-4" /> {t('dash_settings')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
