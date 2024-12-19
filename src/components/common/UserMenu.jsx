import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";

const UserMenu = ({ onSignoutClick }) => {
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      <Button
        onClick={toggleMenu}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            {user.displayName.charAt(0).toUpperCase()}
          </Typography>
        </Box>
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { padding: 0 } }}
      >
        {menuConfigs.user.map((item, index) => (
          <MenuItem
            component={Link}
            to={item.path}
            key={index}
            onClick={() => setAnchorEl(null)}
          >
            {item.display}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onSignoutClick();
          }}
          sx={{ color: "error.main" }}
        >
          sign out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;