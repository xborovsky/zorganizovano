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
    fontFamily: 'century-gothic, sans-serif',
    body1: {
      fontSize: 14,
      color: '#4a4a4a',
      [defaultTheme.breakpoints.down('sm')] : {
        fontSize : 12
      }
    },
    body2 : {
        fontSize : 13
    },
    h1 : {
      fontSize : '4rem',
      marginBottom : '1rem'
    }
  }
});

export default zorganizovanoTheme;