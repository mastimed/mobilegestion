export enum ProductType {
  PHONE = 'Téléphone',
  PART = 'Pièce de rechange'
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  stock: number;
  lowStockThreshold: number;
  purchasePrice: number;
  sellingPrice: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  timestamp: number;
}
