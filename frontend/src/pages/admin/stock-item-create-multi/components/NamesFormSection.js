import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, InputAdornment, TextField } from '@mui/material';

const NamesFormSection = ({
    names,
    onDelete,
    onAddClick,
    onChange,
    errors
}) => {
    useEffect(() => {
        document.querySelector(`input[name=name${names.length - 1}]`).focus();
    }, [names.length]);

    return (
        <>
            { names.map((name, idx) => (
                <TextField
                    key={idx}
                    id={`name${idx}`}
                    name={`name${idx}`}
                    label="Název"
                    value={name}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={onChange(idx)}
                    error={!!errors[`name${idx}`]}
                    helperText={errors[`name${idx}`]}
                    InputProps={{
                        inputProps : {
                            maxLength : 100
                        },
                        endAdornment : names.length > 1 ?
                            <InputAdornment position="end">
                                <DeleteIcon
                                    onClick={onDelete(idx)}
                                    style={{ cursor : 'pointer' }}
                                    titleAccess='Odstranit'
                                />
                            </InputAdornment> :
                            null
                    }}
                />
            ))}
            <Button 
                type="button" 
                color="primary" 
                variant="contained"
                id="add-item-btn"
                onClick={onAddClick}
            >
                Přidat další
            </Button>
        </>
    );
};

NamesFormSection.propTypes = {
    names : PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete : PropTypes.func.isRequired,
    onAddClick : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired,
    errors : PropTypes.object
};

export default NamesFormSection;