import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import DataFetcher from 'components/DataFetcher';

const styles = theme => ({
    root : {
        objectFit : 'cover',
        width : '100%',
        height : '100%'
    }
});

const TipsListItemTitlePicture = ({ tipId, classes }) => (
    <DataFetcher url={`/blog/posts/${tipId}/title-picture`}>
        {data => (
            <img 
                src={`${data.src}`} 
                srcSet={`${data.srcSet}`}
                className={classes.root} />
        )}
    </DataFetcher>
);

TipsListItemTitlePicture.propTypes = {
    tipId : PropTypes.number.isRequired
};

export default withStyles(styles)(TipsListItemTitlePicture);