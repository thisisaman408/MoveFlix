import { createTheme } from "@mui/material/styles";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = mode === themeModes.dark ? {
      primary: {
        main: "#1976d2",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#f50057",
        contrastText: "#ffffff"
      },
      background: {
        default: "#0a1929",
        paper: "#1a2027"
      }
    } : {
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0"
      },
      secondary: {
        main: "#f50057",
        light: "#ff4081",
        dark: "#c51162"
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff"
      }
    };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600
            }
          },
          defaultProps: { 
            disableElevation: true 
          }
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '12px'
            }
          }
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: '12px'
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out'
              }
            }
          }
        }
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontWeight: 700
        },
        h2: {
          fontWeight: 700
        },
        h3: {
          fontWeight: 700
        },
        h4: {
          fontWeight: 600
        },
        h5: {
          fontWeight: 600
        },
        h6: {
          fontWeight: 600
        }
      }
    });
  }
};

export default themeConfigs;