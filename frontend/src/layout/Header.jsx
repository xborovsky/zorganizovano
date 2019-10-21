import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import ShoppingCartContext from '../pages/eshop/shopping-cart/state-management/ShoppingCartContext';
import Jumbotron from 'layout/Jumbotron';

const styles = theme => ({
    appBar: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)'
    },
    toolbar: {
        flexWrap: 'wrap',
        alignItems : 'stretch'
    },
    toolbarTitle: {
        flexGrow: 1,
        textTransform : 'uppercase',
        color : '#fff',
        marginLeft : '2vw',
        display : 'flex',
        alignItems : 'center'
    },
    link: {
        padding : '0 1.5rem',
        color : '#fff',
        textTransform : 'uppercase',
        display : 'flex',
        alignItems : 'center',
        '&:active' : {
            backgroundColor : 'rgba(108, 129, 90, 0.8)'
        },
        '&:hover' : {
            backgroundColor : 'rgba(108, 129, 90, 0.8)'
        }
    },
    activeLink : {
        backgroundColor : 'rgba(108, 129, 90, 0.8)'
    },
    shoppingCartIcon : {
        color : '#fff',
        fontSize : 14,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    nav : {
        display : 'flex',
        alignItems : 'stretch'
    }
});

const StyledBadge = withStyles(theme => ({
    badge : {
        backgroundColor : '#971c3c',
        color : '#fff',
        fontSize : '10pt',
        transform : 'scale(0.9) translate(70%, -70%)'
    }
}))(Badge);

const Header = ({ classes }) => {
    const { state } = useContext(ShoppingCartContext);

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                        Zorganizováno
                    </Typography>
                    <nav className={classes.nav}>
                        <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink} exact>
                            <Typography variant="body2" elemet="span">[Eshop]</Typography>
                        </NavLink>
                        <NavLink to="/types" className={classes.link} activeClassName={classes.activeLink}>
                            <Typography variant="body2" elemet="span">[Zorganizuj se]</Typography>
                        </NavLink>
                        <NavLink to="/eshop/contact" className={classes.link} activeClassName={classes.activeLink}>
                            <Typography variant="body2" elemet="span">[Kontakt]</Typography>
                        </NavLink>
                        <NavLink to="/eshop/shopping-cart" className={classes.link} activeClassName={classes.activeLink}>
                            <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </StyledBadge>
                            </IconButton>
                        </NavLink>
                    </nav>
                </Toolbar>
            </AppBar>
            <Jumbotron img='https://source.unsplash.com/user/erondu' />
        </>
    );
};

export default withStyles(styles)(Header);