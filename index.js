// node server which will handdle chat server
// import socket.io and run it on 8000 port
const io = require("socket.io")(7000, {
  // use cors because of get api data without restriction
  cors: {
    "*": "*",
  },
});
// make a object where all user name and massages are going to saved
const user = {};
// set connecton between socket.io and node Server

io.on("connection", (Socket) => {
  Socket.on("new-user-joined", (names) => {
    user[Socket.id] = names;
    Socket.broadcast.emit("user-joined", names);
  });
  Socket.on("send", (msg) => {
    Socket.broadcast.emit("recieve", { names: user[Socket.id], message: msg });
  });
  // disconnect with caht app
  Socket.on("disconnect", () => {
    Socket.broadcast.emit("leave", user[Socket.id]);
    delete user[Socket.id];
  });
});


