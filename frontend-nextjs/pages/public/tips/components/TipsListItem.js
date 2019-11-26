import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

import TipsListItemTitlePicture from './TipsListItemTitlePicture';

const styles = theme => ({
    root : {
        cursor : 'pointer'
    },
    title : {
        marginBottom : '1rem'
    }
});

const TipsListItem = ({ blogPost, classes }) => {
    const goToBlockPost = id => {
        Router.push(`/public/tips/${id}`);
    };

    return (
        <Grid item xs={12} className={classes.root}>
            <Card onClick={() => goToBlockPost(blogPost.id)}>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <TipsListItemTitlePicture tipId={blogPost.id} tipName={blogPost.title} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <CardContent>
                            <Typography variant="h5" className={classes.title}>
                                { blogPost.title } ({ blogPost.publishedFormatted })
                            </Typography>
                            <Typography variant="body1">
                                { blogPost.contentPreview }
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

TipsListItem.propTypes = {
    blogPost : PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        publishedFormatted : PropTypes.string.isRequired,
        contentPreview : PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(TipsListItem);