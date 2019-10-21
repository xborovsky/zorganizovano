import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Home = () => (
    <>
        <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Grid container justify="center">
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <NavLink to="/types">A</NavLink>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <NavLink to="/eshop">B</NavLink>
            </Grid>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
        </Grid>
    </>
);

export default Home;