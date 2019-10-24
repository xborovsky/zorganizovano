import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import PaymentQR from './components/PaymentQR';
import PaymentInfo from './components/PaymentInfo';
import { withStyles } from '@material-ui/styles';
import Alert from 'components/Alert';

const styles = theme => ({
    block : {
        marginBottom : '2rem'
    },
    qrCodeWrapper : {
        textAlign : 'center'
    }
});

const OrderCreated = ({ classes }) => (
    <>
        <Alert type="success">Objednávka byla úspěšně vytvořena</Alert>
        <Typography variant="body1" className={classes.block}>
            Děkuji,<br /><br />
            Vaše objednávka byla úspěšně potvrzena. Zboží expedujeme po připsání platby
            na účet. Pokud platba nebude připsána do 5 pracovních dnů, objednávka bude
            automaticky zrušena.
        </Typography>
        <Typography variant="body1">
            Údaje pro platbu:
        </Typography>
        <Grid container className={classes.block} alignItems="center">
            <Grid item xs={12} md={6}>
                <PaymentInfo paymentData={{
                    accountNumber : '222885',
                    bankCode : '1234',
                    variableSymbol : '999999999',
                    amount : 1324,
                    currency : 'CZK',
                    message : 'Toto je test...'
                }} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.qrCodeWrapper}>
                <PaymentQR paymentData={{
                    accountNumber : '222885',
                    bankCode : '1234',
                    variableSymbol : '999999999',
                    amount : 1324,
                    currency : 'CZK',
                    message : 'Toto je test...'
                }} />
            </Grid>
        </Grid>

        <Typography variant="body1" className={classes.block}>
            Informace o potvrzení objednávky byla automaticky zaslána na Vámi uvedenou
            emailovou adresu spolu s platebními údaji. Po dokončení objednávky a odeslání
            zboží přepravci, kterého jste zvolili, Vám v rámci ochrany životního prostředí
            zašleme fakturu pouze v elektronické podobě.
        </Typography>
        <Typography variant="body1" className={classes.block}>
            Děkuji za Vaši objedávku<br />
            a přeji Vám, aby Vám náš produkt pomohl v organizaci Vaší domácnosti.
        </Typography>
    </>
);

export default withStyles(styles)(OrderCreated);