import { apiClient } from "./apiClient"

export async function getAllCategories(page = 1, limit = 10) {
  try {
    const options = {
      url: `/categories?page=${page}&limit=${limit}`,
      method: "GET"
    }

    const response = await apiClient.request(options)
    return response
  } catch (error) {
    throw error
  }
}

export async function getSpecificCategory(id) {
  try {
    const options = {
      url: `/categories/${id}`,
      method: "GET"
    }
    const response = await apiClient.request(options)
    return response
  } catch (error) {
    throw error
  }
}

export async function getSubCategoriesOnCategory(categoryId) {
  try {
    const options = {
      url: `/categories/${categoryId}/subcategories`,
      method: "GET"
    }

    const response = await apiClient.request(options)
    return response
  } catch (error) {
    throw error
  }
}