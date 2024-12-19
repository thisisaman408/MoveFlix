import { Box, Modal, Paper, Fade, useTheme } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const actionState = {
  signin: "signin",
  signup: "signup"
};

const AuthModal = () => {
  const theme = useTheme();
  const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));
  const switchAuthState = (state) => setAction(state);

  return (
    <Modal 
      open={authModalOpen} 
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={authModalOpen}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none"
        }}>
          <Paper 
            elevation={8}
            sx={{ 
              padding: 4, 
              backgroundColor: "background.paper",
              borderRadius: 2,
              backgroundImage: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ 
              textAlign: "center", 
              marginBottom: "2rem",
              transform: 'scale(1.2)'
            }}>
              <Logo />
            </Box>

            {action === actionState.signin && (
              <SigninForm switchAuthState={() => switchAuthState(actionState.signup)} />
            )}

            {action === actionState.signup && (
              <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />
            )}
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;