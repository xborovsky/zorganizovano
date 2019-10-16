import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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
                    <Typography variant="body2" color="secondary">FAQ</Typography>
                </Link>
                <Link to="/eshop/contact" className={classes.link}>
                    <Typography variant="body2" color="secondary">Kontakt</Typography>
                </Link>
                <a href="todo-facebook" className={classes.nativeLink}>
                    <FacebookIcon />
                </a>
                <a href="todo-instagram" className={classes.nativeLink}>
                    <InstagramIcon />
                </a>
            </Grid>
            <Grid item xs={12} sm={6}>
                &copy; 2019
            </Grid>
        </Grid>
    </footer>
);

export default withStyles(styles)(Footer);