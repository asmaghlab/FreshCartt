import React from 'react';
import Skeleton from './Skeleton';

const CategoryGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-4">
          {/* Circle category icon */}
          <Skeleton variant="circle" width={120} height={120} className="shadow-sm" />
          {/* Title */}
          <Skeleton width={80} height={16} className="rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CategoryGridSkeleton;
