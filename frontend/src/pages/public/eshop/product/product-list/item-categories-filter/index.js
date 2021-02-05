import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import ItemCategory from './components/ItemCategory';

const ItemCategoriesFilter = ({ 
    categories, 
    onCategoryClick 
}) => (
    <Grid container style={{ marginBottom : '2rem' }}>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                { categories.map(category => (
                    <ItemCategory
                        name={category.name}
                        id={category.id}
                        onClick={onCategoryClick}
                        key={category.id}
                    />
                ))}
            </Grid>
        </Grid>
    </Grid>
);

ItemCategoriesFilter.propTypes = {
    categories : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired,
        id : PropTypes.number.isRequired
    })),
    onCategoryClick : PropTypes.func.isRequired
};

export default ItemCategoriesFilter;