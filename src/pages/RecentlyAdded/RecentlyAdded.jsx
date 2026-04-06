import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import { Sparkles } from "lucide-react";
import { useProducts } from '../../Hooks/useProducts';

export default function RecentlyAdded() {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, metadata, isLoading, isError } = useProducts({ 
    page: currentPage, 
    sortedBy: "-createdAt" 
  });

  const totalPages = metadata?.numberOfPages || 1;

  return (
    <>
      <Helmet>
        <title>Recently Added - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest">
                <Sparkles size={14} />
                Fresh Arrivals
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                Recently <span className="text-primary-600">Added</span>
              </h1>
              <p className="text-gray-500 font-medium max-w-xl">
                Be the first to get your hands on our newest items. Fresh from our suppliers to your cart.
              </p>
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={10} />
          ) : isError || !products || products.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
               <p className="text-gray-500 font-medium">No new products found at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} productInfo={product} />
                ))}
              </div>
              
              <div className="mt-16">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
