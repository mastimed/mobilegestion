import React, { useState, useMemo } from 'react';
import { Product, ProductType, Sale } from './types';
import Header from './components/Header';
import LowStockAlerts from './components/LowStockAlerts';
import AddProductForm from './components/AddProductForm';
import InventoryList from './components/InventoryList';
import InventorySummary from './components/InventorySummary';
import SellProductModal from './components/SellProductModal';

const initialProducts: Product[] = [
  { id: '1', name: 'Écran iPhone 14 Pro', type: ProductType.PART, stock: 12, lowStockThreshold: 10, purchasePrice: 1500, sellingPrice: 2500 },
  { id: '2', name: 'Samsung Galaxy S23', type: ProductType.PHONE, stock: 8, lowStockThreshold: 5, purchasePrice: 6000, sellingPrice: 9000 },
  { id: '3', name: 'Batterie Google Pixel 7', type: ProductType.PART, stock: 4, lowStockThreshold: 5, purchasePrice: 450, sellingPrice: 800 },
  { id: '4', name: 'iPhone 15 Pro Max', type: ProductType.PHONE, stock: 15, lowStockThreshold: 5, purchasePrice: 11000, sellingPrice: 14500 },
  { id: '5', name: 'Connecteur de charge USB-C', type: ProductType.PART, stock: 25, lowStockThreshold: 20, purchasePrice: 50, sellingPrice: 200 },
  { id: '6', name: 'OnePlus 11', type: ProductType.PHONE, stock: 3, lowStockThreshold: 4, purchasePrice: 5500, sellingPrice: 7500 },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sellingProduct, setSellingProduct] = useState<Product | null>(null);


  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: new Date().getTime().toString(),
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const handleUpdateStock = (productId: string, amount: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + amount) } : p
      )
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  const handleSellProduct = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || quantity <= 0 || quantity > product.stock) {
      // Gérer l'erreur potentielle (par exemple, afficher une notification)
      console.error("Vente invalide");
      return;
    }

    const newSale: Sale = {
      id: new Date().getTime().toString(),
      productId: product.id,
      productName: product.name,
      quantity,
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      timestamp: Date.now(),
    };

    setSales(prevSales => [newSale, ...prevSales]);
    handleUpdateStock(productId, -quantity);
    setSellingProduct(null); // Fermer la modale
  };

  const lowStockProducts = useMemo(() => {
    return products.filter(p => p.stock <= p.lowStockThreshold).sort((a,b) => a.stock - b.stock);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <InventorySummary products={products} sales={sales} />
            <LowStockAlerts products={lowStockProducts} />
            <AddProductForm onAddProduct={handleAddProduct} />
          </div>
          <div className="lg:col-span-2">
            <InventoryList 
              products={filteredProducts} 
              onUpdateStock={handleUpdateStock} 
              onDeleteProduct={handleDeleteProduct}
              onSellProduct={(product) => setSellingProduct(product)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </main>
      {sellingProduct && (
        <SellProductModal
          product={sellingProduct}
          onClose={() => setSellingProduct(null)}
          onConfirmSale={handleSellProduct}
        />
      )}
    </div>
  );
};

export default App;
