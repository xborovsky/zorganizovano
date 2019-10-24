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
      fontSize : '3rem',
      marginBottom : '1rem'
    },
    h2 : {
      fontSize : '2.3rem'
    },
    h3 : {
      fontSize : '2rem'
    },
    h4 : {
      fontSize : '1.8rem'
    },
    h5 : {
      fontSize : '1.6rem'
    },
    h6 : {
      fontSize : '1.5rem'
    }
  }
});

export default zorganizovanoTheme;