import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import withLoading from 'components/hoc/WithLoading';

const TipsList = ({ data }) => {

    const goToBlockPost = id => {
        console.log('TODO - goToBlockPost');
    };

    return (
        <Grid container>
            {
                data.map(blogPost => (
                    <Grid item xs={12}>
                        <Card onClick={() => goToBlockPost(data.id)}>
                            <CardContent>
                                <Typography variant="h5">
                                    { blogPost.title } ({ blogPost.publishedFormatted })
                                </Typography>
                                <Typography variant="body1">
                                    { blogPost.contentPreview }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

TipsList.propTypes = {
    data : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            title : PropTypes.string.isRequired,
            publishedFormatted : PropTypes.string.isRequired,
            contentPreview : PropTypes.string.isRequired
        })
    ).isRequired
};

export default withLoading('/blog/posts')(TipsList);