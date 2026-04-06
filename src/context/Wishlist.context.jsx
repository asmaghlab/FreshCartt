import { createContext, useEffect, useState, useContext } from "react";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../services/wishlist-service";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.context";
import { useWishlist } from "../Hooks/useWishlist";

export const wishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const [wishlistInfo, setWishlistInfo] = useState([]); // Array of product IDs for quick toggle checks
  const [loadingActionId, setLoadingActionId] = useState(null); // Which item is currently loading
  const { token } = useContext(AuthContext);

  const { wishlist: wishlistDetails, isLoading, refetch: fetchWishlist } = useWishlist();

  useEffect(() => {
    if (wishlistDetails) {
      const ids = wishlistDetails.map((item) => item._id || item.id);
      setWishlistInfo(ids);
    } else if (!token) {
      setWishlistInfo([]);
    }
  }, [wishlistDetails, token]);

  async function handleAddProductToWishlist(id) {
    try {
      setLoadingActionId(id);
      const response = await addProductToWishlist({ id });
      if (response.success) {
        toast.success(response.data.message || "Product added to wishlist", {
          position: "top-right",
          autoClose: 2000,
        });
        // The endpoint usually returns array of IDs in response.data.data
        if (response.data?.data && Array.isArray(response.data.data)) {
          setWishlistInfo(response.data.data);
          fetchWishlist(); // refresh full details
        } else {
           fetchWishlist();
        }
      }
    } catch (error) {
      toast.error("Failed to add to wishlist");
    } finally {
      setLoadingActionId(null);
    }
  }

  async function handleRemoveProductFromWishlist(id) {
    try {
      setLoadingActionId(id);
      const response = await removeProductFromWishlist({ id });
      if (response.success) {
        toast.success(response.data.message || "Product removed from wishlist", {
          position: "top-right",
          autoClose: 2000,
        });
        
        if (response.data?.data && Array.isArray(response.data.data)) {
          setWishlistInfo(response.data.data);
          setWishlistDetails(prev => prev.filter(p => (p._id || p.id) !== id));
        } else {
           fetchWishlist();
        }
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setLoadingActionId(null);
    }
  }

  return (
    <wishlistContext.Provider
      value={{
        wishlistInfo,
        wishlistDetails,
        isLoading,
        loadingActionId,
        fetchWishlist,
        handleAddProductToWishlist,
        handleRemoveProductFromWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
