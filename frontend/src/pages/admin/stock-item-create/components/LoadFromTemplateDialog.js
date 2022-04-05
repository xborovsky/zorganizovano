import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, ListItemText } from '@mui/material';

import { makeStyles } from '@mui/styles';

import useFetchAuth from '../../../../hooks/use-fetch-auth';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
      },
});

const LoadFromTemplateDialog = ({
    onClose,
    onSelect
}) => {
    const classes = useStyles();
    const { data, isLoading, error } = useFetchAuth('admin-stock-items', '/admin/stock-items');
    const handleSelectClick = id => e => onSelect(id);

    return (
        <Dialog open={true} onClose={onClose} maxWidth='md' fullWidth>
            <DialogTitle>
                Vyberte položku jako šablonu
                <IconButton onClick={onClose} className={classes.closeButton} size="large">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} style={{ marginTop : 10, marginBottom : 10 }}>
                        { error && <Alert type='error'>Problém načítání dat ze servru</Alert> }
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : 10 }}>
                        { isLoading ?
                            <Loader /> :
                            <List component="nav">
                                {
                                    data.map(stockItem => (
                                        <ListItem 
                                            button 
                                            key={stockItem.id} 
                                            onClick={handleSelectClick(stockItem.itemId)}
                                        >
                                            <ListItemText 
                                                primary={stockItem.name} 
                                                secondary={stockItem.subName}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                    }
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

LoadFromTemplateDialog.propTypes = {
    onClose : PropTypes.func.isRequired,
    onSelect : PropTypes.func.isRequired
};

export default LoadFromTemplateDialog;