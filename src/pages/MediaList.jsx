import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

const MediaList = () => {
  const { pathname } = useLocation();
  const mediaType = pathname.includes("/movie") ? "movie" : "tv";
  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["Popular", "Top Rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) {
        toast.error(err.message);
        return;
      }

      if (response) {
        if (currPage !== 1) {
          setMedias(m => [...m, ...response.results]);
        } else {
          setMedias([...response.results]);
        }
      }
    };

    getMedias();
  }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

  useEffect(() => {
    setMedias([]);
    setCurrCategory(0);
    setCurrPage(1);
  }, [mediaType]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      <Box sx={{ 
        ...uiConfigs.style.mainContent,
        marginTop: { xs: "16px", md: "24px" },
        marginBottom: { xs: "16px", md: "24px" }
      }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography 
            variant="h5" 
            fontWeight="700"
            sx={{ textTransform: "capitalize" }}
          >
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack 
            direction="row" 
            spacing={2}
            sx={{
              padding: 2,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  minWidth: "120px",
                  color: currCategory === index ? "primary.contrastText" : "text.primary",
                  fontWeight: currCategory === index ? 700 : 500
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
        <LoadingButton
          sx={{ 
            marginTop: 8,
            padding: "12px",
            borderRadius: "8px"
          }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          Load More
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;