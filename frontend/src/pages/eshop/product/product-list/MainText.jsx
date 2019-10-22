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
            Dvakrát do týdne u nás doma plánujeme co budeme jíst a právě tolikrát jedeme nakoupit - šetříme tak čas, životní prostředí a co si budeme povídat,
            hlavně peníze. Vše si píšeme na papírky a ty pak lepíme na lednici, podle nich i vaříme. Původně jsem si chtěla pořídit mazací tabulku, ale to by
            mně v našem systému nevyhovovalo. Plánujeme buď během snídaně u stolu nebo třeba na sedačce - proto pro mne byla podstatná pevná záda plánovače,
            možnost si nákupní seznam odtrhnout a jet. Zároveň ale mít seznam kdykoliv po ruce - doteď se nám válel jeden papírek někde na kuchyňském ostrůvku.
            Trhací lišta s magnetem to vyřešila raz dva.
        </Typography>
        <Typography variant="body1">
            A tak to pokračuje dál a dál :)
        </Typography>
    </MainPageText>
);

export default MainText;