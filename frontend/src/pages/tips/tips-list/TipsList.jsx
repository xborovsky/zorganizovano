import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const TipsList = () => {

    const history = useHistory();

    const goToBlockPost = id => {
        history.push({ pathname : `/tips/${id}`});
    };

    return (
        <>
            <BreadcrumbsNav items={[{ name : 'Zorganizuj se' }]} />
            <DataFetcher url='/blog/posts'>
                { data => (
                    <Grid container>
                        {
                            data.map(blogPost => (
                                <Grid item xs={12}>
                                    <Card onClick={() => goToBlockPost(blogPost.id)}>
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
                ) }
            </DataFetcher>
        </>
    );
};

export default TipsList;