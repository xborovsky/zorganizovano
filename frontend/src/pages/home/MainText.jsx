import React from 'react';
import Typography from '@material-ui/core/Typography';
import Emoji from 'a11y-react-emoji';

import MainPageText from 'components/MainPageText';

const MainText = () => (
    <MainPageText>
        <Typography variant="body1" style={{ marginBottom : '-1rem' }}>
            Ahoj,<br />
            jmenuji se Bára, jsem obyčejná máma jako vy, tak jako vy i já mám neobyčejné děti a vytíženého manžela <Emoji symbol="🙂" label="smiling" /> Starší Mareček
            už nám lítá téměř denně po kroužcích, Márovi-manželovi začala hokejová sezóna a babičky, tak ty máme daleko - a tak je zorganizovanost celé naší rodiny
            asi jedné východisko, jak to celé zvládnout v pohodě, bez stresu a o úsměvu a úctě si povíme zase v jiné pohádce ;) Jestli to máte podobně jako my,
            budu s vámi ráda sdílet tipy, které u nás doma fungují a připravuji pro vás i nějaké ty fyzické zlepšováky. Tak vzhůru dolů, jdeme se zorganizovat!
        </Typography>
    </MainPageText>
);

export default MainText;