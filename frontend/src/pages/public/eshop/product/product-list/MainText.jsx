import React from 'react';
import Typography from '@material-ui/core/Typography';

import MainPageText from 'components/MainPageText';

const MainText = () => (
    <MainPageText>
        <Typography variant="body1">
            Veškeré produkty vznikly z reálné potřeby naší domácnosti.
        </Typography>
        <Typography variant="body1">
            Kalendář se jmény po straně a tedy přehledným opakujícím se týdnem pro mě kamarádka sehnala loni v Anglii. Bohužel jsem si do něj tím pádem
            musela dopsat všechny jmeniny i státní svátky. Letos jsem se snažila najít nějaký takový český, ale bez úspěchu. Tak jsem si ho vytvořila.
        </Typography>
        <Typography variant="body1">
            A tak to pokračuje dál a dál :)
        </Typography>
    </MainPageText>
);

export default MainText;