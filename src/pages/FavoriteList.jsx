import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Container from "../components/common/Container";
import favoriteApi from "../api/modules/favorite.api";
import mediaVideosApi from "../api/modules/media.videos";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";

const FavoriteItem = ({ media, onRemoved }) => {
  const handleTrailerPlay = async (e) => {
    const { response, err } = await mediaVideosApi.getVideos({ 
      mediaType: media.mediaType, 
      mediaId: media.mediaId 
    });

    if (err) {
      toast.error(err.message);
      return;
    }

    if (response?.results?.length > 0) {
      const trailer = response.results.find(video => video.type === "Trailer") || response.results[0];
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    } else {
      toast.info("No trailer available");
    }
  };

  const handleRemove = async () => {
    const { response, err } = await favoriteApi.remove({ favoriteId: media.id });

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Removed from favorites");
      onRemoved(media.id);
    }
  };

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Box sx={{ 
        position: "relative", 
        backgroundImage: `url(${tmdbConfigs.posterPath(media.mediaPoster)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "160%",
        "&:hover .media-info": { opacity: 1 },
        "&:hover .media-back-drop": { opacity: 1 }
      }}>
        <Box
          className="media-back-drop"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
          }}
        />
        <Box
          className="media-info"
          sx={{
            transition: "all 0.3s ease",
            opacity: { xs: 1, md: 0 },
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "max-content",
            boxSizing: "border-box",
            padding: { xs: "10px", md: "2rem 1rem" }
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{ width: "max-content" }}
                onClick={handleTrailerPlay}
              >
                watch trailer
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "max-content" }}
                onClick={handleRemove}
              >
                remove
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) setMedias(response);
    };

    if (user) getFavorites();
  }, [user, dispatch]);

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);
    setMedias(newMedias);
    dispatch(removeFavorite({ mediaId: id }));
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${medias.length})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {medias.map((media, index) => (
            <FavoriteItem key={index} media={media} onRemoved={onRemoved} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FavoriteList;