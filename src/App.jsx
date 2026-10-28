import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TransactionParameters from './components/TransactionParameters';
import AuditBreakdown from './components/AuditBreakdown';
import TaxDisclaimer from './components/TaxDisclaimer';
import Footer from './components/Footer';
import { calculateTaxes } from './utils/taxCalculator';

export default function App() {
  const [grossSalesInput, setGrossSalesInput] = useState('0');
  const [taxType, setTaxType] = useState('goods');
  const [customRate, setCustomRate] = useState('10');
  const [entityType, setEntityType] = useState('vat');
  const [deductEwt, setDeductEwt] = useState(true);

  const calculations = useMemo(() => {
    return calculateTaxes({
      grossSales: grossSalesInput,
      taxType,
      customRate,
      entityType,
      deductEwt,
    });
  }, [grossSalesInput, taxType, customRate, entityType, deductEwt]);

  const handleReset = () => {
    setGrossSalesInput('0');
    setTaxType('goods');
    setCustomRate('10');
    setEntityType('vat');
    setDeductEwt(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <Header />

      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-5">
            <TransactionParameters
              grossSales={grossSalesInput}
              onGrossSalesChange={setGrossSalesInput}
              taxType={taxType}
              onTaxTypeChange={setTaxType}
              customRate={customRate}
              onCustomRateChange={setCustomRate}
              entityType={entityType}
              onEntityTypeChange={setEntityType}
              deductEwt={deductEwt}
              onToggleDeductEwt={() => setDeductEwt(!deductEwt)}
              onReset={handleReset}
            />
            <TaxDisclaimer />
          </div>

          <div className="lg:col-span-7">
            <AuditBreakdown
              calculations={calculations}
              entityType={entityType}
              taxType={taxType}
              customRate={customRate}
              deductEwt={deductEwt}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}