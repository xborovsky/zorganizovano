import useWidth from 'hooks/use-width';
import React from 'react';

import { getImgServerUrl } from 'util/img-util';

const ContactPhoto = ({ className }) => {
    const width = useWidth();
    const getLinkButtonWidthPct = () => {
        switch (width) {
            case 'xl':
            case 'lg':
                return 30;
            case 'md':
                return 25;
            case 'sm':
                return 50;
            default : return 100;
        }
    };

    return (
        <img src={getImgServerUrl('other/kontakt.jpg', getLinkButtonWidthPct())}
            alt="Bára Borovská"
            className={className} />
    );
};

export default ContactPhoto;