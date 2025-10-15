import React, { useMemo } from 'react';
import { Product, Sale } from '../types';

interface InventorySummaryProps {
  products: Product[];
  sales: Sale[];
}

const WalletIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const TrendingUpIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


const InventorySummary: React.FC<InventorySummaryProps> = ({ products, sales }) => {

  const totalPurchaseValue = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.purchasePrice * p.stock), 0);
  }, [products]);

  const totalRealizedProfit = useMemo(() => {
    return sales.reduce((acc, sale) => acc + ((sale.sellingPrice - sale.purchasePrice) * sale.quantity), 0);
  }, [sales]);

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">Résumé de l'inventaire</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
            <WalletIcon />
            <div>
                <p className="text-sm font-medium text-slate-400">Valeur totale du stock (Achat)</p>
                <p className="text-2xl font-bold text-cyan-400">{totalPurchaseValue.toFixed(2)} DH</p>
            </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
            <TrendingUpIcon />
            <div>
                <p className="text-sm font-medium text-slate-400">Bénéfice Réalisé (Ventes)</p>
                <p className="text-2xl font-bold text-green-400">{totalRealizedProfit.toFixed(2)} DH</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
