import React, { useState } from 'react';
import './index.sass';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import rovers from 'Components/MarsRover/RoverList';
import Notification from 'Components/shared/Notification';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    },
  },
}));

const Selection = ( props ) => {
    const [roverSelection, setRover] = useState(null);
    const [solSelection, setSol] = useState(null);

    const SelectRover = (rover) => {
        document.querySelectorAll(".individual-rover").forEach(el=> el.classList.remove("active") );
        const roverEl = document.querySelector(`.${rover}`);
        roverEl.classList.contains("active") ? roverEl.classList.remove("active") : roverEl.classList.add("active");
        setRover(rover);
    }

    const changeSol = () => {
        const sol = parseInt(document.querySelector("input#solInput").value);
        if(!isNaN(sol)){
            setSol(sol);
        }
    }
    
    const submitSelection = () => {
        if(solSelection && roverSelection){
            props.setLoading();
            props.SelectionSet(solSelection,roverSelection);
        }
        else{
            if(!solSelection && !roverSelection)
                new Notification("Please input a Sol date and select a rover to view!","error");
            else if(!solSelection && roverSelection)
                new Notification("Please input a Sol date!","error");
            else if(solSelection && !roverSelection)
                new Notification("Please choose a rover!","error");
        }
    }

    return(
        <div id = 'roverSelection'>
            <div className = 'wrapper'>
                <div id = 'rovers'>
                    {
                        rovers.map((el,index)=>(
                            <div key={index} className = {`individual-rover ${el.data}`} onClick={event=>SelectRover(el.data)}>
                                <div className='rover-image'>
                                    <img src = {`/rover-images/${el.image}`} />
                                </div>
                                <div className='rover-name'>
                                    <p>{el.name}</p>
                                </div>
                                <div className = 'max-sol'>
                                    <p>Sol range: {el.minSol} - {el.maxSol}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className = 'solSelect'>
                    <TextField
                        id="solInput"
                        label="Sol"
                        variant="outlined"
                        onChange = {changeSol}
                    />
                </div>
                <div className ='submit-selection'>
                    <Button variant="contained" color="primary" onClick = {submitSelection}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Selection;