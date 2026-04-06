import { Helmet } from "react-helmet";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Star } from "lucide-react";
import { useProducts } from '../../Hooks/useProducts';

export default function Offers() {
  const { products, isLoading, isError } = useProducts();
  
  // High rated products as "offers"
  const offers = products?.filter(p => p.ratingsAverage >= 4.8) || [];

  return (
    <>
      <Helmet>
        <title>Special Offers - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="bg-primary-600 rounded-[2.5rem] p-8 md:p-16 mb-16 relative overflow-hidden shadow-2xl shadow-primary-200">
             <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
             
             <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left mx-auto md:mx-0">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md">
                 <Star size={14} className="fill-white" />
                 Top Rated Picks
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                 SPECIAL <span className="opacity-70">OFFERS</span>
               </h1>
               <p className="text-primary-50 text-lg font-medium leading-relaxed">
                 Experience the best of FreshCart with our most loved products, handpicked just for you based on thousands of reviews.
               </p>
             </div>
             
             <div className="hidden lg:block absolute right-0 top-0 h-full w-2/5 z-0">
                 <img 
                   src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                   alt="Special Offers" 
                   className="h-full w-full object-cover opacity-20 transform translate-x-12"
                 />
              </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={10} />
          ) : offers.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-medium">New offers are being prepared. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {offers.map((product) => (
                <ProductCard key={product._id || product.id} productInfo={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
