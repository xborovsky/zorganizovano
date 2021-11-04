import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles({
    root : {
        marginLeft : '2rem',
        width : '6rem'
    }
});

const YearSelect = ({ availableYears, onYearChange }) => {
    const classes = useStyles();
    const [ year, setYear ] = useState(availableYears[0]);

    const handleYearChange = e => {
        const year = +e.target.value;
        setYear(year);
        onYearChange(year);
    }

    return (
        <FormControl className={classes.root}>
            <InputLabel id="year-label">Vyberte rok:</InputLabel>
            <Select
                labelId="year-label"
                id="year-select"
                value={year}
                label="Year"
                onChange={handleYearChange}
            >
                { availableYears.map(year => <MenuItem value={year} key={year}>{year}</MenuItem>) }
            </Select>
        </FormControl>
    );
};

YearSelect.propTypes = {
    availableYears : PropTypes.arrayOf(PropTypes.number),
    onYearChange : PropTypes.func.isRequired
};

export default YearSelect;