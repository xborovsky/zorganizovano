import React from 'react';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import withStyles from '@material-ui/styles/withStyles';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green, red, blue } from '@material-ui/core/colors';

const styles = theme => ({
    root : {
        marginBottom : '2rem'
    },
    icon: {
        verticalAlign: 'bottom',
        marginRight: '2rem'
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: red[600],
    },
    info: {
        backgroundColor: blue[800],
    },
    warning: {
        backgroundColor: amber[700],
    },
});

const Alert = ({ type, children, classes }) => {
    const getIcon = () => {
        switch (type) {
            case 'error': return <ErrorIcon className={classes.icon} />;
            case 'success': return <CheckCircleIcon className={classes.icon} />;
            case 'warning': return <WarningIcon className={classes.icon} />;
            case 'info': return <InfoIcon className={classes.icon} />;
            default: return null;
        }
    };

    const getClass = () => {
        switch (type) {
            case 'error': return classes.error;
            case 'success': return classes.success;
            case 'warning': return classes.warning;
            case 'info': return classes.info;
            default: return null;
        }
    };

    return (
        <SnackbarContent
            className={`${classes.root} ${getClass()}`}
            message={
                <span>
                    {getIcon()}
                    {children}
                </span>
            } />
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
};

export default withStyles(styles)(Alert);