export const EWT_RATES = {
    goods: {
        rate: 0.01,
        label: 'Goods',
        percentage: '1%',
        atc: 'WC 158 / WI 158',
        description: 'Applies to recurring purchases of trade goods, office supplies, and regular merchandise by designated Top Withholding Agents (TWAs).',
    },
    service: {
        rate: 0.02,
        label: 'Service',
        percentage: '2%',
        atc: 'WC 160 / WI 160',
        description: 'Applies to payments to local service contractors, freight forwarders, repairs, maintenance, and sub-contractors by TWAs.',
    },
    rental: {
        rate: 0.05,
        label: 'Rental',
        percentage: '5%',
        atc: 'WC 100 / WI 100',
        description: 'Applies to gross rentals of real property (commercial space, office, land) or personal property (heavy machinery, vehicles, equipment).',
    },
    custom: {
        label: 'Custom',
        description: 'User-defined percentage for non-standard ATCs (e.g., 5% or 10% Professional Fees, 15% Director fees, or specialized rates).',
    },
};

export const formatPHP = (num) => {
    return '₱' + (num || 0).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const calculateTaxes = ({ grossSales, taxType, customRate, entityType, deductEwt }) => {
    const gross = parseFloat(String(grossSales).replace(/,/g, '')) || 0;

    let currentRate = 0;
    if (taxType === 'custom') {
        currentRate = (parseFloat(customRate) || 0) / 100;
    } else {
        currentRate = EWT_RATES[taxType]?.rate || 0;
    }

    if (entityType === 'vat') {
        const vatableSales = gross / 1.12;
        const vatAmount = gross - vatableSales;
        const lessVat = vatAmount;
        const netAmount = vatableSales;
        const addVat = vatAmount;
        const amountDue = gross;
        const ewtAmount = deductEwt ? vatableSales * currentRate : 0;
        const finalAmountDue = amountDue - ewtAmount;

        return {
            gross,
            vatableSales,
            vatAmount,
            lessVat,
            netAmount,
            addVat,
            amountDue,
            ewtAmount,
            finalAmountDue,
            effectiveRate: currentRate,
        };
    }

    // Non-VAT calculation
    const ewtAmount = deductEwt ? gross * currentRate : 0;
    const finalAmountDue = gross - ewtAmount;

    return {
        gross,
        totalSales: gross,
        vatableSales: 0,
        vatAmount: 0,
        lessVat: 0,
        netAmount: gross,
        addVat: 0,
        amountDue: gross,
        ewtAmount,
        finalAmountDue,
        effectiveRate: currentRate,
    };
};