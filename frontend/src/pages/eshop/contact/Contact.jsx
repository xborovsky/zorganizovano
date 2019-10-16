import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SocialLinks from '../../../components/SocialLinks';

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
    email : {
        unicodeBidi : 'bidi-override',
        direction : 'rtl',
        textAlign : 'left'
    },
    socialLink : {
        color : '#000'
    },
    socialIcon : {
        fontSize : 32
    }
});

const Contact = ({ classes }) => (
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
                    <Typography variant="body1" className={classes.email}>
                        zc.liame@tset
                    </Typography>
                    <SocialLinks linkClass={classes.socialLink} iconClass={classes.socialIcon} />
                </CardContent>
            </Grid>
        </Grid>
    </Card>
);

export default withStyles(styles)(Contact);