import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { useEffect } from 'react';
import routes from './routes/routes';
import routesPermission from './routes/routesPermission';
import GlobalStyles from './components/root/GlobalStyles';

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  const role = useSelector((state) => state.auth.role);
  const routing = useRoutes(routes(isLoggedIn));
  const location = useLocation();
  const navigate = useNavigate();
  const isPermission = routesPermission(location.pathname, role);

  useEffect(() => {
    if (!isPermission) {
      navigate('/403', { replace: true });
    }
  }, [isPermission]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
