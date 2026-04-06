const rawBaseURL = import.meta.env.VITE_BASE_URL || "https://ecommerce.routemisr.com"
const baseURL = rawBaseURL
  .toString()
  .trim()
  .replace(/^['"]+|['";]+$/g, "")
  .replace(/\/+$/, "")

const apiVersion = import.meta.env.VITE_API_VERSION || "v1"

export const API_CONFIG = {
  baseURL: `${baseURL}/api/${apiVersion}`,
};


