const express = require(`express`)
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require(`path`)

// utils file
const emitMessage = require(`./utils/socket-io`)

app.get(`/`, (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

// connect to io
io.on(`connection`, (socket) => {
    console.log(`connect to io...`);

    io.emit(`welcome`, `Hello world`);

    socket.on(`chatMessage`, (message) => {
        console.log(message)
        io.emit(`responseMessage`, message);
    })
})

// connect to server
const port = 3000
server.listen(port, () => console.log(`connect to port ${port}...`))