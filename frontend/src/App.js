import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/styles/withStyles';
import { ThemeProvider } from '@material-ui/core/styles';

import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

import zorganizovanoTheme from './Theme';

const AdminContainer = React.lazy(() => import("./pages/admin/AdminContainer"));
const PublicContainer = React.lazy(() => import("./pages/public/PublicContainer"));

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
});

export const RECAPTCHA_SITE_KEY = '6LdrKsAUAAAAAPsXgJSwERT3AwtBDMage9E6YyTy';

const App = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <ThemeProvider theme={zorganizovanoTheme}>
      <Router>
        <ErrorBoundary middleOfScreen>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path="/admin" component={AdminContainer} />
                <Route component={PublicContainer} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
      </Router>
    </ThemeProvider>
  </div>
);

export default withStyles(styles)(App);
