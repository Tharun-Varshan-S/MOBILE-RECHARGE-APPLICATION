import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import confetti from 'canvas-confetti';

export function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const { plan, recharge } = location.state || {};

    useEffect(() => {
        if (recharge) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#e10000', '#ffffff', '#000000']
            });
        }
    }, [recharge]);

    if (!recharge || !plan) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">No transaction details found.</p>
                    <Button onClick={() => navigate('/')} variant="primary">Go Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-in zoom-in duration-300">
                    <CheckCircle size={48} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Recharge Successful!</h1>
                    <p className="text-gray-500 mt-2">Transaction ID: {recharge.transactionId}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-left">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid</span>
                        <span className="font-bold">₹{recharge.amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Mobile Number</span>
                        <span className="font-medium">{recharge.mobileNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-medium">{plan.data} - {plan.validity}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Operator</span>
                        <span className="font-medium text-primary">{recharge.operator}</span>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                        <Download size={18} /> Receipt
                    </Button>
                    <Button className="flex-1 flex items-center justify-center gap-2" onClick={() => navigate('/dashboard')}>
                        <Home size={18} /> Dashboard
                    </Button>
                </div>
            </Card>

            <p className="text-gray-400 text-sm mt-8">
                A confirmation SMS has been sent to {recharge.mobileNumber}.
            </p>
        </div>
    );
}
