import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const AutoSwiper = ({ children }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: {
          xs: "50%",
          sm: "35%",
          md: "25%",
          lg: "20.5%"
        }
      },
      "& .swiper-pagination-bullet": {
        backgroundColor: "text.primary"
      },
      "& .swiper-button-next, & .swiper-button-prev": {
        color: "text.primary",
        "&::after": {
          fontSize: { xs: "1rem", md: "2rem" }
        }
      }
    }}>
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;