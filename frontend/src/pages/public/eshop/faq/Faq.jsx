import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Helmet } from 'react-helmet';

const Faq = () => (
    <div>
        <Helmet>
            <meta name="description" content='Kdo zboží vyrábí? Jak je zboží zabaleno? Za jak dlouho od objednání mi zboží dorazí?
                Jaké nabízíte možnosti přepravy? Proč se u vás dá platit pouze převodem na účet?' />
        </Helmet>
        <Typography variant="h1">Nejčastěji kladené dotazy</Typography>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant="h6">Kdo zboží vyrábí?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Veškeré produkty nabízené na těchto stránkách jsou mou vlastní tvorbou a vychází z reálných potřeb naší domácnosti. V současné chvíli se jedná převážně
                    o polygrafickou činnost, nicméně už teď pro vás připravuji sérii organizérů ze 100% přírodních materiálů, tedy plně rozložitelných. Ve spolupráci se skvělou
                    dvojicí Honzy a Símy z Brna také vzniká řada zakládacích diářů z pravé kůže a do nich se můžete těšit na originální náplně.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <Typography variant="h6">Jak je zboží zabaleno?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Kalendář vám dorazí v papírové krabici na tiskoviny velikosti A3, třívrstvé vlnité lepenky. Po rozbalení z bublinkové fólie se už můžete radovat z nového
                    kalendáře na vaší lednici.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                <Typography variant="h6">Za jak dlouho od objednání mi zboží dorazí?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Veškeré zboží udržuji skladem, pokud tedy vaše objednávka dorazí do 20:00, mohu ji zpracovat, připravit a odeslat druhý den. Poté je již dodací lhůta závislá
                    od vámi zvolené přepravní služby.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
            >
                <Typography variant="h6">Jaké nabízíte možnosti přepravy?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    V tuto chvíli posílám zboží skrze Českou poštu, nebo nabízím možnost zaslání na vámi zvolenou pobočku Zásilkovny.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
            >
                <Typography variant="h6">Proč se u vás dá platit pouze převodem na účet?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    V současné chvíli implementuji i možnost platby kartou, ale pro rychlejší spuštění prodeje a tedy zaručení doručení ještě před shonem okolo Vánoc,
                    jsem prozatím zvolila cestu platby převodem na účet. Při dokončení objednávky pro vás generuji QR kód pro načtení platby pro vaši mobilní banku a snažím
                    se tak o co nejpohodlnější službu.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    </div>
);

export default Faq;