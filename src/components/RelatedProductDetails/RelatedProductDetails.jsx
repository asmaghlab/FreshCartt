import React, { useState, useEffect, useRef } from 'react'
import { getAllProducts } from '../../services/products-servic'
import ProductGridSkeleton from '../Skeleton/ProductGridSkeleton'
import ProductCard from '../ProductCard/ProductCard'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import "swiper/css"
import "swiper/css/navigation"

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function RelatedProductDetails({ productDetails }) {
  const category = productDetails?.category

  const [relatedProducts, setRelatedProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  async function fetchRelatedProduct() {
    try {
      setIsLoading(true)
      const response = await getAllProducts({ category: category?._id })

      if (response.success) {
        setRelatedProduct(response.data.data)
      }
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (category?._id) {
      fetchRelatedProduct()
    }
  }, [category])

  if (isLoading) return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
      <ProductGridSkeleton count={6} />
    </div>
  );

  if (isError) {
    return <p className="text-center text-red-500">Something went wrong</p>
  }

  return (
    <section id="related-products" className="py-10">
      <div className="container mx-auto px-4 overflow-hidden">

        {/* Header + Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">You May Also Like</h2>


          <div className=" flex gap-2">
            <button
              ref={prevRef}
              className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white hover:shadow-lg shadow-sm transition-all duration-300"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
              ref={nextRef}
              className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white hover:shadow-lg shadow-sm transition-all duration-300"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          speed={600}
          spaceBetween={20}

          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}

          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
         
            1280: { slidesPerView: 6},
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-full h-full  ">
                <ProductCard productInfo={product} className="w-full h-full p-10"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}