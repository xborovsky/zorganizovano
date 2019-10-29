import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    root : {
        marginBottom : '1rem'
    }
});

const BreadcrumbsNav = ({ items, classes }) => (
    <div className={classes.root}>
        <Paper elevation={0}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                {
                    items.map(item => (
                        item.link ?
                            <Link to={item.link}>{item.name}</Link> :
                            <Typography>{ item.name }</Typography>
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