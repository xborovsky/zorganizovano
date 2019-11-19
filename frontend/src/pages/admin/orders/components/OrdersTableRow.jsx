import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const OrdersTableRow = ({
    rowNum,
    id,
    orderNum,
    created,
    processed,
    shipped
}) => (
    <TableRow>
        <TableCell>{rowNum}</TableCell>
        <TableCell><FontAwesomeIcon icon={faSearch} /></TableCell>
        <TableCell>{orderNum}</TableCell>
        <TableCell>{created}</TableCell>
        <TableCell>TODO</TableCell>
        <TableCell>{processed}</TableCell>
        <TableCell>{shipped}</TableCell>
    </TableRow>
);

OrdersTableRow.propTypes = {
    rowNum : PropTypes.number.isRequired,
    id : PropTypes.number.isRequired,
    orderNum : PropTypes.number.isRequired,
    created : PropTypes.string.isRequired,
    processed : PropTypes.string,
    shipped : PropTypes.string
};

export default OrdersTableRow;