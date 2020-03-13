import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import { Helmet } from 'react-helmet';

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
            <Helmet>
                <meta name="description" content={`Jsme dvě lišky vyšitý 🦊 taky dvě mámy na mateřský 👯‍♀️ a šijeme a děláme různý jiný legrácky pro vás a vaše liščata 🦊`} />
            </Helmet>
            <MainText />
            <Grid container justify="center" className={classes.gridWrapper}>
                <Grid item xs={false} sm={1} md={2} lg={3}>
                    <NavLink to="/events">
                        <LinkButton
                            src={getImgServerUrl('img/events.jpg', getLinkButtonWidthPct())}
                            alt="Kdy a kde se uvidíme"
                        />
                    </NavLink>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                    <NavLink to="/eshop">
                        <LinkButton
                            src={getImgServerUrl('img/eshop.jpg', getLinkButtonWidthPct())}
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