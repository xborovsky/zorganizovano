import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@mui/styles';

import MainText from './MainText';
import LinkButton from './LinkButton';
import { getImgServerUrl } from 'util/img-util';
import useWidth from 'hooks/use-width';

const useStyles = makeStyles(theme => ({
    gridItem : {
        textAlign : 'center'
    },
    gridWrapper : {
        padding : '20px 40px 40px',
        [theme.breakpoints.down('md')] : {
            padding : 0
        }
    }
}));

const Home = () => {
    const classes = useStyles();
    const width = useWidth();

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

    return <>
        <Helmet>
            <meta name="description" content={`Márovi-manželovi začala hokejová sezóna a babičky, tak ty máme daleko - a tak je zorganizovanost celé naší rodiny asi
                jediné východisko, jak to celé zvládnout v pohodě, bez stresu a o úsměvu a úctě si povíme zase v jiné pohádce 🙂`} />
        </Helmet>
        <MainText />
        <Grid container justifyContent="center" className={classes.gridWrapper}>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                <NavLink to="/tips">
                    <LinkButton
                        src={getImgServerUrl('other/Button2.jpg', getLinkButtonWidthPct())}
                        alt="Jak to máme doma"
                    />
                </NavLink>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} className={classes.gridItem}>
                <NavLink to="/eshop">
                    <LinkButton
                        src={getImgServerUrl('other/Button1.jpg', getLinkButtonWidthPct())}
                        alt="Chci nakupovat"
                    />
                </NavLink>
            </Grid>
            <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
        </Grid>
    </>;
};

export default Home;