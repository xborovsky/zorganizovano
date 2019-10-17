import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import ShoppingCartContext from '../shopping-cart/state-management/ShoppingCartContext';

const styles = theme => ({
    appBar: {
        borderBottom: `1px solid #AAA`,
    },
    toolbar: {
        flexWrap: 'wrap',
        padding : '0.5rem 0'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        marginRight : '1.5rem'
    }
});

const StyledBadge = withStyles(theme => ({
    badge : {
        backgroundColor : '#fbbd5c',
        color : '#000'
    }
}))(Badge);

const Header = ({ classes }) => {
    const { state } = useContext(ShoppingCartContext);

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Zorganizovano
                </Typography>
                <nav>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                        <NavLink to="/types">Typy</NavLink>
                    </Link>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                        <NavLink to="/eshop">Eshop</NavLink>
                    </Link>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                        <NavLink to="/eshop/shopping-cart">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </StyledBadge>
                            </IconButton>
                        </NavLink>
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(Header);