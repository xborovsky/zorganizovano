import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Hidden from '@mui/material/Hidden';

import useShoppingCartContext from '../pages/public/eshop/shopping-cart/state-management/use-shopping-cart-context';
import Jumbotron from 'layout/Jumbotron';
import { Grid } from '@mui/material';

const styles = theme => ({
    appBar: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
        position : 'fixed',
        zIndex : 10
    },
    toolbar: {
        display : 'flex',
        alignItems : 'stretch',
        [theme.breakpoints.down('md')] : {
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
        flexGrow: 1,
        textTransform : 'uppercase',
        color : '#fff',
        marginLeft : '2vw',
        display : 'flex',
        alignItems : 'center',
        [theme.breakpoints.down('md')] : {
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
            backgroundColor : '#ededed',
            color : 'black'
        },
        '&:hover' : {
            backgroundColor : '#ededed',
            color : 'black'
        },
        [theme.breakpoints.down('md')] : {
            justifyContent : 'center',
            paddingTop : '.5rem',
            paddingBottom : '.5rem'
        }
    },
    activeLink : {
        backgroundColor : '#ededed',
        color : 'black'
    },
    shoppingCartIcon : {
        color : 'inherit',
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
        backgroundColor : '#971c3c',
        color : '#fff',
        fontSize : '10pt',
        transform : 'scale(0.9) translate(70%, -70%)'
    }
}))(Badge);

const Header = ({ classes }) => {
    const { state } = useShoppingCartContext();
    const totalPrice = state.reduce((a, b) => a + ((b['price'] || 0) * b['quantity']), 0);
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);

    return <>
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarContent}>
                    <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                        <NavLink to="/" className={classes.linkNoDecoration} exact onClick={() => setShowMobileMenu(false)}>
                            Zorganizováno
                        </NavLink>
                    </Typography>
                    <Hidden mdUp>
                        { showMobileMenu ?
                            <MenuOpenIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(false)} /> :
                            <MenuIcon className={classes.menuIcon} onClick={() => setShowMobileMenu(true)} />
                        }
                    </Hidden>
                </div>
                <Hidden mdDown>
                    <nav className={classes.nav}>
                        <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink}>
                            <Typography variant="body2" element="span">[ Eshop ]</Typography>
                        </NavLink>
                        <NavLink to="/tips" className={classes.link} activeClassName={classes.activeLink}>
                            <Typography variant="body2" element="span">[ U nás doma ]</Typography>
                        </NavLink>
                        <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink}>
                            <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                        </NavLink>
                        <NavLink to="/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink}>
                            <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                            <IconButton aria-label="cart" className={classes.shoppingCartIcon} size="large">
                                <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </StyledBadge>
                            </IconButton>
                        </NavLink>
                    </nav>
                </Hidden>
                <Hidden mdUp>
                    { showMobileMenu &&
                        <nav className={classes.mobileNav}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <NavLink to="/eshop" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                        <Typography variant="body2" element="span">[ Eshop ]</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item xs={12}>
                                    <NavLink to="/tips" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                        <Typography variant="body2" element="span">[ U nás doma ]</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item xs={12}>
                                    <NavLink to="/contact" className={classes.link} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                        <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item xs={12}>
                                    <NavLink to="/shopping-cart" className={[classes.link, classes.shoppingCartLink].join(' ')} activeClassName={classes.activeLink} onClick={() => setShowMobileMenu(false)}>
                                        <Typography variant="body2" element="span">{ totalPrice },-</Typography>
                                        <IconButton aria-label="cart" className={classes.shoppingCartIcon} size="large">
                                            <StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </StyledBadge>
                                        </IconButton>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </nav>
                    }
                </Hidden>
            </Toolbar>
        </AppBar>
        <Jumbotron src='jumbotron.jpg' />
    </>;
};

export default withStyles(styles)(Header);