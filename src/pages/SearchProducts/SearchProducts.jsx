import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import { SearchX } from "lucide-react";
import { useProducts } from '../../Hooks/useProducts';

export default function SearchProducts() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      if (!query.trim()) {
        setFilteredProducts(products); // Show all if no query
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(p => 
        p.title?.toLowerCase().includes(lowerQuery) || 
        p.category?.name?.toLowerCase().includes(lowerQuery) ||
        p.brand?.name?.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  if (isLoading) return <ProductGridSkeleton count={10} />;

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query}` : 'All Products'} - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-gray-600 mb-8">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm py-20 px-4 text-center">
              <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <SearchX size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any products matching your search criteria. Try checking your spelling or using more general terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} productInfo={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
