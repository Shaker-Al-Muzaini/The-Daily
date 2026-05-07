import { usePage } from '@inertiajs/react';
import { useAppStore } from '@/Stores/useAppStore';

export function useTranslation() {
    const { translations } = usePage().props as any;
    const { locale } = useAppStore();

    const t = (key: string) => {
        if (translations && translations[locale] && translations[locale][key]) {
            return translations[locale][key];
        }
        return translations?.[key] || key; // fallback in case structure is old
    };

    return { t };
}
