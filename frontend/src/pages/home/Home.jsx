import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import MainText from './MainText';
import LinkButton from './LinkButton';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    gridItem : {
        textAlign : 'center'
    },
    gridWrapper : {
        padding : '20px 40px 40px',
        [theme.breakpoints.down('sm')] : {
            padding : 0
        }
    }
});

const Home = ({ classes }) => (
    <>
        <MainText />
        <Grid container justify="center" className={classes.gridWrapper}>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                <NavLink to="/tips">
                    <LinkButton
                        src="/img/page/button2/Button2.jpg"
                        srcSet="/img/page/button2/Button2_1920.jpg 1920w, /img/page/button2/Button2_1600.jpg 1600w, /img/page/button2/Button2_1366.jpg 1366w"
                    />
                </NavLink>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                <NavLink to="/eshop">
                    <LinkButton
                        src="/img/page/button1/Button1.jpg"
                        srcSet="/img/page/button1/Button1_1920.jpg 1920w, /img/page/button1/Button1_1600.jpg 1600w, /img/page/button1/Button1_1366.jpg 1366w"
                    />
                </NavLink>
            </Grid>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
        </Grid>
    </>
);

export default withStyles(styles)(Home);