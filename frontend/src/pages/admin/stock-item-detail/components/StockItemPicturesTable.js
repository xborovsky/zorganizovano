import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const StockItemPicturesTable = ({ pictures }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead style={{ backgroundColor : '#e8e8e8' }}>
                <TableRow>
                    <TableCell width="90%">Název v Cloudinary</TableCell>
                    <TableCell width="10%">Hlavní</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { pictures?.length > 0 ?
                    pictures.map(picture =>
                        <TableRow key={picture.src}>
                            <TableCell>{ picture.src }</TableCell>
                            <TableCell>
                                { picture.main ?
                                    <CheckCircleIcon style={{ color : 'green' }} /> :
                                    <CancelIcon style={{ color : 'red' }} />
                                }
                            </TableCell>
                        </TableRow>
                    ) :
                    <TableRow>
                        <TableCell style={{ textAlign : 'center' }} colSpan={2}>nic zde není...</TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    </TableContainer>
);

StockItemPicturesTable.propTypes = {
    pictures : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        main : PropTypes.bool,
        src : PropTypes.string.isRequired
    }))
};

export default StockItemPicturesTable;