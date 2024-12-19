import tmdbClient from "../client/tmdb.client.js";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => 
    `${mediaType}/${mediaCategory}`,
  detail: ({ mediaType, mediaId }) => 
    `${mediaType}/${mediaId}`,
  search: ({ mediaType, query, page }) => 
    mediaType === "people" 
      ? `search/person`
      : `search/${mediaType}`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      console.log('Fetching media list:', { mediaType, mediaCategory, page });
      const response = await tmdbClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory }),
        {
          params: { page }
        }
      );
      
      if (response.data.results) {
        return { response: response.data };
      } else {
        console.error('No results in response:', response);
        return { err: { message: 'No results found' } };
      }
    } catch (err) { 
      console.error("Media API Error:", err);
      return { err }; 
    }
  },
  
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      console.log('Fetching media detail:', { mediaType, mediaId });
      const response = await tmdbClient.get(
        mediaEndpoints.detail({ mediaType, mediaId }),
        {
          params: {
            append_to_response: "videos,credits,similar,recommendations",
            language: 'en-US'
          }
        }
      );
      
      if (response.data) {
        console.log('Successfully fetched media detail');
        return { response: response.data };
      } else {
        console.error('No data in response:', response);
        return { err: { message: 'Media details not found' } };
      }
    } catch (err) { 
      console.error("Media Detail Error:", err.response || err);
      return { 
        err: { 
          message: err.response?.data?.status_message || err.message || 'An error occurred while fetching media details'
        } 
      }; 
    }
  },

  search: async ({ mediaType, query, page }) => {
    try {
      if (!query) return { response: { results: [] } };
      
      console.log('Searching media:', { mediaType, query, page });
      const response = await tmdbClient.get(
        mediaEndpoints.search({ mediaType }),
        {
          params: {
            query: query.trim(),
            page: page || 1,
            language: 'en-US',
            include_adult: false
          }
        }
      );
      
      if (response.data.results) {
        console.log(`Successfully found ${response.data.results.length} search results`);
        return { response: response.data };
      } else {
        console.error('No results in response:', response);
        return { err: { message: 'No search results found' } };
      }
    } catch (err) {
      console.error("Search Error:", err.response || err);
      return { 
        err: { 
          message: err.response?.data?.status_message || err.message || 'An error occurred while searching'
        } 
      };
    }
  }
};

export default mediaApi;