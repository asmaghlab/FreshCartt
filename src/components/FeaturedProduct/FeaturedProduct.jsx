import React, { useContext } from 'react';
import ProductGridSkeleton from '../Skeleton/ProductGridSkeleton';
import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../Hooks/useProducts';

export default function FeaturedProduct() {
  const { products, isLoading, isError } = useProducts();

  // Show loading while fetching products or if products not yet available
  if (isLoading || !products) return <ProductGridSkeleton count={10} />;

  // Show error if fetching failed
  if (isError) return <p className="text-red-500">Failed to load featured products.</p>;

  // Ensure products is always an array
  const productList = products || [];

  return (
    <section>
      <div className="container py-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Featured Products
        </h2>

        <div className="grid gap-5 py-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {productList.map((product) => (
            <ProductCard key={product.id} productInfo={product} />
          ))}
        </div>
      </div>
    </section>
  );
}