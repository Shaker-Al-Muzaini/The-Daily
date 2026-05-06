import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title={`${t('nav_signin')} - The Daily`} />

            <div className="space-y-3">
                <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                    {t('nav_signin')}
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                    {isRtl ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                    <Link href={route('register')} className="text-[#C5A059] font-bold hover:underline transition-all underline-offset-4">
                        {t('nav_signup')}
                    </Link>
                </p>
            </div>

            {status && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl text-sm font-bold">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} px-1`}>
                        {isRtl ? 'البريد الإلكتروني' : 'Email address'}
                    </label>
                    <div className="relative group">
                        <Mail className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-gray-600 group-focus-within:text-[#C5A059]' : 'text-gray-400 group-focus-within:text-[#C5A059]'}`} />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-2xl py-3.5 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm font-medium transition-all focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] outline-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-700' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isRtl ? 'كلمة المرور' : 'Password'}
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-xs font-bold text-[#C5A059] hover:underline transition-all">
                                {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                            </Link>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-gray-600 group-focus-within:text-[#C5A059]' : 'text-gray-400 group-focus-within:text-[#C5A059]'}`} />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full rounded-2xl py-3.5 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm font-medium transition-all focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] outline-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-700' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center gap-2.5 px-1">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className={`w-4 h-4 rounded border-gray-300 text-[#C5A059] focus:ring-[#C5A059] ${isDark ? 'bg-white/5 border-white/10' : ''}`}
                    />
                    <label htmlFor="remember" className={`text-sm font-medium cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isRtl ? 'البقاء متصلاً' : 'Stay signed in'}
                    </label>
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-[#C5A059] hover:bg-[#B48F48] text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {t('nav_signin')}
                    <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
            </form>
        </AuthLayout>
    );
}
