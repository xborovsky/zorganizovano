import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableCell, TableBody, TableRow, makeStyles } from '@material-ui/core';

import useFetchAuth from '../../../../hooks/use-fetch-auth';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import Price from 'components/Price';
import StockItemDetailsTable from './StockItemDetailsTable';
import StockItemPicturesTable from './StockItemPicturesTable';

const useStyles = makeStyles({
    root: {
      width: '95vw',
      overflowX: 'auto',
      margin : '20px auto'
    }
});

const StockItemDetail = ({ id }) => {
    const classes = useStyles();
    const { isLoading, data, error:fetchError } = useFetchAuth(['admin-stock-item', id], `/admin/stock-items/${id}`);

    if (isLoading) {
        return <Loader />;
    } else if (fetchError || !data) {
        return <Alert type='error'>Problém při načítání dat ze serveru.</Alert>;
    }

    return(
        <Paper className={classes.root}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><strong>Název</strong></TableCell>
                        <TableCell>
                            { data.name }
                            <br />
                            { data.subName }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Popis</strong></TableCell>
                        <TableCell>{ data.description }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>SEO Popis</strong></TableCell>
                        <TableCell>{ data.metaTitle }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Cena</strong></TableCell>
                        <TableCell><Price value={data.price} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Povolit online doručení</strong></TableCell>
                        <TableCell>{ data.enableOnlineShipment ? 'ANO' : 'NE' }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Kategorie</strong></TableCell>
                        <TableCell>{ data.itemCategory.name }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Detaily</strong></TableCell>
                        <TableCell>
                           <StockItemDetailsTable details={data.itemDetails} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Cloudinary název obrázku pro náhled</strong></TableCell>
                        <TableCell>{ data.thumbnailLocation }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Obrázky</strong></TableCell>
                        <TableCell><StockItemPicturesTable pictures={data.pictures} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

StockItemDetail.propTypes = {
    id : PropTypes.number.isRequired
};

export default StockItemDetail;