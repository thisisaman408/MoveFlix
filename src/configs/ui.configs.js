const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(to top, rgba(10,25,41,1), rgba(10,25,41,0))"
      },
      light: {
        backgroundImage: "linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))"
      }
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(to right, rgba(10,25,41,1), rgba(10,25,41,0))"
      },
      light: {
        backgroundImage: "linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))"
      }
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines
    }),
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
      borderRadius: 2
    },
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
      borderRadius: "8px"
    })
  },
  size: {
    sidebarWith: "300px",
    contentMaxWidth: "1366px"
  }
};

export default uiConfigs;