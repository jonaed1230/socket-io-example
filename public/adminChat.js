const socket = io("http://localhost:3000");

// get the username from query params
const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join user in
socket.emit("join", { username });

socket.on("message", (message) => {
  document.querySelector("#messages").innerHTML += buildHTML(message);
});

document
  .querySelector(".message-form")
  .addEventListener("submit", formSubmission);

function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("chatMessage", newMessage);
}

function buildHTML(msg) {
  const newHTML = `
    <li>
    <div class="user-image">
        <img src="https://via.placeholder.com/30" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msg.username}</div>
        <div class="message-text">${msg.text}</div>
    </div>
</li>
    `;
  return newHTML;
}
