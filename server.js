const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
      });

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is upp and running");
})

//Socket setup

const io = socket(server);

io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});