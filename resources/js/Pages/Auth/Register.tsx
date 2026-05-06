import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Register() {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title={`${t('nav_signup')} - The Daily`} />

            <div className="space-y-3">
                <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                    {t('nav_signup')}
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                    {isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                    <Link href={route('login')} className="text-[#C5A059] font-bold hover:underline transition-all underline-offset-4">
                        {t('nav_signin')}
                    </Link>
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} px-1`}>
                        {isRtl ? 'الاسم الكامل' : 'Full name'}
                    </label>
                    <div className="relative group">
                        <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-gray-600 group-focus-within:text-[#C5A059]' : 'text-gray-400 group-focus-within:text-[#C5A059]'}`} />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full rounded-2xl py-3.5 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm font-medium transition-all focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] outline-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-700' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} px-1`}>
                            {isRtl ? 'كلمة المرور' : 'Password'}
                        </label>
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
                    </div>

                    <div className="space-y-2">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} px-1`}>
                            {isRtl ? 'تأكيد كلمة المرور' : 'Confirm'}
                        </label>
                        <div className="relative group">
                            <Lock className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-gray-600 group-focus-within:text-[#C5A059]' : 'text-gray-400 group-focus-within:text-[#C5A059]'}`} />
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className={`w-full rounded-2xl py-3.5 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm font-medium transition-all focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] outline-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-700' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <InputError message={errors.password} className="mt-1" />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-[#C5A059] hover:bg-[#B48F48] text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isRtl ? 'إنشاء حساب' : 'Create account'}
                    <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>

                <p className={`text-xs text-center px-4 leading-relaxed ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    {isRtl ? (
                        <>من خلال إنشاء حساب، فإنك توافق على <a href="#" className="underline hover:text-[#C5A059]">الشروط</a> و <a href="#" className="underline hover:text-[#C5A059]">سياسة الخصوصية</a>.</>
                    ) : (
                        <>By creating an account, you agree to our <a href="#" className="underline hover:text-[#C5A059]">Terms</a> and <a href="#" className="underline hover:text-[#C5A059]">Privacy Policy</a>.</>
                    )}
                </p>
            </form>
        </AuthLayout>
    );
}
