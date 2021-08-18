import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { paymentPropTypes } from './payment.prop-types';

const PaymentInfo = ({ paymentData }) => (
    <Table>
        <TableBody>
            <TableRow>
                <TableCell>Číslo účtu:</TableCell>
                <TableCell>{ paymentData.accountNumber }/{ paymentData.bankCode }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Částka:</TableCell>
                <TableCell>{ paymentData.amount },- Kč</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Variabilní symbol:</TableCell>
                <TableCell>{ paymentData.variableSymbol }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Datum splatnosti:</TableCell>
                <TableCell>{ new Date(paymentData.date).toLocaleDateString() }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>Pouze pro zahraniční platbu použijte následující údaje:</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>IBAN:</TableCell>
                <TableCell>{ paymentData.iban }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>BIC:</TableCell>
                <TableCell>{ paymentData.bic }</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

PaymentInfo.propTypes = {
    paymentPropTypes
};

export default PaymentInfo;