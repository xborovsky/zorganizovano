import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TipsListItemTitlePicture from './TipsListItemTitlePicture';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root : {
        cursor : 'pointer',
        marginBottom : '1rem'
    },
    title : {
        marginBottom : '1rem'
    }
});

const TipsListItem = ({ blogPost, classes }) => {
    const history = useHistory();

    const goToBlockPost = id => {
        history.push({ pathname : `/tips/${id}`});
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