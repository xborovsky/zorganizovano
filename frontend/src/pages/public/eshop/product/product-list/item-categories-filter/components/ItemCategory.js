import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LabelIcon from '@material-ui/icons/Label';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
    root : {
        textAlign : 'center',
    },
    btn : {
        backgroundColor : '#ddd',
        paddingTop : '0.6rem',
        paddingBottom : '0.6rem'
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