import routerAuth from "./Auth.js";
import routerChat from "./Chat.js";
import routerMessage from "./Message.js";
function route(app) {
  app.use("/", routerAuth);
  app.use("/chat", routerChat);
  app.use("/message", routerMessage);
}

export default route;
