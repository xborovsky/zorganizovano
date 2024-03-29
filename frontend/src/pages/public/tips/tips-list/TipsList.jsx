import React from 'react';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet';

import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';
import TipsListItem from './TipsListItem';

const TipsList = () => (
    <>
        <Helmet>
            <meta name="description" content="Články o tom, jak to máme doma zorganizováno. Takový malý osobní blog, kde se snažím sepsat vše,
                co doufám, že by vám mohlo pomoci v organizaci domácnosti, rodiny a získání tak více volného času." />
        </Helmet>
        <BreadcrumbsNav items={[{ name : 'U nás doma' }]} />
        <DataFetcher queryId='blog-posts' url='/blog/posts'>
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