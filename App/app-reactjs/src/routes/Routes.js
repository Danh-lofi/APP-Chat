import configRoutes from "../config/configRoutes";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const mainRoutes = [{ path: configRoutes.home, component: Login }];
export const authRoutes = [
  { path: configRoutes.home, component: Login },
  { path: configRoutes.login, component: Login },
  { path: configRoutes.register, component: Register },
];

export default mainRoutes;
