import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

const TipDetail = ({ tip }) => {

    return (
        <Paper>
            <h1>{ tip.title }</h1>
            <span>{ tip.publishedFormatted }</span>
            <div>
                { ReactHtmlParser(tip.content) }
            </div>
        </Paper>
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

export default TipDetail;