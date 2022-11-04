import routerAuth from "./Auth.js";
import routerChat from "./ChatRoute.js";
import routerFriend from "./FriendRoute.js";
import routerMessage from "./MessageRoute.js";

function route(app) {
  // ROUTE sử dụng đường dẫn nào
  app.use("/", routerAuth);
  app.use("/messages", routerMessage);
  app.use("/chat", routerChat);
  app.use("/friend", routerFriend);
}

export default route;
