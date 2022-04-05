import React from 'react';
import { Grid, Hidden } from '@mui/material';

import { makeStyles } from '@mui/styles';

import Pagination from './Pagination';
import PaginationInfo from './PaginationInfo';

const useStyles = makeStyles((theme) => ({
    container : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop : '2rem'
    },
    containerSmDown : {
        marginTop : '2rem',
        textAlign : 'right'
    }
}));

const BottomPaginationPanel = () => {
    const classes = useStyles();

    return <>
        <Hidden mdDown>
            <Grid container className={classes.container}>
                <Grid item>
                    <PaginationInfo />
                </Grid>
                <Grid item style={{ float : 'right' }}>
                    <Pagination />
                </Grid>
            </Grid>
        </Hidden>
        <Hidden mdUp>
            <Grid container className={classes.containerSmDown}>
                <Grid item xs={12} style={{ float : 'right' }}>
                    <Pagination />
                </Grid>
                <Grid item xs={12} style={{ float : 'right', marginTop : 10 }}>
                    <PaginationInfo />
                </Grid>
            </Grid>
        </Hidden>
    </>;
};

export default BottomPaginationPanel;