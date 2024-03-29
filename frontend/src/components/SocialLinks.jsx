import React from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const SocialLinks = ({ linkClass, iconClass }) => (
    <>
        <a href="https://www.facebook.com/zorganizovano/" className={linkClass} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className={iconClass} />
        </a>
        <a href="https://www.instagram.com/zorganizovano/" className={linkClass} target="_blank" rel="noopener noreferrer">
            <InstagramIcon className={iconClass} />
        </a>
    </>
);

SocialLinks.propTypes = {
    linkClass : PropTypes.string,
    iconClass : PropTypes.string
};

export default SocialLinks;