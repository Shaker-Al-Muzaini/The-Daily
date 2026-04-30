import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    theme: 'light' | 'dark';
    locale: 'en' | 'ar';
    toggleTheme: () => void;
    setLocale: (locale: 'en' | 'ar') => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            theme: 'light',
            locale: 'en',
            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
            setLocale: (locale) => set({ locale }),
        }),
        {
            name: 'app-storage',
        }
    )
);
