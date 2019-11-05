import React from 'react';
import { Typography, withStyles, Paper } from '@material-ui/core';

import ContactEmail from 'components/ContactEmail';

const styles = theme => ({
    root : {
        padding : '2rem 4rem',
        [theme.breakpoints.down('sm')] : {
            padding : '2rem 1rem'
        }
    },
    font : {
        fontSize : 14,
        marginBottom : '1rem',
        textAlign : 'justify'
    }
});

const Terms = ({ classes }) => (
    <Paper className={classes.root}>
        <Typography variant="h1">Podmínky ochrany osobních údajů</Typography>
        <Typography className={classes.font} component="div">
            <p>
                Barbora Borovská, V Jamkách 354, Čakovičky 250 63<br />
                IČO: 01707736<br />
                e-mail: <ContactEmail /><br /><br />
                dále jen <strong>„Správce“</strong>
            </p>
            <p>
                Vážení klienti,<br />
                abych mohla plnit závazky k vám, mým klientům a dalším institucím a zákonným
                požadavkům podle legislativy, musím zpracovávat některé vaše osobní údaje. K
                tomu sděluji:<br />
                Správcem osobních údajů podle Nařízení (EU) 2016/679 (GDPR) je <strong>Správce</strong>.
                Vaše osobní údaje zpracovávám z důvodu <strong>vyřízení Vašich objednávek a řešení
                reklamací</strong>.<br />
                Zpracovávám vaše <strong>jméno a příjmení, doručovací adresu, e-mail, telefonní číslo,
                číslo bankovního účtu, objednané zboží a jeho cenu</strong>.<br />
                Právním důvodem tohoto zpracování je plnění kupní smlouvy. Uvedené osobní
                údaje za tímto účelem zpracovávám po dobu trvání záruční doby.
                Ochrana vašich osobních údajů odpovídá požadavkům Nařízení (EU) 2016/679
                (GDPR).
                Abych vás mohla informovat o aktuálních nabídkách a slevách, zpracovávám vaše
                &nbsp;<strong>jméno a příjmení a e-mailovou adresu</strong>. Právním důvodem tohoto zpracování je
                váš souhlas, který mně poskytujete a který můžete kdykoli odvolat.<br />
                Vaše osobní údaje poskytujeme jen institucím k tomu zmocněným zákonem, nikomu
                jinému.
                <br />
                Vaše osobní údaje bez vašeho výslovného souhlasu neposkytujeme. Tento souhlas
                můžete kdykoliv odvolat.
                <br />
                Při zpracování Vašich osobních údajů nebude docházet k automatizovanému
                rozhodování ani k profilování.
                <br />
                Nejmenovala jsem pověřence pro ochranu osobních údajů a nepověřila jsem
                zpracováním Vašich osobních údajů žádného zpracovatele ani jsem neurčila
                zástupce pro plnění povinností ve smyslu GDPR.
                <br />
                Nemám v úmyslu předat Vaše osobní údaje do třetí země, mezinárodní organizaci
                nebo jiným, osobám.
                <br />
                Kdykoliv máte právo odvolat svůj souhlas se zpracováním osobních údajů, právo
                požadovat ode mne jako Správce přístup ke svým osobním údajům, jejich opravu
                nebo výmaz, popřípadě omezení zpracování, a vznést námitku proti zpracování,
                máte právo na přenositelnost těchto údajů k jinému správci, jakož i právo podat
                stížnost u Úřadu pro ochranu osobních údajů, máte-li za to, že při zpracování vašich
                osobních údajů postupuji v rozporu s GDPR.
            </p>
            <p>
                V Praze, dne 5.11.2019
            </p>
        </Typography>
    </Paper>
);

export default withStyles(styles)(Terms);