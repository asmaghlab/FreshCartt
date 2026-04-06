import { API_CONFIG } from '../config/index';
// import axios from 'axios';
import { apiClient } from './apiClient';

export async function sendDataToSignUp(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/signup`,
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.repeatPassword,
        phone: values.phone
      }
    };

    // Debug: confirm the URL and payload being sent.
    // This helps diagnose 404 / wrong-base-url scenarios.
    console.log("[auth-service] POST", options.url, options.data);

    const response = await apiClient.request(options);
    console.log(response.data);
    return response;

  } catch (error) {
    console.error("[auth-service] sendDataToSignUp error", {
      message: error.message,
      success: error.success,
      errorDetails: error.error?.response?.data,
    });
    throw error;
  }
}


export async function sendDataToLogin(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/signin`,
      data: {
        email: values.email,
        password: values.password,
      },
    };

    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    console.error("[auth-service] sendDataToLogin error", {
      message: error.message,
      success: error.success,
      errorDetails: error.error?.response?.data,
    });
    throw error;
  }
}




export async function verifyToken(token) {
  try {
    if (!token) throw new Error("No token provided");

    // This API (routemisr) doesn't have a dedicated verify-token endpoint.
    // We verify locally by decoding the payload.
    const decoded = JSON.parse(atob(token.split(".")[1]));
    
    // Check expiration (exp is in seconds)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error("Token expired");
    }

    return {
      success: true,
      data: {
        decoded: decoded
      }
    };
  } catch (error) {
    console.error("[auth-service] verifyToken error:", error.message);
    return {
      success: false,
      message: error.message
    };
  }
}

