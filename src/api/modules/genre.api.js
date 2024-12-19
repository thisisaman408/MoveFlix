import tmdbClient from "../client/tmdb.client.js";

const genreEndpoints = {
  list: ({ mediaType }) => `genre/${mediaType}/list`
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      console.log('Fetching genres for:', mediaType);
      const response = await tmdbClient.get(
        genreEndpoints.list({ mediaType })
      );
      
      if (response.data.genres) {
        console.log(`Successfully fetched ${response.data.genres.length} genres`);
        return { response: response.data };
      } else {
        console.error('No genres in response:', response);
        return { err: { message: 'No genres found' } };
      }
    } catch (err) {
      console.error("Genre API Error:", err.response || err);
      return { 
        err: { 
          message: err.response?.data?.status_message || err.message || 'An error occurred while fetching genres'
        } 
      };
    }
  }
};

export default genreApi;