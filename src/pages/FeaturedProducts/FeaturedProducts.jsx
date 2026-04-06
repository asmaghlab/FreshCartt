import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import { Search, Filter, X, Star } from "lucide-react";
import useCategories from '../../Hooks/useCategories';
import { useProducts } from '../../Hooks/useProducts';

export default function FeaturedProducts() {
  const { categories } = useCategories();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);

  // Params for useProducts
  const params = { 
    page: currentPage, 
    keyword,
    category: selectedCategory || undefined,
    // Note: If API doesn't support these exact keys, we'd need to map them
    priceGreaterThan: minPrice || undefined,
    priceLessThan: maxPrice || undefined,
  };

  const { products: allProducts, metadata, isLoading, isError } = useProducts(params);
  
  // Client-side rating filter if API doesn't support it directly
  const products = minRating > 0 
    ? allProducts?.filter(p => p.ratingsAverage >= minRating) || []
    : allProducts || [];

  const totalPages = metadata?.numberOfPages || 1;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchTerm);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setSearchTerm("");
    setKeyword("");
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Featured Products - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header & Mobile Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Featured Products</h1>
              <p className="text-gray-600 font-medium">Explore our collection with advanced filtering.</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 outline-none transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition" size={18} />
              </form>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 text-gray-700 font-bold text-sm shadow-sm transition hover:bg-gray-50"
              >
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Mobile Filter Overlay Backdrop */}
            {isFilterOpen && (
              <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[60] lg:hidden animate-fadeIn" onClick={() => setIsFilterOpen(false)}></div>
            )}

            {/* Sidebar Filters */}
            <aside className={`
              lg:w-72 flex-shrink-0 space-y-10 bg-white p-8 rounded-[2rem] border border-gray-50 lg:border-none shadow-xl shadow-gray-200/50 h-screen lg:h-fit sticky lg:top-28
              ${isFilterOpen ? 'fixed top-0 left-0 w-80 z-[70] animate-slideInLeft overflow-y-auto' : 'hidden lg:block'}
            `}>
              <div className="lg:hidden absolute top-6 right-6">
                 <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition">
                    <X size={20} />
                 </button>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Filters</h2>
                <button onClick={clearFilters} className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Clear All</button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-widest">Departments</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      value="" 
                      checked={selectedCategory === ""} 
                      onChange={() => {
                        setSelectedCategory("");
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-100 accent-primary-600"
                    />
                    <span className="text-xs font-bold text-gray-600 group-hover:text-primary-600 transition uppercase tracking-tight">All Categories</span>
                  </label>
                  {categories?.map((cat) => (
                    <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat._id} 
                        checked={selectedCategory === cat._id} 
                        onChange={() => {
                          setSelectedCategory(cat._id);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-100 accent-primary-600"
                      />
                      <span className="text-xs font-bold text-gray-600 group-hover:text-primary-600 transition truncate uppercase tracking-tight">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-widest">Price Point</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">$</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full bg-gray-50 border-none rounded-xl py-3 pl-6 pr-2 text-xs font-bold focus:ring-2 focus:ring-primary-600/20 outline-none"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">$</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full bg-gray-50 border-none rounded-xl py-3 pl-6 pr-2 text-xs font-bold focus:ring-2 focus:ring-primary-600/20 outline-none"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-widest">Minimum Rating</h3>
                <div className="space-y-3">
                  {[4, 3, 2].map((rating) => (
                    <button 
                      key={rating}
                      onClick={() => {
                        setMinRating(rating);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${minRating === rating ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      <div className={`flex ${minRating === rating ? 'text-white' : 'text-yellow-400'}`}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">& Up</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-grow">
              {isLoading ? (
                <ProductGridSkeleton count={8} />
              ) : products.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-6">
                    <Search className="text-gray-200" size={40} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">No Results Found</h3>
                  <p className="text-gray-400 font-medium mb-8">Try adjusting your filters to find what you're looking for.</p>
                  <button onClick={clearFilters} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition shadow-lg shadow-primary-600/30">Reset All Filters</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                      <ProductCard key={product._id || product.id} productInfo={product} />
                    ))}
                  </div>
                  
                  <div className="mt-20 flex justify-center">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
