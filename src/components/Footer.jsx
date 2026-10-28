import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-6 text-center text-[11px] text-slate-500 space-y-1.5 leading-relaxed">
                <p className="font-medium text-slate-700">
                    Philippine Tax Compliance &amp; Computation Aid
                </p>
                <p className="max-w-3xl mx-auto text-slate-400">
                    <strong>Disclaimer:</strong> This application is an independent utility created for estimation, auditing, and preliminary computational verification. It is not affiliated with, endorsed by, or an official product of the Bureau of Internal Revenue (BIR). Calculations reflect standard provisions under the National Internal Revenue Code (NIRC) and the TRAIN/EOPT Acts. Always reconcile figures with licensed Certified Public Accountants (CPAs) or tax legal counsel for official filings.
                </p>
                <p className="text-[10px] text-slate-400 pt-1">
                    &copy; {currentYear} PH Receipt Assistance. All computations performed locally on your device.
                </p>
            </div>
        </footer>
    );
}