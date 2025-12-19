import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Smartphone, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import api from '../api/axios';

export function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state?.plan || { price: 299, validity: '28 Days', data: '1.5 GB/Day' };
    const mobileNumber = location.state?.mobileNumber || '9876543210';

    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        if (!plan?._id && !plan?.price) {
            setError('Invalid plan selected. Please go back and select a plan.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const rechargeData = {
                planId: plan._id,
                mobileNumber,
                operator: plan.operator || 'Airtel',
                amount: plan.price,
                paymentMode: paymentMethod.toUpperCase()
            };

            const { data } = await api.post('/recharge', rechargeData);

            // Navigate to success page with both the plan details and the backend response
            navigate('/success', {
                state: {
                    plan,
                    recharge: data
                }
            });
        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.response?.data?.message || 'Payment processing failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Payment Options</h1>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Payment Methods Sidebar */}
                <div className="space-y-2">
                    <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all font-semibold ${paymentMethod === 'upi' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg border-2 border-orange-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md border-2 border-gray-300'
                            }`}
                    >
                        <Smartphone size={20} className={paymentMethod === 'upi' ? 'text-gray-900' : 'text-green-600'} />
                        <span>UPI</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all font-semibold ${paymentMethod === 'card' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg border-2 border-orange-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md border-2 border-gray-300'
                            }`}
                    >
                        <CreditCard size={20} className={paymentMethod === 'card' ? 'text-gray-900' : 'text-blue-600'} />
                        <span>Debit / Credit Card</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('wallet')}
                        className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all font-semibold ${paymentMethod === 'wallet' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg border-2 border-orange-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md border-2 border-gray-300'
                            }`}
                    >
                        <Wallet size={20} className={paymentMethod === 'wallet' ? 'text-gray-900' : 'text-orange-600'} />
                        <span>Wallet</span>
                    </button>
                </div>

                {/* Payment Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Order Summary */}
                    <Card className="p-4 bg-yellow-50 border-yellow-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Recharge Amount</span>
                            <span className="font-bold">₹{plan.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Validity</span>
                            <span>{plan.validity}</span>
                        </div>
                    </Card>

                    <Card className="p-6">
                        {paymentMethod === 'upi' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Pay via UPI</h3>
                                <p className="text-sm text-gray-500">Enter your UPI ID to receive a payment request</p>
                                <Input placeholder="e.g. 9876543210@upi" />
                                <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600 shadow-lg" onClick={handlePayment} size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : `Pay ₹${plan.price}`}
                                </Button>
                                <div className="flex gap-4 justify-center mt-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-12 h-12 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center shadow-sm">
                                            <span className="text-xl font-bold text-blue-600">G</span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">GPay</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center shadow-sm">
                                            <span className="text-xl font-bold text-white">P</span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">PhonePe</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
                                            <span className="text-xl font-bold text-white">P</span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">Paytm</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Enter Card Details</h3>
                                <Input label="Card Number" placeholder="XXXX XXXX XXXX XXXX" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Valid Thru" placeholder="MM/YY" />
                                    <Input label="CVV" placeholder="123" type="password" maxLength={3} />
                                </div>
                                <Input label="Name on Card" placeholder="John Doe" />
                                <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600 shadow-lg" onClick={handlePayment} size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : `Pay ₹${plan.price}`}
                                </Button>
                            </div>
                        )}

                        {paymentMethod === 'wallet' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Select Wallet</h3>
                                <div className="space-y-2">
                                    {['Paytm Wallet', 'Amazon Pay', 'Freecharge'].map(w => (
                                        <div key={w} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <span className="font-medium">{w}</span>
                                            <input type="radio" name="wallet" />
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-2 border-orange-600 shadow-lg" onClick={handlePayment} size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : `Pay ₹${plan.price}`}
                                </Button>
                            </div>
                        )}
                    </Card>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Lock size={14} />
                        <span>100% Secure Transaction by RechargeFast</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
