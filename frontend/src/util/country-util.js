export const getCountryName = countryCode => {
    switch (countryCode) {
        case 'cz' : return 'Česká republika';
        case 'sk' : return 'Slovenská republika';
        default : return countryCode;
    }
};

export const getCountryEnumName = countryCode => {
    switch (countryCode) {
        case 'cz' : return 'CESKA_REPUBLIKA';
        case 'sk' : return 'SLOVENSKA_REPUBLIKA';
        default : return countryCode;
    }
};