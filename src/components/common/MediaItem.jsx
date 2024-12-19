import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { toast } from "react-toastify";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import favoriteUtils from "../../utils/favorite.utils";
import FavoriteIcon from "./FavoriteIcon";
import CircularRate from "./CircularRate";
import mediaVideosApi from "../../api/modules/media.videos";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!media) return;
    setIsFavorite(favoriteUtils.check({ 
      listFavorites: listFavorites || [], 
      mediaId: media.id 
    }));
  }, [listFavorites, media]);

  const handleTrailerPlay = async (e) => {
    e.preventDefault();
    const { response, err } = await mediaVideosApi.getVideos({ 
      mediaType, 
      mediaId: media.id 
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

  return (
    <Link to={mediaType ? routesGen.mediaDetail(mediaType, media.id) : routesGen.movieDetail(media.id)}>
      <Box sx={{
        ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)),
        paddingTop: "160%",
        "&:hover .media-info": { opacity: 1, bottom: 0 },
        "&:hover .media-back-drop": { opacity: 1 },
        color: "primary.contrastText",
        position: "relative"
      }}>
        {mediaType && (
          <>
            <FavoriteIcon
              media={media}
              mediaType={mediaType}
              isFavorite={isFavorite}
            />
            {media.vote_average !== undefined && <CircularRate value={media.vote_average} />}

            <Box className="media-back-drop" sx={{
              opacity: { xs: 1, md: 0 },
              transition: "all 0.3s ease",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
            }} />

            <Box className="media-info" sx={{
              transition: "all 0.3s ease",
              opacity: { xs: 1, md: 0 },
              position: "absolute",
              bottom: { xs: 0, md: "-20px" },
              width: "100%",
              height: "max-content",
              boxSizing: "border-box",
              padding: { xs: "10px", md: "2rem 1rem" }
            }}>
              <Stack spacing={{ xs: 1, md: 2 }}>
                <Typography>{media.title || media.name}</Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    sx={{
                      width: "max-content"
                    }}
                    onClick={handleTrailerPlay}
                  >
                    watch trailer
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Link>
  );
};

export default MediaItem;