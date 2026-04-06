
import { apiClient } from './apiClient';

export async function getAllProducts({
  page,
  keyword,
  priceGreaterThan,
  priceLessThan,
  sortedBy,
  category,
  brand,
}={}) {
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (keyword) params.append("keyword", keyword);
    if (priceGreaterThan) params.append("price[gte]", priceGreaterThan);
    if (priceLessThan) params.append("price[lte]", priceLessThan);
    if (sortedBy) params.append("sort", sortedBy);
    if (category) params.append("category[in]", category);
    if (brand) params.append("brand", brand);

    const options = {
      url: `/products?${params.toString()}`,
      method: "GET",
    };

    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function getProductById({id}){

try {

const options={
  url:`/products/${id}`,
  method:"GET"
}


  const response =await apiClient.request(options)
  return response
} catch (error) {
  throw error
}



}