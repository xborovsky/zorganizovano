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
    info : {
        fontSize : 14,
        listStylePosition : 'inside',
        marginTop : '1rem',
        paddingLeft : 0
    }
});

const ErrorPage = ({ classes, middleOfScreen }) => (
    <div className={classes.centered} style={middleOfScreen && { top : '50%', transform : 'translate(0, -50%)'}}>
        <FontAwesomeIcon icon={faDizzy} className={classes.icon} size="7x" />
        <div>Ups, něco se pokazilo! Co teď?</div>
        <ol className={classes.info}>
            <li>Zkuste obnovit stránku (F5)</li>
            <li>
                Zkuste promazat cache prohlížeče. Nápověda dle platformy zde:
                <br />
                Chrome: <a href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DAndroid&hl=cs" target="_blank">https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DAndroid&hl=cs</a>
                <br />
                IOS - Safari: <a href="https://dotekomanie.cz/2020/03/iphone-a-ipad-jak-vymazat-cache-v-safari/" target="_blank">https://dotekomanie.cz/2020/03/iphone-a-ipad-jak-vymazat-cache-v-safari/</a>
                <br />
                MACOS - Safari: <a href="https://www.letemsvetemapplem.eu/2017/06/08/vymazat-cache-safari-ios-i-macos/" target="_blank">https://www.letemsvetemapplem.eu/2017/06/08/vymazat-cache-safari-ios-i-macos/</a>
            </li>
            <li>Dejte nám vědět na <ContactEmail /></li>
        </ol>
    </div>
);

ErrorPage.propTypes = {
    middleOfScreen : PropTypes.bool
};

export default withStyles(styles)(ErrorPage);