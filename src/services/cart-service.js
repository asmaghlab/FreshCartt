import { apiClient } from "./apiClient";

export async function addProductToCart({ id }) {
  try {
    const response = await apiClient.request({
      url: "/cart",
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

export async function getCartItems() {
  try {
    const response = await apiClient.request({
      url: "/cart",
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

export async function removeItemFromCart({ id }) {
  try {
    const response = await apiClient.request({
      url: `/cart/${id}`,
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

export async function updateItemQtyInCart({ id, count }) {
  try {
    const response = await apiClient.request({
      url: `/cart/${id}`,
      method: "PUT",
      data: {
        count,
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

export async function clearCartAPI() {
  try {
    const response = await apiClient.request({
      url: "/cart",
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