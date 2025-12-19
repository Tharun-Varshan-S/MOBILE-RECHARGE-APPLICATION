import React, { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, Search, Filter, Loader2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../api/axios';

export function History() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/recharge/history');
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const filteredHistory = history.filter(txn =>
        txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.mobileNumber.includes(searchTerm)
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or Number"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <Button variant="outline" size="md" className="px-3">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredHistory.length === 0 ? (
                        <Card className="p-16 text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                <Clock size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900">No transactions yet</h3>
                                <p className="text-gray-500">Your recent recharges for mobile and bills will appear here.</p>
                            </div>
                            <Button onClick={() => navigate('/plans')} variant="outline" size="sm">
                                Browse Plans
                            </Button>
                        </Card>
                    ) : (
                        filteredHistory.map((txn) => (
                            <Card key={txn._id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className={`p-3 rounded-full ${txn.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {txn.status === 'Success' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Recharge for {txn.operator}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(txn.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-400">Txn ID: {txn.transactionId}</p>
                                        <p className="text-xs text-gray-400">Mobile: {txn.mobileNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                    <div className="text-right">
                                        <span className="block font-bold text-lg">₹{txn.amount}</span>
                                        <span className={`text-sm font-medium ${txn.status === 'Success' ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="hidden sm:block">Receipt</Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div >
    );
}
