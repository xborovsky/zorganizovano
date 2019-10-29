import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { withStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    root : {
        padding : '1rem 2rem'
    },
    breadcrumbsWrapper : {
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
});

const TipDetail = ({ tip, classes }) => {

    return (
        <>
            <div className={classes.breadcrumbsWrapper}>
                <Paper elevation={0}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <Link to="/tips">Tipy</Link>
                        <Typography>{ tip.title }</Typography>
                    </Breadcrumbs>
                </Paper>
            </div>
            <Paper className={classes.root}>
                <Typography variant="h1">{ tip.title }</Typography>
                <span>{ tip.publishedFormatted }</span>
                <Typography variant="body1" component="div">
                    { ReactHtmlParser(tip.content) }
                </Typography>
            </Paper>
        </>
    );
};

TipDetail.propTypes = {
    tip : PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        publishedFormatted : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired
    }).isRequired
}

export default withStyles(styles)(TipDetail);