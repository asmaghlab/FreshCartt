import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import Rating from "../../components/Rating/Rating";
import { cartContext } from '../../context/Cart.context';

const CartItems = React.memo(({ products, updateQty }) => {
  const navigate = useNavigate();
  const { handleRemoveItemFromCart, updateItemQty, loadingAction, actionId } = useContext(cartContext);

  const { count, price } = products;
  const productData = products.product || products;
  const { id, title, ratingsAverage, category } = productData || {};
  
  const isUpdating = loadingAction === "update" && actionId === id;
  const imageCover = productData?.imageCover || productData?.image || productData?.images?.[0] || "https://via.placeholder.com/80?text=No+Image";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-200 gap-3">

      {/* LEFT (Image + Info) */}
      <div 
        onClick={() => navigate(`/product/${id}`)}
        className="flex items-start sm:items-center gap-3 flex-1 min-w-0 cursor-pointer hover:opacity-75 transition-opacity"
      >
        <img
          src={imageCover}
          alt={title}
          className="w-20 h-20 sm:w-16 sm:h-16 object-contain rounded-md shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <h3 className="text-gray-900 text-sm font-medium truncate">{title}</h3>
          {category?.name && <p className="text-gray-500 text-xs truncate">{category.name}</p>}
          <div className="flex items-center gap-1 mt-1">
            <Rating rating={ratingsAverage} size={16} />
            <span className="text-[10px] text-gray-400">{ratingsAverage?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* RIGHT (Actions) */}
      <div className="flex items-center sm:justify-between justify-end gap-3 w-full sm:w-auto">

        {/* Quantity */}
        {/* Quantity */}
        <div className={`flex items-center border border-gray-300 rounded overflow-hidden transition-opacity ${isUpdating ? "opacity-75" : ""}`}>
          <button
            disabled={isUpdating || count <= 1}
            onClick={() => updateItemQty(id, -1)}
            className={`w-8 h-8 flex items-center justify-center transition-colors
              ${isUpdating || count <= 1
                ? "bg-white text-gray-300 cursor-not-allowed" 
                : "bg-white hover:bg-gray-100 text-gray-700 active:bg-gray-200"}`
            }
          >
            <Minus size={14} />
          </button>

          <span className="w-8 text-center text-sm font-medium flex items-center justify-center bg-white text-gray-800">
            {count}
          </span>

          <button
            disabled={isUpdating}
            onClick={() => updateItemQty(id, 1)}
            className={`w-8 h-8 flex items-center justify-center transition-colors
              ${isUpdating 
                ? "bg-white text-gray-300 cursor-not-allowed" 
                : "bg-white hover:bg-gray-100 text-gray-700 active:bg-gray-200"}`
            }
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Price */}
        <p className="text-gray-900 font-semibold text-sm whitespace-nowrap">{price.toLocaleString()} EGP</p>

        {/* Remove */}
        <button
          onClick={() => handleRemoveItemFromCart(id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
});

export default CartItems;