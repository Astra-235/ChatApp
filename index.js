const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server by passing the Express app
const server = http.createServer(app);

// Integrate WebSocket with the HTTP server
const wss = new WebSocket.Server({ server });
let id = 1
wss.on('connection', function connection(ws, req) {
    const idCode = uuidv4()
    ws.idCode = idCode
    ws.id = id
    id += 1
    console.log("WS connection arrived");

    ws.userNameReceived = false;

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        console.log(message);
        const idCurrent = this.id
        //receiving userName
        if(!ws.userNameReceived){
            ws.userName = `${message}`
            console.log(ws.userName, '<---userName')
            ws.userNameReceived = true
        } else { 
        // wss.broadcast = function(data) {
        wss.clients.forEach(client => client.send(`[${ws.userName}]${message}`));
    }
});

    // Send a welcome message on new connection
    ws.send('Welcome to the chat!');
});

// Default route can be removed if you are serving only static files
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});