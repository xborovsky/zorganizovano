import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import withStyles from '@material-ui/styles/withStyles';
import Link from 'next/link';
import format from 'string-template';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';

import withPublicLayout from '~/components/hoc/withPublicLayout';
import BreadcrumbsNav from '~/components/BreadcrumbsNav';
//import { screenWidth, dpr } from '~/util/img-util';

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
            <BreadcrumbsNav items={[{ link : '/public/tips', name : 'U nás doma' }, { name : tip.title }]} />
            <Paper className={classes.root}>
                <Typography variant="h1">{ tip.title }</Typography>
                <span>{ tip.publishedFormatted }</span>
                <Typography variant="body1" component="div" className={classes.blogPost}>
                    { /*ReactHtmlParser(format(data.content, { screenWidth, dpr, widthPct }))*/ }
                    { ReactHtmlParser(format(tip.content, { screenWidth : 1920, dpr : 1, widthPct })) }
                </Typography>
                { (tip.linkHref && tip.linkContent) &&
                    <Link href={tip.linkHref}>
                        <a href={tip.linkHref} className={classes.additionalLink}>
                            { ReactHtmlParser(format(tip.linkContent, { screenWidth : 1920, dpr : 1, widthPct })) }
                        </a>
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

TipDetail.getInitialProps = async ({ query }) => {
    const id = query.id;
    const tip = await axios.get(`/blog/posts/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            return null;
        });

    return { tip };
};

export default withPublicLayout(withStyles(styles)(TipDetail));