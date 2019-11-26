import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Hidden from '@material-ui/core/Hidden';
import { Grid } from '@material-ui/core';

//import ShoppingCartContext from '../pages/eshop/shopping-cart/state-management/ShoppingCartContext';
import Jumbotron from './Jumbotron';
import ActiveLink from '~components/ActiveLink';

const styles = theme => ({
    appBar: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
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
        flexGrow: 1,
        textTransform : 'uppercase',
        color : '#fff',
        marginLeft : '2vw',
        display : 'flex',
        alignItems : 'center',
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
    //const { state } = useContext(ShoppingCartContext);
    //const totalPrice = state.reduce((a, b) => a + ((b['price'] || 0) * b['quantity']), 0);
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarContent}>
                        <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                            <ActiveLink href="/">
                                <a className={classes.linkNoDecoration} href="/">
                                    Zorganizováno
                                </a>
                            </ActiveLink>
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
                            <ActiveLink href="/eshop" activeClassName={classes.activeLink}>
                                <a className={classes.link} href="/eshop">
                                    <Typography variant="body2" element="span">[ Eshop ]</Typography>
                                </a>
                            </ActiveLink>
                            <ActiveLink href="/tips" activeClassName={classes.activeLink}>
                                <a className={classes.link} href="/tips">
                                    <Typography variant="body2" element="span">[ U nás doma ]</Typography>
                                </a>
                            </ActiveLink>
                            <ActiveLink href="/contact" activeClassName={classes.activeLink}>
                                <a className={classes.link} href="/contact">
                                    <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                                </a>
                            </ActiveLink>
                            <ActiveLink href="/shopping-cart" activeClassName={classes.activeLink}>
                                <a className={[classes.link, classes.shoppingCartLink].join(' ')} href="/shopping-cart">
                                    {/*<Typography variant="body2" element="span">{ totalPrice },-</Typography>*/}
                                    <Typography variant="body2" element="span">{ 0 },-</Typography>
                                    <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                        {/*<StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                        </StyledBadge>*/}
                                    </IconButton>
                                </a>
                            </ActiveLink>
                        </nav>
                    </Hidden>
                    <Hidden mdUp>
                        { showMobileMenu &&
                            <nav className={classes.mobileNav}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ActiveLink href="/eshop" activeClassName={classes.activeLink}>
                                            <a className={classes.link} href="/eshop">
                                                <Typography variant="body2" element="span">[ Eshop ]</Typography>
                                            </a>
                                        </ActiveLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ActiveLink href="/tips" activeClassName={classes.activeLink}>
                                            <a className={classes.link} href="/tips">
                                                <Typography variant="body2" element="span">[ U nás doma ]</Typography>
                                            </a>
                                        </ActiveLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ActiveLink href="/contact" activeClassName={classes.activeLink}>
                                            <a className={classes.link} href="/contact">
                                                <Typography variant="body2" element="span">[ Kontakt ]</Typography>
                                            </a>
                                        </ActiveLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ActiveLink href="/shopping-cart" activeClassName={classes.activeLink}>
                                            <a className={[classes.link, classes.shoppingCartLink].join(' ')} href="/shopping-cart">
                                                {/*<Typography variant="body2" element="span">{ totalPrice },-</Typography>*/}
                                                <Typography variant="body2" element="span">{ 0 },-</Typography>
                                                <IconButton aria-label="cart" className={classes.shoppingCartIcon}>
                                                    {/*<StyledBadge badgeContent={state.reduce((a, b) => a + b.quantity, 0)} color="primary" className={classes.badge} max={99}>
                                                        <FontAwesomeIcon icon={faShoppingCart} />
                                                    </StyledBadge>*/}
                                                </IconButton>
                                            </a>
                                        </ActiveLink>
                                    </Grid>
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