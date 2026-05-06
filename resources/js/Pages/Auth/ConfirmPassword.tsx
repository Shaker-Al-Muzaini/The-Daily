import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/Stores/useAppStore';
import { useTranslation } from '@/Hooks/useTranslation';

export default function ConfirmPassword() {
    const { theme, locale } = useAppStore();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const isRtl = locale === 'ar';

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title={`${isRtl ? 'تأكيد كلمة المرور' : 'Confirm Password'} - The Daily`} />

            <div className="space-y-3">
                <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1f36]'}`}>
                    {isRtl ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </h1>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isRtl 
                        ? 'هذه منطقة آمنة من التطبيق. يرجى تأكيد كلمة المرور الخاصة بك قبل المتابعة.'
                        : 'This is a secure area of the application. Please confirm your password before continuing.'}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
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
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-[#C5A059] hover:bg-[#B48F48] text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isRtl ? 'تأكيد' : 'Confirm'}
                    <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
            </form>
        </AuthLayout>
    );
}
