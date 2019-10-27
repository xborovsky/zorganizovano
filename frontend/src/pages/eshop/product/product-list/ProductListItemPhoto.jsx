import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgress, CardMedia, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    cover: {
        height: 200,
        cursor : 'pointer'
    },
});

const ProductListItemPhoto = ({ classes, id, onClick }) => {
    const [ loading, setLoading ] = useState(true);
    const [ picture, setPicture ] = useState({
        data : undefined,
        dataType : undefined
    });

    useEffect(() => {
        axios.get(`/picture-item/${id}/main`)
            .then(res => {
                setPicture({
                    data : res.data.pictureBase64,
                    dataType : res.data.dataType
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    return (
        loading ? <CircularProgress /> :
            <CardMedia
                className={classes.cover}
                image={picture.data ?
                    `data:${picture.dataType};base64,${picture.data}` :
                    '/img/icons/image-square-outline.svg'
                }
                onClick={onClick}
            />
    );

};

ProductListItemPhoto.propTypes = {
    id : PropTypes.number.isRequired,
    onClick : PropTypes.func.isRequired
};

export default withStyles(styles)(ProductListItemPhoto);