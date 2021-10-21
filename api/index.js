/*
                        ░░░░░░▄█▄█░░░░░▄░░░░░░
                        ░░░░██████░░░░░░█░░░░░
                        ░░░░░░███████████░░░░░
                        ▒▒▒▒▒▒█▀▀█▀▀██▀██▒▒▒▒▒
                        ▒▒▒▒▒▄█▒▄█▒▒▄█▒▄█▒▒▒▒▒
 */

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
servidor = require("http").createServer(server);
const socketIo = require("socket.io");

const io = socketIo(servidor, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connection made successfully", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User join Room : " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  servidor.listen({ port: process.env.PORT || 3001 }, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
