const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { SocketAddress } = require('net');
const { Server, Socket } = require("socket.io");
const io = new Server(server);
//const { ExpressPeerServer } = require("peer");
const port = process.env.PORT || "1000";

/*const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: "/home",
    ssl: {},
});*/

//app.use(peerServer);

app.use(express.static(path.join("home")));

app.get("/", (request, response) => {
    response.sendFile(`${"home"}/index.html`);
});

server.listen(port);
console.log(`Listening on: ${port}`);

io.on('connection', (socket) => {
    console.log("connection");
    socket.on("disconnecting", () => {
        console.log("deconnection");
    })
    socket.on('chat message', (msg) => {
        console.log(msg[1]);
        if (msg[0] == "master#24") {
            if (msg[1] == "282879") {
                io.emit('chat message', "success");
            }
        };
        if (msg[0][0] == "@") {
            io.emit('chat message', "journey");
        }
        if (msg[0] == "tableau") {
            socket.broadcast.emit('chat message', ["tableau", msg[1]]);
        }
        //io.emit('chat message', msg);
    })
})