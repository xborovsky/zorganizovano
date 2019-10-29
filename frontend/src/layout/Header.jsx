import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Hidden from '@material-ui/core/Hidden';

import ShoppingCartContext from '../pages/eshop/shopping-cart/state-management/ShoppingCartContext';
import Jumbotron from 'layout/Jumbotron';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    appBar: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
        position : 'fixed'
    },
    toolbar: {
        flexWrap: 'wrap',
        alignItems : 'stretch',
        [theme.breakpoints.down('xs')] : {
            paddingLeft : '0 !important',
            paddingRight : '0 !important'
        }
    },
    toolbarTitle: {
        flexGrow: 1,
        textTransform : 'uppercase',
        color : '#fff',
        marginLeft : '2vw',
        display : 'flex',
        alignItems : 'center',
        [theme.breakpoints.down('sm')] : {
            margin : '.7rem auto',
            display : 'block',
            flexGrow : 0
        }
    },
    link: {
        padding : '0 1.5rem',
        color : '#fff',
        textTransform : 'uppercase',
        display : 'flex',
        alignItems : 'center',
        textDecoration : 'none !important',
        '&:active' : {
            backgroundColor : 'rgba(46, 75, 20, .8)'
        },
        '&:hover' : {
            backgroundColor : 'rgba(46, 75, 20, .8)'
        },
        [theme.breakpoints.down('sm')] : {
            justifyContent : 'center',
            paddingTop : '.5rem',
            paddingBottom : '.5rem'
        }
    },
    activeLink : {
        backgroundColor : 'rgba(46, 75, 20, .8)'
    },
    shoppingCartIcon : {
        color : '#fff',
        fontSize : 14,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    shoppingCartLink : {
        textDecoration : 'none !important'
    },
    nav : {
        display : 'flex',
        alignItems : 'stretch'
    },
    linkNoDecoration : {
        color : '#fff',
        textDecoration : 'none'
    },
    menuIcon : {
        color : '#fff',
        fontSize : 28,
        margin: '.5rem 1rem 0'
    },
    mobileNav : {
        display : 'flex'
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
    const totalPrice = state.reduce((a, b) => a + ((b['price'] || 0) * b['quantity']), 0);
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                        <NavLink to="/" className={classes.linkNoDecoration} exact onClick={() => setShowMobileMenu(false)}>
                            Zorganizováno
                        </NavLink>
                    </Typography>
                    <Hidden smDown>
                        <nav className={classes.nav}>
                            <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Eshop ]</Typography>
                            </NavLink>
                            <NavLink to="/tips" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Zorganizuj se ]</Typography>
                            </NavLink>
                            <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                            </NavLink>
                            <NavLink to="/eshop/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                                <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                    <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </StyledBadge>
                                </IconButton>
                            </NavLink>
                        </nav>
                    </Hidden>
                    <Hidden mdUp>
                        { showMobileMenu ?
                            <>
                                <MenuOpenIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(false)} />
                                <nav className={classes.mobileNav}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                                <Typography variant="body2" element="span">[ Eshop ]</Typography>
                                            </NavLink>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <NavLink to="/types" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                                <Typography variant="body2" element="span">[ Zorganizuj se ]</Typography>
                                            </NavLink>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                                <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                                            </NavLink>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <NavLink to="/eshop/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                                <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                                                <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                                    <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                                        <FontAwesomeIcon icon={faShoppingCart} />
                                                    </StyledBadge>
                                                </IconButton>
                                            </NavLink>
                                        </Grid>
                                    </Grid>
                                </nav>
                                TODO
                            </> :
                            <MenuIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(true)} />
                        }
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Jumbotron img='https://source.unsplash.com/user/erondu' />
        </>
    );
};

export default withStyles(styles)(Header);