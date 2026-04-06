import React from 'react';
import Skeleton from './Skeleton';

const CheckoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Skeleton width={160} height={16} className="rounded-full" />
          </div>
          <div className="flex justify-center">
             <Skeleton width={200} height={48} className="rounded-xl" />
          </div>
          <div className="flex justify-center pt-4">
             <Skeleton width={300} height={20} className="rounded-lg" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Placeholder */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <Skeleton width={48} height={48} className="rounded-2xl" />
                  <Skeleton width={200} height={32} className="rounded-lg" />
                </div>
                <Skeleton width={80} height={32} className="rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] border border-gray-50 bg-white space-y-6">
                    <div className="flex items-center gap-5">
                      <Skeleton width={24} height={24} variant="circle" />
                      <div className="flex-1 space-y-2">
                         <Skeleton width={120} height={16} />
                         <Skeleton width={80} height={10} />
                      </div>
                      <Skeleton width={24} height={24} />
                    </div>
                    <Skeleton height={48} className="w-full rounded-2xl" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 space-y-10">
              <div className="flex items-center gap-4">
                <Skeleton width={48} height={48} className="rounded-2xl" />
                <Skeleton width={180} height={32} className="rounded-lg" />
              </div>
              
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="space-y-3">
                         <Skeleton width={120} height={12} />
                         <Skeleton height={64} className="w-full rounded-2xl" />
                      </div>
                    ))}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <Skeleton width={100} height={12} />
                       <Skeleton height={64} className="w-full rounded-2xl" />
                    </div>
                    <div className="flex items-center gap-4 px-6 h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/20">
                       <Skeleton width={32} height={32} className="rounded-xl" />
                       <Skeleton width={140} height={12} />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar Placeholder */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-10">
                <div className="flex items-center gap-3">
                   <Skeleton width={40} height={40} className="rounded-xl" />
                   <Skeleton width={140} height={24} className="rounded-lg" />
                </div>

                <div className="space-y-6">
                   {[...Array(2)].map((_, i) => (
                     <div key={i} className="flex gap-5 items-center">
                        <Skeleton width={88} height={88} className="rounded-3xl" />
                        <div className="flex-1 space-y-2">
                           <Skeleton height={14} className="w-full" />
                           <div className="flex gap-2">
                              <Skeleton width={60} height={20} className="rounded-md" />
                              <Skeleton width={80} height={16} />
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="space-y-5 pt-10 border-t border-gray-50">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="flex justify-between">
                        <Skeleton width={80} height={12} />
                        <Skeleton width={100} height={12} />
                     </div>
                   ))}
                   <div className="pt-8 border-t-4 border-dashed border-gray-50">
                      <div className="flex justify-between items-center">
                         <div className="space-y-2">
                            <Skeleton width={100} height={12} />
                            <Skeleton width={80} height={10} />
                         </div>
                         <Skeleton width={120} height={32} />
                      </div>
                   </div>
                </div>

                <div className="pt-4 space-y-4">
                   <Skeleton height={80} className="w-full rounded-[2rem]" />
                   <Skeleton height={56} className="w-full rounded-2xl" />
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-8">
                <div className="flex items-center justify-center gap-3">
                   <Skeleton width={140} height={16} className="rounded-full" />
                </div>
                <div className="flex justify-center gap-6">
                   {[...Array(5)].map((_, i) => (
                     <Skeleton key={i} width={32} height={24} />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
