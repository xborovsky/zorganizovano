import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SocialLinks from 'components/SocialLinks';
import ContactEmail from 'components/ContactEmail';
import ContactForm from './ContactForm';
import DataFetcher from 'components/DataFetcher';

const styles = theme => ({
    root : {
        width : '50vw',
        margin : '0 auto',
        padding : '2rem 4rem'
    },
    photo : {
        height : 200,
        width : 130
    },
    socialLink : {
        color : '#000'
    },
    socialIcon : {
        fontSize : 32
    }
});

const Contact = ({ classes }) => (
    <>
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={6} sm={4} md={3}>
                    <CardMedia
                        className={classes.photo}
                        image="https://1001freedownloads.s3.amazonaws.com/vector/thumb/66066/smiling_man_face.png"
                        title="Title"
                    />
                </Grid>
                <Grid item xs={6} sm={8} md={9}>
                    <CardContent>
                        <Typography variant="h5">
                            Test Jmeno
                        </Typography>
                        <ContactEmail reversedEmail='zc.liame@tset' />
                        <SocialLinks linkClass={classes.socialLink} iconClass={classes.socialIcon} />
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
        <DataFetcher url='/contact/query-types'>
            { data => <ContactForm queryTypes={data} /> }
        </DataFetcher>
    </>
);

export default withStyles(styles)(Contact);