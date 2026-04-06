import { apiClient } from "./apiClient";

export async function getAllBrands(page = 1, limit = 15) {
  try {
    const response = await apiClient.request({
      url: `/brands?page=${page}&limit=${limit}`,
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

export async function getSpecificBrand(id) {
  try {
    const response = await apiClient.request({
      url: `/brands/${id}`,
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
