import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowLeft, Clock, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import api from '../api/axios';

export function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/users/notifications');
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="text-green-500" size={24} />;
            case 'warning': return <AlertTriangle className="text-yellow-500" size={24} />;
            case 'error': return <AlertTriangle className="text-red-500" size={24} />;
            default: return <Info className="text-blue-500" size={24} />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'success': return 'bg-green-50/50 border-green-100';
            case 'warning': return 'bg-yellow-50/50 border-yellow-100';
            case 'error': return 'bg-red-50/50 border-red-100';
            default: return 'bg-blue-50/50 border-blue-100';
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="rounded-full">
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500 text-sm">Stay updated with your account activity</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 animate-pulse">Loading alerts...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-dashed border-2">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                            <Bell size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
                            <p className="text-gray-500">You don't have any notifications at the moment.</p>
                        </div>
                    </Card>
                ) : (
                    notifications.map((note) => (
                        <Card key={note._id} className={`p-5 shift-up hover:shadow-md transition-all border ${getBgColor(note.type)}`}>
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    {getIcon(note.type)}
                                </div>
                                <div className="flex-grow space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900">{note.title}</h3>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium bg-white px-2 py-1 rounded-full border border-gray-100">
                                            <Clock size={10} />
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{note.message}</p>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
