import React from 'react';
import Skeleton from './Skeleton';

const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-3 hidden lg:block">
             <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} height={40} className="w-full rounded-lg" />
                ))}
             </div>
          </div>

          <div className="lg:col-span-9 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <Skeleton height={32} width={160} className="rounded-lg" />
              <div className="flex gap-3">
                <Skeleton height={40} width={140} className="rounded-lg" />
                <Skeleton height={40} width={280} className="rounded-lg" />
              </div>
            </header>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-6">
                  <div className="space-y-2">
                    <Skeleton height={24} width={200} className="rounded-md" />
                    <Skeleton height={16} width={120} className="rounded-md" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton height={24} width={80} className="rounded-full" />
                    <Skeleton height={24} width={80} className="rounded-full" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                  <div className="md:col-span-4 flex gap-2">
                    {[...Array(3)].map((_, idx) => (
                      <Skeleton key={idx} width={64} height={64} className="rounded-md" />
                    ))}
                    <div className="ml-2 space-y-1 justify-center flex flex-col">
                      <Skeleton height={12} width={48} />
                      <Skeleton height={20} width={80} />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Skeleton height={12} width={80} />
                    <Skeleton height={20} width={96} />
                  </div>
                  
                  <div className="md:col-span-3 space-y-2">
                    <Skeleton height={12} width={96} />
                    <Skeleton height={20} width={128} />
                    <Skeleton height={16} width={112} />
                  </div>
                  
                  <div className="md:col-span-3 space-y-2">
                    <Skeleton height={40} className="w-full rounded-md" />
                    <Skeleton height={40} className="w-full rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
