import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/styles/withStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Sentry from "@sentry/react";

import Loader from './components/Loader';

import zorganizovanoTheme from './Theme';
import ErrorPage from 'components/ErrorPage';

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
      <Sentry.ErrorBoundary fallback={<ErrorPage middleOfScreen />}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/admin" component={AdminContainer} />
              <Route component={PublicContainer} />
            </Switch>
          </Suspense>
        </Sentry.ErrorBoundary>
      </Router>
    </ThemeProvider>
  </div>
);

export default withStyles(styles)(App);
