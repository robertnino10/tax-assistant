import React from 'react';
import { AlertTriangle, Info, RotateCcw } from 'lucide-react';
import { EWT_RATES } from '../utils/taxCalculator';

export default function TransactionParameters({
    grossSales,
    onGrossSalesChange,
    taxType,
    onTaxTypeChange,
    customRate,
    onCustomRateChange,
    entityType,
    onEntityTypeChange,
    deductEwt,
    onToggleDeductEwt,
    onReset,
}) {
    const activeDetails = EWT_RATES[taxType];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Transaction Setup
                </h2>
                <p className="text-xs text-slate-500">Configure receipt classification and amounts.</p>
            </div>

            {/* Tax Registration Status */}
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Tax Registration Status
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    <button
                        type="button"
                        onClick={() => onEntityTypeChange('vat')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${entityType === 'vat'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        VAT Registered (12%)
                    </button>
                    <button
                        type="button"
                        onClick={() => onEntityTypeChange('non-vat')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${entityType === 'non-vat'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Non-VAT Entity
                    </button>
                </div>
            </div>

            {/* Gross Sales Input + Reset Button */}
            <div>
                <label htmlFor="gross-sales" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Gross Sales / Receipt Amount
                </label>
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 rounded-xl border border-slate-300 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all bg-white">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                            ₱
                        </span>
                        <input
                            id="gross-sales"
                            type="number"
                            step="any"
                            min="0"
                            value={grossSales}
                            onChange={(e) => onGrossSalesChange(e.target.value)}
                            onFocus={(e) => e.target.value === '0' && onGrossSalesChange('')}
                            onBlur={(e) => e.target.value === '' && onGrossSalesChange('0')}
                            placeholder="0.00"
                            className="w-full pl-9 pr-4 py-3 bg-transparent text-slate-900 text-lg font-bold rounded-xl outline-none"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onReset}
                        title="Reset All Inputs"
                        className="h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center space-x-1.5 shrink-0"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-xs font-semibold">Reset</span>
                    </button>
                </div>
            </div>

            {/* EWT Selection Grid */}
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Expanded Withholding Tax (EWT) Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {Object.entries(EWT_RATES).map(([key, item]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onTaxTypeChange(key)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${taxType === key
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                                }`}
                        >
                            <div className="text-[11px] font-medium leading-tight">{item.label}</div>
                            <div className={`text-sm font-bold mt-0.5 ${taxType === key ? 'text-amber-300' : 'text-slate-900'}`}>
                                {item.percentage || '%'}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Dynamic Category Description */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start space-x-2.5">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800 block">
                            {activeDetails.label} {activeDetails.atc ? `(${activeDetails.atc})` : ''}
                        </span>
                        <p className="text-[11px] leading-relaxed text-slate-500">
                            {activeDetails.description}
                        </p>
                    </div>
                </div>

                {/* Custom Rate Input & Warning */}
                {taxType === 'custom' && (
                    <div className="mt-3 space-y-3">
                        <div>
                            <label htmlFor="custom-rate" className="block text-xs font-semibold text-slate-700 mb-1">
                                Enter Custom Rate (%)
                            </label>
                            <div className="relative rounded-xl border border-amber-300 bg-amber-50/20 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all">
                                <input
                                    id="custom-rate"
                                    type="number"
                                    step="any"
                                    min="0"
                                    max="100"
                                    value={customRate}
                                    onChange={(e) => onCustomRateChange(e.target.value)}
                                    placeholder="e.g. 10"
                                    className="w-full px-3.5 py-2.5 bg-transparent text-slate-900 font-bold outline-none text-sm"
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                                    %
                                </span>
                            </div>
                        </div>

                        {parseFloat(customRate) > 0 && (
                            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs flex items-start space-x-2">
                                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                <p className="text-[11px] leading-relaxed">
                                    <strong>Non-Standard Rate Warning:</strong> Using a custom rate requires verification against an authorized BIR Alphanumeric Tax Code (ATC) on Form 2307. Inaccurate withholding rates may lead to deficiency assessments and late filing surcharges.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* EWT Toggle */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-slate-900">Apply Form 2307 (EWT)</div>
                    <div className="text-xs text-slate-500">
                        {deductEwt ? 'Deduct withholding tax at source' : 'Exempted from withholding'}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onToggleDeductEwt}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${deductEwt ? 'bg-slate-900' : 'bg-slate-300'
                        }`}
                    aria-label="Toggle withholding tax"
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${deductEwt ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>
        </div>
    );
}