import React from 'react';
import Skeleton from './Skeleton';

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4">
          <Skeleton width={300} height={48} className="rounded-xl" />
          <Skeleton width={200} height={20} className="rounded-lg" />
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-3 hidden lg:block">
              <div className="bg-white rounded-3xl p-6 space-y-4 border border-gray-50 shadow-sm">
                 {[...Array(6)].map((_, i) => (
                   <Skeleton key={i} height={44} className="w-full rounded-xl" />
                 ))}
              </div>
           </div>
           
           <div className="lg:col-span-9">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-xl shadow-gray-200/30 space-y-10">
                 <div className="space-y-4">
                    <Skeleton height={32} width={240} className="rounded-lg" />
                    <Skeleton height={16} className="w-full" />
                    <Skeleton height={16} className="w-5/6" />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-3">
                         <Skeleton width={120} height={12} />
                         <Skeleton height={56} className="w-full rounded-2xl" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
