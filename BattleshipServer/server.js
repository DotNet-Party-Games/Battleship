// creates an express object
const app = require('express')();
// creates a server using http?
const http = require('http').Server(app);
// connects socketio with express server?
const io = require('socket.io')(http);

// create a collection of rooms
const rooms = {};
// collection of messages
const messages = [];

const gameStart = new Map();

// logic for when a socket connects to the server
// server event listener
io.on('connection', socket => {
    let previousRoomId = 5;
    socket.join(previousRoomId);
    // create a way to joins rooms
    const safeJoin = currentRoomId => {
        // leave previous room
        socket.leave(previousRoomId);
        // join new room with debugging message to console
        socket.join(currentRoomId, () => console.log(`Socket ${socket.id} joined room ${currentRoomId}`));
        // keep track of current room
        previousRoomId = currentRoomId;
    };

    // logic for when a socket tries to join a room
    socket.on('join room', roomId => {
        safeJoin(roomId);
        // joining socket will know this one joined a room?
        socket.emit('room', rooms[roomId]);
    });

    // logic for when a socket wants to add a room to the room list
    socket.on('add a room', room => {
        rooms[room.id] = room;
        safeJoin(room.id);
        // io.emit broadcasts to all clients, not just the acting socket
        io.emit('rooms', Object.keys(rooms));
        socket.emit('room', room);
    });

    // logic for when a socket sends a message in chat
    socket.on('message', msg => {
        messages[msg] = msg;
        //console.log(`Message on the server is ${messages[msg.id]}`);
        console.log(messages);
        io.emit('get message', Object.keys(messages));
        socket.emit('see message', msg);
    });


    socket.on('send player board to opponent', (data)=> {
        socket.broadcast.emit('enemy fleet', data);
        console.log(data.ocean);
    });

    socket.on('send shot', (data)=>{
        socket.broadcast.emit('enemy shoots',data);
        socket.broadcast.emit('turn change', true)
        socket.emit("turn change",false);
    });

    socket.on('status message', (data)=>{
        socket.to(previousRoomId).emit('status message', data);
    });

    socket.on('update name', (data)=>{
        socket.to(previousRoomId).emit('enemy name', data);
    })

    socket.on('test board', data =>{
        console.log("Board Test");
        socket.to(previousRoomId).emit('enemy shoots', data);
    });

    socket.on('player ready', ()=>{
                socket.to(previousRoomId).emit('opponent ready', true);
    });

    socket.on('start game', () => {
        let test;
        io.emit('game active status', true);
        test = Math.floor(Math.random()*2);
        if(test==0){
            socket.emit('turn change', true);
        } else{
            socket.broadcast.emit('turn change',true);
        }

    })

    // broadcast call rooms and sockets that have connected
    io.emit('rooms', Object.keys(rooms));

    console.log(`Socket ${socket.id} has connected`);

    socket.on('disconnect', () =>{
        socket.leave(previousRoomId);
    })
});

// broadcast server to a port so others can listen in
http.listen(3000, () => {
    console.log('Listening on port 3000');
});