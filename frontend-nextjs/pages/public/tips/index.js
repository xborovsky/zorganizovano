import React from 'react';
import Grid from '@material-ui/core/Grid';

import withPublicLayout from '~/components/hoc/withPublicLayout';
import DataFetcher from '~/components/DataFetcher';
import BreadcrumbsNav from '~/components/BreadcrumbsNav';
import TipsListItem from './components/TipsListItem';

const TipsList = () => (
    <>
        <BreadcrumbsNav items={[{ name : 'U nás doma' }]} />
        {/* TODO nextjs */}
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

export default withPublicLayout(TipsList);