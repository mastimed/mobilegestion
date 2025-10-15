import React, { useState } from 'react';
import { Product } from '../types';

interface SellProductModalProps {
  product: Product;
  onClose: () => void;
  onConfirmSale: (productId: string, quantity: number) => void;
}

const CashRegisterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const SellProductModal: React.FC<SellProductModalProps> = ({ product, onClose, onConfirmSale }) => {
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setError('Veuillez entrer une quantité valide.');
      return;
    }
    if (numQuantity > product.stock) {
      setError(`La quantité ne peut pas dépasser le stock disponible (${product.stock}).`);
      return;
    }
    onConfirmSale(product.id, numQuantity);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400">Vendre un Produit</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        <p className="text-slate-300 mb-1">Produit: <span className="font-bold">{product.name}</span></p>
        <p className="text-sm text-slate-400 mb-4">Stock disponible: {product.stock}</p>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-400 mb-1">Quantité à vendre</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setError('');
            }}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Ex: 5"
            min="1"
            max={product.stock}
            autoFocus
          />
        </div>
        
        {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <CashRegisterIcon />
            Confirmer la Vente
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellProductModal;
