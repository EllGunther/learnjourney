const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
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