import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import DataFetcher from 'components/DataFetcher';
import { getImgServerUrl } from 'util/img-util';
import useWidth from 'hooks/use-width';

const useStyles = makeStyles(theme => ({
    root : {
        objectFit : 'cover',
        width : '100%',
        height : '100%'
    }
}));

const TipsListItemTitlePicture = ({ tipId, tipName }) => {
    const classes = useStyles();
    const width = useWidth();
    
    return (
        <DataFetcher queryId={['block-post-title-picture', tipId]} url={`/blog/posts/${tipId}/title-picture`}>
            {data => (
                <img
                    src={getImgServerUrl(data, ['xs', 'sm'].indexOf(width) > -1 ? 100 : 40)}
                    alt={tipName}
                    className={classes.root} />
            )}
        </DataFetcher>
    );
};

TipsListItemTitlePicture.propTypes = {
    tipId : PropTypes.number.isRequired,
    tipName : PropTypes.string.isRequired
};

export default TipsListItemTitlePicture;