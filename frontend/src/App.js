import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Footer from './layout/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

import zorganizovanoTheme from './Theme';

const Home = React.lazy(() => import('./pages/home'));
const Types = React.lazy(() => import('./pages/types'));
const Eshop = React.lazy(() => import('./pages/eshop'));

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
});

const App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={zorganizovanoTheme}>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/types" component={Types} />
                <Route path="/eshop" component={Eshop} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default withStyles(styles)(App);
