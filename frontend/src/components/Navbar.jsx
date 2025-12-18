import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Smartphone, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                <Smartphone size={20} />
                            </div>
                            <span className="font-bold text-xl text-primary-dark">RechargeFast</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/plans" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                View Plans
                            </Link>
                            {isAuthenticated && (
                                <Link to="/history" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    History
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                {isAdmin && (
                                    <Link to="/admin/dashboard">
                                        <Button variant="ghost" className="flex items-center gap-2 text-primary font-semibold">
                                            <Settings size={18} />
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                                <Link to="/dashboard">
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <User size={18} />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="bg-primary-light/10 border-primary text-primary-dark block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/plans"
                            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            View Plans
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/history"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                History
                            </Link>
                        )}
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 px-4">
                        {isAuthenticated ? (
                            <div className="space-y-1">
                                {isAdmin && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="block px-2 py-2 text-base font-medium text-primary hover:bg-gray-100 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <Link
                                    to="/dashboard"
                                    className="block px-2 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    className="block w-full text-left px-2 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-100 rounded"
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
