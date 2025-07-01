
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

// Shared product data that both CRM and public pages will use
export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('leafletProducts');
  
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  // Default products if none are stored
  const defaultProducts: Product[] = [
    { id: 1, name: 'CRM Professional', description: 'Advanced CRM features', price: 99, category: 'Software', status: 'Active' },
    { id: 2, name: 'Consulting Services', description: 'Expert consulting', price: 150, category: 'Service', status: 'Active' },
    { id: 3, name: 'Training Package', description: 'Comprehensive training', price: 75, category: 'Training', status: 'Active' },
  ];
  
  // Store default products
  localStorage.setItem('leafletProducts', JSON.stringify(defaultProducts));
  return defaultProducts;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('leafletProducts', JSON.stringify(products));
};
