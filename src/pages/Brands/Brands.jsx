import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import CategoryGridSkeleton from "../../components/Skeleton/CategoryGridSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import { useBrands } from "../../Hooks/useBrands";

export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);
  const { brands, metadata, isLoading, isError, error } = useBrands(currentPage, 15);

  if (isLoading) return <CategoryGridSkeleton count={15} />;

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        {error?.message || "Something went wrong while fetching brands."}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Brands - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Featured Brands</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the world's top brands, handpicked for quality and excellence. 
              Find your favorite products from trusted manufacturers all in one place.
            </p>
          </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {(brands || []).map((brand) => (
                  <Link 
                    to={`/brands/${brand._id || brand.id}`}
                    key={brand._id || brand.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="h-24 w-24 relative mb-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src={brand.image} 
                        alt={brand.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {brand.name}
                    </h3>
                  </Link>
                ))}
              </div>
              {metadata?.numberOfPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={metadata.numberOfPages}
                  onPageChange={setCurrentPage}
                />
              )}
        </div>
      </div>
    </>
  )
}
