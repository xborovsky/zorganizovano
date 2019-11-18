import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';

import DataFetcher from 'components/DataFetcher';
import { getImgServerUrl } from 'util/img-util';

const styles = theme => ({
    root : {
        objectFit : 'cover',
        width : '100%',
        height : '100%'
    }
});

const TipsListItemTitlePicture = ({ tipId, tipName, classes, width }) => (
    <DataFetcher url={`/blog/posts/${tipId}/title-picture`}>
        {data => (
            <img
                src={getImgServerUrl(data, ['xs', 'sm'].indexOf(width) > -1 ? 100 : 40)}
                alt={tipName}
                className={classes.root} />
        )}
    </DataFetcher>
);

TipsListItemTitlePicture.propTypes = {
    tipId : PropTypes.number.isRequired,
    tipName : PropTypes.string.isRequired
};

export default withStyles(styles)(withWidth()(TipsListItemTitlePicture));