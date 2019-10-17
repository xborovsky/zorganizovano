import React, { useState } from 'react';
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
    },
    secondaryImage : {
        cursor : 'pointer'
    }
});

const ImageGallery = ({
    images,
    mainImageIdx = 0,
    classes,
    className
}) => {
    const [mainImage, setMainImage] = useState(images[mainImageIdx]);

    const handleImageClick = idx => {
        setMainImage(images[idx]);
    };

    return (
        <Card className={className}>
            <Grid container>
                <Grid item xs={12}>
                    <img src={mainImage.src} alt={mainImage.alt} title={mainImage.title} className={classes.mainImage} />
                </Grid>
                <Grid item xs={12}>
                    <GridList cols={2.5} className={classes.gridList}>
                        {
                            images.map((image, idx) =>(
                                <img key={image.src}
                                     src={image.src}
                                     alt={image.alt}
                                     title={image.title}
                                     className={classes.secondaryImage}
                                     onClick={() => handleImageClick(idx)}
                                />
                            ))
                        }
                    </GridList>
                </Grid>
            </Grid>
        </Card>
    );
};

ImageGallery.propTypes = {
    images : PropTypes.arrayOf(
        PropTypes.shape({
            src : PropTypes.string.isRequired,
            alt : PropTypes.string.isRequired,
            title : PropTypes.string
        })
    ).isRequired,
    mainImageIdx : PropTypes.number
};

export default withStyles(styles)(ImageGallery);