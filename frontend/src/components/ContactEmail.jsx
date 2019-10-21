import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    email : {
        unicodeBidi : 'bidi-override',
        direction : 'rtl',
        textAlign : 'left'
    }
});

const ContactEmail = ({ reversedEmail, classes }) => (
    <span className={classes.email}>
        { reversedEmail }
    </span>
);

ContactEmail.propTypes = {
    reversedEmail : PropTypes.string.isRequired
};

export default withStyles(styles)(ContactEmail);