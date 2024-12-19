const favoriteUtils = {
  check: ({ listFavorites, mediaId }) => {
    if (!listFavorites || !Array.isArray(listFavorites)) return false;
    return listFavorites.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined;
  }
};

export default favoriteUtils;