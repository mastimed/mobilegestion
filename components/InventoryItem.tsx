import React from 'react';
import { Product, ProductType } from '../types';

interface InventoryItemProps {
  product: Product;
  onUpdateStock: (productId: string, amount: number) => void;
  onDeleteProduct: (productId: string) => void;
  onSellProduct: (product: Product) => void;
}

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const MinusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CashRegisterIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);


const InventoryItem: React.FC<InventoryItemProps> = ({ product, onUpdateStock, onDeleteProduct, onSellProduct }) => {
  const isLowStock = product.stock <= product.lowStockThreshold;

  const typeColor = product.type === ProductType.PHONE ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300';
  const statusColor = isLowStock ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300';
  
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200">
      <td className="p-3 font-medium text-slate-200">{product.name}</td>
      <td className="p-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColor}`}>
            {product.type}
        </span>
      </td>
      <td className="p-3 text-right text-slate-300 font-mono">{product.purchasePrice.toFixed(2)} DH</td>
      <td className="p-3 text-right text-slate-300 font-mono">{product.sellingPrice.toFixed(2)} DH</td>
      <td className="p-3 text-center text-slate-300">{product.stock}</td>
      <td className="p-3 text-center">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
          {isLowStock ? 'Stock bas' : 'En stock'}
        </span>
      </td>
      <td className="p-3">
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => onSellProduct(product)}
                className="p-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                aria-label="Vendre le produit"
                title="Vendre le produit"
            >
                <CashRegisterIcon />
            </button>
            <button
                onClick={() => onUpdateStock(product.id, -1)}
                className="p-1.5 rounded-full bg-slate-600 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors"
                aria-label="Diminuer le stock"
                title="Ajustement -1"
            >
                <MinusIcon />
            </button>
            <button
                onClick={() => onUpdateStock(product.id, 1)}
                className="p-1.5 rounded-full bg-slate-600 hover:bg-green-500 text-slate-300 hover:text-white transition-colors"
                aria-label="Augmenter le stock"
                title="Ajustement +1"
            >
                <PlusIcon />
            </button>
            <button
                onClick={() => onDeleteProduct(product.id)}
                className="p-1.5 rounded-full bg-slate-600 hover:bg-red-800 text-slate-300 hover:text-white transition-colors"
                aria-label="Supprimer le produit"
                title="Supprimer"
            >
                <TrashIcon />
            </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryItem;
