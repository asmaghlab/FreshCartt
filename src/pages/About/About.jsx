import React from "react";
import { Helmet } from "react-helmet";
import { ShoppingBag, Users, Globe, Target, ShieldCheck, Zap, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "50k+", icon: <Users size={24} /> },
    { label: "Global Stores", value: "120+", icon: <Globe size={24} /> },
    { label: "Products Sold", value: "1.2M", icon: <ShoppingBag size={24} /> },
    { label: "Sustainability", value: "100%", icon: <Heart size={24} /> },
  ];

  const values = [
    { title: "Quality Guarantee", desc: "We source only the freshest and highest-quality products from trusted local and global suppliers.", icon: <ShieldCheck size={32} className="text-primary-600" /> },
    { title: "Fastest Delivery", desc: "Our optimized logistics network ensures your groceries and essentials arrive in record time.", icon: <Zap size={32} className="text-primary-600" /> },
    { title: "Customer Centric", desc: "Your satisfaction is our priority. Our 24/7 support team is always here to help you.", icon: <Users size={32} className="text-primary-600" /> },
    { title: "Mission Driven", desc: "We are committed to making fresh, healthy food accessible to everyone, everywhere.", icon: <Target size={32} className="text-primary-600" /> },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - FreshCart</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden w-full -mx-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 hover:scale-100"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600')" }}
        >
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Our Story <span className="text-primary-400">Fresh</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed drop-shadow-lg">
            Since 2023, we've been on a mission to revolutionize how people shop for essentials. From farm to table, we ensure every bite is fresh and every delivery is a delight.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group p-4 transform hover:-translate-y-1 transition duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 mb-4 group-hover:scale-110 transition duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Empowering Families Through <span className="text-primary-600">Pure Freshness</span>.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At FreshCart, we believe that high-quality, fresh food should be accessible to everyone. What started as a small local initiative has grown into a global marketplace for fashion, electronics, and groceries.
              </p>
              <div className="space-y-4">
                 <p className="font-bold text-gray-900 flex items-center gap-3">
                   <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
                   Locally Sourced Organic Produce
                 </p>
                 <p className="font-bold text-gray-900 flex items-center gap-3">
                   <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
                   Fast and Reliable Logistics
                 </p>
                 <p className="font-bold text-gray-900 flex items-center gap-3">
                   <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
                   Dedicated 24/7 Customer Support
                 </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-200 rounded-[2rem] transform rotate-3 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=1200" 
                alt="About us" 
                className="relative z-10 w-full rounded-[2rem] shadow-2xl transform hover:scale-[1.02] transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-gray-500 font-medium">We build relationships based on trust, quality, and community. Here is how we make a difference.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary-600 transition duration-300 text-primary-600 group-hover:text-white">
                  {React.cloneElement(value.icon, { 
                    className: "transition-colors duration-300",
                    size: 32
                  })}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
