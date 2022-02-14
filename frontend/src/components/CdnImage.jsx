import React from 'react';
import PropTypes from 'prop-types';

const CND_URL = 'https://cdn.statically.io/img';
const ZORGANIZOVANO_URL = 'zorganizovano.cz';
const PRODUCTS_PATH = 'img/produkty';
const DEFAULT_HEIGHT = 200;

export const buildCdnUrl = (imageName, height = DEFAULT_HEIGHT) => `${CND_URL}/${ZORGANIZOVANO_URL}/h=${height},f=auto/${PRODUCTS_PATH}/${imageName}`;

const CdnImage = ({ 
    name,
    alt,
    height = DEFAULT_HEIGHT,
    ...rest
}) => (
    <img 
        src={buildCdnUrl(name, height)}
        alt={alt}
        height={height}
        {...rest}
    />
);

CdnImage.propTypes = {
    name : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired,
    height : PropTypes.number
};

export default CdnImage;