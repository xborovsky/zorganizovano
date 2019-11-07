import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';

import MainText from './MainText';
import LinkButton from './LinkButton';
import { getImgServerUrl } from 'util/img-util';

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

const Home = ({ classes, width }) => {

    const getLinkButtonWidthPct = () => {
        switch (width) {
            case 'xl':
            case 'lg':
                return 30;
            case 'md':
                return 25;
            case 'sm':
                return 50;
            default : return 100;
        }
    };

    return (
        <>
            <MainText />
            <Grid container justify="center" className={classes.gridWrapper}>
                <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
                <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                    <NavLink to="/tips">
                        <LinkButton
                            src={getImgServerUrl('/other/Button2.jpg', getLinkButtonWidthPct())}
                            alt="Jak to máme doma"
                        />
                    </NavLink>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                    <NavLink to="/eshop">
                        <LinkButton
                            src={getImgServerUrl('/other/Button1.jpg', getLinkButtonWidthPct())}
                            alt="Chci nakupovat"
                        />
                    </NavLink>
                </Grid>
                <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            </Grid>
        </>
    );
};

export default withStyles(styles)(withWidth()(Home));