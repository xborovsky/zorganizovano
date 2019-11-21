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
                <meta name="description" content={`Ahoj, jmenuji se Bára, jsem obyčejná máma jako vy, tak jako vy i já mám neobyčejné děti a vytíženého manžela 🙂. Starší Mareček
                    už nám lítá téměř denně po kroužcích, Márovi-manželovi začala hokejová sezóna a babičky, tak ty máme daleko - a tak je zorganizovanost celé naší rodiny
                    asi jedné východisko, jak to celé zvládnout v pohodě, bez stresu a o úsměvu a úctě si povíme zase v jiné pohádce ;) Jestli to máte podobně jako my,
                    budu s vámi ráda sdílet tipy, které u nás doma fungují a připravuji pro vás i nějaké ty fyzické zlepšováky. Tak vzhůru dolů, jdeme se zorganizovat!`} />
            </Helmet>
            <MainText />
            <Grid container justify="center" className={classes.gridWrapper}>
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
        </>
    );
};

export default withStyles(styles)(withWidth()(Home));