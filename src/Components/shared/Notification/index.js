class Notification{
    constructor(message,type){
        this.appendTo = document.querySelector("#App");
        this.message = message;
        this.type = type;
        this.displayMessage();
    }
    displayMessage(){
        const uniqueID = Date.now();
        const messageHTML = `<div class = 'notification error ${this.type}' id = 'notification-${uniqueID}'>
                                <p>${this.message}</p>
                            </div>`;
        this.appendTo.insertAdjacentHTML("beforeend",messageHTML);

        const newNotification = document.querySelector(`#notification-${uniqueID}`);
        
        //fly in
        setTimeout(()=>{
            newNotification.classList.add("fly-in");
        },100)
        //fly out
        setTimeout(()=>{
            newNotification.classList.remove("fly-in");
            newNotification.classList.add("fly-out");
        },2000)
        //remove
        setTimeout(()=>{
            newNotification.remove();
        },3000)
    }
}

export default Notification;