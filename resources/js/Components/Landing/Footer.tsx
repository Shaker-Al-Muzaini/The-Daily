import { Link } from '@inertiajs/react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Footer() {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const links = [
        { name: t('nav_products'), href: route('products') },
        { name: t('nav_solutions'), href: route('solutions') },
        { name: t('nav_pricing'), href: route('pricing') },
    ];

    const year = new Date().getFullYear();

    return (
        <footer className={`py-12 px-6 ${isDark ? 'bg-[#0A0C10] border-t border-white/5' : 'bg-white border-t border-gray-100'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className={`text-2xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                        {isRtl ? 'اليوم' : 'the daily'}
                    </div>
                    
                    <div className="flex items-center gap-8">
                        {links.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-[#C5A059]' : 'text-gray-400 hover:text-[#C5A059]'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        © {year} The Daily. {t('footer_rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
