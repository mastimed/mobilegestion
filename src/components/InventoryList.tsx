import React from 'react';
import { Product } from '../types';
import InventoryItem from './InventoryItem';

interface InventoryListProps {
  products: Product[];
  onUpdateStock: (productId: string, amount: number) => void;
  onDeleteProduct: (productId: string) => void;
  onSellProduct: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


const InventoryList: React.FC<InventoryListProps> = ({ products, onUpdateStock, onDeleteProduct, onSellProduct, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-white">Inventaire Complet ({products.length})</h2>
        <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-600">
            <tr>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">Produit</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">Type</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Prix Achat</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Prix Vente</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider text-center">Stock</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider text-center">Statut</th>
              <th className="p-3 text-sm font-semibold text-slate-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
                products.map(product => (
                    <InventoryItem 
                        key={product.id} 
                        product={product} 
                        onUpdateStock={onUpdateStock}
                        onDeleteProduct={onDeleteProduct}
                        onSellProduct={onSellProduct}
                    />
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="text-center p-6 text-slate-400">
                        {searchQuery ? "Aucun produit ne correspond à votre recherche." : "L'inventaire est vide. Ajoutez un produit pour commencer."}
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
