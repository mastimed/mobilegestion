import React from 'react';
import { Product } from '../types';

interface LowStockAlertsProps {
  products: Product[];
}

const AlertIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);


const LowStockAlerts: React.FC<LowStockAlertsProps> = ({ products }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
      <div className="flex items-center gap-4 mb-4">
        <AlertIcon />
        <h2 className="text-xl font-bold text-red-400">Alertes de stock bas</h2>
      </div>
      {products.length === 0 ? (
        <p className="text-slate-400">Aucun produit en stock bas. Tout est en ordre !</p>
      ) : (
        <ul className="space-y-3">
          {products.map(product => (
            <li key={product.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
              <span className="font-medium text-slate-300">{product.name}</span>
              <span className="font-bold text-red-400">{product.stock} restants</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LowStockAlerts;
