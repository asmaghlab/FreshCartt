import { apiClient } from "./apiClient";

export async function getUserProfile() {
  try {
    const response = await apiClient.request({
      url: "/users/getMe",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfile(data) {
  try {
    const response = await apiClient.request({
      url: "/users/updateMe",
      method: "PUT",
      data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserPassword(data) {
  try {
    const response = await apiClient.request({
      url: "/users/changeMyPassword",
      method: "PUT",
      data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
