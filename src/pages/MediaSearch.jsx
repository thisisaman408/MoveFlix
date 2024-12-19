import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    if (query.trim().length === 0) {
      setMedias([]);
      return;
    }

    setOnSearch(true);

    try {
      const { response, err } = await mediaApi.search({
        mediaType,
        query: query.trim(),
        page
      });

      if (err) {
        toast.error(err.message);
        setMedias([]);
      }

      if (response && response.results) {
        if (page > 1) {
          setMedias(m => [...m, ...response.results]);
        } else {
          setMedias([...response.results]);
        }
      }
    } catch (error) {
      toast.error("An error occurred while searching");
      setMedias([]);
    } finally {
      setOnSearch(false);
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      return;
    }

    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
      setPage(1);
      search();
    }, timeout);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [search, query]);

  const onCategoryChange = (selectedCategory) => {
    if (selectedCategory === mediaType) return;
    setMedias([]);
    setPage(1);
    setMediaType(selectedCategory);
    if (query.trim().length > 0) {
      search();
    }
  };

  const onLoadMore = () => setPage(page + 1);

  return (
    <>
      <Toolbar />
      <Box sx={{ 
        ...uiConfigs.style.mainContent,
        paddingTop: 2
      }}>
        <Stack spacing={3}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                key={index}
                size="large"
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  minWidth: "120px",
                  color: mediaType === item ? "primary.contrastText" : "text.primary",
                  fontWeight: mediaType === item ? 700 : 500
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item === "tv" ? "TV Shows" : item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
          </Stack>
          
          <TextField
            autoFocus
            color="success"
            placeholder="Search by title..."
            sx={{ 
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderWidth: 2
                },
                "&:hover fieldset": {
                  borderWidth: 2
                }
              }
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {medias.length > 0 && (
            <>
              <MediaGrid medias={medias} mediaType={mediaType} />
              <LoadingButton
                loading={onSearch}
                onClick={onLoadMore}
                variant="outlined"
                sx={{
                  marginTop: 4,
                  padding: "12px",
                  borderRadius: 2
                }}
                disabled={onSearch}
              >
                Load More
              </LoadingButton>
            </>
          )}

          {query.trim().length > 0 && medias.length === 0 && !onSearch && (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No results found for "{query}"
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;