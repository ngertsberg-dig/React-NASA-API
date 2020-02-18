import React from 'react';
import './index.sass';
const ImageModal = () => {

    const exitModal = e => {
        if(e.target.classList.contains("exitModal"))
            document.querySelector("#ImageModal").style.display = "none"
    }

    const chevronClick = (e) => {
        const chevron = e.target.closest(".slide");
        const dataImage = chevron.getAttribute("data-image");
        const getNextImage = document.querySelector(`.individual-rover-photo[data-key='${dataImage}']`);
        const newImage = getNextImage.querySelector(".rover-photo-image img").getAttribute("src");
        document.querySelector("#modalImage").setAttribute("src",newImage);
        const parentKey = parseFloat(getNextImage.getAttribute("data-key"));
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
        <div id = "ImageModal" className = "exitModal" onClick = {(e)=>exitModal(e)}>
            <div className = 'exitImageModal exitModal'>
                X
            </div>
            <SlideShow type = "left" clicked = {chevronClick}/>
            <img id = "modalImage" src = "" />
            <SlideShow type = "right" clicked = {chevronClick}/>
        </div>
    )
}

const SlideShow = ({ type, clicked }) => {
    return(
        <div className = {`slide slide-${type}`} onClick = {(e)=>clicked(e)}>
            <img src = "/arrows/chevron.png" />
        </div>
    )
}

export default ImageModal;