import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { wishlistContext } from "../../context/Wishlist.context";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import { HeartCrack } from "lucide-react";
import { Link } from "react-router";

export default function WishList() {
  const { wishlistDetails, isLoading } = useContext(wishlistContext);

  if (isLoading) return <ProductGridSkeleton count={8} />;

  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

          {wishlistDetails?.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 py-24 px-6 text-center border border-gray-50 transform hover:scale-[1.01] transition duration-500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 scale-150 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-inner group">
                  <HeartCrack size={64} className="transform group-hover:scale-110 transition duration-500" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Your wishlist feels a bit <span className="text-red-500 uppercase">empty</span></h2>
              <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                Save your favorite items here so you can easily find them later and keep an eye on price drops!
              </p>
              <Link 
                to="/featured-products" 
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-primary-600/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
              >
                Start Exploring
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {wishlistDetails?.map((product, index) => (
                <ProductCard key={product.id || product._id || index} productInfo={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
