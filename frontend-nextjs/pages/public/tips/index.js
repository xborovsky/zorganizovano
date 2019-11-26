import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import withPublicLayout from '~/components/hoc/withPublicLayout';
import BreadcrumbsNav from '~/components/BreadcrumbsNav';
import TipsListItem from './components/TipsListItem';

const TipsList = ({tips}) => (
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

TipsList.getInitialProps = async() => {
    const tips = await axios.get(`/blog/posts`)
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            return null;
        });

    return { tips };
};

export default withPublicLayout(TipsList);