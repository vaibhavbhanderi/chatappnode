const socket=io('http://localhost:7000')
const form=document.getElementById("sendcontainer")
const messageinput=document.getElementById("messageinp")
const messagecontainer=document.querySelector(".container")
// let messagearea=document.querySelector(".messagearea")


var audio=new Audio("ring.mp3");


const append=(message,position)=>{
    const messageElement=document.createElement("div")
    messageElement.innerHTML=message;
    messageElement.classList.add("message")
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)
    scrolltobottom();
    if(position=="left"){
        audio.play();
    }

}

form.addEventListener("submit",(e)=>{
e.preventDefault();
const message=messageinput.value;
append(`You: ${message}`,"right")
socket.emit("send",message)
messageinput.value=" "
})

let name;
do  {

    name=prompt(`please enter your name:${name}`)
   
} while (!name); 
socket.emit("newuserjoin",name);



socket.on("userjoin",(name)=>{
    append(`${name} joined the chat`, "right")
    // scrolltobottom();

})
socket.on("receive",(data)=>{
    append(`${data.name} : ${data.message}`,"left")
    // scrolltobottom();

})
socket.on("left",(name)=>{
    append(`${name} : left the chat`,"right")

})



function scrolltobottom (){
    messagecontainer.scrollTop=messagecontainer.scrollHeight;
    

}


