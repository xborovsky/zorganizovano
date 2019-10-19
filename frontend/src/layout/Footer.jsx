import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import SocialLinks from '../components/SocialLinks';

const styles = theme => ({
    footer : {
        padding: '3rem 10vw',
        marginTop: 'auto',
        backgroundColor : '#242424',
        color : '#fff',
        textAlign : 'center'
    },
    left : {
        textAlign : 'left'
    },
    link : {
        textDecoration : 'none',
        color : '#fff',
        '&:hover' : {
            textDecoration : 'underline'
        }
    },
    nativeLink : {
        textDecoration : 'none',
        color : '#fff',
        marginRight : 5,
        '&:active' : {
            textDecoration : 'none',
            color : '#fff'
        },
        '&:visited' : {
            textDecoration : 'none',
            color : '#fff'
        }
    }
});

const Footer = ({ classes }) => (
    <footer className={classes.footer}>
        <Grid container>
            <Grid item xs={12} sm={6} className={classes.left}>
                <Link to="/eshop/terms" className={classes.link}>
                    <Typography variant="body2" color="secondary">Obchodní podmínky</Typography>
                </Link>
                <Link to="/eshop/faq" className={classes.link}>
                    <Typography variant="body2" color="secondary">Nejčastěji kladené dotazy</Typography>
                </Link>
                <Link to="/eshop/contact" className={classes.link}>
                    <Typography variant="body2" color="secondary">Kontakt</Typography>
                </Link>
                <SocialLinks linkClass={classes.nativeLink} />
            </Grid>
            <Grid item xs={12} sm={6}>
                &copy; 2019
            </Grid>
        </Grid>
    </footer>
);

export default withStyles(styles)(Footer);