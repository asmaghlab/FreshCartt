import { Helmet } from "react-helmet";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import { Tag, Percent } from "lucide-react";
import { useProducts } from '../../Hooks/useProducts';

export default function Deals() {
  const { products, isLoading, isError } = useProducts({ limit: 40 });
  
  // Filter products with priceAfterDiscount to show as deals
  const deals = products?.filter(p => p.priceAfterDiscount) || [];

  return (
    <>
      <Helmet>
        <title>Flash Deals - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="bg-primary-600 rounded-[2.5rem] p-8 md:p-16 mb-16 relative overflow-hidden shadow-2xl shadow-primary-200">
             <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left mx-auto md:mx-0">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md">
                 <Percent size={14} />
                 Limited Time Offer
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                 FLASH <span className="opacity-70">DEALS</span>
               </h1>
               <p className="text-primary-50 text-lg font-medium leading-relaxed">
                 Up to 70% off on your favorite products. Don't wait, these prices are only available for a few hours!
               </p>
             </div>
             
             <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 transform scale-150 rotate-12 opacity-20">
                <Tag size={200} className="text-white" />
             </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={10} />
          ) : deals.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-medium">No active deals right now. Check back tomorrow!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {deals.map((product) => (
                <ProductCard key={product._id || product.id} productInfo={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
