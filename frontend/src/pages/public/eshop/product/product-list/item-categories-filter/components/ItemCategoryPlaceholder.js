import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';

const useStyles = makeStyles(theme => ({
    root : {
        textAlign : 'center',
        filter: 'blur(1px)'
    },
    btnContent : {
        filter: 'blur(2px)',
    },
    btnText : {
        fontSize : '1rem'
    },
    btn : {
        backgroundColor : '#ddd',
        paddingTop : '0.6rem',
        paddingBottom : '0.6rem'
    }
}));

const ItemCategoryPlaceholder = () => {
    const classes = useStyles();

    return (
        <Grid item xs={6} md={4} lg={2} className={classes.root}>
            <Button variant="outlined" disabled startIcon={<PanoramaIcon />} fullWidth className={classes.btn}>
                <div className={classes.btnContent}>
                    <span className={classes.btnText}>Načítání...</span>
                </div>
            </Button>
        </Grid>
    );
};

export default ItemCategoryPlaceholder;