import { useState } from "react";
import ProductInfoTab  from "./ProductInfoTab";
import ReviewsTab from "./ReviewsTab";
import ShippingTab from "./ShippingTab";



export default function ProductDetailsTabs({ProductDetails}) {

  const [activeTab, setActiveTab] = useState('details')

  function getActiveTab() {

    switch (activeTab) {
      case "details":
        return <ProductInfoTab ProductDetails={ProductDetails} />
      case "reviews":
        return <ReviewsTab ProductDetails={ProductDetails}/>
      case "shipping":
        return <ShippingTab ProductDetails={ProductDetails}/>
      default:
        return <ProductInfoTab ProductDetails={ProductDetails} />
    }

  }

  return (
    <>
      <section id="product-details-tabs" className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg overflow-hidden">

            <div className="border-b border-gray-200">
              <div className="flex">

                <button className={`${activeTab === "details" && "text-primary-600 border-b-2"} px-6 py-4 font-medium  border-primary-600`}
                  onClick={() => setActiveTab("details")}
                >
                  Product Details
                </button>

                <button className={`${activeTab === "reviews" && "text-primary-600 border-b-2"} px-6 py-4 font-medium  border-primary-600 `}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews (149)
                </button>

                <button className={`${activeTab === "shipping" && "text-primary-600 border-b-2"} px-6 py-4 font-medium  border-primary-600 `}
                  onClick={() => setActiveTab("shipping")}
                >
                  Shipping &amp; Returns
                </button>

              </div>
            </div>

            <div className="p-6">
              {/* Content here */}

              {getActiveTab()}

            </div>

          </div>
        </div>
      </section>
    </>
  );
}