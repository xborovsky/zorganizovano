import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';

import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';
import TipsListItem from './TipsListItem';

const TipsList = () => (
    <>
        <Helmet>
            <meta name="description" content="Zde Vám nabídnu několik tipů jak zvládáme organizaci u nás doma." />
        </Helmet>
        <BreadcrumbsNav items={[{ name : 'U nás doma' }]} />
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