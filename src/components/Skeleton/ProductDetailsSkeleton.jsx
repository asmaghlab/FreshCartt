import React from 'react';
import Skeleton from './Skeleton';

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white py-24 md:py-32 px-4 lg:px-16 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Gallery placeholder */}
          <div className="lg:col-span-6 space-y-4">
             <Skeleton height={500} className="w-full rounded-3xl" />
             <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={80} className="w-full rounded-xl" />
                ))}
             </div>
          </div>

          {/* Info placeholder */}
          <div className="lg:col-span-6 space-y-8 py-4">
             <div className="space-y-4">
                <div className="flex gap-2">
                   <Skeleton width={100} height={20} className="rounded-full" />
                   <Skeleton width={100} height={20} className="rounded-full" />
                </div>
                <Skeleton height={40} className="w-full rounded-lg" />
                <Skeleton height={40} className="w-2/3" />
             </div>

             <div className="flex items-center gap-4">
                <Skeleton width={100} height={32} />
                <Skeleton width={120} height={24} />
             </div>

             <div className="pt-4 space-y-3 border-t border-gray-100">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={16} className="w-full" />
                ))}
             </div>

             <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                <Skeleton width={160} height={56} className="rounded-2xl shrink-0" />
                <Skeleton height={56} className="w-full rounded-2xl" />
             </div>

             <div className="pt-6 grid grid-cols-2 gap-4">
                <Skeleton height={48} className="w-full rounded-xl" />
                <Skeleton height={48} className="w-full rounded-xl" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
