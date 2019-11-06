import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SocialLinks from 'components/SocialLinks';
import ContactEmail from 'components/ContactEmail';
import ContactForm from './ContactForm';
import DataFetcher from 'components/DataFetcher';
import ContactPhoto from './ContactPhoto';

const styles = theme => ({
    contact : {
        fontSize : '16pt'
    },
    contactWrapper : {
        alignSelf : 'center',
        [theme.breakpoints.down('xs')] : {
            textAlign : 'center'
        }
    },
    contactPhotoWrapper : {
        [theme.breakpoints.down('xs')] : {
            textAlign : 'center',
            marginTop : '2vh',
            marginBottom : '3vh'
        }
    },
    contactPhoto : {
        width : 250
    },
    socialLink : {
        color : '#000'
    },
    socialIcon : {
        fontSize : 32
    }
});

const Contact = ({ classes }) => (
    <Grid container>
        <Grid item xs={false} sm={1} md={2}></Grid>
        <Grid item xs={12} sm={5} md={4} className={classes.contactPhotoWrapper}>
            <ContactPhoto className={classes.contactPhoto} />
        </Grid>
        <Grid item xs={12} sm={5} md={4} className={classes.contactWrapper}>
            <Typography className={classes.contact} style={{ fontWeight : 'bold' }}>Bára Borovská</Typography>
            <Typography className={classes.contact}>+420 734 836 714</Typography>
            <Typography className={classes.contact}>
                <ContactEmail reversedEmail='moc.liamg@onavozinagroz' />
            </Typography>
            <Typography className={classes.contact}>www.zorganizovano.cz</Typography>
            <SocialLinks linkClass={classes.socialLink} iconClass={classes.socialIcon} />
        </Grid>
        <Grid item xs={false} sm={1} md={2}></Grid>
        <Grid item xs={12}>
            <DataFetcher url='/contact/query-types'>
                { data => <ContactForm queryTypes={data} /> }
            </DataFetcher>
        </Grid>
    </Grid>
);

export default withStyles(styles)(Contact);