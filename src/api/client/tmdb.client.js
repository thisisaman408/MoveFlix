import axios from "axios";
import queryString from "query-string";

const baseURL = "https://api.themoviedb.org/3/";
const tmdbKey = process.env.REACT_APP_TMDB_KEY;
const tmdbToken = process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN;

const tmdbClient = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: params => queryString.stringify(params)
  }
});

tmdbClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tmdbToken}`
    },
    params: {
      ...config.params,
      api_key: tmdbKey,
      language: 'en-US'
    }
  };
});

tmdbClient.interceptors.response.use((response) => {
  return response;
}, (err) => {
  console.error("TMDB API Error:", {
    url: err.config?.url,
    status: err.response?.status,
    data: err.response?.data,
    error: err.message,
    params: err.config?.params
  });
  throw err;
});

export default tmdbClient; 