import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';

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
        textTransform : 'uppercase',
        fontWeight : 'bold',
        display : 'block',
        fontSize : 20
    },
    termsDetails : {
        '&>li' : {
            listStyleType : 'none',
            counterIncrement : 'item',
            fontWeight : 'bold',
            display : 'block',
            fontSize : 16,
            marginTop : '0.5rem',
            [theme.breakpoints.down('xs')] : {
                marginLeft : '-1rem'
            },
            '&:before' : {
                fontWeight : 'bold',
                fontSize : 16,
                content : 'counter(item) "." ',
                paddingRight : 5
            },
            '&>ol>li' : {
                listStyleType : 'none',
                counterIncrement : 'subitem',
                fontWeight : 'normal',
                display : 'block',
                fontSize : 14,
                [theme.breakpoints.down('xs')] : {
                    marginLeft : '-1rem'
                },
                '&:before' : {
                    fontWeight : 'normal',
                    content : 'counter(item) "." counter(subitem) "." ',
                    paddingRight : 5
                },
            }
        }
    }
});

const Terms = ({ classes }) => (
    <Paper className={classes.root}>
        <Typography variant="h1">Obchodní podmínky</Typography>
        <Typography className={classes.font} component="div">
            <p>
                Tyto obchodní podmínky platí pro nákup v internetovém obchodě
                www.zorganizovano.cz, jehož provozovatelem je<br /> <strong>Barbora Borovská, V Jamkách
                354, Čakovičky 250 63, IČO: 01707736</strong>.<br />
                <strong>Provozovatel není plátce DPH.</strong><br />
                Obchodní podmínky určují a upřesňují práva a povinnosti prodávajícího a jeho zákazníků (dále jen kupujících).
            </p>
            <p>
                <span className={classes.h2}>OBJEDNÁVKY:</span>
                Veškeré objednávky podané prostřednictvím internetového obchodu jsou závazné.
                Podáním objednávky kupující stvrzuje, že se seznámil s těmito obchodními
                podmínkami včetně podmínek reklamace a že s nimi souhlasí. Objednávka je
                návrhem kupní smlouvy. Kupní smlouva vzniká v okamžiku převzetí objednaného
                zboží kupujícím. Podmínkou platnosti elektronické objednávky je vyplnění veškerých
                předepsaných povinných údajů a náležitostí. Po zaslání objednávky obdržíte email s
                potvrzením vaší objednávky a s termínem splatnosti 3 pracovních dnů.<br />
                Pokud bude kupující požadovat storno objednávky, je nutné storno provést písemně
                na adresu <ContactEmail />. Místem dodání zboží je adresa uvedená
                kupujícím v objednávkovém formuláři (v případě výběru dopravy Českou poštou
                dodací adresa, v případě výběru dopravy službou Zásilkovna provozovna
                zásilkovny).<br />
                Veškeré informace o změně stavu objednávky jsou odeslány na e-mail kupujícího,
                jenž je pečlivě sleduje, a jakékoliv nesrovnalosti neprodleně nahlásí prodávajícímu.
            </p>
            <ol className={classes.termsDetails}>
                <li>
                    Úvodní ustanovení
                    <ol>
                        <li>
                            Tyto obchodní podmínky upravují v souladu s ustanovením § 1751 odst. 1
                            zákona č. 89/2012 Sb., občanský zákoník (dále jen „občanský zákoník“) vzájemná
                            práva a povinnosti smluvních stran vzniklé v souvislosti nebo na základě kupní
                            smlouvy (dále jen „kupní smlouva“) uzavírané mezi prodávajícím a jinou fyzickou
                            osobou (dále jen „kupující“) prostřednictvím internetového obchodu prodávajícího.
                        </li>
                        <li>
                            Obchodní podmínky dále upravují práva a povinnosti smluvních stran při
                            využívání webové stránky prodávajícího umístěné na adrese www.zorganizovano.cz
                            (dále jen „webová stránka“) a další související právní vztahy.
                        </li>
                        <li>
                            Prodávajícím a provozovatelem internetového obchodu www.zorganizovano.cz
                            je Barbora Borovská, V Jamkách 354, Čakovičky 250 63, IČO: 01707736.
                        </li>
                        <li>
                            Ustanovení odchylná od obchodních podmínek je možné sjednat v kupní
                            smlouvě. Odchylná ujednání v kupní smlouvě mají přednost před ustanoveními
                            obchodních podmínek.
                        </li>
                        <li>
                            Ustanovení obchodních podmínek jsou nedílnou součástí kupní smlouvy. Kupní
                            smlouva a obchodní podmínky jsou vyhotoveny v českém jazyce. Kupní smlouvu lze
                            uzavřít v českém jazyce.
                        </li>
                        <li>
                            Znění obchodních podmínek může prodávající měnit či doplňovat. Tímto
                            ustanovením nejsou dotčena práva a povinnosti vzniklá po dobu účinnosti
                            předchozího znění obchodních podmínek.
                        </li>
                    </ol>
                </li>
                <li>
                    Uzavření kupní smlouvy
                    <ol>
                        <li>
                            Webové rozhraní obchodu obsahuje seznam zboží a výrobků nabízeného
                            prodávajícím k prodeji, a to včetně uvedení cen jednotlivého nabízeného zboží.
                            Nabídka prodeje zboží a ceny tohoto zboží zůstávají v platnosti po dobu, kdy jsou
                            zobrazovány ve webovém rozhraní obchodu. Tímto ustanovením není omezena
                            možnost prodávajícího uzavřít kupní smlouvu za individuálně sjednaných podmínek.
                            Veškeré nabídky prodeje zboží umístěné ve webovém rozhraní obchodu jsou
                            nezávazné a prodávající není povinen uzavřít kupní smlouvu ohledně tohoto zboží.
                        </li>
                        <li>
                            Sortiment internetového obchodu www.zorganizovano.cz tvoří produkty vázané
                            k organizaci domácnosti, povětšinou tiskoviny. Fotografie zboží jsou pořízeny tak,
                            aby barevné provedení co nejvíce odpovídalo skutečnosti. Skutečná barevnost
                            produktů se může lišit i vzhledem k nastavení monitoru.
                        </li>
                        <li>
                            Webové rozhraní obchodu obsahuje také informace o nákladech spojených s
                            balením a dodáním zboží. Informace o nákladech spojených s balením a dodáním
                            zboží uvedené ve webovém rozhraní obchodu platí pouze v případech, kdy je zboží
                            doručováno v rámci území České republiky.
                        </li>
                        <li>
                            Pro objednání zboží vyplní kupující objednávkový formulář ve webovém
                            rozhraní obchodu. Objednávkový formulář obsahuje zejména informace o:
                            <ul>
                                <li>
                                    objednávaném zboží (objednávané zboží „vloží“ kupující do elektronického
                                    nákupního košíku webového rozhraní obchodu),
                                </li>
                                <li>
                                    způsobu úhrady kupní ceny zboží, údaje o požadovaném způsobu doručení
                                    objednávaného zboží a
                                </li>
                                <li>
                                    informace o nákladech spojených s dodáním zboží.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Před zasláním objednávky prodávajícímu je kupujícímu umožněno zkontrolovat
                            a měnit údaje, které do objednávky kupující vložil, a to i s ohledem na možnost
                            kupujícího zjišťovat a opravovat chyby vzniklé při zadávání dat do objednávky.
                            Objednávku odešle kupující prodávajícímu kliknutím na tlačítko “Dokončit
                            objednávku“. Údaje uvedené v objednávce jsou prodávajícím považovány za
                            správné. Prodávající neprodleně po obdržení objednávky toto obdržení kupujícímu
                            potvrdí elektronickou poštou, a to na adresu elektronické pošty kupujícího uvedenou
                            v objednávce (dále jen „elektronická adresa kupujícího“).
                        </li>
                        <li>
                            Prodávající je vždy oprávněn v závislosti na charakteru objednávky (množství
                            zboží, výše kupní ceny, předpokládané náklady na dopravu) požádat kupujícího o
                            dodatečné potvrzení objednávky (například písemně či telefonicky).
                        </li>
                        <li>
                            Smluvní vztah mezi prodávajícím a kupujícím vzniká doručením přijetí
                            objednávky (akceptací), jež je prodávajícím zasláno kupujícímu elektronickou
                            poštou, a to na adresu elektronické pošty kupujícího.
                        </li>
                        <li>
                            Kupující bere na vědomí, že prodávající není povinen uzavřít kupní smlouvu, a
                            to zejména s osobami, které dříve podstatným způsobem porušily kupní smlouvu
                            (včetně obchodních podmínek).
                        </li>
                        <li>
                            Kupující souhlasí s použitím komunikačních prostředků na dálku při uzavírání
                            kupní smlouvy. Náklady vzniklé kupujícímu při použití komunikačních prostředků na
                            dálku v souvislosti s uzavřením kupní smlouvy (náklady na internetové připojení,
                            náklady na telefonní hovory) si hradí kupující sám.
                        </li>
                    </ol>
                </li>
                <li>
                    Cena zboží a platební podmínky
                    <ol>
                        <li>
                            Cenu zboží a případné náklady spojené s dodáním zboží dle kupní smlouvy
                            může kupující uhradit prodávajícímu bezhotovostně převodem na účet prodávajícího
                            č.1957478013/3030, Iban CZ93 3030 0000 0019 5747 8013, BIC AIRACZPP vedený
                            u společnosti Air Bank a.s. (dále jen „účet prodávajícího“).
                        </li>
                        <li>
                            Společně s kupní cenou je kupující povinen zaplatit prodávajícímu také náklady
                            spojené s balením a dodáním zboží. Není-li uvedeno výslovně jinak, rozumí se dále
                            kupní cenou i náklady spojené s dodáním zboží.
                        </li>
                        <li>
                            V případě platby v hotovosti je kupní cena splatná při převzetí zboží. V případě
                            bezhotovostní platby je kupní cena splatná do 3 pracovních dnů od uzavření kupní
                            smlouvy.
                        </li>
                        <li>
                            V případě bezhotovostní platby je kupující povinen uhradit kupní cenu zboží
                            společně s uvedením variabilního symbolu platby. V případě bezhotovostní platby je
                            závazek kupujícího uhradit kupní cenu splněn okamžikem připsání příslušné částky
                            na účet prodávajícího.
                        </li>
                        <li>
                            Prodávající je oprávněn, zejména v případě, že ze strany kupujícího nedojde k
                            dodatečnému potvrzení objednávky (čl. 2.6), požadovat uhrazení celé kupní ceny
                            ještě před odesláním zboží kupujícímu.
                        </li>
                        <li>
                            Případné slevy z ceny zboží poskytnuté prodávajícím kupujícímu nelze
                            vzájemně kombinovat.
                        </li>
                        <li>
                            Je-li to v obchodním styku obvyklé nebo je-li tak stanoveno obecně závaznými
                            právními předpisy, vystaví prodávající ohledně plateb prováděných na základě kupní
                            smlouvy kupujícímu daňový doklad – fakturu. Prodávající není plátcem daně z
                            přidané hodnoty. Fakturu vystaví prodávající kupujícímu po uhrazení ceny zboží a
                            zašle ji v elektronické podobě na elektronickou adresu kupujícího.
                        </li>
                        <li>
                            Pokud jste ze Slovenska, posílejte platby v českých korunách. Jinak budeme
                            muset požadovat doposlání vzniklého nedoplatku kvůli převodu měny. Nevlastníme
                            účet v eurech.
                        </li>
                    </ol>
                </li>
                <li>
                    Odstoupení od kupní smlouvy
                    <ol>
                        <li>
                            Kupující bere na vědomí, že dle ustanovení zákona č. 89/2012 Sb.., občanský
                            zákoník, ve znění pozdějších předpisů (dále jen „občanský zákoník“), nelze mimo
                            jiné odstoupit od kupní smlouvy na dodávku zboží upraveného podle přání
                            kupujícího.
                        </li>
                        <li>
                            Nejedná-li se o případ uvedený v čl. 4.1 či o jiný případ, kdy nelze od kupní
                            smlouvy odstoupit, má kupující právo od kupní smlouvy odstoupit, a to do čtrnácti
                            (14) dnů od převzetí zboží. Odstoupení od kupní smlouvy musí být prodávajícímu
                            prokazatelně doručeno do čtrnácti (14) dnů od převzetí zboží, a to na adresu
                            elektronické pošty prodávajícího <ContactEmail />.
                        </li>
                        <li>
                            V případě odstoupení od smlouvy dle čl. 4.2 obchodních podmínek se kupní
                            smlouva od počátku ruší. Zboží musí být prodávajícímu vráceno do 14 pracovních
                            dnů od odeslání odstoupení od smlouvy prodávajícímu. Zboží musí být
                            prodávajícímu vráceno nepoškozené a neopotřebené a, je-li to možné, v původním
                            obalu.
                        </li>
                        <li>
                            Ve lhůtě deseti (10) dnů od vrácení zboží kupujícím dle čl. 4.3 obchodních
                            podmínek je prodávající oprávněn provést přezkoumání vráceného zboží, zejména
                            za účelem zjištění, zdali vrácené zboží není poškozeno, opotřebeno či částečně
                            spotřebováno.
                        </li>
                        <li>
                            V případě odstoupení od smlouvy dle čl. 4.2 obchodních podmínek vrátí
                            prodávající kupní cenu (bez nákladů vynaložených na dodání zboží) kupujícímu
                            nejpozději do deseti (10) dnů od skončení lhůty na přezkoumání zboží dle čl. 4.4
                            obchodních podmínek, a to bezhotovostně na účet určený kupujícím. Prodávající je
                            taktéž oprávněn vrátit kupní cenu v hotovosti již při vracení zboží kupujícím.
                            Odstoupí-li kupující od kupní smlouvy, prodávající není povinen vrátit přijaté peněžní
                            prostředky kupujícímu dříve, než mu kupující zboží vrátí nebo prokáže, že zboží
                            podnikateli odeslal.
                        </li>
                        <li>
                            Kupující bere na vědomí, že pokud zboží vrácené kupujícím bude poškozeno,
                            opotřebeno či částečně spotřebováno, vzniká prodávajícímu vůči kupujícímu nárok
                            na náhradu škody jemu tím vzniklé. Nárok na úhradu vzniklé škody je prodávající
                            oprávněn jednostranně započíst proti nároku kupujícího na vrácení kupní ceny.
                            Stejně tak nárok na smluvní pokutu dle čl. 4.3 obchodních podmínek je prodávající
                            oprávněn jednostranně započíst proti nároku kupujícího na vrácení kupní ceny.
                        </li>
                        <li>
                            Do doby převzetí zboží kupujícím je prodávající oprávněn kdykoliv od kupní
                            smlouvy odstoupit. V takovém případě vrátí prodávající kupujícímu kupní cenu bez
                            zbytečného odkladu, a to bezhotovostně na účet určený kupujícím.
                        </li>
                    </ol>
                </li>
                <li>
                    Přeprava a dodání zboží
                    <ol>
                        <li>
                            Způsob doručení zboží je určen na základě požadavku kupujícího, kupující nese
                            riziko a případné dodatečné náklady spojené s vybraným způsobem dopravy.
                        </li>
                        <li>
                            Je-li prodávající podle kupní smlouvy povinen dodat zboží na místo určené
                            kupujícím v objednávce, je kupující povinen převzít zboží při dodání.
                        </li>
                        <li>
                            V případě, že je z důvodů na straně kupujícího nutno zboží doručovat
                            opakovaně nebo jiným způsobem než bylo uvedeno v objednávce, je kupující
                            povinen uhradit náklady spojené s opakovaným doručováním zboží, resp. náklady
                            spojené s jiným způsobem doručení.
                        </li>
                        <li>
                            Při převzetí zboží od přepravce je kupující povinen zkontrolovat neporušenost
                            obalů zboží a v případě jakýchkoliv závad toto neprodleně oznámit přepravci. V
                            případě shledání porušení obalu svědčícího o neoprávněném vniknutí do zásilky
                            nemusí kupující zásilku od přepravce převzít. Podpisem dodacího listu kupující
                            stvrzuje, že zásilka zboží splňovala všechny podmínky a náležitosti a na případnou
                            pozdější reklamaci ohledně porušení obalu zásilky nemůže být brán zřetel.
                        </li>
                        <li>
                            Další práva a povinnosti stran při přepravě zboží mohou upravit dodací
                            podmínky prodávajícího.
                        </li>
                    </ol>
                </li>
                <li>
                    Odpovědnost za vady, záruka
                    <ol>
                        <li>
                            Práva a povinnosti smluvních stran ohledně odpovědnosti prodávajícího za
                            vady, včetně záruční odpovědnosti prodávajícího, se řídí příslušnými obecně
                            závaznými předpisy (zejména ustanoveními zák. č. 89/2012 Sb.).
                        </li>
                        <li>
                            Prodávající odpovídá kupujícímu za to, že prodávaná věc je ve shodě s kupní
                            smlouvou, zejména, že je bez vad. Shodou s kupní smlouvou se rozumí, že
                            prodávaná věc má jakost a užitné vlastnosti smlouvou požadované, prodávajícím,
                            výrobcem nebo jeho zástupcem popisované, nebo na základě jimi prováděné
                            reklamy očekávané, popřípadě jakost a užitné vlastnosti pro věc takového druhu
                            obvyklé, že odpovídá požadavkům právních předpisů, je v tomu odpovídajícím
                            množství, míře nebo hmotnosti a odpovídá účelu, který prodávající pro použití věci
                            uvádí nebo pro který se věc obvykle používá.
                        </li>
                        <li>
                            V případě, že věc při převzetí kupujícím není ve shodě s kupní smlouvou (dále
                            jen „rozpor s kupní smlouvou“), má kupující právo na to, aby prodávající bezplatně a
                            bez zbytečného odkladu věc uvedl do stavu odpovídajícího kupní smlouvě, a to
                            podle požadavku kupujícího buď výměnou věci, nebo její opravou; není-li takový
                            postup možný, může kupující požadovat přiměřenou slevu z ceny věci nebo od
                            smlouvy odstoupit. To neplatí, pokud kupující před převzetím věci o rozporu s kupní
                            smlouvou věděl nebo rozpor s kupní smlouvou sám způsobil. Rozpor s kupní
                            smlouvou, který se projeví během šesti (6) měsíců ode dne převzetí věci, se
                            považuje za rozpor existující již při jejím převzetí, pokud to neodporuje povaze věci
                            nebo pokud se neprokáže opak.
                        </li>
                    </ol>
                </li>
                <li>
                    Další práva a povinnosti smluvních stran
                    <ol>
                        <li>
                            Kupující nabývá vlastnictví ke zboží zaplacením celé kupní ceny zboží.
                        </li>
                        <li>
                            Prodávající není ve vztahu ke kupujícímu vázán žádnými kodexy chování ve
                            smyslu ustanovení zák. č. 89/2012 Sb., občanského zákoníku.
                        </li>
                        <li>
                            Prodávající je oprávněn k prodeji zboží na základě živnostenského oprávnění.
                            Živnostenskou kontrolu provádí v rámci své působnosti příslušný živnostenský úřad.
                            Dozor nad oblastí ochrany osobních údajů vykonává Úřad pro ochranu osobních
                            údajů. Česká obchodní inspekce vykonává ve vymezeném rozsahu mimo jiné dozor
                            nad dodržováním zákona č. 634/1992 Sb., o ochraně spotřebitele, ve znění
                            pozdějších předpisů.
                        </li>
                    </ol>
                </li>
                <li>
                    Ochrana osobních údajů
                    <ol>
                        <li>
                            Ochrana osobních údajů kupujícího, který je fyzickou osobou, je poskytována
                            zákonem č. 101/2000 Sb., o ochraně osobních údajů, ve znění pozdějších předpisů.
                        </li>
                        <li>
                            Kupující souhlasí se zpracováním těchto svých osobních údajů: jméno a
                            příjmení, adresa bydliště, adresa elektronické pošty, telefonní číslo a při
                            bezhotovostní platbě dále číslo bankovního účtu (dále společně vše jen jako „osobní
                            údaje“).
                        </li>
                        <li>
                            Kupující souhlasí se zpracováním osobních údajů prodávajícím, a to pro účely
                            realizace práv a povinností z kupní smlouvy a pro účely zasílání informací a
                            obchodních sdělení prodávajícímu.
                        </li>
                        <li>
                            Kupující bere na vědomí, že je povinen své osobní údaje (při objednávce
                            provedené z webového rozhraní obchodu) uvádět správně a pravdivě a že je
                            povinen bez zbytečného odkladu informovat prodávajícího o změně ve svých
                            osobních údajích.
                        </li>
                        <li>
                            Kromě osob dopravujících zboží nebudou osobní údaje prodávajícím bez
                            předchozího souhlasu kupujícího předávány třetím osobám.
                        </li>
                        <li>
                            Osobní údaje budou zpracovávány po dobu neurčitou. Osobní údaje budou
                            zpracovávány v elektronické podobě automatizovaným způsobem nebo v tištěné
                            podobě neautomatizovaným způsobem.
                        </li>
                        <li>
                            Kupující potvrzuje, že poskytnuté osobní údaje jsou přesné a že byl poučen o
                            tom, že se jedná o dobrovolné poskytnutí osobních údajů.
                        </li>
                        <li>
                            V případě, že by se kupující domníval, že prodávající provádí zpracování jeho
                            osobních údajů, které je v rozporu s ochranou soukromého a osobního života
                            kupujícího nebo v rozporu se zákonem, zejména jsou-li osobní údaje nepřesné s
                            ohledem na účel jejich zpracování, může požádat prodávajícího nebo zpracovatele o
                            vysvětlení nebo požadovat, aby prodávající nebo zpracovatel odstranil takto vzniklý
                            stav.
                        </li>
                        <li>
                            Požádá-li kupující o informaci o zpracování svých osobních údajů, je mu
                            prodávající povinen tuto informaci předat. Prodávající má právo za poskytnutí
                            informace podle předchozí věty požadovat přiměřenou úhradu nepřevyšující náklady
                            nezbytné na poskytnutí informace.
                        </li>
                        <li>
                            Kupující souhlasí se zasíláním informací souvisejících se zbožím, službami
                            nebo podnikem prodávajícího na elektronickou adresu kupujícího a dále souhlasí se
                            zasíláním obchodních sdělení prodávajícím na elektronickou adresu kupujícího.
                        </li>
                    </ol>
                </li>
                <li>
                    Záverečná ustanovení
                    <ol>
                        <li>
                            Pokud vztah související s užitím webové stránky nebo právní vztah založený
                            kupní smlouvou obsahuje mezinárodní (zahraniční) prvek, pak strany sjednávají, že
                            vztah se řídí českým právem. Tímto nejsou dotčena práva spotřebitele vyplývající z
                            obecně závazných právních předpisů.
                        </li>
                        <li>
                            Je-li některé ustanovení obchodních podmínek neplatné nebo neúčinné, nebo
                            se takovým stane, namísto neplatných ustanovení nastoupí ustanovení, jehož smysl
                            se neplatnému ustanovení co nejvíce přibližuje. Neplatností nebo neúčinností
                            jednoho ustanovení není dotknutá platnost ostatních ustanovení. Změny a doplňky
                            kupní smlouvy či obchodních podmínek vyžadují písemnou formu.
                        </li>
                        <li>
                            Kupní smlouva včetně obchodních podmínek je archivována prodávajícím v
                            elektronické podobě a není přístupná.
                        </li>
                    </ol>
                </li>
            </ol>
        </Typography>
    </Paper>
);

export default withStyles(styles)(Terms);