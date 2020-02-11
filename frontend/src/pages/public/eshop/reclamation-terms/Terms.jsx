import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';

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
    },
    h2 : {
        fontWeight : 'bold',
        display : 'block',
        fontSize : 16
    },
    h3 : {
        textTransform : 'uppercase',
        fontWeight : 'bold',
        display : 'block',
        fontSize : 16
    }
});

const Terms = ({ classes }) => (
    <Paper className={classes.root}>
        <Helmet>
            <meta name="description" content='Chcete zboží vyměnit nebo vrátit? Pokud jste si objednali zboží, které není úplně podle
                Vašich představ, ráda Vám jej vyměním za jiné zboží.' />
        </Helmet>
        <Typography variant="h1">REKLAMACE</Typography>
        <Typography className={classes.font} component="div">
            <p>
                <span className={classes.h2}>Chcete zboží vyměnit nebo vrátit?</span>
            </p>
            <p>
                <span className={classes.h3}>Výměna zboží</span>
            </p>
            <p>
                Pokud jste si objednali zboží, které není úplně podle Vašich představ, ráda Vám jej
                vyměním za jiné zboží.
            </p>
            <p>
                Kupujícímu umožňuji výměnu zboží do 14 dnů od převzetí zásilky bez udání důvodu.
            </p>
            <p>
                Pokud se rozhodnete pro výměnu, je nutné dodržet tyto <strong>základní podmínky</strong>:
            </p>
            <p>
                Zboží musí být odesláno nejpozději 14. den po fyzickém převzetí zásilky, zásilka
                musí obsahovat stručný popis důvodu výměny a číslo objednávky nebo faktury
                (můžete vyplnit formulář pro výměnu a vytisknout nebo jej případně opište a doručte
                současně se zbožím nebo jej zašlete e-mailem nebo poštou), zboží nesmí být
                zasláno na dobírku, v takovém případě nebude převzato. Nepřijímáme zboží k
                výměně v případě, že zboží neprojde kontrolou z těchto důvodů:
            </p>
            <ul>
                <li>zboží nemá originální balení</li>
                <li>zboží je jakýmkoliv způsobem znehodnoceno</li>
                <li>část zboží nebo příslušenství je poškozeno nebo chybí</li>
                <li>zboží není schopné dalšího prodeje</li>
            </ul>
            <p>
                Zboží je nutné zaslat na adresu <strong>Zuzana Spurná, Mlýnská 185, Všetaty 
                277 16</strong>, ze které Vám bylo původně odesláno.
            </p>
            <p>
                Zásilku ve vlastním zájmu pošlete jako doporučené psaní (v případě ztráty, nebo
                znehodnocení balíku si ho budete moci s podacím lístkem na poště vyreklamovat).
                Vyměněné zboží Vám bude odesláno Českou poštou na Vaši adresu za cenu
                poštovného pro ČR ve výši 89,- Kč. Na tuto částku Vám přijde faktura na mail.
            </p>
            <p>
                V případě nesplnění některé z výše uvedených podmínek nebudeme akceptovat
                požadavek na výměnu a zboží bude vráceno zpět.
            </p>
            <p>
                Vámi požadované zboží nemusí být v době výměny již dostupné. V tom případě
                bude nutné pokračovat v komunikaci přes email <ContactEmail />.
            </p>
            <p>
                <a href="/docs/Formular_pro_odstoupeni_od_smlouvy.pdf" download>Formulář pro odstoupení od Smlouvy</a>
            </p>
            <span className={classes.h3}>Vrácení zboží</span>
            <p>
                Kupující má v souladu s ustanovením § 1829 odst. 1 občanského zákoníku právo od
                Kupní smlouvy odstoupit, a to do čtrnácti (14) dnů od převzetí zboží, přičemž v
                případě, že předmětem Kupní smlouvy je několik druhů zboží nebo dodání několika
                částí, běží tato lhůta ode dne převzetí poslední dodávky zboží. Odstoupení od Kupní
                smlouvy musí být prodávajícímu odesláno ve lhůtě uvedené v předchozí větě. Pro
                odstoupení od Kupní smlouvy doporučuji využít vzorový Formulář pro odstoupení od
                smlouvy.
            </p>
            <p>
                Pro účely uplatnění práva na odstoupení od Smlouvy musíte o svém odstoupení od
                Kupní smlouvy informovat Prodávajícího formou jednostranného právního jednání
                (například dopisem zaslaným prostřednictvím provozovatele poštovních služeb nebo
                e-mailem).<br />
                Zboží zašlete na adresu <strong>Zuzana Spurná, Mlýnská 185, Všetaty 277 16,</strong>
                ze které Vám bylo původně zboží odesláno.
            </p>
            <p>
                Můžete vyplnit formulář pro odstoupení od smlouvy a vytisknout nebo jej případně
                opište a doručte současně se zbožím nebo jej zašlete e-mailem nebo poštou. Aby
                byla dodržena lhůta pro odstoupení od Kupní smlouvy, postačuje odeslat odstoupení
                od Smlouvy před uplynutím příslušné lhůty.
            </p>
            <p>
                <span className={classes.h2}>Důsledky odstoupení od Kupní smlouvy:</span>
                Pokud odstoupíte od Kupní smlouvy, vrátím Vám bez zbytečného odkladu,
                nejpozději do 10 dnů ode dne, kdy nám došlo Vaše oznámení o odstoupení od
                Kupní smlouvy společně s vráceným zbožím, platbu za zboží, kterou jsem od Vás
                obdržela. Pro vrácení plateb použiju stejný platební prostředek, který jste použil(a)
                pro provedení počáteční transakce, pokud jste výslovně neurčil(a) jinak.
            </p>
            <p>
                <span className={classes.h2}>Převzetí zboží:</span>
                Zboží bez zbytečného odkladu, nejpozději do 14 dnů ode dne, kdy došlo k
                odstoupení od Smlouvy, zašlete zpět na adresu Zuzana Spurná, Mlýnská 185,
                Všetaty 277 16. Lhůta se považuje za zachovanou, pokud odešlete zboží zpět
                před uplynutím 14 dnů.
            </p>
            <p>
                <span className={classes.h2}>Náklady spojené s vrácením zboží:</span>
                Ponesete přímé náklady spojené s vrácením zboží.
            </p>
            <p>
                <span className={classes.h2}>Odpovědnost za snížení hodnoty vráceného zboží:</span>
                Kupující odpovídá za snížení hodnoty zboží, které vzniklo v důsledku nakládání s
                tímto zbožím jinak, než je nutné s ním nakládat s ohledem na jeho povahu a
                vlastnosti za účelem obeznámení se s povahou a vlastnostmi zboží, včetně jeho
                funkčnosti. Kupující odpovídá za snížení hodnoty zboží i v případě, že s tímto
                zbožím nakládá s ohledem na jeho povahu a vlastnosti za účelem obeznámení se s
                povahou a vlastnostmi zboží, včetně jeho funkčnosti, mimo byt (dále jen „Náhrada“).
                Prodávající uplatní nárok na Náhradu u Kupujícího tak, že mu zašle od Kupujícího
                přijaté finanční prostředky za koupi zboží snížené o Náhradu.
            </p>
            <p>
                Kupující není oprávněn odstoupit od Smlouvy, pokud naplní jednu z níže <strong>uvedených
                podmínek</strong>:
            </p>
            <ul>
                <li>zboží nemá originální balení</li>
                <li>zboží je jakýmkoliv způsobem znehodnoceno</li>
                <li>část zboží nebo příslušenství je poškozeno nebo chybí</li>
                <li>zboží není schopné dalšího prodeje</li>
            </ul>
            <p>
                <a href="/docs/Formular_pro_odstoupeni_od_smlouvy.pdf" download>Formulář pro odstoupení od Smlouvy</a>
            </p>
        </Typography>
    </Paper>
);

export default withStyles(styles)(Terms);