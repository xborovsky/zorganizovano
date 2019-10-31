import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, withStyles } from '@material-ui/core';
import DataFetcher from 'components/DataFetcher';

const styles = theme => ({
    cover: {
        height: 200,
        cursor : 'pointer'
    },
});

const ProductListItemPhoto = ({ classes, id, onClick }) => (
    <DataFetcher url={`/picture-item/${id}/main`}>
        { data => (
            <CardMedia
                className={classes.cover}
                image={data.pictureBase64 ?
                    `data:${data.dataType};base64,${data.pictureBase64}` :
                    '/img/icons/image-square-outline.svg'
                }
                onClick={onClick}
            />
        ) }
    </DataFetcher>
);

ProductListItemPhoto.propTypes = {
    id : PropTypes.number.isRequired,
    onClick : PropTypes.func.isRequired
};

export default withStyles(styles)(ProductListItemPhoto);