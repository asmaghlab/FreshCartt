import { useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom"; // fixed import
import ProductGridSkeleton from "../Skeleton/ProductGridSkeleton";
import { useCountdown } from "../../utils/counterdown";
import { useProducts } from "../../Hooks/useProducts";

export default function HomeDeals() {
  const { products, isLoading, isError  } = useProducts();
  const { hours, minutes, seconds } = useCountdown();

  const formatTime = (num) => String(num).padStart(2, "0");

  // Loading state
  if (isLoading || !products) return <ProductGridSkeleton count={5} />;

  // Error state
  if (isError) return <p className="text-red-500">Failed to load deals.</p>;

  // Safe filtering
  const deals = products
    ?.filter((product) => product.priceAfterDiscount)
    .slice(0, 5) || [];

  return (
    <section className="p-6 container">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Deals of the Day
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>Offers end in:</span>

            {[hours, minutes, seconds].map((t, i) => (
              <span key={`timer-${i}`} className="flex items-center gap-1">
                <span
                  className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-mono"
                  aria-label={
                    i === 0
                      ? `Hours: ${formatTime(t)}`
                      : i === 1
                      ? `Minutes: ${formatTime(t)}`
                      : `Seconds: ${formatTime(t)}`
                  }
                >
                  {formatTime(t)}
                </span>
                {i < 2 && <span>:</span>}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/deals"
          className="text-primary-600 text-sm font-medium hover:underline"
        >
          View All Deals
        </Link>
      </div>

      {/* Products */}
      {deals.length === 0 ? (
        <p className="text-gray-500">No deals available today.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {deals.map((product) => (
            <ProductCard key={product.id} productInfo={product} />
          ))}
        </div>
      )}
    </section>
  );
}