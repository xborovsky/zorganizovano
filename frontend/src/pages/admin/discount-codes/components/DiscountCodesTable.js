import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    root: {
      width: '95vw',
      overflowX: 'auto',
      margin : '20px auto'
    },
    table: {
      minWidth: 650
    },
    tableHead : {
        backgroundColor : '#ddd'
    },
    tableHeadSearch : {
        backgroundColor : '#fff'
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
const getComparator = (order, orderBy) => {
    if (orderBy === 'validUntil') {
        return order === 'asc' ? 
            (a, b) => descendingComparator(a, b, orderBy) :
            (a, b) => -descendingComparator(a, b, orderBy);    
    }

    return order === 'desc' ? 
        (a, b) => descendingComparator(a, b, orderBy) :
        (a, b) => -descendingComparator(a, b, orderBy);
};
  
const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const headCells = [
    { id: 'code', label: 'Kód' },
    { id: 'discount', label: 'Sleva' },
    { id: 'validUntil', label: 'Platnost do' },
    { id: 'oneTime', label: 'Jednorázový' }
  ];

const DiscountCodesTable = ({ 
    discountCodes,
    onDelete
}) => {
    const classes = useStyles();
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ page, setPage ] = useState(0);
    const [ orderBy, setOrderBy ] = useState('validUntil');
    const [ order, setOrder ] = useState('desc');
    const [ searchFilter, setSearchFilter ] = useState('');
    const discountCodesFiltered = discountCodes.filter(dc => searchFilter.length === 0 ? true : dc.code.includes(searchFilter));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchFilterChange = e => setSearchFilter(e.currentTarget.value);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow className={classes.tableHeadSearch}>
                        <TableCell colSpan={6}>
                            <TextField 
                                value={searchFilter}
                                placeholder="Vyhledejte slevový kód"
                                onChange={handleSearchFilterChange}
                                fullWidth
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        { headCells.map(headCell => (
                            <TableCell sortDirection={orderBy === headCell.id ? order : false} key={headCell.id}>
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={handleRequestSort(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        )) }
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { stableSort(discountCodesFiltered, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((discountCode, cnt) => (
                        <TableRow key={discountCode.id} style={{ backgroundColor : discountCode.used ? '#ddd' : '#fff' }}>
                            <TableCell>{ page * rowsPerPage + cnt + 1 }</TableCell>
                            <TableCell>{ discountCode.code }</TableCell>
                            <TableCell>{ discountCode.discount }{ discountCode.percentage ? '%' : ',-Kč' }</TableCell>
                            <TableCell>{ discountCode.validUntil && format(new Date(discountCode.validUntil), 'dd.MM.yyyy HH:mm:ss') }</TableCell>
                            <TableCell>
                                { discountCode.oneTime ?
                                    <CheckIcon titleAccess="Jednorázový" /> :
                                    <ClearIcon titleAccess="Na více použití" />
                                }
                            </TableCell>
                            <TableCell>
                                <DeleteIcon 
                                    onClick={onDelete(discountCode.id, discountCode.code)}
                                    style={{ cursor : 'pointer' }}
                                    titleAccess='Odstranit'
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={discountCodesFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

DiscountCodesTable.propTypes = {
    discountCodes : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        code : PropTypes.string.isRequired,
        discount : PropTypes.number.isRequired,
        validUntil : PropTypes.any,
        oneTime : PropTypes.bool,
        used : PropTypes.bool,
        percentage : PropTypes.bool
    })),
    onDelete : PropTypes.func.isRequired
};

export default DiscountCodesTable;