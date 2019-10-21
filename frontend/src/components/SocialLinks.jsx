import React from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const SocialLinks = ({ linkClass, iconClass }) => (
    <>
        <a href="todo-facebook" className={linkClass} >
            <FacebookIcon className={iconClass} />
        </a>
        <a href="todo-instagram" className={linkClass}>
            <InstagramIcon className={iconClass} />
        </a>
    </>
);

SocialLinks.propTypes = {
    linkClass : PropTypes.object,
    iconClass : PropTypes.object
};

export default SocialLinks;