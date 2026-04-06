import { apiClient } from "./apiClient";

export async function addProductToWishlist({ id }) {
  try {
    const response = await apiClient.request({
      url: "/wishlist",
      method: "POST",
      data: {
        productId: id,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function getLoggedUserWishlist() {
  try {
    const response = await apiClient.request({
      url: "/wishlist",
      method: "GET",
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function removeProductFromWishlist({ id }) {
  try {
    const response = await apiClient.request({
      url: `/wishlist/${id}`,
      method: "DELETE",
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
