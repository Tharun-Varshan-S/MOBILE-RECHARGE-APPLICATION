import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Wifi, Tv, Zap, CreditCard, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export function Landing() {
    const navigate = useNavigate();

    const handleQuickRecharge = (e) => {
        e.preventDefault();
        navigate('/recharge');
    };

    const services = [
        { icon: <Smartphone size={24} />, label: 'Prepaid', color: 'bg-blue-100 text-blue-600' },
        { icon: <Wifi size={24} />, label: 'Broadband', color: 'bg-orange-100 text-orange-600' },
        { icon: <Tv size={24} />, label: 'DTH', color: 'bg-purple-100 text-purple-600' },
        { icon: <Zap size={24} />, label: 'Electricity', color: 'bg-yellow-100 text-yellow-600' },
        { icon: <CreditCard size={24} />, label: 'Fastag', color: 'bg-green-100 text-green-600' },
        { icon: <Smartphone size={24} />, label: 'Postpaid', color: 'bg-red-100 text-red-600' },
    ];

    return (
        <div className="pb-12 space-y-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary-dark to-black text-white py-16 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                                Recharge in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Flash</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-200 max-w-lg">
                                The fastest, most secure way to recharge your mobile, pay bills, and manage your subscriptions.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="rounded-full shadow-lg shadow-orange-500/50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-extrabold border-2 border-orange-600" onClick={() => navigate('/login')}>
                                    Get Started
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full border-2 border-white bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg" onClick={() => navigate('/plans')}>
                                    View Plans
                                </Button>
                            </div>
                        </div>

                        {/* Quick Recharge Card */}
                        <Card className="p-6 lg:p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Quick Recharge</h2>
                            <form onSubmit={handleQuickRecharge} className="space-y-4">
                                <Input
                                    label="Mobile Number"
                                    placeholder="Enter 10 digit mobile number"
                                    type="tel"
                                    maxLength={10}
                                    className="text-lg"
                                    required
                                />
                                <Input
                                    label="Operator"
                                    placeholder="Select Operator"
                                    list="operators"
                                    className="text-lg"
                                />
                                <datalist id="operators">
                                    <option value="Airtel" />
                                    <option value="Jio" />
                                    <option value="Vi" />
                                    <option value="BSNL" />
                                </datalist>
                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full text-lg font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 border-2 border-orange-600"
                                    >
                                        Proceed to Recharge
                                        <ArrowRight size={20} className="font-bold" />
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Explore Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <div className={`p-4 rounded-full ${service.color} group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <span className="font-medium text-gray-700">{service.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Offers Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                                Limited Time Offer
                            </div>
                            <h2 className="text-3xl font-bold">Get 20% Cashback</h2>
                            <p className="text-indigo-100 max-w-md">
                                Recharge for ₹299 or more and get guaranteed cashback up to ₹50. Offer valid for first-time users.
                            </p>
                            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 border-0">
                                Claim Now
                            </Button>
                        </div>
                        <div className="hidden md:block">
                            {/* Decorative Element */}
                            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/20">
                                <span className="text-4xl font-bold">20%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Trust */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold">100% Secure</h3>
                            <p className="text-gray-500">Bank-grade security for all your transactions and personal data.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Instant Activation</h3>
                            <p className="text-gray-500">Recharges are processed instantly. No waiting, no delays.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-xl font-bold">24/7 Support</h3>
                            <p className="text-gray-500">Our support team is available round the clock to assist you.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
