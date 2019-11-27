import React from 'react';
import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';

import withPublicLayout from '~/components/hoc/withPublicLayout';
import BreadcrumbsNav from '~/components/BreadcrumbsNav';
import TipsListItem from './components/TipsListItem';

const TipsList = ({ tips }) => (
    <>
        <BreadcrumbsNav items={[{ name : 'U nás doma' }]} />
        <Grid container>
            {
                tips.map(blogPost => (
                    <TipsListItem key={blogPost.id} blogPost={blogPost} />
                ))
            }
        </Grid>
    </>
);

// TODO tips propTypes

TipsList.getInitialProps = async () => {
    const res = await fetch(`${process.env.API_URL}/blog/posts`);
    const tips = await res.json();

    return { tips };
};

export default withPublicLayout(TipsList);