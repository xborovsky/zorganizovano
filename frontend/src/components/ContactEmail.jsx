import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    email : {
        unicodeBidi : 'bidi-override',
        direction : 'rtl',
        textAlign : 'left'
    }
});

const ContactEmail = ({ reversedEmail = 'moc.liamg@onavozinagroz', classes }) => (
    <span className={classes.email}>
        { reversedEmail }
    </span>
);

ContactEmail.propTypes = {
    reversedEmail : PropTypes.string
};

export default withStyles(styles)(ContactEmail);