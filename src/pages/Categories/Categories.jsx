import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { getAllCategories } from "../../services/Category-Service";
import CategoryGridSkeleton from "../../components/Skeleton/CategoryGridSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import { ChevronRight } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCats() {
      try {
        setIsLoading(true);
        // limit is set to 12
        const res = await getAllCategories(currentPage, 12);
        if (res.success && res.data?.data) {
          setCategories(res.data.data);
          if (res.data.metadata?.numberOfPages) {
            setTotalPages(res.data.metadata.numberOfPages);
          }
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) return <CategoryGridSkeleton count={12} />;

  return (
    <>
      <Helmet>
        <title>Categories - FreshCart</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="bg-primary-50 text-primary-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary-100">
              Department Express
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
              Shop by <span className="text-primary-600">Category</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
              Find exactly what you need by browsing our wide range of premium categories curated for your lifestyle.
            </p>
          </div>

          {error ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-red-500 font-bold mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="text-primary-600 hover:underline">Retry loading</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categories.map((cat) => (
                  <Link 
                    to={`/category/${cat._id}`} 
                    key={cat._id}
                    className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center"
                  >
                    <div className="w-full h-64 overflow-hidden relative bg-gray-50 p-6">
                      <div className="absolute inset-0 bg-primary-600/5 group-hover:bg-transparent transition duration-500"></div>
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-contain transform group-hover:scale-110 transition duration-700 ease-in-out drop-shadow-md"
                      />
                    </div>
                    
                    <div className="w-full p-8 pt-0 text-center relative mt-[-1rem]">
                       <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-50 group-hover:border-primary-100 transition duration-500">
                          <h3 className="text-xl font-black text-gray-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                            {cat.name}
                          </h3>
                          <div className="flex items-center justify-center gap-1 text-primary-600 font-bold text-sm tracking-tight group-hover:gap-2 transition-all">
                             Explore Store 
                             <ChevronRight size={16} strokeWidth={3} />
                          </div>
                       </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-20">
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
    </>
  );
}
