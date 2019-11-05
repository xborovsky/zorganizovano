import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import Bowser from 'bowser';

import ContactEmail from 'components/ContactEmail';

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

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        axios.post('/client-error', {
            error : JSON.stringify(errorInfo),
            browser : JSON.stringify(Bowser.parse(window.navigator.userAgent))
        });
    }

    render() {
        const { hasError } = this.state;
        const { classes, middleOfScreen } = this.props;

        if (hasError) {
            return (
                <div className={classes.centered} style={middleOfScreen && { top : '50%', transform : 'translate(0, -50%)'}}>
                    <FontAwesomeIcon icon={faDizzy} className={classes.icon} size="7x" />
                    <div>Ups, něco se pokazilo!</div>
                    <div className={classes.mail}>Dejte nám vědět na <ContactEmail /></div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    middleOfScreen : PropTypes.bool
};

export default withStyles(styles)(ErrorBoundary);