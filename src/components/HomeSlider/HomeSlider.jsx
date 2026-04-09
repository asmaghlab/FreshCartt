import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function HomeSlider() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
      title: "Fresh Farm Produce\nDelivered to your Door",
      subtitle: "Get 20% off for your first order of organic vegetables",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600",
      title: "Daily Baked Goods\nWarm and Delicious",
      subtitle: "Discover our new bakery section with fresh croissants",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1600",
      title: "Everything You Need\nIn One Place",
      subtitle: "Explore our wide range of groceries and electronics",
    },
    
  
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=1600",
      title: "Shop Smarter\nSave Big Every Day",
      subtitle: "Check out our exclusive weekly deals and offers",
    }
  ];

  return (
    <div className="mb-0 mx-0">
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="overflow-hidden shadow-sm"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="text-white py-16 md:py-32 bg-gray-900/60 md:bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent">
                <div className="container mx-auto px-6 md:px-12 relative z-10 w-full md:w-2/3 lg:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight whitespace-pre-line drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/categories" className="btn bg-primary-600 hover:bg-primary-700 text-white border-2 border-primary-600 hover:border-primary-700 transition px-6 py-2.5 rounded-lg font-medium shadow-md">
                      Shop Now
                    </Link>
                    <Link to="/deals" className="btn bg-white/10 hover:bg-white hover:text-gray-900 border-2 border-white text-white backdrop-blur-sm transition px-6 py-2.5 rounded-lg font-medium">
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
