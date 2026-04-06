import React from 'react';
import Skeleton from './Skeleton';

const AccountSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3 hidden lg:block">
             <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} height={40} className="w-full rounded-lg" />
                ))}
             </div>
          </div>

          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-12">
              <header>
                <Skeleton height={32} width={200} className="rounded-lg mb-2" />
              </header>

              <section>
                <Skeleton height={24} width={120} className="rounded-lg mb-6" />
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <Skeleton variant="circle" width={112} height={112} />
                  <div className="flex-1 space-y-3">
                    <Skeleton height={16} width={180} />
                    <div className="flex gap-3">
                      <Skeleton height={40} width={120} className="rounded-lg" />
                      <Skeleton height={40} width={120} className="rounded-lg" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <Skeleton height={24} width={160} className="rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton height={16} width={96} />
                      <Skeleton height={48} className="w-full rounded-xl" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Skeleton height={48} width={160} className="rounded-xl" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSkeleton;
