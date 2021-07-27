import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#424242',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#ff00fa'
    },
    text: {
      primary: '#12ff00',
      secondary: '#424242',
      black: '#02060c',
      white: '#ffffff'
    },
    table: {
      background: '#131212'
    }
  },
  shadows,
  typography
});

export default theme;
