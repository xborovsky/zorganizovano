import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LabelIcon from '@mui/icons-material/Label';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ImageIcon from '@mui/icons-material/Image';

const useStyles = makeStyles(theme => ({
    root : {
        textAlign : 'center',
    },
    btn : {
        backgroundColor : '#ddd',
        paddingTop : '0.6rem',
        paddingBottom : '0.6rem',
        color: 'rgba(0, 0, 0, 0.87)',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        '&:hover' : {
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
    }
}));

const getIcon = name => { // TODO toto asi casom inak...
    switch (name.toLowerCase()) {
        case 'kalendáře': return <EventNoteIcon />;
        case 'diáře': return <MenuBookIcon />;
        case 'plánovače': return <PlaylistAddCheckIcon />;
        case 'štítky': return <LabelIcon />;
        case 'poukazy': return <CardGiftcardIcon />;
        default: return <ImageIcon />;
    }
};

const ItemCategory = ({
    name,
    id,
    onClick
}) => {
    const classes = useStyles();

    return (
        <Grid item xs={6} md={4} lg={2} className={classes.root}>
            <Button 
                variant="outlined" 
                startIcon={getIcon(name)} 
                fullWidth 
                className={classes.btn} 
                onClick={onClick(id)}
            >
                <div>{name}</div>
            </Button>
        </Grid>
    );
};

ItemCategory.propTypes = {
    name : PropTypes.string.isRequired,
    id : PropTypes.number.isRequired,
    onClick : PropTypes.func.isRequired
};

export default ItemCategory;