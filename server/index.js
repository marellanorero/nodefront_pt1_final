import express from 'express';
import morgan from 'morgan';
import {Server as SocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
const router = require('./routes')

import {PORT} from './config.js';
import { createSocket } from 'dgram';


const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

app.use(cors());
app.use(morgan('dev'))
app.use(router);

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('join_chat', (data) => {
        socket.join(data)
        console.log('User Joined to chat ' + data)
    });

    socket.on('message', (message) => {
        console.log(message)
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id
        })
    });

/*     socket.on('disconnect', () => {
        console.log('USER DISCONNECTED')
    }) */
})

server.listen(PORT)
console.log('Server started on port', {PORT})