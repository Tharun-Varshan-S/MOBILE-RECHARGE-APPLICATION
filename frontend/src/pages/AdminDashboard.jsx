import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, IndianRupee, Layers, Bell, LogOut, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export function AdminDashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, transRes] = await Promise.all([
                    api.get('/recharge/stats'),
                    api.get('/recharge/all')
                ]);
                setStats(statsRes.data);
                setTransactions(transRes.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm">System Overview & Management</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/admin/notifications')}>
                        <Bell size={18} /> Notifications
                    </Button>
                    <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut size={18} /> Logout
                    </Button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 flex items-center justify-between bg-white">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalUsers || 0}</h3>
                        <span className="text-green-500 text-xs font-semibold flex items-center mt-2">
                            <TrendingUp size={12} className="mr-1" /> Overall Growth
                        </span>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                        <Users size={24} />
                    </div>
                </Card>

                <Card className="p-6 flex items-center justify-between bg-white">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{(stats?.totalRevenue || 0).toLocaleString()}</h3>
                        <span className="text-green-500 text-xs font-semibold flex items-center mt-2">
                            <TrendingUp size={12} className="mr-1" /> +{(stats?.successCount || 0)} Successful
                        </span>
                    </div>
                    <div className="p-4 bg-green-50 rounded-full text-green-600">
                        <IndianRupee size={24} />
                    </div>
                </Card>

                <Card className="p-6 flex items-center justify-between bg-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/plans')}>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Active Plans</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.activePlans || 0}</h3>
                        <span className="text-gray-400 text-xs mt-2 block">Click to manage</span>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-full text-purple-600">
                        <Layers size={24} />
                    </div>
                </Card>

                <Card className="p-6 flex items-center justify-between bg-white">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Txns</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalTransactions || 0}</h3>
                        <span className="text-primary text-xs font-semibold mt-2 block">All Time</span>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-full text-orange-600">
                        <AlertCircle size={24} />
                    </div>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="h-full bg-white p-6">
                        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                                        <th className="pb-3 px-2">Mobile</th>
                                        <th className="pb-3 px-2">Date</th>
                                        <th className="pb-3 px-2">Amount</th>
                                        <th className="pb-3 px-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-10 text-center text-gray-400">No transactions recorded yet.</td>
                                        </tr>
                                    ) : (
                                        transactions.map((txn) => (
                                            <tr key={txn._id} className="text-sm">
                                                <td className="py-3 px-2 font-medium">{txn.mobileNumber}</td>
                                                <td className="py-3 px-2 text-gray-500">{new Date(txn.createdAt).toLocaleDateString()}</td>
                                                <td className="py-3 px-2 font-bold">₹{txn.amount}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${txn.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {txn.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="h-full bg-white p-6">
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/plans')}>
                                <Layers size={18} className="mr-2" /> Manage Plans
                            </Button>
                            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/notifications')}>
                                <Bell size={18} className="mr-2" /> Send Notification
                            </Button>
                            <div className="pt-6 border-t mt-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">System Info</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Backend Status</span>
                                        <span className="text-green-500 font-bold">Online</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Database</span>
                                        <span className="text-blue-500 font-bold">Connected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
