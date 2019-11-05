import React from 'react';
import Grid from '@material-ui/core/Grid';

import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';
import TipsListItem from './TipsListItem';

const TipsList = () => (
    <>
        <BreadcrumbsNav items={[{ name : 'Zorganizuj se' }]} />
        <DataFetcher url='/blog/posts'>
            { data => (
                <Grid container>
                    {
                        data.map(blogPost => (
                            <TipsListItem key={blogPost.id} blogPost={blogPost} />
                        ))
                    }
                </Grid>
            ) }
        </DataFetcher>
    </>
);

export default TipsList;