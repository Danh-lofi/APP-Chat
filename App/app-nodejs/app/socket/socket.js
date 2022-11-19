const socket = (io) => {
  let activeUsers = [];
  io.on("connection", (socket) => {
    // create group chat
    socket.on("createGroupChat", (data) => {
      console.log("create group chat data socket: ");
      console.log(data);
      const { nameGroupChat } = data;
      socket.emit("listGroup", data);
    });

    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      console.log(data);
      const { receiverId } = data;
      if (Array.isArray(receiverId)) {
        receiverId.forEach((userReceiver) => {
          const user = activeUsers.find(
            (user) => user.userId === userReceiver.id
          );
          console.log("-----------Socket send mesage-------------------");
          console.log(user);
          if (user) {
            // gửi cho các users ngoại trừ sender
            io.to(user.socketId).emit("recieve-message", data);
          }
        });
      } else {
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", receiverId);
        console.log("Data: ", data);
        console.log(user);
        if (user) {
          // gửi cho các users ngoại trừ sender
          io.to(user.socketId).emit("recieve-message", data);
        }
      }
    });

    socket.on("send-require-friend", (data) => {
      console.log(
        "--------------------send-require-friend------------------------------"
      );
      console.log(data);
      const { _id } = data;

      const user = activeUsers.find((user) => user.userId === _id);
      console.log("Sending from socket to :", _id);
      console.log("Data: ", data);
      console.log(user);
      if (user) {
        // gửi cho các users ngoại trừ sender
        io.to(user.socketId).emit("recieve-require-friend", data);
      }
    });
  });
};

export default socket;
