import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Save, Loader2, X, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import api from '../api/axios';

export function AdminPlans() {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // Track specific plan ID or 'add'
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);

    // Form data states
    const [editData, setEditData] = useState({});
    const [newData, setNewData] = useState({
        operator: 'Airtel',
        price: '',
        validity: '',
        data: '',
        category: 'Truly Unlimited',
        description: '',
        type: 'Prepaid'
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/plans');
            setPlans(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setError('Failed to load plans from database.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (plan) => {
        setIsEditing(plan._id);
        setEditData({ ...plan });
    };

    const handleSave = async (id) => {
        setActionLoading(id);
        try {
            await api.put(`/plans/${id}`, editData);
            setIsEditing(null);
            await fetchPlans();
        } catch (error) {
            console.error('Update failed:', error);
            alert(error.response?.data?.message || 'Failed to update plan');
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) return;

        setActionLoading(id);
        try {
            await api.delete(`/plans/${id}`);
            await fetchPlans();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete plan. You might not have permission.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setActionLoading('add');
        try {
            await api.post('/plans', newData);
            setIsAdding(false);
            setNewData({
                operator: 'Airtel',
                price: '',
                validity: '',
                data: '',
                category: 'Truly Unlimited',
                description: '',
                type: 'Prepaid'
            });
            await fetchPlans();
        } catch (error) {
            console.error('Add failed:', error);
            alert(error.response?.data?.message || 'Failed to add plan. All required fields must be filled.');
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage Plans</h1>
                            <p className="text-sm text-gray-500">Add, edit, or remove recharge packs</p>
                        </div>
                    </div>
                    {!isAdding && (
                        <Button className="flex items-center gap-2 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600" onClick={() => setIsAdding(true)}>
                            <Plus size={18} /> Add New Plan
                        </Button>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} />
                        <span className="font-medium">{error}</span>
                        <Button variant="ghost" size="sm" onClick={fetchPlans} className="ml-auto text-gray-900 font-semibold hover:bg-red-100">Retry</Button>
                    </div>
                )}

                {/* Add Plan Form */}
                {isAdding && (
                    <Card className="p-6 border-2 border-primary/20 bg-primary/5 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Plus size={20} className="text-primary" /> Create New Plan
                            </h2>
                            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input label="Price (₹)" type="number" required value={newData.price} onChange={(e) => setNewData({ ...newData, price: e.target.value })} placeholder="e.g. 299" />
                                <Input label="Validity" required placeholder="e.g. 28 Days" value={newData.validity} onChange={(e) => setNewData({ ...newData, validity: e.target.value })} />
                                <Input label="Data" required placeholder="e.g. 1.5GB/Day" value={newData.data} onChange={(e) => setNewData({ ...newData, data: e.target.value })} />
                                <Input label="Category" required placeholder="e.g. Truly Unlimited" value={newData.category} onChange={(e) => setNewData({ ...newData, category: e.target.value })} />
                                <Input label="Operator" required value={newData.operator} onChange={(e) => setNewData({ ...newData, operator: e.target.value })} />
                                <Input label="Plan Type" value={newData.type} onChange={(e) => setNewData({ ...newData, type: e.target.value })} />
                            </div>
                            <Input label="Description" placeholder="Additional plan benefits..." value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })} />
                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsAdding(false)} className="text-gray-900 font-semibold hover:bg-gray-200">Cancel</Button>
                                <Button type="submit" disabled={actionLoading === 'add'} className="min-w-[120px] bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600">
                                    {actionLoading === 'add' ? <Loader2 className="animate-spin" size={20} /> : 'Create Plan'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* Plans List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-gray-500 font-medium">Loading live plans...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {plans.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed text-gray-400">
                                No plans found. Get started by adding one!
                            </div>
                        ) : (
                            plans.map((plan) => (
                                <Card key={plan._id} className={`p-6 transition-all ${isEditing === plan._id ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'hover:shadow-md'}`}>
                                    {isEditing === plan._id ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <Input label="Price (₹)" type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                                                <Input label="Validity" value={editData.validity} onChange={(e) => setEditData({ ...editData, validity: e.target.value })} />
                                                <Input label="Data" value={editData.data} onChange={(e) => setEditData({ ...editData, data: e.target.value })} />
                                                <Input label="Category" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                                            </div>
                                            <Input label="Description" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                                            <div className="flex justify-end gap-2 pt-2">
                                                <Button variant="ghost" onClick={() => setIsEditing(null)} className="text-gray-900 font-semibold hover:bg-gray-200">Cancel</Button>
                                                <Button
                                                    onClick={() => handleSave(plan._id)}
                                                    disabled={actionLoading === plan._id}
                                                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600"
                                                >
                                                    {actionLoading === plan._id ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl font-black text-gray-900">₹{plan.price}</h3>
                                                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
                                                        {plan.category}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium italic">{plan.operator} • {plan.type}</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-sm">
                                                        <span className="text-gray-400 font-bold text-[10px] uppercase block">Validity</span>
                                                        <span className="text-gray-700 font-semibold">{plan.validity}</span>
                                                    </div>
                                                    <div className="text-sm">
                                                        <span className="text-gray-400 font-bold text-[10px] uppercase block">Data</span>
                                                        <span className="text-gray-700 font-semibold">{plan.data}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-500 text-sm">{plan.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 w-full md:w-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(plan)}
                                                    className="flex-1 md:flex-none border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-100"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={actionLoading === plan._id}
                                                    className="flex-1 md:flex-none text-red-600 hover:bg-red-50 border-2 border-red-500 font-semibold"
                                                    onClick={() => handleDelete(plan._id)}
                                                >
                                                    {actionLoading === plan._id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
