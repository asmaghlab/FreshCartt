import React from 'react';
import Skeleton from './Skeleton';

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 space-y-4 shadow-sm h-full">
          {/* Image placeholder */}
          <Skeleton height={200} className="w-full rounded-xl" />
          
          <div className="space-y-2 px-1">
             {/* Category & Badge */}
             <div className="flex justify-between items-center mb-1">
                <Skeleton width={60} height={12} />
                <Skeleton width={40} height={16} className="rounded-full" />
             </div>
             
             {/* Title */}
             <Skeleton height={20} className="w-full" />
             <Skeleton height={20} className="w-2/3" />
             
             {/* Rating & Price */}
             <div className="flex items-center justify-between pt-2">
                <Skeleton width={80} height={14} />
                <Skeleton width={60} height={20} />
             </div>
             
             {/* Add to cart button */}
             <div className="pt-2">
                <Skeleton height={40} className="w-full rounded-lg" />
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
