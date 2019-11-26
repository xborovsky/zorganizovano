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
    fontFamily: 'Roboto, Century Gothic, sans-serif',
    body1: {
      fontSize: '1.1rem',
      color: '#4a4a4a',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '0.9rem'
      },
    },
    body2: {
      fontSize: 14
    },
    h1: {
      fontSize: '3rem',
      marginBottom: '1rem',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '2rem'
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1.2rem',
        marginBottom : '0.3rem'
      }
    },
    h2: {
      fontSize: '2.3rem',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '1.4rem'
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '0.9rem'
      }
    },
    h3: {
      fontSize: '2rem'
    },
    h4: {
      fontSize: '1.8rem'
    },
    h5: {
      fontSize: '1.6rem',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '1.3rem',
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.1rem',
      }
    },
    h6: {
      fontSize: '1.3rem',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '1.1rem',
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
      }
    }
  }
});

export default zorganizovanoTheme;