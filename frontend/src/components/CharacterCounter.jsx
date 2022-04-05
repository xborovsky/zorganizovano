import React from 'react';
import PropTypes from 'prop-types';

const CharacterCounter = ({className, count, max}) => (
    <div className={className}>
        {count} / {max}
    </div>
);

CharacterCounter.propTypes = {
    count : PropTypes.number.isRequired,
    max : PropTypes.number.isRequired
};

export default CharacterCounter;