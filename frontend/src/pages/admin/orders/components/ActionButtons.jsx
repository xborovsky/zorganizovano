import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ActionButtons = ({
    onGenerateReportClicked,
    isGenerateReportProgress,
    onGenerateZasilkovnaCSVClicked,
    isGenerateZasilkovnaCSVProgress
}) => {
    return (
        <ButtonGroup variant="contained" color="primary" size="small">
            <Button
                onClick={onGenerateReportClicked}
                disabled={isGenerateReportProgress}>
                { isGenerateReportProgress ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Stáhnout report' }
            </Button>
            <Button
                onClick={onGenerateZasilkovnaCSVClicked}
                disabled={isGenerateZasilkovnaCSVProgress}>
                { isGenerateZasilkovnaCSVProgress ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Stáhnout CSV pro zásilkovnu' }
            </Button>
        </ButtonGroup>
    );
};

ActionButtons.propTypes = {
    onGenerateReportClicked : PropTypes.func.isRequired,
    isGenerateReportProgress : PropTypes.bool,
    onGenerateZasilkovnaCSVClicked : PropTypes.func.isRequired,
    isGenerateZasilkovnaCSVProgress : PropTypes.bool
};

export default ActionButtons;