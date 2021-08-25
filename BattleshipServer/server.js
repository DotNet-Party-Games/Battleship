// creates an express object
const app = require('express')();
// creates a server using http?
const http = require('http').Server(app);
// connects socketio with express server?
const io = require('socket.io')(http);

// create a collection of rooms
let rooms = [];
// collection of messages
const userMap = new Map();
const teams = {};
userMap.set("Lobby",{MaxPlayers:0,usersInRoom:[]});

// logic for when a socket connects to the server
// server event listener
io.on('connection', socket => {
    let previousRoomId;
    let username;

    socket.on('first connection', user => {
        username = user;
        safeJoin("Lobby");
    });

    const RemoveUserFromList = () => {
        if(userMap.get(previousRoomId)){
            let temp = userMap.get(previousRoomId);
            temp.usersInRoom=temp.usersInRoom.filter(user => user!=username);
            userMap.set(previousRoomId, temp);
            if(temp.usersInRoom.length==0 && previousRoomId != "Lobby"){
                RemoveRoomFromList();
            }
        }
    }

    const RemoveRoomFromList = () => {
        rooms = rooms.filter(place => place != previousRoomId);
        io.emit('rooms', rooms);
        console.log(previousRoomId + " removed from list");
    }

    const AddUserToList = () => {
        console.log(userMap.get(previousRoomId));
        if(userMap.get(previousRoomId)){
            let temp = userMap.get(previousRoomId);
            if(temp.usersInRoom.length>0){ 
            temp.usersInRoom.push(username);
            console.log(temp.usersInRoom);
                if(temp.usersInRoom.length<3){
                socket.emit('is water',true);
                }
                else{
                socket.emit('is water', false);
                }
            }
            else{
                temp.usersInRoom = [username];
                socket.emit('is water,',true);
            }
            userMap.set(previousRoomId,temp);
            if(temp.MaxPlayers == temp.usersInRoom.length && previousRoomId != "Lobby"){
                RemoveRoomFromList();
            }
        }
    }

    // create a way to joins rooms
    const safeJoin = currentRoomId => {
        // leave previous room
        socket.leave(previousRoomId);
        RemoveUserFromList();
        // join new room with debugging message to console
        socket.join(currentRoomId);
        // keep track of current room
        previousRoomId = currentRoomId;
        AddUserToList();
    };

    // logic for when a socket tries to join a room
    socket.on('join room', roomId => {
        console.log(roomId);
        safeJoin(roomId);
        // joining socket will know this one joined a room?
        socket.emit('room', roomId);
    });

    // logic for when a socket wants to add a room to the room list
    socket.on('add a room', room => {
        rooms.push(room.id);
        userMap.set(room.id,{MaxPlayers:room.maxPlayers,usersInRoom:[]});
        console.log(room.id);
        safeJoin(room.id);
        // io.emit broadcasts to all clients, not just the acting socket
        io.emit('rooms', rooms);
        socket.emit('room', room.id);
    });

    // logic for when a socket sends a message in chat
    socket.on('message', msg => {
        fullMessage = username+": "+msg;
        //console.log(`Message on the server is ${messages[msg.id]}`);
        io.to(previousRoomId).emit('get message', fullMessage);
    });


    socket.on('send player board to opponent', (data)=> {
        socket.to(previousRoomId).emit('enemy fleet', data);
        console.log(data.ocean);
    });

    socket.on('send shot', (data)=>{
        socket.to(previousRoomId).emit('enemy shoots',data);
        socket.to(previousRoomId).emit('turn change', true)
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
            socket.to(previousRoomId).emit('turn change',true);
        }


    });

    socket.on("send coordinates", (coords, room, userid)=>{
        console.log(coords);
    });

    socket.on('Leave Room', () =>{
        safeJoin("Lobby");
    });

    socket.on('win shot', ()=>{
        socket.to(previousRoomId).emit('loser', true);
        socket.emit('winner', true);
    });

    // broadcast call rooms and sockets that have connected
    io.emit('rooms', rooms);

    console.log(`Socket ${socket.id} has connected`);

    socket.on('disconnect', () =>{
        socket.to(previousRoomId).emit('winner',true);
        safeJoin("");
    })
});

// broadcast server to a port so others can listen in
http.listen(3000, () => {
    console.log('Listening on port 3000');
});
