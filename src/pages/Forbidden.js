import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button
} from '@material-ui/core';

const Forbidden = () => (
  <>
    <Helmet>
      <title>403 | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          403: You don&apos;t have permission
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/webmail-error-403.png"
            style={{
              marginTop: 50,
              marginBot: 50,
              display: 'inline-block',
              maxWidth: '100%',
            }}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
          marginTop="20px"
        >
          <RouterLink to="/logout">
            <Button variant="contained" size="large" color="primary">
              Home page
            </Button>
          </RouterLink>
        </Typography>
      </Container>
    </Box>
  </>
);

export default Forbidden;
