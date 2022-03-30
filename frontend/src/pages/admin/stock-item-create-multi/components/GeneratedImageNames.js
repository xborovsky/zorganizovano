import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Paper } from '@material-ui/core';

const buildImageName = (imageName, prefix, suffix) => {
    let ret = '';
    if (prefix) {
        ret += `${prefix}_`;
    }
    ret += imageName;
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
}) => (
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

GeneratedImageNames.propTypes =  {
    namePrefix : PropTypes.string,
    nameSuffix : PropTypes.string,
    itemNames : PropTypes.arrayOf(PropTypes.string)
};

export default GeneratedImageNames;