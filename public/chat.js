const socket = io("http://localhost:9000");


document.querySelector('.message-form').addEventListener('submit',formSubmission)

function formSubmission(event){
    event.preventDefault();
   const newMessage =  document.querySelector('#user-message').value;
   socket.emit('newMessageToServer', {text: newMessage})
   const a = 'Static'
   socket.emit('StaticToServer',(a))
}

socket.on('messageToClients',(msg) => {
    //console.log(data);
    console.log(msg);
    const newMsg = buildHTML(msg);
    document.querySelector('#messages').innerHTML += newMsg
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