import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import withStyles from '@material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import format from 'string-template';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Helmet } from 'react-helmet';

import BreadcrumbsNav from 'components/BreadcrumbsNav';
import { screenWidth, dpr } from 'util/img-util';

const styles = theme => ({
    root : {
        padding : '1rem 2rem'
    },
    breadcrumbsWrapper : {
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    blogPost : {
        textAlign : 'justify',
        overflow : 'hidden',
        '&>p' : {
            textIndent : '3rem',
            [theme.breakpoints.down('xs')] : {
                textIndent : '2rem'
            }
        }
    },
    additionalLinkWrapper : {
        display : 'block'
    },
    additionalLink : {
        display : 'block',
        width : '25%',
        margin : '0 auto',
        '&>img' : {
            width : '100%'
        },
        [theme.breakpoints.down('xs')] : {
            width : '70%'
        },
        [theme.breakpoints.down('sm')] : {
            width : '50%'
        }
    }
});

const TipDetail = ({ tip, classes }) => {
    const matchesSmallDevice = useMediaQuery('(max-width:768px)');
    const widthPct = matchesSmallDevice ? 95 : 40;

    return (
        <>
            { tip.metaTitle &&
                <Helmet>
                    <meta name="description" content={tip.metaTitle} />
                </Helmet>
            }
            <BreadcrumbsNav items={[{ link : '/tips', name : 'U nás doma' }, { name : tip.title }]} />
            <Paper className={classes.root}>
                <Typography variant="h1">{ tip.title }</Typography>
                <span>{ tip.publishedFormatted }</span>
                <Typography variant="body1" component="div" className={classes.blogPost}>
                    { ReactHtmlParser(format(tip.content, { screenWidth, dpr, widthPct })) }
                </Typography>
                { (tip.linkHref && tip.linkContent) &&
                    <Link to={tip.linkHref} className={classes.additionalLink}>
                        { ReactHtmlParser(format(tip.linkContent, { screenWidth, dpr, widthPct })) }
                    </Link>
                }
            </Paper>
        </>
    );
};

TipDetail.propTypes = {
    tip : PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        publishedFormatted : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired,
        linkHref : PropTypes.string,
        linkContent : PropTypes.string
    }).isRequired
}

export default withStyles(styles)(TipDetail);