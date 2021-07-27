import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { authApi } from '../apis';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (username, password) => {
    console.log(username, password);
    const res = await authApi.login({ username, password });
    if (res.data.code === 200) {
      const data = {
        username: res.data.data.user.username,
        role: res.data.data.user.role[0],
        token: res.data.token
      };
      dispatch({ type: 'SET_LOGIN', payload: data });
      navigate('/admin', { replace: true });
    } else {
      // eslint-disable-next-line no-alert
      alert('sai username or password');
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: 'admin',
              password: '123456'
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().min(6).max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              login(values.username, values.password);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    align="center"
                    gutterBottom
                    variant="body2"
                    marginTop="10px"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
