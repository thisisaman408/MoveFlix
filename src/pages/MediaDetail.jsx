import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import HeroSlide from "../components/common/HeroSlide";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const dispatch = useDispatch();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
      }

      if (err) {
        toast.error(err.message);
      }
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory="popular" />
      
      {media && (
        <Box sx={{
          ...uiConfigs.style.mainContent
        }}>
          <Stack spacing={4}>
            <Typography variant="h4" fontWeight="700">
              {media.title || media.name}
            </Typography>

            <Stack direction="row" spacing={1}>
              {media.genres?.map((genre, index) => (
                <Chip
                  key={index}
                  label={genre.name}
                  variant="filled"
                  color="primary"
                />
              ))}
            </Stack>

            <Typography variant="body1">
              {media.overview}
            </Typography>

            {media.backdrop_path && (
              <Box sx={{
                position: "relative",
                paddingTop: "56.25%", // 16:9 aspect ratio
                backgroundImage: `url(${tmdbConfigs.backdropPath(media.backdrop_path)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px"
              }} />
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default MediaDetail;