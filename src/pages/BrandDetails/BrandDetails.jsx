import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from "react-helmet";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import { Link } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from '../../Hooks/useProducts';
import { useBrandDetails } from '../../Hooks/useBrandDetails';

export default function BrandDetails() {
  const { id } = useParams();
  const { brandDetails: brand, isLoading, isError, error } = useBrandDetails(id);
  const { products } = useProducts();

  if (isLoading) return <ProductGridSkeleton count={8} />;

  if (error) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
      <Link to="/brands" className="text-primary-600 hover:underline">Back to Brands</Link>
    </div>
  );

  // Filter global products matching this brand's ID
  const brandProducts = products?.filter(p => p.brand?._id === id || p.brand?.id === id) || [];

  return (
    <>
      <Helmet>
        <title>{brand ? `${brand.name} - FreshCart` : 'Brand Details'}</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-48 h-48 flex-shrink-0 border border-gray-100 rounded-xl p-4 flex items-center justify-center">
              <img src={brand?.image} alt={brand?.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{brand?.name}</h1>
              <p className="text-gray-600 max-w-2xl">
                Explore the latest collection and high-quality products from {brand?.name}. 
                We bring you the authenticity and excellence you expect.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products from {brand?.name}</h2>
          
          {brandProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
              We currently don't have any products from this brand in our global catalog.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {brandProducts.map((product) => (
                <ProductCard key={product._id || product.id} productInfo={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
