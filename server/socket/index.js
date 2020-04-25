module.exports = io => {
  io.on("connection", socket => {
    console.log("connection has been established");
    socket.on("meetup/subscribe", meetupId => {
      console.log(`Joining meetup meetup-${meetupId}`);
      socket.join(`meetup-${meetupId}`);
    });

    socket.on("meetup/unsubscribe", meetupId => {
      console.log(`Leaving meetup meetup-${meetupId}`);
      socket.leave(`meetup-${meetupId}`);
    });

    socket.on("meetup/postSaved", post => {
      console.log("emitting to meetup", `meetup-${post.meetup}`);
      socket.to(`meetup-${post.meetup}`).emit("meetup/postPublished", post);
    });
  });
};
