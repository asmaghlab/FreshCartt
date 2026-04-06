import React from 'react';
import Skeleton from './Skeleton';

const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-12 items-start">
          
          {/* Cart Items Placeholder */}
          <div className="flex-1 w-full space-y-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
              <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-8">
                <div className="space-y-2">
                  <Skeleton height={40} width={240} className="rounded-lg" />
                  <Skeleton height={16} width={120} className="rounded-md" />
                </div>
                <div className="flex gap-2">
                   <Skeleton width={40} height={40} className="rounded-xl" />
                   <Skeleton width={40} height={40} className="rounded-xl" />
                </div>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-sm">
                    <Skeleton width={112} height={112} className="rounded-xl shrink-0" />
                    <div className="flex-1 space-y-4 w-full">
                       <div className="flex justify-between">
                          <div className="space-y-2 flex-1">
                             <Skeleton height={20} className="w-2/3" />
                             <Skeleton height={14} className="w-1/3" />
                          </div>
                          <Skeleton width={24} height={24} />
                       </div>
                       <div className="flex justify-between items-center pt-2">
                          <Skeleton width={100} height={24} />
                          <Skeleton width={120} height={40} className="rounded-lg" />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Placeholder */}
          <div className="w-full xl:w-[400px] space-y-6">
             <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-10 border border-gray-50 space-y-8">
                <Skeleton height={24} width={160} className="rounded-md" />
                
                <div className="space-y-5">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="flex justify-between">
                        <Skeleton width={80} height={14} />
                        <Skeleton width={100} height={14} />
                     </div>
                   ))}
                   <div className="pt-6 border-t-2 border-dashed border-gray-100">
                      <div className="flex justify-between items-center">
                         <Skeleton width={100} height={20} />
                         <Skeleton width={140} height={32} />
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <Skeleton height={64} className="w-full rounded-2xl" />
                   <Skeleton height={56} className="w-full rounded-2xl" />
                </div>
             </div>

             <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                     <Skeleton width={48} height={48} className="rounded-xl" />
                     <div className="space-y-2">
                        <Skeleton width={100} height={16} />
                        <Skeleton width={140} height={12} />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
