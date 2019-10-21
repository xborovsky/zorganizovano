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
    fontFamily: 'Century Gothic, sans-serif',
    body1: {
      fontSize: 18,
      color: '#4a4a4a',
      [defaultTheme.breakpoints.down('sm')] : {
        fontSize : 12
      }
    },
    body2 : {
        fontSize : 14
    },
    h1 : {
      fontSize : '4rem',
      marginBottom : '1rem'
    }
  }
});

export default zorganizovanoTheme;