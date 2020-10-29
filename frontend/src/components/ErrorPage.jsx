import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-solid-svg-icons';
import withStyles from '@material-ui/styles/withStyles';

import ContactEmail from './ContactEmail';

const styles = theme => ({
    centered : {
        position : 'absolute',
        fontSize : 20,
        textAlign : 'center',
        width : '100%'
    },
    icon : {
        display : 'block',
        margin : '0 auto'
    },
    mail : {
        fontSize : 14
    }
});

const ErrorPage = ({ classes, middleOfScreen }) => (
    <div className={classes.centered} style={middleOfScreen && { top : '50%', transform : 'translate(0, -50%)'}}>
        <FontAwesomeIcon icon={faDizzy} className={classes.icon} size="7x" />
        <div>Ups, něco se pokazilo!</div>
        <div className={classes.mail}>Dejte nám vědět na <ContactEmail /></div>
    </div>
);

ErrorPage.propTypes = {
    middleOfScreen : PropTypes.bool
};

export default withStyles(styles)(ErrorPage);