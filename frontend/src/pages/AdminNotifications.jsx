import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, Bell, Clock, History } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import api from '../api/axios';

export function AdminNotifications() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [status, setStatus] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setFetching(true);
            const { data } = await api.get('/users/notifications/all');
            setHistory(data);
        } catch (error) {
            console.error('Fetch history failed:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleSend = async () => {
        setLoading(true);
        setStatus(null);
        try {
            await api.post('/users/notifications', {
                title,
                message,
                type: 'info'
            });
            setStatus({ type: 'success', message: 'Notification sent successfully!' });
            setTitle('');
            setMessage('');
            fetchHistory(); // Refresh history
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send notification.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="rounded-full">
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Broadcast System</h1>
                        <p className="text-gray-500 text-sm">Send alerts to your users</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Send Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {status && (
                            <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {status.message}
                            </div>
                        )}

                        <Card className="p-6 md:p-8 shadow-lg border-2 border-primary/5">
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Send size={20} className="text-primary" /> New Notification
                            </h2>

                            <div className="space-y-5">
                                <Input
                                    label="Notification Title"
                                    placeholder="e.g. Monthly Maintenance"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-gray-50/50"
                                />

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message Content</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[160px] transition-all"
                                        placeholder="Type the message that all users will see..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button className="flex items-center gap-2 px-8" size="lg" onClick={handleSend} disabled={loading || !message || !title}>
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        {loading ? 'Processing...' : 'Broadcast Now'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Notification History */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <History size={20} className="text-gray-500" /> Recent History
                        </h2>

                        <div className="space-y-3">
                            {fetching ? (
                                <div className="flex justify-center p-10">
                                    <Loader2 className="animate-spin text-gray-300" size={32} />
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                                    No history found
                                </div>
                            ) : (
                                history.map((note) => (
                                    <Card key={note._id} className="p-4 bg-white border border-gray-100 hover:border-primary/20 transition-all">
                                        <div className="flex gap-3">
                                            <div className="mt-1">
                                                <Bell size={14} className="text-primary" />
                                            </div>
                                            <div className="space-y-1 overflow-hidden">
                                                <h3 className="text-sm font-bold text-gray-900 truncate">{note.title}</h3>
                                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{note.message}</p>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-1">
                                                    <Clock size={10} />
                                                    {new Date(note.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
