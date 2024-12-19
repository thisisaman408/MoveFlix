import publicClient from "../client/tmdb.client";

const mediaVideosApi = {
  getVideos: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        `${mediaType}/${mediaId}/videos`, {
          params: {
            language: 'en-US'
          }
        }
      );
      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  getWatchProviders: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        `${mediaType}/${mediaId}/watch/providers`, {
          params: {
            language: 'en-US'
          }
        }
      );
      return { response: response.data };
    } catch (err) {
      return { err };
    }
  }
};

export default mediaVideosApi; 