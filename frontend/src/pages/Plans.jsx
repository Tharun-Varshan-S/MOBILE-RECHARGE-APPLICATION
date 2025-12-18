import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Loader2, IndianRupee } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import api from '../api/axios';

export function Plans() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [mobileNumber, setMobileNumber] = useState('9876543210');
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['All', 'Truly Unlimited', 'Popular', 'Data', 'Talktime'];

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/plans');
                setPlans(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching plans:', err);
                setError('Failed to load plans. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const filteredPlans = selectedCategory === 'All'
        ? plans
        : plans.filter(p =>
            p.category === selectedCategory ||
            (p.description && p.description.toLowerCase().includes(selectedCategory.toLowerCase()))
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Sticky Header with Mobile Number */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4 sticky top-20 z-30">
                <div className="flex-1 w-full">
                    <Input
                        label="Recharging for"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="bg-gray-50 border-0"
                        placeholder="Enter 10-digit number"
                    />
                </div>
                <div className="text-sm text-gray-500 hidden sm:block">
                    Prepaid Utility - Browse Plans
                </div>
                <Button variant="outline" size="sm">Change</Button>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Plans List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center p-20 gap-4">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="text-gray-500 animate-pulse">Fetching best plans for you...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-red-500 font-medium">{error}</p>
                    <Button variant="ghost" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPlans.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            No plans found in "{selectedCategory}" category.
                        </div>
                    ) : (
                        filteredPlans.map((plan) => (
                            <Card
                                key={plan._id}
                                className="group hover:border-primary/50 transition-all duration-200 overflow-hidden"
                                onClick={() => navigate('/payment', { state: { plan, mobileNumber } })}
                            >
                                {plan.category && (
                                    <div className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-3 py-1 inline-block rounded-br-lg">
                                        {plan.category}
                                    </div>
                                )}
                                <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="col-span-1 md:col-span-3 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center text-2xl font-black text-gray-900">
                                                <IndianRupee size={20} />
                                                {plan.price}
                                            </div>
                                            <span className="text-gray-400 text-sm line-through decoration-red-400">₹{plan.price + 49}</span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[10px] uppercase font-bold">Validity</span>
                                                <span className="font-semibold text-gray-800">{plan.validity}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[10px] uppercase font-bold">Data</span>
                                                <span className="font-semibold text-gray-800">{plan.data}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[10px] uppercase font-bold">Voice</span>
                                                <span className="font-semibold text-gray-800">{plan.calls || 'Unlimited'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[10px] uppercase font-bold">SMS</span>
                                                <span className="font-semibold text-gray-800">{plan.sms || '100/day'}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>

                                        <div className="flex gap-2">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer">
                                                <Info size={14} /> View Details
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex items-center justify-end">
                                        <Button className="w-full md:w-32 group-hover:bg-primary shadow-lg shadow-primary/10">
                                            Buy Plan
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
