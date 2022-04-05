import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Loader from './components/Loader';

import zorganizovanoTheme from './Theme';
import ErrorPage from 'components/ErrorPage';

const AdminContainer = React.lazy(() => import("./pages/admin/AdminContainer"));
const PublicContainer = React.lazy(() => import("./pages/public/PublicContainer"));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}));

export const RECAPTCHA_SITE_KEY = '6LdTxdQbAAAAAD1xlbKK1XP4ceoA7qYUbVEcPqyS';

const queryClient = new QueryClient();

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={zorganizovanoTheme}>
          <Router>
            <Sentry.ErrorBoundary fallback={<ErrorPage middleOfScreen />}>
              <QueryClientProvider client={queryClient}>
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route path="/admin" component={AdminContainer} />
                      <Route component={PublicContainer} />
                    </Switch>
                  </Suspense>
              </QueryClientProvider>
            </Sentry.ErrorBoundary>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
