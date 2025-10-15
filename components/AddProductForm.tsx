import React, { useState } from 'react';
import { Product, ProductType } from '../types';

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ProductType>(ProductType.PHONE);
  const [stock, setStock] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || stock === '' || lowStockThreshold === '' || purchasePrice === '' || sellingPrice === '') {
        setError('Tous les champs sont obligatoires.');
        return;
    }
    const stockNum = parseInt(stock, 10);
    const thresholdNum = parseInt(lowStockThreshold, 10);
    const purchasePriceNum = parseFloat(purchasePrice);
    const sellingPriceNum = parseFloat(sellingPrice);

    if (isNaN(stockNum) || isNaN(thresholdNum) || isNaN(purchasePriceNum) || isNaN(sellingPriceNum) || stockNum < 0 || thresholdNum < 0 || purchasePriceNum < 0 || sellingPriceNum < 0) {
        setError('Les valeurs de stock et de prix doivent être des nombres positifs.');
        return;
    }
    
    onAddProduct({
      name,
      type,
      stock: stockNum,
      lowStockThreshold: thresholdNum,
      purchasePrice: purchasePriceNum,
      sellingPrice: sellingPriceNum,
    });

    setName('');
    setType(ProductType.PHONE);
    setStock('');
    setLowStockThreshold('');
    setPurchasePrice('');
    setSellingPrice('');
    setError('');
  };

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Ajouter un nouveau produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Nom du produit</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Ex: iPhone 15 Pro"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-400 mb-1">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as ProductType)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            <option value={ProductType.PHONE}>Téléphone</option>
            <option value={ProductType.PART}>Pièce de rechange</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-slate-400 mb-1">Prix d'achat (DH)</label>
                <input
                    type="number"
                    id="purchasePrice"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    placeholder="Ex: 1500.50"
                    min="0"
                    step="0.01"
                />
            </div>
            <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-slate-400 mb-1">Prix de vente (DH)</label>
                <input
                    type="number"
                    id="sellingPrice"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    placeholder="Ex: 2499.99"
                    min="0"
                    step="0.01"
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-slate-400 mb-1">Quantité en stock</label>
                <input
                    type="number"
                    id="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    placeholder="Ex: 25"
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-slate-400 mb-1">Seuil de stock bas</label>
                <input
                    type="number"
                    id="lowStockThreshold"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    placeholder="Ex: 5"
                    min="0"
                />
            </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <PlusIcon />
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;