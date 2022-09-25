import routerUser from "./User.js";

function route(app) {
  app.use("/", routerUser);
}

export default route;
