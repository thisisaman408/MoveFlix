import { Paper, Stack, Button, Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper 
        square={true} 
        sx={{ 
          backgroundImage: "unset", 
          padding: "2rem",
          borderRadius: { xs: 0, md: 2 },
          mt: 4
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ height: "max-content" }}
        >
          <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
            <Logo />
            <Typography variant="body2" color="text.secondary">
              Your ultimate destination for movies and TV shows
            </Typography>
          </Stack>

          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ 
                  color: "text.primary",
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton color="primary" component="a" href="#" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="primary" component="a" href="#" target="_blank">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="primary" component="a" href="#" target="_blank">
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;