import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    mainImage : {
        width : '100%'
    }
});

const ImageGallery = ({
    mainImage,
    secondaryImages,
    classes
}) => (
    <Card>
        <Grid container>
            <Grid item xs={12}>
                <img src={mainImage.src} alt={mainImage.alt} title={mainImage.title} className={classes.mainImage} />
            </Grid>
            <Grid item xs={12}>
                <GridList cols={2.5} className={classes.gridList}>
                    {
                        secondaryImages.map(image =>(
                            <img src={image.src} alt={image.alt} title={image.title} />
                        ))
                    }
                </GridList>
            </Grid>
        </Grid>
    </Card>
);

ImageGallery.propTypes = {
    mainImage : PropTypes.shape({
        src : PropTypes.string.isRequired,
        alt : PropTypes.string.isRequired,
        title : PropTypes.string
    }),
    secondaryImages : PropTypes.arrayOf(
        PropTypes.shape({
            src : PropTypes.string.isRequired,
            alt : PropTypes.string.isRequired,
            title : PropTypes.string
        })
    ).isRequired
};

export default withStyles(styles)(ImageGallery);