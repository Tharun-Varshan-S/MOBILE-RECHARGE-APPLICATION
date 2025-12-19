import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Wifi, CreditCard, Clock, ChevronRight, Plus, Bell, Info, Shield, User, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await api.get('/users/notifications');
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        if (user) fetchNotifications();
    }, [user]);

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">Good Afternoon, {user.name}</h1>
                        {user.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg border-2 border-red-700">
                                <Shield size={14} />
                                ADMIN
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg border-2 border-blue-700">
                                <User size={14} />
                                USER
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500">{user.phone} • {user.role === 'admin' ? 'Administrator' : 'Prepaid User'}</p>
                </div>
                <Button onClick={() => navigate('/plans')} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600 shadow-lg">Recharge Now</Button>
            </div>

            {/* Notifications Bar */}
            {notifications.length > 0 && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Bell size={20} className="text-primary" /> Recent Alerts
                        </h2>
                        <button onClick={() => navigate('/notifications')} className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {notifications.slice(0, 2).map((note) => (
                            <Card key={note._id} className="p-4 border-l-4 border-l-blue-500 bg-blue-50/30">
                                <div className="flex gap-3">
                                    <Info className="text-blue-500 shrink-0" size={20} />
                                    <div>
                                        <h3 className="font-bold text-sm text-blue-900">{note.title}</h3>
                                        <p className="text-sm text-blue-800/80">{note.message}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Stats Cards - Display Dummy Data for now as backend doesn't track balance yet */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Data Balance */}
                <Card className="p-6 bg-white border-l-4 border-l-primary relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wifi size={64} className="text-primary" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Data Left</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">1.5 GB</span>
                            <span className="text-sm text-gray-500">daily limit</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Renewing in 12 hours</p>
                    </div>
                </Card>

                {/* Validity */}
                <Card className="p-6 bg-white border-l-4 border-l-gray-800 relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock size={64} className="text-gray-800" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Validity</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">28 Days</span>
                            <span className="text-sm text-red-500 font-medium">Expiring Soon</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Plan: ₹299 Unlimited</p>
                    </div>
                </Card>

                {/* Main Balance */}
                <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute right-0 top-0 p-4 opacity-10">
                        <CreditCard size={64} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">Talktime Balance</span>
                        <div className="mt-2">
                            <span className="text-3xl font-bold">₹0.00</span>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button size="sm" variant="outline" className="text-gray-900 border-2 border-gray-900 hover:bg-gray-100 font-semibold" onClick={() => navigate('/history')}>
                                View History
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600" onClick={() => navigate('/plans')}>
                                Add Money
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions Grid */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Recharge', icon: <Smartphone size={24} />, path: '/plans', color: 'text-blue-600', bgColor: 'bg-blue-50' },
                        { label: 'History', icon: <Clock size={24} />, path: '/history', color: 'text-orange-600', bgColor: 'bg-orange-50' },
                        { label: 'View Plans', icon: <Layers size={24} />, path: '/plans', color: 'text-purple-600', bgColor: 'bg-purple-50' },
                        { label: 'Support', icon: <ChevronRight size={24} />, path: '/dashboard', color: 'text-green-600', bgColor: 'bg-green-50' },
                    ].map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(action.path)}
                            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all gap-3 group"
                        >
                            <div className={`p-3 ${action.bgColor} rounded-full ${action.color} group-hover:scale-110 transition-transform`}>
                                {action.icon}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recommended Plans Banner */}
            <Card className="bg-gradient-to-r from-primary-light/10 to-transparent border-primary/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        %
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Special Offer Just for You</h3>
                        <p className="text-gray-600 text-sm">Get 2GB extra data on ₹479 recharge.</p>
                    </div>
                </div>
                <Button onClick={() => navigate('/plans')} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600 shadow-lg">View Offer</Button>
            </Card>
        </div>
    );
}
