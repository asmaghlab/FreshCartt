const rawBaseURL = import.meta.env.VITE_BASE_URL || ""
const baseURL = rawBaseURL
  .toString()
  .trim()
  .replace(/^['"]+|['";]+$/g, "")
  .replace(/\/+$/, "")

export const API_CONFIG = {
  baseURL: `${baseURL}/api/${import.meta.env.VITE_API_VERSION}`,
};


