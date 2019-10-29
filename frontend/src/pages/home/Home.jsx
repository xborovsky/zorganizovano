import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import MainText from './MainText';

const Home = () => (
    <>
        <MainText />
        <Grid container justify="center">
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <NavLink to="/tips">A</NavLink>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <NavLink to="/eshop">B</NavLink>
            </Grid>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
        </Grid>
    </>
);

export default Home;