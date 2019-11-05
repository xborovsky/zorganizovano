import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import SocialLinks from '../components/SocialLinks';
import ContactEmail from 'components/ContactEmail';

const styles = theme => ({
    footer : {
        padding: '3rem 10vw 2rem',
        marginTop: 'auto',
        backgroundColor : '#cfcfcf',
        color : '#000',
        textAlign : 'center',
        [theme.breakpoints.down('xs')] : {
            paddingTop : '1rem',
            paddingBottom : '1rem'
        }
    },
    left : {
        textAlign : 'left',
        [theme.breakpoints.down('xs')] : {
            paddingTop : '.7rem',
            textAlign : 'center'
        }
    },
    link : {
        color : '#000',
        '&:hover' : {
            textDecoration : 'underline'
        }
    },
    nativeLink : {
        color : '#000',
        marginRight : 5,
        '&:active' : {
            textDecoration : 'none',
            color : '#000'
        },
        '&:visited' : {
            textDecoration : 'none',
            color : '#000'
        }
    },
    yearWrapper : {
        alignSelf : 'flex-end'
    },
    year : {
        textAlign : 'right',
        [theme.breakpoints.down('xs')] : {
            textAlign : 'center'
        }
    },
    socialIcon : {
        fontSize : '2rem'
    }
});

const Footer = ({ classes }) => (
    <footer className={classes.footer}>
        <Grid container>
            <Grid item xs={12} sm={5} className={classes.left}>
                <Link to="/eshop/terms" className={classes.link}>
                    <Typography variant="body2" color="inherit">Obchodní podmínky</Typography>
                </Link>
                <Link to="/eshop/personal-data-protection-terms" className={classes.link}>
                    <Typography variant="body2" color="inherit">Ochrana osobních údajů</Typography>
                </Link>
                <Link to="/eshop/reclamation-terms" className={classes.link}>
                    <Typography variant="body2" color="inherit">Reklamace</Typography>
                </Link>
                <Link to="/eshop/faq" className={classes.link}>
                    <Typography variant="body2" color="inherit">Nejčastěji kladené dotazy</Typography>
                </Link>
                <Link to="/contact" className={classes.link}>
                    <Typography variant="body2" color="inherit">Kontakt</Typography>
                </Link>
                <br />
                <SocialLinks linkClass={classes.nativeLink} iconClass={classes.socialIcon} />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.left}>
                <Typography variant="body2" color="inherit">ZORGANIZOVÁNO</Typography>
                <div>
                    <Typography variant="body2" color="inherit">Bára Borovská</Typography>
                    <Typography variant="body2" color="inherit">+420 734 836 714</Typography>
                    <Typography variant="body2" color="inherit">
                        <ContactEmail reversedEmail="moc.liamg@onavozinagroz" />
                    </Typography>
                    <br />
                    <Typography variant="body2">
                        Dotaz, nápad, průšiv?&nbsp;
                        <Link to="/contact" className={classes.link} style={{ display : 'inline' }}>
                            Napište mi!
                        </Link>
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.yearWrapper}>
                <Typography variant="body2" className={classes.year}>2019</Typography>
            </Grid>
        </Grid>
    </footer>
);

export default withStyles(styles)(Footer);