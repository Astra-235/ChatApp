//const ws = new WebSocket(`https://chatapp-ve90.onrender.com`);
const ws = new WebSocket(`ws://${window.location.host}`);
const userName = document.getElementById('userName')
const sendUserNameButton = document.getElementById('sendUserNameButton');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
ws.onopen = () => {
    console.log('Connected to the server');
};


//deactivate 'send message' button
sendButton.disabled = true

sendButton.style.backgroundColor = 'grey'


//grey out 'message' input box
messageInput.disabled = true

//deactivate the 'send username' button
// sendUserNameButton.disabled = true
// sendUserNameButton.style.background =rgba(245, 245, 245, 0.47);
// sendUserNameButton.style.color =rgb(170, 169, 169);


//when something is entered in the username box, enable the 'send username' button

//when 'send username' button is pressed:
    // messages box reads 'Welcome to the chat!'
    // activate 'send message' button
    // un-grey-out the 'message' input box


ws.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    messages.appendChild(message);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from the server');
};

sendButton.onclick = () => {
    const message = messageInput.value;
    ws.send(message);
    messageInput.value = '';
};

sendUserNameButton.onclick = () => {
    ws.send([userName.value]);
    userName.value = '';
    messages.innerText = 'Welcome to the chat!'
    sendButton.disabled = false
    messageInput.disabled = false
    sendButton.style.backgroundColor = 'rgb(59 130 246)'

};

