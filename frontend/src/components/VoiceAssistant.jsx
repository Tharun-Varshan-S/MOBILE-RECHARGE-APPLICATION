import React, { useState } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! How can I help you today?' }
    ]);

    const toggleAssistant = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsListening(true);
            // Simulate stopping listening after a few seconds if no input
            setTimeout(() => setIsListening(false), 3000);
        } else {
            setIsListening(false);
        }
    };

    const handleMicClick = () => {
        setIsListening(!isListening);
        if (!isListening) {
            // Simulate processing
            setTimeout(() => {
                setIsListening(false);
                setMessages(prev => [...prev,
                { type: 'user', text: 'Check my balance' },
                { type: 'bot', text: 'Your current balance is ₹129. Validity expires in 5 days.' }
                ]);
            }, 2000);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
            {isOpen && (
                <Card className="w-80 h-96 flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-primary text-white p-3 flex justify-between items-center">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Mic size={16} /> Voice Assistant
                        </h3>
                        <button onClick={toggleAssistant} className="hover:bg-white/20 p-1 rounded">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.type === 'user'
                                        ? 'ml-auto bg-primary text-white'
                                        : 'bg-white border border-gray-200 text-gray-800 self-start'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isListening && (
                            <div className="flex gap-1 items-center justify-center p-2 text-primary">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-gray-100 bg-white">
                        <Button
                            variant="outline"
                            className={`w-full flex items-center justify-center gap-2 ${isListening ? 'bg-red-50 border-red-200 text-red-500' : ''
                                }`}
                            onClick={handleMicClick}
                        >
                            {isListening ? (
                                <>
                                    <MicOff size={16} /> Stop Listening
                                </>
                            ) : (
                                <>
                                    <Mic size={16} /> Tap to Speak
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
            )}

            {!isOpen && (
                <button
                    onClick={toggleAssistant}
                    className="w-14 h-14 bg-gradient-to-r from-primary to-primary-light text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/30"
                    aria-label="Open Voice Assistant"
                >
                    <Mic size={24} />
                </button>
            )}
        </div>
    );
}
