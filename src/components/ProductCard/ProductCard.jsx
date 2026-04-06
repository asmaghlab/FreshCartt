import { Heart, RefreshCcw, Eye, Plus, ShoppingCart } from "lucide-react";
import { calcDiscount } from "../../utils/discount.utils";
import Rating from "../Rating/Rating";
import { Link, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { cartContext } from "../../context/Cart.context";
import { wishlistContext } from "../../context/Wishlist.context";

export default function ProductCard({ productInfo }) {
  const { imageCover, title, id, price, priceAfterDiscount, ratingsAverage, ratingsQuantity, category } = productInfo;
  const { handleAddingProductToCart, cartInfo } = useContext(cartContext);
  const { wishlistInfo, handleAddProductToWishlist, handleRemoveProductFromWishlist, loadingActionId } = useContext(wishlistContext);
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlistInfo?.includes(id);

  // sync state with cartInfo
  useEffect(() => {
    const inCart = cartInfo?.data?.products?.some(p => p.product?.id === id);
    setAdded(inCart);
  }, [cartInfo, id]);

  const handleAddClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || added) return;

    setIsAdding(true);
    setAdded(true); // optimistic update

    try {
      await handleAddingProductToCart({ id });
    } catch (error) {
      setAdded(false); 
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBuying) return;

    setIsBuying(true);
    try {
      // If not in cart, add it first
      if (!added) {
        await handleAddingProductToCart({ id });
      }
      navigate('/checkout');
    } catch (error) {
      console.error("Buy Now failed");
    } finally {
      setIsBuying(false);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingActionId === id) return;

    if (isWishlisted) {
      await handleRemoveProductFromWishlist(id);
    } else {
      await handleAddProductToWishlist(id);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
      {/* Discount Badge */}
      {priceAfterDiscount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-primary-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm uppercase tracking-wider">
          {calcDiscount({ price, priceAfterDiscount })}% OFF
        </span>
      )}

      {/* Floating Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10">
        <button 
          onClick={toggleWishlist} 
          disabled={loadingActionId === id}
          className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md border border-gray-50 transition-all duration-300 ${isWishlisted ? "bg-red-50 text-red-500 border-red-100" : "bg-white text-gray-400 hover:text-red-500"}`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isWishlisted ? "fill-red-500" : ""}`} 
          />
        </button>
        <Link 
          to={`/product/${id}`}
          className="w-9 h-9 flex items-center justify-center bg-white text-gray-400 hover:text-primary-600 rounded-xl shadow-md border border-gray-50 transition-all duration-300"
          title="Quick View"
        >
          <Eye size={18} />
        </Link>
        <button className="w-9 h-9 flex items-center justify-center bg-white text-gray-400 hover:text-primary-600 rounded-xl shadow-md border border-gray-50 transition-all duration-300" title="Compare">
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden rounded-xl mb-4 group-hover:bg-gray-50 transition duration-500">
        <div className="h-48 flex items-center justify-center p-4">
          <img 
            src={imageCover} 
            alt={title} 
            className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition duration-700 ease-in-out" 
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{category?.name}</span>
          <div className="flex items-center gap-1 text-yellow-400">
             <Rating rating={ratingsAverage} />
              {ratingsAverage > 0 && <span className="text-[10px] font-bold text-gray-400">{ratingsAverage}</span>}
          </div>
        </div>

        <Link to={`/product/${id}`} className="block">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-green-600 transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-primary-600 font-black text-base leading-tight">{priceAfterDiscount > 0 ? priceAfterDiscount : price} EGP</span>
            {priceAfterDiscount > 0 && (
              <span className="text-gray-400 line-through text-xs font-semibold leading-tight">{price} EGP</span>
            )}
          </div>
          
          <div className="flex gap-2">
             <button
              onClick={handleBuyNow}
              disabled={isBuying}
              className="px-3 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              {isBuying ? "..." : "Buy"}
            </button>

            <button
              disabled={added || isAdding}
              onClick={handleAddClick}
              className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-sm transition-all duration-300 transform active:scale-90
                ${added || isAdding 
                  ? "bg-green-50 text-green-600 border border-green-100 cursor-default" 
                  : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30"}
              `}
              title={added ? "Already in Cart" : "Add to Cart"}
            >
              {isAdding ? (
                <RefreshCcw size={18} className="animate-spin" />
              ) : added ? (
                <ShoppingCart size={18} />
              ) : (
                <Plus size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}