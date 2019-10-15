import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

let zorganizovanoTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#971c3c'
    },
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
    body1: {
      fontSize: 14,
      color: '#4a4a4a',
      [defaultTheme.breakpoints.down('sm')] : {
        fontSize : 12
      }
    },
    body2 : {
        fontSize : 13
    }
  }
});

export default zorganizovanoTheme;