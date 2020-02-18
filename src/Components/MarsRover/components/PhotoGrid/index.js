import React from 'react';
import './index.sass';

const PhotoGrid = ({ photos }) => {
    const roverPhotos = photos.photos;

    const imageModalShow = (src,e) => {
        const ImageModal = document.querySelector("#ImageModal");
        ImageModal.style.display = "flex";
        ImageModal.querySelector("#modalImage").setAttribute("src",src);
        const parentContainer = e.target.closest(".individual-rover-photo");
        const parentKey = parseFloat(parentContainer.getAttribute("data-key"));
        const nextKey = parentKey + 1;
        const previousKey = parentKey - 1;
        
        previousKey == -1 ? 
            document.querySelector(".slide-left").classList.add("none") 
                : 
            document.querySelector(".slide-left").classList.remove("none");

        nextKey >= document.querySelectorAll(".individual-rover-photo").length ? 
            document.querySelector(".slide-right").classList.add("none") 
                : 
            document.querySelector(".slide-right").classList.remove("none");

            document.querySelector(".slide-left").setAttribute("data-image",previousKey);
            document.querySelector(".slide-right").setAttribute("data-image",nextKey);
        
    }
    return(
        <div id = "PhotoGrid">
            {roverPhotos.map((el,index)=>{
                return (
                    <div className = 'individual-rover-photo' data-key = {index} key ={index}>
                        <div className = 'rover-photo-image'>
                            <img src = {el.img_src} onClick = {(e)=>imageModalShow(el.img_src,e)}/>
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