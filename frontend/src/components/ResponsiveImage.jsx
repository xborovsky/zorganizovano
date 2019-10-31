import React from 'react';
import PropTypes from 'prop-types';
import { withWidth } from '@material-ui/core';

const ResponsiveImage = ({ width, fallback, xs, sm, md, lg, xl, className, style, alt, title }) => {

    const getSrc = () => {
        switch (width) {
            case 'xl':
                if (!!xl) {
                    return xl;
                }
            case 'lg':
                if (!!lg) {
                    return lg;
                }
            case 'md':
                if (!!md) {
                    return md;
                }
            case 'sm':
                if (!!sm) {
                    return sm;
                }
            case 'xs':
                if (!!xs) {
                    return xs;
                }
            default:
                return fallback;
        }
    };

    return (
        <img src={getSrc()} alt={alt} title={title} className={className} style={style} />
    );
};

ResponsiveImage.propTypes = {
    fallback : PropTypes.string.isRequired,
    xs : PropTypes.string,
    sm : PropTypes.string,
    md : PropTypes.string,
    lg : PropTypes.string,
    xl : PropTypes.string,
    alt : PropTypes.string,
    title : PropTypes.string
};

export default withWidth()(ResponsiveImage);