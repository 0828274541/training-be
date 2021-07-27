import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/admin">
        <Box display="flex">
          <Logo />
          <Typography
            align="center"
            variant="h2"
            lineHeight="2.2"
            marginLeft="10px"
          >
            Home page
          </Typography>
        </Box>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
