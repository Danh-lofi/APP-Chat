import routerAuth from "./Auth.js";

function route(app) {
  // ROUTE sử dụng đường dẫn nào
  app.use("/", routerAuth);
}

export default route;
