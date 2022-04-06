import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LabelIcon from '@mui/icons-material/Label';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ImageIcon from '@mui/icons-material/Image';
import BuildIcon from '@mui/icons-material/Build';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GirlIcon from '@mui/icons-material/Girl';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SanitizerIcon from '@mui/icons-material/Sanitizer';

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
        case 'štítky české':
        case 'štítky obrázkové':
        case 'štítky slovenské': 
            return <LabelIcon />;
        case 'poukazy': return <CardGiftcardIcon />;
        case 'dětský pokoj': return <ChildFriendlyIcon />;
        case 'tvoření': return <ContentCutIcon />;
        case 'stavebnice': return <BuildIcon />;
        case 'doprava': return <DirectionsBusIcon />;
        case 'výuka': return <SchoolIcon />;
        case 'profese': return <LocalPoliceIcon />;
        case 'figurky': return <ChildCareIcon />;
        case 'hra': return <SportsEsportsIcon />;
        case 'děvčata': return <GirlIcon />;
        case 'rozprašovače': return <SanitizerIcon />;
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