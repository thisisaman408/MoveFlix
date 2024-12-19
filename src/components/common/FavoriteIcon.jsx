import { useDispatch, useSelector } from "react-redux";
import { Favorite } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import favoriteApi from "../../api/modules/favorite.api";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const FavoriteIcon = ({ media, mediaType, isFavorite }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onFavoriteClick = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking favorite

    if (!user) {
      dispatch(setAuthModalOpen(true));
      return;
    }

    if (isFavorite) {
      const { response, err } = await favoriteApi.remove({ favoriteId: media.id });

      if (err) {
        toast.error(err.message);
      }

      if (response) {
        dispatch(removeFavorite({ mediaId: media.id }));
        toast.success("Removed from favorites");
      }
    } else {
      const body = {
        mediaId: media.id,
        mediaTitle: media.title || media.name,
        mediaType: mediaType,
        mediaPoster: media.poster_path,
        mediaRate: media.vote_average
      };

      const { response, err } = await favoriteApi.add(body);

      if (err) {
        toast.error(err.message);
      }

      if (response) {
        dispatch(addFavorite(response));
        toast.success("Added to favorites");
      }
    }
  };

  return (
    <IconButton
      size="large"
      sx={{
        position: "absolute",
        top: 2,
        right: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        zIndex: 2
      }}
      onClick={onFavoriteClick}
    >
      <Stack>
        <Favorite color={isFavorite ? "error" : "inherit"} />
      </Stack>
    </IconButton>
  );
};

export default FavoriteIcon; 