import React from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { Helmet } from "react-helmet";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from '../../Hooks/useProducts';
import { useCategoryDetails } from '../../Hooks/useCategoryDetails';
import { useSubCategories } from '../../Hooks/useSubCategories';

export default function CategoryDetails() {
  const { id } = useParams();
  
  if (id === 'all') {
    return <Navigate to="/categories" />;
  }

  const { categoryDetails: category, isLoading: isCatLoading, isError: isCatError, error: catError } = useCategoryDetails(id);
  const { subCategories, isLoading: isSubLoading } = useSubCategories(id);
  const { products } = useProducts();

  const isLoading = isCatLoading || isSubLoading;

  if (isLoading) return <ProductGridSkeleton count={10} />;

  if (isCatError || !category) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{catError?.message || "Category Not Found"}</h2>
      <p className="text-gray-500 mb-4 max-w-lg">Note: If you clicked a hardcoded link from the Navbar (like Men's Fashion), those IDs don't exist in the real API database.</p>
      <Link to="/categories" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">View All Categories</Link>
    </div>
  );

  // Filter global products matching this category's ID
  const catProducts = products?.filter(p => p.category?._id === id || p.category?.id === id) || [];

  return (
    <>
      <Helmet>
        <title>{category ? `${category.name} - FreshCart` : 'Category Details'}</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-gray-600">Browse all products and sub-categories under {category.name}</p>
            </div>
          </div>

          {/* Subcategories Pills */}
          {subCategories.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sub Categories</h3>
              <div className="flex flex-wrap gap-3">
                {subCategories.map((sub) => (
                  <span 
                    key={sub._id} 
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-medium text-sm border border-primary-100"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products ({catProducts.length})</h2>
          
          {catProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
              We currently don't have any products in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {catProducts.map((product) => (
                <ProductCard key={product._id || product.id} productInfo={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
