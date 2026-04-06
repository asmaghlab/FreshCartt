import React from "react";

export default function Newsletter() {
  return (
    <div className="bg-primary-100/50  px-16 py-25">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Subscribe to our Newsletter
        </h2>
        <p className="mt-3 text-gray-500">
          Stay updated with our latest offers, recipes, and health tips.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}