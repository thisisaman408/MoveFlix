import axios from "axios";
import queryString from "query-string";

// Update baseURL to use environment variable
const baseURL = process.env.REACT_APP_API_URL;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    withCredentials: true
  };
});

publicClient.interceptors.response.use((response) => {
  return response;
}, (err) => {
  console.error("API Error:", {
    url: err.config?.url,
    status: err.response?.status,
    data: err.response?.data,
    error: err.message
  });
  throw err;
});

export default publicClient;