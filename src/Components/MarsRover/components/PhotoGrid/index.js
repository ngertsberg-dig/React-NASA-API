import React from 'react';
import './index.sass';

const PhotoGrid = ({ photos }) => {
    const roverPhotos = photos.photos;
    return(
        <div id = "PhotoGrid">
            {roverPhotos.map((el,index)=>{
                return (
                    <div className = 'individual-rover-photo'>
                        <div className = 'rover-photo-image'>
                            <img src = {el.img_src} />
                        </div>
                        <div className = 'rover-photo-description'>
                            <div className = 'earth-date'>
                                <p>Earth Date: <span>{el.earth_date}</span></p>
                            </div>
                            <div className = 'camera-description'>
                                <p>Camera: <span>{el.camera.full_name}</span></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default PhotoGrid;