import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PaymentQR from './components/PaymentQR';
import PaymentInfo from './components/PaymentInfo';
import withStyles from '@material-ui/styles/withStyles';
import Alert from 'components/Alert';
import { useLocation } from 'react-router-dom';

const styles = theme => ({
    block : {
        marginBottom : '2rem'
    },
    qrCodeWrapper : {
        textAlign : 'center'
    }
});

const OrderCreated = ({ classes }) => {
    const location = useLocation();
    const orderNum = location.state.order.orderNum;
    const paymentInfo = location.state.order.paymentInfo;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Alert type="success">Objednávka <strong>{orderNum}</strong> byla úspěšně vytvořena</Alert>
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
                    <PaymentInfo paymentData={paymentInfo} />
                </Grid>
                <Grid item xs={12} md={6} className={classes.qrCodeWrapper}>
                    <PaymentQR paymentData={paymentInfo} />
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
};

export default withStyles(styles)(OrderCreated);