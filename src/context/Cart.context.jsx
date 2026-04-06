import { createContext, useEffect, useState } from "react";
import {
  addProductToCart,
  removeItemFromCart,
  updateItemQtyInCart,
  clearCartAPI,
} from "../services/cart-service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "./Auth.context";
import { useContext } from "react";
import { useCart } from "../Hooks/useCart";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  // Cart info initialized safely
  const [cartInfo, setCartInfo] = useState({ data: { products: [] }, numOfCartItems: 0 });
  const [loadingAction, setLoadingAction] = useState(null); // "add" | "remove" | "update" | null
  const [actionId, setActionId] = useState(null); // id of the item currently being updated or removed

  const { cartInfo: cartData, isLoading, isError, refetch: fetchCart } = useCart();

  useEffect(() => {
    if (cartData) {
      setCartInfo(cartData);
    } else if (!token) {
      setCartInfo({ data: { products: [] }, numOfCartItems: 0 });
    }
  }, [cartData, token]);

  // Add product
  async function handleAddingProductToCart({ id }) {
    try {
      setLoadingAction("add");

      const response = await addProductToCart({ id });
      if (response.success) {
        toast.success("Product added to cart", { position: "top-right", autoClose: 2000 });
        fetchCart();
      }
    } catch (error) {
      setIsError(true);
      toast.error("Failed to add product", { position: "top-right", autoClose: 2000 });
    } finally {
      setLoadingAction(null);
    }
  }

  // Remove product
  async function handleRemoveItemFromCart(id) {
    const result = await Swal.fire({
      title: "Remove item?",
      text: "This action cannot be undone.",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setLoadingAction("remove");
      setActionId(id);
      const response = await removeItemFromCart({ id });
      if (response.success) {
        toast.success("Item removed", { position: "top-right", autoClose: 2000 });
        fetchCart();
      }
    } catch (error) {
      setIsError(true);
      toast.error("Failed to remove item");
    } finally {
      setLoadingAction(null);
    }
  }

  // Update quantity
  async function updateItemQty(id, delta) {
    try {
     const toastId = toast.loading("Updating quantity...", { position: "top-right", autoClose: 1000, hideProgressBar: true });
      const products = cartInfo?.data?.products || []; // Fix accessing .data.products
      const item = products.find((p) => (p.product?._id || p.product?.id || p.product) === id);

      if (!item) {
        toast.error("Item not found in cart");
        return;
      }

      const currentQty = item.count !== undefined ? item.count : item.quantity;
      const newQty = currentQty + delta; // Route API mostly uses count instead of quantity, but we will leave newQty passing

      if (newQty <= 0) {
        return; // As requested, don't decrease below 1
      }

      setLoadingAction("update");
      setActionId(id);
      const response = await updateItemQtyInCart({ id, count: newQty }); // NOTE: The API expects count
      if (response.success) {
        toast.dismiss(toastId);
        toast.success("Quantity updated", { position: "top-right", autoClose: 1500 });
        fetchCart();
      }
    } catch (error) {
      setIsError(true);
      toast.error("Failed to update quantity");
    } finally {
      setLoadingAction(null);
      setActionId(null);
    }
  }

  // Clear Cart
  async function clearCart() {
    try {
      const response = await clearCartAPI();
      if (response.success) {
        setCartInfo({ data: { products: [] }, numOfCartItems: 0 });
      }
    } catch (error) {
       toast.error("Failed to clear cart");
    }
  }

  // Reset Cart State (Local only)
  function resetCart() {
    setCartInfo({ data: { products: [] }, numOfCartItems: 0 });
  }

  return (
    <cartContext.Provider
      value={{
        cartInfo,
        isLoading,
        isError,
        loadingAction,
        actionId,
        handleAddingProductToCart,
        fetchCart,
        handleRemoveItemFromCart,
        updateItemQty,
        clearCart,
        resetCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}