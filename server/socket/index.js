module.exports = io => {
  io.on("connection", socket => {
    console.log("connection has been established");
    socket.on("meetup/postSave", post => {
      io.emit("meetup/postPublished", post);
    });
  });
};
