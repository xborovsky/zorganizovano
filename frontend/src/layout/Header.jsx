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

import ShoppingCartContext from '../pages/public/eshop/shopping-cart/state-management/ShoppingCartContext';
import Jumbotron from 'layout/Jumbotron';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    appBar: {
        backgroundColor : 'rgba(171, 96, 73, 0.8)',
        position : 'fixed'
    },
    toolbar: {
        display : 'flex',
        alignItems : 'stretch',
        [theme.breakpoints.down('sm')] : {
            flexDirection : 'column',
            justifyContent : 'center',
            paddingLeft : '0 !important',
            paddingRight : '0 !important',
            paddingTop: '9px !important',
            paddingBottom : '9px !important'
        }
    },
    toolbarContent : {
        display : 'flex',
        alignItems : 'center'
    },
    toolbarTitle: {
        fontFamily: "'Michroma', sans-serif",
        flexGrow: 1,
        textTransform : 'uppercase',
        color : '#fff',
        marginLeft : '2vw',
        display : 'flex',
        alignItems : 'center',
        fontSize : '18pt',
        [theme.breakpoints.down('sm')] : {
            margin : '.7rem auto .7rem 1rem',
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
            backgroundColor : 'rgba(131, 53, 0, .7)'
        },
        '&:hover' : {
            backgroundColor : 'rgba(131, 53, 0, .7)'
        },
        [theme.breakpoints.down('sm')] : {
            justifyContent : 'center',
            paddingTop : '.5rem',
            paddingBottom : '.5rem'
        }
    },
    activeLink : {
        backgroundColor : 'rgba(131, 53, 0, .7)'
    },
    shoppingCartIcon : {
        color : '#fff',
        fontSize : 14,
        padding : '0 !important',
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    shoppingCartLink : {
        textDecoration : 'none !important'
    },
    nav : {
        display : 'flex',
        alignItems : 'stretch',
        marginLeft : 'auto'
    },
    linkNoDecoration : {
        color : '#fff',
        textDecoration : 'none'
    },
    menuIcon : {
        color : '#fff',
        fontSize : 28,
        margin: '0 1rem 0'
    },
    mobileNav : {
        display : 'flex'
    }
});

const StyledBadge = withStyles(theme => ({
    badge : {
        backgroundColor : '#c6bcb2',
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
                    <div className={classes.toolbarContent}>
                        <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                            <NavLink to="/" className={classes.linkNoDecoration} exact onClick={() => setShowMobileMenu(false)}>
                                Livy
                            </NavLink>
                        </Typography>
                        <Hidden mdUp>
                            { showMobileMenu ?
                                <MenuOpenIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(false)} /> :
                                <MenuIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(true)} />
                            }
                        </Hidden>
                    </div>
                    <Hidden smDown>
                        <nav className={classes.nav}>
                            <NavLink to="/events" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Kdy a kde se uvidíme ]</Typography>
                            </NavLink>
                            {/*<NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Eshop ]</Typography>
                            </NavLink>
                            <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                            </NavLink>
                            <NavLink to="/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink}>
                                <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                                <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                    <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </StyledBadge>
                                </IconButton>
                            </NavLink>*/}
                        </nav>
                    </Hidden>
                    <Hidden mdUp>
                        { showMobileMenu &&
                            <nav className={classes.mobileNav}>
                                <Grid container>
                                    {/*<Grid item xs={12}>
                                        <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                            <Typography variant="body2" element="span">[ Eshop ]</Typography>
                                        </NavLink>
                                    </Grid>*/}
                                    <Grid item xs={12}>
                                        <NavLink to="/events" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                            <Typography variant="body2" element="span">[ Kdy a kde se uvidíme ]</Typography>
                                        </NavLink>
                                    </Grid>
                                    {/*<Grid item xs={12}>
                                        <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                            <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <NavLink to="/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                            <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                                            <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                                <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </StyledBadge>
                                            </IconButton>
                                        </NavLink>
                                    </Grid>*/}
                                </Grid>
                            </nav>
                        }
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Jumbotron src='jumbotron.jpg' />
        </>
    );
};

export default withStyles(styles)(Header);