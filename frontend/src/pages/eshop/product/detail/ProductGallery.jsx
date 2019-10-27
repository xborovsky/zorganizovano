import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const ProductGallery = ({ productId }) => {

    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/picture-item/${productId}`)
            .then(res => {
                const resPictures = res.data.map(resItem => {
                    return {
                        data : resItem.pictureBase64,
                        dataType : res.data.dataType
                    };
                });
                setPictures(resPictures);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [productId]);

    return (
        loading ?
            <CircularProgress /> :
            <ImageGallery
                items={
                    pictures.length ?
                        pictures.map(picture => {
                            return picture.data ? {
                                original : `data:${picture.dataType};base64,${picture.data}`,
                                thumbnail : `data:${picture.dataType};base64,${picture.data}`
                            } : EMPTY_PICTURES;
                        }) : [EMPTY_PICTURES]
                }
                showPlayButton={false}
            />
    );
};

ProductGallery.propTypes = {
    productId : PropTypes.number.isRequired
};

export default ProductGallery;