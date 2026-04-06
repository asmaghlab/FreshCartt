
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetailsTab ({ productDetails }) {
  return (
    <div id="product-description" className="text-gray-800">
      
      <h3 className="text-lg font-medium mb-4">Product Description</h3>

      <p className="text-gray-700 mb-4">
        {productDetails?.description ||
          "Fresh, organic strawberries packed with nutrients and flavor."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Benefits */}
        <div>
          <h4 className="font-medium mb-2">Benefits</h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Rich in vitamins C and K</li>
            <li>Good source of fiber and antioxidants</li>
            <li>Supports heart health</li>
            <li>Helps regulate blood sugar</li>
            <li>Promotes healthy skin</li>
          </ul>
        </div>

        {/* Product Details */}
        <div>
          <h4 className="font-medium mb-2">Product Details</h4>
          <div className="space-y-2 text-gray-700">

            <div className="flex">
              <span className="w-32 font-medium">Origin:</span>
              <span>{productDetails?.origin || "California, USA"}</span>
            </div>

            <div className="flex">
              <span className="w-32 font-medium">Cultivation:</span>
              <span>{productDetails?.cultivation || "Organic"}</span>
            </div>

            <div className="flex">
              <span className="w-32 font-medium">Storage:</span>
              <span>
                {productDetails?.storage || "Refrigerate upon arrival"}
              </span>
            </div>

            <div className="flex">
              <span className="w-32 font-medium">Shelf Life:</span>
              <span>
                {productDetails?.shelfLife || "5–7 days when refrigerated"}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* How to Store */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">How to Store</h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Refrigerate strawberries unwashed in their original container or in a
          paper towel-lined container. Wash just before eating. Remove damaged
          berries promptly to extend shelf life.
        </p>
      </div>

      {/* Certifications */}
      <div>
        <h4 className="font-medium mb-2">Certifications</h4>
        <div className="flex gap-3">
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
            USDA Organic
          </span>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
            Non-GMO
          </span>
        </div>
      </div>

    </div>
  );
};