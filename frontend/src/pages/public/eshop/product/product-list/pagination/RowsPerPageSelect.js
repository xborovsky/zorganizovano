import React, { useContext } from 'react';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PaginationContext from './PaginationContext';

const PAGE_SIZES = [9, 18, 27, 36];

const useStyles = makeStyles((theme) => ({
    select: {
        margin: theme.spacing(1),
        minWidth: 80
    },
    selectSmDown : {
        margin: theme.spacing(1),
        minWidth: 80,
        float : 'right'
    }
}));

const RowsPerPageSelect = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const { pageSize, setPageSize } = useContext(PaginationContext);

    const handlePageSizeChange = e => setPageSize(e.target.value);

    return (
        <div className={isSmDown ? classes.selectSmDown : classes.select}>
            <span style={{ marginRight : 10 }}>Na stránku:</span>
            <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                disableUnderline>
                    { PAGE_SIZES.map(pageSize => (
                        <MenuItem value={pageSize} key={pageSize}>{pageSize}</MenuItem>
                    )) }
            </Select>
        </div>
    );
};

export default RowsPerPageSelect;