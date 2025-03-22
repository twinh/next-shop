'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { ProductPagination } from './components/product-pagination';
import { ProductSheet } from './components/product-sheet';
import { Product } from './types';
import Image from 'next/image';

// API request function
const fetchProducts = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const data = await res.json();
  return data as Product[];
};

const fetchProduct = async (id: string) => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const data = await res.json();
  return data as Product;
};

function Products() {
  const searchParams = useSearchParams();
  // Read initial page number and product ID from URL parameters
  const initialPage = Number(searchParams.get('page')) || 1;
  const productId = searchParams.get('productId');

  const [isDrawerOpen, setIsDrawerOpen] = useState(productId ? true : false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const ITEMS_PER_PAGE = 6;
  const TOTAL_ITEMS = 15;

  const { data: products = [], isLoading: isLoadingProducts, error: productsError } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage, ITEMS_PER_PAGE),
  });

  const { data: selectedProduct, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    // If there's a product ID, keep it
    if (productId) {
      params.set('productId', productId);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const handleProductClick = (product: Product) => {
    setIsDrawerOpen(true);
    const params = new URLSearchParams(window.location.search);
    params.set('productId', product.id.toString());
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    const params = new URLSearchParams(window.location.search);
    params.delete('productId');
    window.history.pushState({}, '', params.toString() ? `?${params.toString()}` : window.location.pathname);
  };

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-xl mb-4">
            {productsError instanceof Error 
              ? productsError.message 
              : 'Error loading products. Please try again later.'}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button 
              onClick={() => handlePageChange(1)} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to first page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover w-full h-full"
                    width={800}
                    height={500}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">{product.category.name}</p>
                  <p className="text-xl font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <ProductSheet
          isOpen={isDrawerOpen}
          onOpenChange={(open) => {
            if (!open) handleDrawerClose();
            else setIsDrawerOpen(true);
          }}
          product={selectedProduct}
          isLoading={isLoadingProduct}
        />
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <Products />
    </Suspense>
  );
}
