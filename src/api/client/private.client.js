import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_API_URL;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  const token = localStorage.getItem("actkn");
  
  if (!token) {
    return Promise.reject({
      message: "Token not found"
    });
  }

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    withCredentials: true
  };
});

privateClient.interceptors.response.use((response) => {
  return response;
}, (err) => {
  console.error("Private API Error:", {
    url: err.config?.url,
    status: err.response?.status,
    data: err.response?.data,
    error: err.message
  });
  
  if (err.response?.status === 401) {
    localStorage.removeItem("actkn");
  }
  
  throw err;
});

export default privateClient;