require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const rooms = {
	room1: {
		users: [],
		image: undefined,
		description: 'sdgfswder sw saw'
	}
};

app.get('/rooms', (req, res) => {
	res.send(rooms);
})






const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
		  rooms[roomID].users.push(socket.id);
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = rooms[roomID].users.filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = rooms[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            rooms[roomID] = room;
        }
    });

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));


