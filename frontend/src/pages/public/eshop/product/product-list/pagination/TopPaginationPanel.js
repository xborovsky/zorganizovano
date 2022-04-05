import React from 'react';
import { Grid } from '@mui/material';

import { makeStyles } from '@mui/styles';

import Pagination from './Pagination';
import RowsPerPageSelect from './RowsPerPageSelect';

const useStyles = makeStyles((theme) => ({
    container : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom : '1rem'
    }
}));

const TopPaginationPanel = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={6}>
                <RowsPerPageSelect />
            </Grid>
            <Grid item xs={12} md={6} style={{ float : 'right' }}>
                <Pagination />
            </Grid>
        </Grid>
    );
};

export default TopPaginationPanel;