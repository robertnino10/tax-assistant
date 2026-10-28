import React from 'react';
import { Receipt } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
                        <Receipt className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 text-base leading-tight">
                            PH Receipt Assistance
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}