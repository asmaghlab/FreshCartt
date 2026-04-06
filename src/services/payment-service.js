import { apiClient } from "./apiClient";

export async function createCashOrder({ cartId, shippingAddress }) {
  try {
    const response = await apiClient.request({
      url: `/orders/${cartId}`,
      method: "POST",
      data: {
        shippingAddress
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createOnlineOrder({ cartId, shippingAddress }) {
  try {
    const response = await apiClient.request({
      url: `/orders/checkout-session/${cartId}`,
      method: "POST",
      params: {
        url: window.location.origin
      },
      data: {
        shippingAddress
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserOrders(userId) {
  try {
    const response = await apiClient.request({
      url: `/orders/user/${userId}`,
      method: "GET"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}