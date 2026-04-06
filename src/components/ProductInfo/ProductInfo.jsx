import { useContext, useState, useEffect } from "react";
import "react-image-gallery/styles/image-gallery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart as faSolidHeart,
  faMinus,
  faPlus,
  faShareNodes,
  faTruckFast,
  faRotateLeft,
  faStar,
  faStarHalfStroke,
  faShieldHalved,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart, faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../context/Cart.context";
import { wishlistContext } from "../../context/Wishlist.context";
import { useNavigate } from "react-router";

/* Rating Component */
const Rating = ({ ratingsAverage = 0, ratingsQuantity = 0 }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          if (ratingsAverage >= i) {
            return (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
            );
          } else if (ratingsAverage >= i - 0.5) {
            return (
              <FontAwesomeIcon key={i} icon={faStarHalfStroke} className="text-yellow-400 text-sm" />
            );
          } else {
            return (
              <FontAwesomeIcon key={i} icon={faRegStar} className="text-gray-300 text-sm" />
            );
          }
        })}
      </div>
      <span className="text-gray-400 text-sm font-medium">({ratingsQuantity} verified reviews)</span>
    </div>
  );
};

const ProductInfo = ({ productDetails }) => {
  const { wishlistInfo, handleAddProductToWishlist, handleRemoveProductFromWishlist, loadingActionId: wishlistLoadingId } = useContext(wishlistContext);
  const { handleAddingProductToCart, handleRemoveItemFromCart, cartInfo, updateItemQty, loadingAction, actionId } = useContext(cartContext);
  const navigate = useNavigate();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [localCount, setLocalCount] = useState(1);
  const [isBuying, setIsBuying] = useState(false);

  if (!productDetails) return null;

  const {
    _id,
    title,
    description,
    images,
    price,
    priceAfterDiscount,
    ratingsAverage,
    quantity,
    ratingsQuantity,
    category,
    brand,
  } = productDetails;

  const productId = _id || productDetails.id;
  const isLiked = wishlistInfo?.includes(productId);

  const cartItem = cartInfo?.data?.products?.find((item) => {
    const itemProductId = item.product?.id || item.product?._id || item.product;
    return itemProductId === productId;
  });

  const isAdded = !!cartItem;
  const currentQty = cartItem ? (cartItem.count || cartItem.quantity) : localCount;

  const discount = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const handleWishlistToggle = () => {
    if (isLiked) {
      handleRemoveProductFromWishlist(productId);
    } else {
      handleAddProductToWishlist(productId);
    }
  };

  const increment = () => {
    if (isAdded) {
      updateItemQty(productId, 1);
    } else {
      setLocalCount(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (isAdded) {
      if (currentQty > 1) updateItemQty(productId, -1);
    } else {
      setLocalCount(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleCartAction = () => {
    if (isAdded) {
      handleRemoveItemFromCart(productId);
    } else {
      handleAddingProductToCart({ id: productId });
    }
  };

  const handleBuyNow = async () => {
    if (isBuying) return;
    setIsBuying(true);
    try {
      if (!isAdded) {
        await handleAddingProductToCart({ id: productId });
      }
      navigate('/checkout');
    } catch (error) {
      console.error("Buy now failed");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumb style info */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 border-b border-gray-50 pb-4">
          <span className="hover:text-primary-600 cursor-pointer transition">Home</span>
          <span>/</span>
          <span className="hover:text-primary-600 cursor-pointer transition">{category?.name}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Media */}
          <div className="lg:col-span-5 w-full order-1">
            <div className="sticky top-28 bg-white">
              <ReactImageGallery
                showNav={true}
                showPlayButton={false}
                showFullscreenButton={true}
                thumbnailPosition="bottom"
                items={images?.map((img) => ({
                  original: img,
                  thumbnail: img,
                }))}
                additionalClass="modern-product-gallery"
                onSlide={(index) => setActiveImgIndex(index)}
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-7 w-full order-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                    {brand?.name || "Premium Quality"}
                  </span>
                  {quantity > 0 ? (
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Out of Stock</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoadingId === productId}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md ${isLiked ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                  >
                    <FontAwesomeIcon icon={isLiked ? faSolidHeart : faRegHeart} className={wishlistLoadingId === productId ? "animate-pulse" : ""} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-400 hover:text-primary-600">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {title}
              </h1>

              <Rating ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} />
            </div>

            {/* Pricing Section */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-primary-600">
                  EGP {priceAfterDiscount || price}
                </span>
                {priceAfterDiscount && (
                  <div className="flex flex-col mb-1">
                    <span className="text-gray-400 line-through text-sm font-medium">EGP {price}</span>
                    <span className="text-red-500 text-[10px] font-black uppercase bg-red-50 px-1 rounded w-fit">-{discount}% OFF</span>
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs font-medium">VAT included where applicable. Prices are per unit.</p>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">About this item</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6 pt-4">
              {quantity > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Quantity</span>
                  <div className="inline-flex items-center bg-white border-2 border-gray-100 rounded-xl p-1 gap-1">
                    <button
                      onClick={decrement}
                      disabled={currentQty <= 1 || (loadingAction === "update" && actionId === productId)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <FontAwesomeIcon icon={faMinus} size="sm" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900 text-sm">
                      {loadingAction === "update" && actionId === productId ? "..." : currentQty}
                    </span>
                    <button
                      onClick={increment}
                      disabled={loadingAction === "update" && actionId === productId}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 transition"
                    >
                      <FontAwesomeIcon icon={faPlus} size="sm" />
                    </button>
                  </div>
                  {quantity < 10 && (
                    <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Only {quantity} left!</span>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCartAction}
                  disabled={quantity === 0 || loadingAction === "add" || (loadingAction === "remove" && actionId === productId)}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1 active:scale-95 ${isAdded
                    ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FontAwesomeIcon icon={isAdded ? faBagShopping : faCartShopping} className={loadingAction ? "animate-spin" : ""} />
                  {isAdded ? "Remove from Cart" : "Add to Cart"}
                </button>
                <button
                  disabled={quantity === 0 || isBuying}
                  onClick={handleBuyNow}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 active:scale-95 whitespace-nowrap
        ${quantity === 0
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-green-50 text-green-600 border-green-200 hover:bg-green-600 hover:text-white"
                    }`}
                >
                  {quantity === 0 ? "Out of Stock" : isBuying ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>

            {/* Benefits Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-50/30 border border-primary-50 transition hover:bg-primary-50">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase">Fast Delivery</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">2-3 Business Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50/30 border border-green-50 transition hover:bg-green-50">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <FontAwesomeIcon icon={faRotateLeft} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase">Easy Returns</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">30-Day Money Back</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50/30 border border-purple-50 transition hover:bg-purple-50">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase">Total Security</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">100% Encrypted</p>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Category</span>
                <span className="text-sm text-gray-900 font-bold">{category?.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Brand</span>
                <span className="text-sm text-gray-900 font-bold">{brand?.name || "Original Store"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Reference SKU</span>
                <span className="text-sm text-gray-600 font-medium">#{productId?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tags</span>
                <div className="flex gap-1">
                  <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded text-gray-500">Fresh</span>
                  <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded text-gray-500">Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;