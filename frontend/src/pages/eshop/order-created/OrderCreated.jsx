import React from 'react';
import { Typography } from '@material-ui/core';

const OrderCreated = () => (
    <>
        <Typography variant="body1">
            Děkuji,<br />
            Vaše objednávka byla úspěšně potvrzena. Zboží expedujeme po připsání platby
            na účet. Pokud platba nebude připsána do 5 pracovních dnů, objednávka bude
            automaticky zrušena.<br />
            Údaje pro platbu: TODO
        </Typography>
        <Typography variant="body1">
            Informace o potvrzení objednávky byla automaticky zaslána na Vámi uvedenou
            emailovou adresu spolu s platebními údaji. Po dokončení objednácky a odeslání
            zboží přepravci, kterého jste zvolili, Vám v rámci ochrany životního prostředí
            zašleme fakturu pouze v elektronické podobě.
        </Typography>
        <Typography variant="body1">
            Děkuji za Vaši objedávku<br />
            a přeji Vám, aby Vám náš produkt pomohl v organizaci Vaší domácnosti. 
        </Typography>
    </>
);

export default OrderCreated;