import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import AutoSwiper from "./AutoSwiper";
import mediaVideosApi from "../../api/modules/media.videos";
import CircularRate from "./CircularRate";
import FavoriteIcon from "./FavoriteIcon";
import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  const { listFavorites } = useSelector((state) => state.user);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (err) toast.error(err.message);
      if (response) setMedias(response.results);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  const handleTrailerPlay = async (media) => {
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
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <Link to={routesGen.mediaDetail(mediaType, media.id)}>
            <Box sx={{
              paddingTop: "160%",
              color: "primary.contrastText",
              ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)),
              position: "relative",
              "&:hover .media-info": { opacity: 1, bottom: 0 },
              "&:hover .media-back-drop": { opacity: 1 }
            }}>
              {/* favorite icon */}
              <FavoriteIcon
                media={media}
                mediaType={mediaType}
                isFavorite={favoriteUtils.check({ listFavorites, mediaId: media.id })}
              />

              {/* rating */}
              {media.vote_average !== undefined && (
                <CircularRate value={media.vote_average} />
              )}

              {/* backdrop */}
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

              {/* media info */}
              <Box
                className="media-info"
                sx={{
                  transition: "all 0.3s ease",
                  opacity: { xs: 1, md: 0 },
                  position: "absolute",
                  bottom: { xs: 0, md: "-20px" },
                  width: "100%",
                  height: "max-content",
                  boxSizing: "border-box",
                  padding: { xs: "10px", md: "2rem 1rem" }
                }}
              >
                <Stack spacing={{ xs: 1, md: 2 }}>
                  <Typography 
                    variant="h6" 
                    fontSize={{ xs: "1rem", md: "1.5rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                      cursor: "pointer"
                    }}
                  >
                    {media.title || media.name}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{ width: "max-content" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTrailerPlay(media);
                      }}
                    >
                      watch trailer
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;