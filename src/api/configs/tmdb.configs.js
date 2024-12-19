const mediaType = {
  movie: "movie",
  tv: "tv"
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated"
};

const backdropPath = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;
const readToken = process.env.TMDB_READ_ACCESS_TOKEN;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

const getAuthUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return {
    url: `${baseUrl}${endpoint}?${qs}`,
    headers: {
      'Authorization': `Bearer ${readToken}`,
      'accept': 'application/json'
    }
  };
};

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
  getUrl,
  getAuthUrl
};

export default tmdbConfigs;