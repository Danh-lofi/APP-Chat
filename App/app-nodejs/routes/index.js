import routerAuth from "./Auth.js";
import routerChat from "./ChatRoute.js";
import routerMessage from "./MessageRoute.js";
import routerFriend from "./LoadFriendRoute.js";
import routerGroupChat from "./GroupChatRouter.js";

function route(app) {
  // ROUTE sử dụng đường dẫn nào
  app.use("/", routerAuth);
  app.use("/messages", routerMessage);
  app.use("/chat", routerChat);
  app.use("/friend", routerFriend);
  app.use("/groupChat", routerGroupChat);
}

export default route;
