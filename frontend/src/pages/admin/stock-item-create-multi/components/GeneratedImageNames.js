import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Paper } from '@mui/material';

const buildImageName = (imageName, prefix, suffix) => {
    let ret = '';
    if (prefix) {
        ret += `${prefix}_`;
    }
    ret += imageName.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (suffix) {
        ret += `_${suffix}`;
    }
    ret += '.jpg';

    return ret;
};

const GeneratedImageNames = ({
    namePrefix = '',
    nameSuffix = '',
    itemNames = []
}) => {
    if (((itemNames.length === 0) || itemNames.length === 1 && itemNames[0].length === 0)) {
        return <>Zatím nic...</>;
    }

    return (
        <Paper elevation={3} style={{ backgroundColor : '#eee' }}>
            <List>
                { itemNames.map(itemName => (
                    !!itemName &&
                        <ListItem key={itemName}>
                            { buildImageName(itemName, namePrefix, nameSuffix) }
                        </ListItem>
                ))}
            </List>
        </Paper>
    );
};

GeneratedImageNames.propTypes =  {
    namePrefix : PropTypes.string,
    nameSuffix : PropTypes.string,
    itemNames : PropTypes.arrayOf(PropTypes.string)
};

export default GeneratedImageNames;