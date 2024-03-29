import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
                <TableCell colSpan={2}>Pro <strong>ZAHRANIČNÍ platbu v CZK</strong> použijte následující údaje:</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>IBAN:</TableCell>
                <TableCell>{ paymentData.iban }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>BIC:</TableCell>
                <TableCell>{ paymentData.bic }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>Pro <strong>ZAHRANIČNÍ platbu v EUR s přepočtem na dnešní kurz ČNB</strong> použijte následující údaje:</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>IBAN:</TableCell>
                <TableCell>CZ29 2010 0000 0028 0217 8635</TableCell>
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