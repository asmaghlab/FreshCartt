import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function ShippingTab() {
  return (
    <div className="space-y-6 text-gray-700">

      {/* Shipping Info */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 hover:shadow-md transition">
        <div className="bg-green-100 p-3 rounded-xl">
          <Truck className="text-green-600" size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Free Shipping</h3>
          <p className="text-sm text-gray-500">
            Free shipping on all orders over $50. Delivery takes 2–5 business days.
          </p>
        </div>
      </div>

      {/* Return Policy */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 hover:shadow-md transition">
        <div className="bg-primary-100 p-3 rounded-xl">
          <RotateCcw className="text-primary-600" size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Easy Returns</h3>
          <p className="text-sm text-gray-500">
            30-day return policy. No questions asked.
          </p>
        </div>
      </div>

      {/* Secure Payment */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 hover:shadow-md transition">
        <div className="bg-purple-100 p-3 rounded-xl">
          <ShieldCheck className="text-purple-600" size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Secure Payment</h3>
          <p className="text-sm text-gray-500">
            Your payment information is processed securely.
          </p>
        </div>
      </div>

    </div>
  );
}