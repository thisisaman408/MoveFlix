import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Logo = () => {
  const theme = useTheme();

  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <LocalMoviesIcon sx={{ 
          color: theme.palette.primary.main,
          fontSize: '2.5rem',
          filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
        }} />
        <Typography 
          fontWeight="700" 
          fontSize="1.7rem"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Cinema<span style={{ color: theme.palette.secondary.main }}>Hub</span>
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;