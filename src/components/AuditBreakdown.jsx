import React from 'react';
import { formatPHP, EWT_RATES } from '../utils/taxCalculator';

export default function AuditBreakdown({ calculations, entityType, taxType, customRate, deductEwt }) {
    const currentRatePercentage = taxType === 'custom'
        ? `${parseFloat(customRate) || 0}%`
        : EWT_RATES[taxType]?.percentage;

    return (
        <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Card Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                            Audit Breakdown
                        </h2>
                        <p className="text-xs text-slate-500">Official BIR 12% VAT and EWT breakdown</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
                        {entityType === 'vat' ? 'VAT Registered (12%)' : 'Non-VAT Entity'}
                    </span>
                </div>

                {/* Breakdown Rows */}
                <div className="p-6">
                    {entityType === 'vat' ? (
                        <div className="divide-y divide-slate-100 text-sm">
                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>Vatable Sales</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.vatableSales)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>VAT Amount</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.vatAmount)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>Less VAT</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.lessVat)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>Net Amount</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.netAmount)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>Add VAT</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.addVat)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-slate-800 font-medium border-t border-slate-100">
                                <span>Amount Due</span>
                                <span className="font-bold text-slate-900 font-mono">
                                    {formatPHP(calculations.amountDue)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-rose-600">
                                <div>
                                    <span>Less Withholding (EWT)</span>
                                    <div className="text-[11px] text-slate-400 font-normal">
                                        {deductEwt ? `${currentRatePercentage} withholding on tax base` : 'Not applied'}
                                    </div>
                                </div>
                                <span className="font-semibold font-mono">
                                    {calculations.ewtAmount > 0 ? `-${formatPHP(calculations.ewtAmount)}` : '₱0.00'}
                                </span>
                            </div>

                            <div className="pt-4 pb-2 flex justify-between items-center border-t-2 border-slate-200">
                                <span className="font-bold text-slate-900 text-base">Final Amount Due</span>
                                <span className="font-bold text-xl text-rose-600 font-mono">
                                    {formatPHP(calculations.finalAmountDue)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 text-sm">
                            <div className="py-2.5 flex justify-between items-center text-slate-600">
                                <span>Total Sales</span>
                                <span className="font-semibold text-slate-900 font-mono">
                                    {formatPHP(calculations.totalSales)}
                                </span>
                            </div>

                            <div className="py-2.5 flex justify-between items-center text-rose-600">
                                <div>
                                    <span>Less Withholding (EWT)</span>
                                    <div className="text-[11px] text-slate-400 font-normal">
                                        {deductEwt ? `${currentRatePercentage} withholding on gross sales` : 'Not applied'}
                                    </div>
                                </div>
                                <span className="font-semibold font-mono">
                                    {calculations.ewtAmount > 0 ? `-${formatPHP(calculations.ewtAmount)}` : '₱0.00'}
                                </span>
                            </div>

                            <div className="pt-4 pb-2 flex justify-between items-center border-t-2 border-slate-200">
                                <span className="font-bold text-slate-900 text-base">Final Amount Due</span>
                                <span className="font-bold text-xl text-rose-600 font-mono">
                                    {formatPHP(calculations.finalAmountDue)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Quick Payee Notice */}
                    <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-xs">
                        <div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Check / Transfer Payable
                            </div>
                            <div className="text-xs text-amber-300 mt-0.5">
                                Net cash payable to supplier
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono tracking-tight">
                            {formatPHP(calculations.finalAmountDue)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Audit Basis Cards */}
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 px-1">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-0.5">Form 2307 Tax Base</span>
                    {formatPHP(entityType === 'vat' ? calculations.vatableSales : calculations.gross)}
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-0.5">Total EWT Withheld</span>
                    {formatPHP(calculations.ewtAmount)}
                </div>
            </div>
        </div>
    );
}