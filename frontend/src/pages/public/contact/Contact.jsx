import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-apollo';
import { CircularProgress } from '@material-ui/core';
import { gql } from 'apollo-boost';

import SocialLinks from 'components/SocialLinks';
import ContactEmail from 'components/ContactEmail';
import ContactForm from './ContactForm';
import ContactPhoto from './ContactPhoto';
import Alert from 'components/Alert';

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

const CONTACT_QUERY_TYPES = gql`{
    contactQueryTypes {
        id
        type
        sortKey
    }
}`;

const Contact = ({ classes }) => {
    const { loading, data, error } = useQuery(CONTACT_QUERY_TYPES);

    return (
        <>
            <Helmet>
                <meta name="description" content='Dotaz, nápad, průšvih? Chcete pomoci se zorganizovanim domacnosti? Napište mi! Zavolejte! Bára B. +420 734 836 714' />
            </Helmet>

            { loading ? // TODO refaktoring
                <Grid container>
                    <Grid item xs={12} style={{ textAlign : 'center' }}>
                        <CircularProgress />
                    </Grid>
                </Grid> :
                error ?
                    <Alert type="error">Problém komunikace se serverem.</Alert> :
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
                            <ContactForm queryTypes={data.contactQueryTypes} />
                        </Grid>
                    </Grid>
            }
        </>
    );
};

export default withStyles(styles)(Contact);