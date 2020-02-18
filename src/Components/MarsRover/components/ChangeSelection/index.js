import React, { useState, useEffect, useRef } from 'react';
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
    const didMount = useRef(false);

    const GetNewImages = () => {
        if(changedRover && changedSol >= 0){
            setLoading();
            resetPhotos();
            SelectionSet(changedSol,changedRover);
            refetch();
            didMount.current = false;
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

    const solButtonClick = type => {
        const add = type === "+" ? true : false;
        let newSol = changedSol;
        add ? newSol++ : newSol--;
        didMount.current = true;
        document.querySelector("input#solInput").value = newSol;
        setSol(newSol);
    }
    useEffect(()=>{
        didMount.current ? GetNewImages() : didMount.current = false;
    },[changedSol]);

    return(
        <div id = 'ChangeSelection'>
            <div className = 'rovers'>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    {rovers.map((el,index)=>{
                        if(el.data === rover){
                            return <Button onClick = {() => changeCurrentRover(el.data)} className = {`active ${el.data}`} key = {index}>{el.name}<small>{el.minSol} - {el.maxSol}</small></Button>
                        }else{
                            return <Button onClick = {() => changeCurrentRover(el.data)} className = {`${el.data}`} key = {index}>{el.name}<small>{el.minSol} - {el.maxSol}</small></Button>
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
            <div id = 'changeSolUpDown'>
                <SolButton type = "increment" click = "+" clicked = {solButtonClick} />
                <SolButton type = "decrement" click = "-" clicked = {solButtonClick} />
            </div>
        </div>
    )
}

const SolButton = ({ type, click, clicked }) => {
    return( 
        <div className = {`sol-button ${type}-sol`} onClick = {(event)=>clicked(click)}> 
            <img src = "/arrows/chevron.png" />
        </div>
    )
}



export default ChangeSelection;