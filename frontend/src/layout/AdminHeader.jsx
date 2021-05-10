import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from 'pages/admin/AuthProvider';

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
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
        cursor : 'pointer',
        '&:active' : {
            backgroundColor : '#777'
        },
        '&:hover' : {
            backgroundColor : '#777'
        },
        [theme.breakpoints.down('sm')] : {
            justifyContent : 'center',
            paddingTop : '.5rem',
            paddingBottom : '.5rem'
        }
    },
    nav : {
        display : 'flex',
        alignItems : 'stretch',
        marginLeft : 'auto'
    },
    linkNoDecoration : {
        color : '#fff',
        textDecoration : 'none'
    }
}));

const AdminHeader = () => {
    const classes = useStyles();
    const { auth, logout } = useContext(AuthContext);

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarContent}>
                        <Typography variant="body1" color="inherit" noWrap className={classes.toolbarTitle}>
                            <NavLink to="/" className={classes.linkNoDecoration} exact>
                                Zorganizováno - Admin konzole
                            </NavLink>
                        </Typography>
                    </div>
                    <nav className={classes.nav}>
                        { auth &&
                            <span className={classes.link} onClick={() => logout()}>
                                <Typography variant="body2" element="span"><FontAwesomeIcon icon={faPowerOff} /> Odhlásit</Typography>
                            </span>
                        }
                    </nav>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AdminHeader;