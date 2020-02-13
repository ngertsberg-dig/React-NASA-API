import React, { useState } from 'react';
import './index.sass';
import SolSelect from 'Components/shared/SolSelect';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import rovers from 'Components/MarsRover/RoverList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ChangeSelection = ({ rover, sol, SelectionSet, clearLoading, setLoading, refetch, resetPhotos }) => {
    const [changedRover, setRover] = useState(rover);
    const [changedSol, setSol] = useState(sol);

    const GetNewImages = () => {
        if(changedRover && changedSol){
            setLoading();
            resetPhotos();
            SelectionSet(changedSol,changedRover);
            refetch();
        }
        else{
            alert("There was an error with the input!");
        }
    }
    const changeCurrentSol = () => {
        const solValue = parseInt(document.querySelector("#ChangeSelection .solSelect input").value);
        if(isNaN(solValue)){
            setSol(null);
        }
        else{
            setSol(solValue);
        }
    }
    const changeCurrentRover = (data) => {
        const allButtons = document.querySelectorAll("#ChangeSelection .rovers button");
        allButtons.forEach(el=>el.classList.remove("active"));
        document.querySelector(`#ChangeSelection .rovers button.${data}`).classList.add("active")
        setRover(data);
    }
    return(
        <div id = 'ChangeSelection'>
            <div className = 'rovers'>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    {rovers.map((el,index)=>{
                        if(el.data === rover){
                            return <Button onClick = {() => changeCurrentRover(el.data)} className = {`active ${el.data}`} key = {index}>{el.name}</Button>
                        }else{
                            return <Button onClick = {() => changeCurrentRover(el.data)} className = {`${el.data}`} key = {index}>{el.name}</Button>
                        }

                    })}
                </ButtonGroup>
            </div>
            <SolSelect onChange = {changeCurrentSol} value = {sol} />
            <div id = 'submitChangeSelection'>
                <Button variant="contained" color="primary" onClick = {GetNewImages}>
                    SUBMIT
                </Button>
            </div>
        </div>
    )
}

export default ChangeSelection;