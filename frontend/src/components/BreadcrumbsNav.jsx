import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
    root : {
        marginBottom : '1rem',
        display : 'flex'
    },
    paper : {
        padding: '3px 20px',
        background: '#eee'
    }
});

const BreadcrumbsNav = ({ items, classes }) => (
    <div className={classes.root}>
        <Paper elevation={0} className={classes.paper}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <Link to='/'><HomeIcon /></Link>
                {
                    items.map(item => (
                        item.link ?
                            <Link to={item.link} key={item.name}>{item.name}</Link> :
                            <Typography key={item.name}>{ item.name }</Typography>
                    ))
                }
            </Breadcrumbs>
        </Paper>
    </div>
);

BreadcrumbsNav.propTypes = {
    items : PropTypes.arrayOf(
        PropTypes.shape({
            link : PropTypes.string,
            name : PropTypes.string.isRequired
        })
    ).isRequired
};

export default withStyles(styles)(BreadcrumbsNav);