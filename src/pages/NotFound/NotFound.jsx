import React from 'react'
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { Search, Home, ArrowLeft } from "lucide-react";
import notFoundImg from "../../assets/Images/not-found.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - FreshCart</title>
      </Helmet>
      
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl w-full text-center relative z-10 space-y-8 animate-fadeIn">
          {/* Main Illustration Area */}
          <div className="relative inline-block mb-10 w-full max-w-lg mx-auto">
             <img 
               src={notFoundImg} 
               alt="Page Not Found" 
               className="w-full h-auto drop-shadow-sm transform hover:scale-[1.02] transition-transform duration-500" 
             />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
              Page Not <span className="text-primary-600">Found</span>
            </h1>
            <p className="text-gray-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
              We couldn't find the page you were looking for. It might have been moved or doesn't exist anymore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary-600/20 hover:shadow-primary-600/40 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 hover:bg-gray-50 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          <div className="pt-12 text-gray-400 font-medium text-sm">
            Lost? Try searching for the product in our <Link to="/products" className="text-primary-600 hover:underline">catalog</Link>.
          </div>
        </div>
      </div>
    </>
  )
}
