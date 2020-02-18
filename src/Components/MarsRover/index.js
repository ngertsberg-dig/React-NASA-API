import React from 'react';
import Selection from './components/Selection';
import RoverView from './components/RoverView';


class MarsRover extends React.Component{
    constructor(){
        super();
        this.state = {
            rover: null,
            sol: null,
            loading: false
        }
    }
    SelectionSet(sol,rover){
        this.setState({rover:rover, sol:sol});
    }
    setLoading(){
        this.setState({rover:null,sol:null,loading:true})
    }
    clearLoading(){
        this.setState({loading:false})
    }

    render(){
        let currentView;
        if(this.state.rover === null && !this.state.loading || this.state.sol === null && !this.state.loading){
            currentView = <Selection setLoading = {this.setLoading.bind(this)} SelectionSet = {this.SelectionSet.bind(this)} />
        }else{
            currentView = <RoverView setLoading ={this.setLoading.bind(this)} clearLoading = {this.clearLoading.bind(this)} SelectionSet = {this.SelectionSet.bind(this)} state = {this.state} />
        }
        return(
            <div id = 'MarsRover'>
                {currentView}
            </div>
        )
    }
}

export default MarsRover