import React from 'react';
import './index.sass';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200
      },
    },
  }));
const SolSelect = ({ value,onChange }) => {
    return(
        <div className = 'solSelect'>
            <TextField
                id="solInput"
                label="Sol"
                variant="outlined"
                defaultValue = {value}
                onChange = {onChange}
            />
        </div>
    )
}

export default SolSelect;