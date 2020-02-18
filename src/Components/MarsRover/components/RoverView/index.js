import React from 'react';
import apiKey from 'key.js';
import PhotoGrid from '../PhotoGrid/';
import ChangeSelection from '../ChangeSelection/';
import './index.sass';
import Loading from '../Loading';
import ImageModal from '../ImageModal/';

class RoverView extends React.Component{
    constructor(){
        super();
        this.state = {
            photos: null
        }
    }
    resetPhotos(){
        this.setState({photos:null})
    }
    componentDidMount(){
        this.fetchPhotos();
    }
    componentDidUpdate(){
        const { loading, rover, sol } = this.props.state;
        if(loading && rover && sol >= 0){
            this.fetchPhotos();
        }
    }
    refetch(){
        const { rover, sol } = this.props.state;
        console.log(rover,sol);
    }
    async fetchPhotos(){
        const { rover, sol } = this.props.state;
        // https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=4000&api_key=DEMO_KEY
        const apiRoute = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        const api = `${apiRoute}/${rover}/photos?sol=${sol}&api_key=${apiKey}`;
        const photosReq = await fetch(api);
        const photos = await photosReq.json();
        if(photos.photos.length === 0){
            this.setState({photos: null})
        }
        else{
            this.setState({ photos });
        }
        this.props.clearLoading();

    }
    render(){
        const { rover, sol, loading } = this.props.state;
        return(
            <div id = 'RoverView'>
                <div className = 'rover-photos'>
                    {!this.state.photos ? loading ? <Loading /> :<p className = 'no-photos'>No Photos found for this sol :( try a different one.</p> : loading ? <Loading /> : <PhotoGrid photos = {this.state.photos} />}
                </div>
                <ChangeSelection  
                    setLoading = {this.props.setLoading} 
                    clearLoading = {this.props.clearLoading} 
                    SelectionSet = {this.props.SelectionSet} 
                    rover = {rover} 
                    sol = {sol} 
                    refetch = {this.refetch.bind(this)}
                    resetPhotos = {this.resetPhotos.bind(this)}
                />
                <ImageModal />
            </div>
        )
    }
}

export default RoverView;