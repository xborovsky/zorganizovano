import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    email : {
        unicodeBidi : 'bidi-override',
        direction : 'rtl',
        textAlign : 'left'
    }
});

const ContactEmail = ({ reversedEmail, classes }) => (
    <Typography variant="body1" className={classes.email}>
        { reversedEmail }
    </Typography>
);

ContactEmail.propTypes = {
    reversedEmail : PropTypes.string.isRequired
};

export default withStyles(styles)(ContactEmail);