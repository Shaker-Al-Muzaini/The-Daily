import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
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
            <Head title="Register" />

            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create account</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-blue-600 font-semibold hover:underline">Sign in</Link>
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
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
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Confirm</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
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
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    Create account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-gray-500 text-center px-4">
                    By creating an account, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
            </form>
        </AuthLayout>
    );
}
