import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function TaxDisclaimer() {
    return (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
                <strong>Tax Compliance Reminder:</strong> Computations follow Philippine NIRC and BIR TRAIN guidelines. Verify withholding status prior to 2307 issuance.
            </p>
        </div>
    );
}