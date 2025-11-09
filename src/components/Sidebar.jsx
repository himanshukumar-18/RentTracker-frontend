import React, { useState } from 'react'
import { Home, CreditCard, FileText, Settings, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className='flex min-h-screen bg-[#F8FAFC]'>
                {/* Sidebar (Desktop & Tablet) */}
                <aside className="hidden md:flex w-64 bg-white shadow-lg p-6 flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-indigo-600 mb-8">Rent Tracker</h2>
                        <nav className="space-y-4">
                            <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
                                <Home size={20} /> Dashboard
                            </Link>
                            <Link to="/user.addpayment" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
                                <CreditCard size={20} /> Add Payment
                            </Link>
                        </nav>
                    </div>
                    <p className="text-sm text-gray-500">© 2025 Rent Tracker</p>
                </aside>

                {/* Top Navbar (Mobile Only) */}
                {/* Bottom Navigation (Mobile Only) */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-30">
                    <div className="flex justify-around items-center py-3 text-gray-600">

                        <Link to="/" className="flex flex-col items-center">
                            <Home size={22} />
                            <span className="text-xs">Home</span>
                        </Link>

                        <Link to="/user.addpayment" className="flex flex-col items-center">
                            <CreditCard size={22} />
                            <span className="text-xs">Payment</span>
                        </Link>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Sidebar