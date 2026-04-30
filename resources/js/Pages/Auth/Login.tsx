import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
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
            <Head title="Log in" />

            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Sign in</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                </p>
            </div>

            {status && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl text-sm font-medium">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-xs font-semibold text-blue-600 hover:underline">Forgot password?</Link>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center gap-2 px-1">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-600"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Stay signed in</label>
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    Sign in
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </AuthLayout>
    );
}
