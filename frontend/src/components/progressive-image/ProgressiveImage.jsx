import React from "react";
import PropTypes from 'prop-types';

import useProgressiveImg from '../../hooks/use-progressive-img';

import './ProgressiveImage.css';

const ProgressiveImage = ({ 
  lowQualitySrc, 
  highQualitySrc,
  className,
  ...rest 
}) => {
  const [src, { blur }] = useProgressiveImg(lowQualitySrc, highQualitySrc);
  const classes = [className || '', blur ? 'blurred' : 'non-blurred'].join(' ');

  return (
    <img
      src={src}
      className={classes}
      {...rest}
    />
  )
};

ProgressiveImage.propTypes = {
    lowQualitySrc : PropTypes.string.isRequired,
    highQualitySrc : PropTypes.string.isRequired
};

export default ProgressiveImage;