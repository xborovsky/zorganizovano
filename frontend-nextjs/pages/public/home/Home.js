import React from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';

import withPublicLayout from '~/components/hoc/withPublicLayout';
import MainText from './components/MainText';
import LinkButton from './components/LinkButton';
import { getImgServerUrl } from '~/util/img-util';

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
                    <Link href="/tips">
                        <LinkButton
                            src={getImgServerUrl('other/Button2.jpg', getLinkButtonWidthPct())}
                            alt="Jak to máme doma"
                        />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                    <Link href="/eshop">
                        <LinkButton
                            src={getImgServerUrl('other/Button1.jpg', getLinkButtonWidthPct())}
                            alt="Chci nakupovat"
                        />
                    </Link>
                </Grid>
                <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            </Grid>
        </>
    );
};

export default withPublicLayout(withStyles(styles)(withWidth()(Home)));