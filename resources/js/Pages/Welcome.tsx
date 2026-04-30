import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ChevronRight, 
    ArrowRight, 
    Globe, 
    CreditCard,
    BarChart3,
    Layers,
    ArrowUpRight
} from 'lucide-react';
import Navbar from '@/Components/Landing/Navbar';
import { useAppStore } from '@/Stores/useAppStore';
import { useEffect, useState } from 'react';
import Hero from '@/Components/Landing/Hero';

export default function Welcome({ auth }: { auth: any }) {
    const { theme, locale } = useAppStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', locale);
    }, [theme, locale]);

    return (
        <div className={`min-h-screen selection:bg-blue-500/30 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0C10] text-white' : 'bg-white text-[#1a1f36]'}`}>
            <Head title="FinFlow | Financial Infrastructure for the Internet" />
            
            <Navbar auth={auth} />

            <main>
                <Hero />

                {/* Modular Solutions Section */}
                <section className="py-24 border-t border-gray-500/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16">
                            <h2 className="text-blue-600 font-bold mb-4">Modular solutions</h2>
                            <h3 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
                                A fully integrated suite of financial and payments products
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Payments', desc: 'Accept payments and scale faster with a global partner.', icon: CreditCard },
                                { title: 'Billing', desc: 'Manage subscriptions and build recurring revenue.', icon: Layers },
                                { title: 'Invoicing', desc: 'Send invoices and get paid faster with online portals.', icon: BarChart3 },
                                { title: 'Connect', desc: 'The fastest way to integrate payments into your platform.', icon: Globe },
                            ].map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-8 rounded-2xl border border-transparent hover:border-gray-500/10 transition-all cursor-pointer group ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        {feature.title} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className={`p-12 md:p-20 rounded-[40px] relative overflow-hidden bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-12`}>
                            <div className="max-w-xl">
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to start with FinFlow?</h2>
                                <p className="text-xl text-blue-100/80 mb-10">
                                    Explore FinFlow Payments, or create an account instantly and start accepting payments for your business.
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href={route('register')} className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-all">
                                        Get started now
                                    </Link>
                                    <Link href="#" className="px-8 py-4 border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                                        Contact sales
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Decorative background for CTA */}
                            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                                <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-white rotate-[15deg] blur-[100px]" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`py-20 border-t ${theme === 'dark' ? 'border-white/5 bg-[#050608]' : 'border-gray-100 bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                        <div className="col-span-2">
                            <h2 className="text-2xl font-bold mb-8 lowercase tracking-tighter">finflow</h2>
                            <div className="space-y-4">
                                <p className="flex items-center gap-2 text-sm opacity-60">
                                    <Globe className="w-4 h-4" /> United States
                                </p>
                                <p className="flex items-center gap-2 text-sm opacity-60">
                                    <Globe className="w-4 h-4" /> English (United States)
                                </p>
                            </div>
                        </div>
                        {[
                            { title: 'Products', links: ['Payments', 'Billing', 'Connect', 'Invoicing'] },
                            { title: 'Developers', links: ['Documentation', 'API reference', 'API status', 'Libraries'] },
                            { title: 'Company', links: ['About', 'Customers', 'Enterprise', 'Partners'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="font-bold mb-6">{col.title}</h4>
                                <ul className="space-y-4 opacity-60 text-sm">
                                    {col.links.map(link => (
                                        <li key={link}><Link href="#" className="hover:opacity-100 transition-opacity">{link}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-20 pt-8 border-t border-gray-500/10 text-sm opacity-40">
                        © 2026 FinFlow. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
