const express = require('express');
const app = express();
const http = require('http');
const internal = require('stream');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
    allowEIO3: true
  });
// create a collection of rooms
let rooms = [];
// collection of messages
const userMap = new Map();
const socketMap = new Map();
userMap.set("Lobby",{maxPlayers:0,usersInRoom:[]});

// logic for when a socket connects to the server
// server event listener
io.on('connection', socket => {
    let previousRoomId;
    let username;
    let playerNumber;
    let size;

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
        if(userMap.get(previousRoomId)){
            let temp = userMap.get(previousRoomId);
            let tempSocket = socketMap.get(previousRoomId);
            if(temp.usersInRoom.length>0){ 
            temp.usersInRoom.push(username);
            tempSocket.push(socket.id);
            }
            else{
                temp.usersInRoom = [username];
                tempSocket = [socket.id];
            }
            userMap.set(previousRoomId,temp);
            socketMap.set(previousRoomId,tempSocket);
            if(temp.maxPlayers == temp.usersInRoom.length && previousRoomId != "Lobby"){
                io.to(previousRoomId).emit('room full',true);
                RemoveRoomFromList();
                
            }
            if(temp.maxPlayers == 4){
                switch (temp.usersInRoom.length) {
                    case 1:
                        socket.emit('player team', true);
                        socket.emit('is water', true);
                        team = true;
                        water = true;
                        break;
                    case 2:
                        socket.emit('player team', true);
                        socket.emit('is water', false);
                        team = true;
                        water = false;
                        break;
                    case 3:
                        socket.emit('player team', false);
                        socket.emit('is water', true);
                        team = false;
                        water = true;
                        break;
                    case 4:
                        socket.emit('player team', false);
                        socket.emit('is water', false);
                        team = false;
                        water = false;
                        break;
                    default:
                        break;
                }
            }else if(temp.maxPlayers == 2){
                switch (temp.usersInRoom.length) {
                    case 1:
                        socket.emit('player team', true);
                        socket.emit('is water', true);
                        team = true;
                        water = true;
                        break;
                    case 2:
                        socket.emit('player team', false);
                        socket.emit('is water', true);
                        team = false;
                        water = true;
                        break;
                    default:
                        break;
                }
            }
            socket.emit('max size', temp.maxPlayers);
            size = temp.maxPlayers;
            socket.emit('player number', temp.usersInRoom.length);
            playerNumber = temp.usersInRoom.length-1;
            io.to(previousRoomId).emit('user list', temp.usersInRoom);
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
        socket.emit('room', previousRoomId);
    };

    // logic for when a socket tries to join a room
    socket.on('join room', roomId => {
        safeJoin(roomId);
    });

    // logic for when a socket wants to add a room to the room list
    socket.on('add a room', ({id:id, maxPlayers:maxPlayers}) => {
        rooms.push(id);
        userMap.set(id,{maxPlayers:maxPlayers,usersInRoom:[]});
        socketMap.set(id,[]);
        safeJoin(id);
        // io.emit broadcasts to all clients, not just the acting socket
        io.emit('rooms', rooms);
    });

    // logic for when a socket sends a message in chat
    socket.on('message', msg => {
        fullMessage = username+": "+msg;
        //console.log(`Message on the server is ${messages[msg.id]}`);
        io.to(previousRoomId).emit('get message', fullMessage);
    });


    socket.on('send board', (data)=> {
        let temp = socketMap.get(previousRoomId);
        if(size == 4){
        switch (playerNumber) {
            case 0:
                socket.to(temp[1]).emit('teammate start', data);
                socket.to(temp[2]).to(temp[3]).emit('enemy sea start',data);
                break;
            case 1:
                socket.to(temp[0]).emit('teammate start', data);
                socket.to(temp[2]).to(temp[3]).emit('enemy air start',data);
                break;
            case 2:
                socket.to(temp[3]).emit('teammate start', data);
                socket.to(temp[0]).to(temp[1]).emit('enemy sea start',data);
                break;
            case 3:
                socket.to(temp[2]).emit('teammate start', data);
                socket.to(temp[0]).to(temp[1]).emit('enemy air start',data);
                break;
            default:
                break;
        }
    }
    if(size == 2){
        socket.to(previousRoomId).emit('enemy sea start',data);
    }
    });

    socket.on('send shot', (data)=>{
        let temp = userMap.get(previousRoomId);
        let tempSocket = socketMap.get(previousRoomId);
        if(temp.maxPlayers==4){
            switch (playerNumber) {
                case 0:
                    socket.to(tempSocket[1]).emit('team shoots',data)
                    socket.to(tempSocket[1]).emit('turn change',true);
                    io.to(previousRoomId).emit('current player turn',1)
                    socket.to(tempSocket[2]).to(tempSocket[3]).emit('enemy shoots',data)
                    break;
                case 1:
                    socket.to(tempSocket[0]).emit('team shoots',data)
                    socket.to(tempSocket[2]).emit('turn change',true);
                    io.to(previousRoomId).emit('current player turn',2)
                    socket.to(tempSocket[2]).to(tempSocket[3]).emit('enemy shoots',data)
                    break;
                case 2:
                    socket.to(tempSocket[3]).emit('team shoots',data)
                    socket.to(tempSocket[3]).emit('turn change',true);
                    io.to(previousRoomId).emit('current player turn',3)
                    socket.to(tempSocket[0]).to(tempSocket[1]).emit('enemy shoots',data)
                    break;
                case 3:
                    socket.to(tempSocket[2]).emit('team shoots',data)
                    socket.to(tempSocket[0]).emit('turn change',true);
                    io.to(previousRoomId).emit('current player turn',0)
                    socket.to(tempSocket[0]).to(tempSocket[1]).emit('enemy shoots',data)
                    break;
                default:
                    break;
            }
        } else if(temp.maxPlayers==2){
            socket.to(previousRoomId).emit('turn change',true);
            if(playerNumber==0){
                io.to(previousRoomId).emit('current player turn',1)
            } else{
                io.to(previousRoomId).emit('current player turn',0)
            }
            socket.to(previousRoomId).emit('enemy shoots',data)
        }
        socket.emit('turn change', false);
    });

    socket.on('status message', (data)=>{
        io.to(previousRoomId).emit('status message', data);
    });

    socket.on('player ready', ()=>{
        switch (playerNumber) {
            case 0:
                io.to(previousRoomId).emit('player one ready', true)
                break;
            case 1:
                io.to(previousRoomId).emit('player two ready', true)
                break;
            case 2:
                io.to(previousRoomId).emit('player three ready', true)
                break;
            case 3:
                io.to(previousRoomId).emit('player four ready', true)
                break;
            default:
                break;
        }
    });

    socket.on('start game', () => {
        let test;
        let player;
        player = socketMap.get(previousRoomId);
        io.to(previousRoomId).emit('game active status', true);
        test = Math.floor(Math.random()*(player.length-1));
        io.to(player[test]).emit('turn change', true);
        io.to(player[test]).emit('current player turn',test);
    });

    socket.on('starting boards',({board1,board2})=>{
        temp = socketMap.get(previousRoomId);
        if(size == 4){
        switch (playerNumber) {
            case 1:
                socket.emit('enemy shoots',board1);
                socket.to(temp[1]).emit('enemy shoots',board1);
                socket.to(temp[2]).to(temp[3]).emit('team shoots', board2);
                break;
            case 2:
                socket.emit('enemy shoots',board1);
                socket.to(temp[0]).emit('enemy shoots',board1);
                socket.to(temp[2]).to(temp[3]).emit('team shoots', board2);
                break;
            case 3:
                socket.emit('enemy shoots',board1);
                socket.to(temp[3]).emit('enemy shoots',board1);
                socket.to(temp[0]).to(temp[1]).emit('team shoots', board2);
                break;
            case 4:
                socket.emit('enemy shoots',board1);
                socket.to(temp[2]).emit('enemy shoots',board1);
                socket.to(temp[0]).to(temp[1]).emit('team shoots', board2);
                break;
            default:
                break;
        }
    }
    if(size == 2){
        socket.to(previousRoomId).emit('team shoots', board2);
    }
    })

    socket.on('leave room', () =>{
        LeaverPenalty();
        safeJoin("Lobby");
    });

    socket.on('win shot', ()=>{
        let temp = socketMap.get(previousRoomId);
        if(size==2){
        socket.to(previousRoomId).emit('loser', true);
        socket.emit('winner', true);
        } else if(size==4){
            switch (playerNumber) {
                case 0:
                    socket.to(temp[1]).emit('winner',true);
                    socket.to(temp[2]).to(temp[3]).emit('loser', true);
                    break;
                case 1:
                    socket.to(temp[0]).emit('winner',true);
                    socket.to(temp[2]).to(temp[3]).emit('loser', true);
                    break;
                case 2:
                    socket.to(temp[3]).emit('winner',true);
                    socket.to(temp[0]).to(temp[1]).emit('loser', true);
                    break;
                case 3:
                    socket.to(temp[2]).emit('winner',true);
                    socket.to(temp[0]).to(temp[1]).emit('loser', true);
                    break;
            
                default:
                    break;
            }
            socket.emit('winner', true);
        }
    });

    socket.on('back to lobby after game', () => {
        safeJoin("Lobby");
    })

    const LeaverPenalty = () => {
            if(userMap.get(previousRoomId)){
                let players = socketMap.get(previousRoomId);
                let roomnumber = userMap.get(previousRoomId);
                if(roomnumber.maxPlayers == 4){
                    switch (playerNumber) {
                        case 0:
                            socket.to(players[1]).emit('loser', true)
                            socket.to(players[2]).to(players[3]).emit('winner', true)
                            break;
                        case 1:
                            socket.to(players[0]).emit('loser', true)
                            socket.to(players[2]).to(players[3]).emit('winner', true)
                            break;
                        case 2:
                            socket.to(players[3]).emit('loser', true)
                            socket.to(players[0]).to(players[1]).emit('winner', true)
                            break;
                        case 3:
                            socket.to(players[2]).emit('loser', true)
                            socket.to(players[0]).to(players[1]).emit('winner', true)
                            break;
                        default:
                            break;
                    }
                }
                if(roomnumber.maxPlayers==2){
                    socket.to(previousRoomId).emit('winner', true);
                }
            }
    }

    // broadcast call rooms and sockets that have connected
    io.emit('rooms', rooms);

    console.log(`Socket ${socket.id} has connected`);

    socket.on('disconnect', () =>{
        LeaverPenalty();
        safeJoin("");
    })
});

// broadcast server to a port so others can listen in
server.listen(process.env.PORT||3000, () => {
    console.log('Listening on port 3000');
});
