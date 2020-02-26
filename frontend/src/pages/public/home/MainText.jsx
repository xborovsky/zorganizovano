import React from 'react';
import Typography from '@material-ui/core/Typography';
import Emoji from 'a11y-react-emoji';

import MainPageText from 'components/MainPageText';

const MainText = () => (
    <MainPageText>
        <Typography variant="body1" style={{ marginBottom : '-1rem' }}>
            Jsme dvě lišky vyšitý 🦊 taky dvě mámy na mateřský 👯‍♀️ a šijeme a děláme různý jiný legrácky pro vás a vaše liščata 🦊
        </Typography>
    </MainPageText>
);

export default MainText;