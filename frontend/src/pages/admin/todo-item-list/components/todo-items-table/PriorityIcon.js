import React from 'react';
import PropTypes from 'prop-types';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const PriorityIcon = ({ priority }) => {
    switch (priority) {
        case 'LOW': return <ArrowCircleDownIcon style={{ color : 'green' }} />;
        case 'HIGH': return <ArrowCircleUpIcon style={{ color : 'red' }} />;
        default: return <ArrowCircleRightIcon style={{ color : 'blue' }} />;
    }
};

PriorityIcon.propTypes = {
    priority : PropTypes.oneOf(['LOW', 'NORMAL', "HIGH"]).isRequired
};

export default PriorityIcon;