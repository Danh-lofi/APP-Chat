import routerAuth from "./Auth.js";
import routerMessage from "./MessageRouter.js";

function route(app) {
  // ROUTE sử dụng đường dẫn nào
  app.use("/", routerAuth);
}

export default route;
