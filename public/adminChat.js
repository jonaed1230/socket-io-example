const socket = io("http://localhost:3000");


document.querySelector('.message-form').addEventListener('submit',formSubmission)

function formSubmission(event){
    event.preventDefault();
   const newMessage =  document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', {text: newMessage})
}

socket.on('messageToClients',(msg) => {
    //console.log(data);
    console.log(msg);
    console.log(`Soba 1`)
    const newMsg = buildHTML(msg);
    document.querySelector('#messages').innerHTML += newMsg
})
socket.on('staticToClient', (data) => {
    console.log(data);
})


function buildHTML(msg){
    const newHTML = `
    <li>
    <div class="user-image">
        <img src="https://via.placeholder.com/30" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msg.username}<span>${msg.time}</span></div>
        <div class="message-text">${msg.text}</div>
    </div>
</li>
    `
    return newHTML;
}