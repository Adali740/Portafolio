const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Un dispositivo se ha conectado');

    // Escuchar cuando alguien cambia el estado del video
    socket.on('video_action', (data) => {
        // Reenviar la acción (play, pause, seek) a todos los demás
        socket.broadcast.emit('video_action', data);
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});