import configRoutes from "../config/configRoutes";
import Forgot from "../pages/forgot/Forgot";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const mainRoutes = [{ path: configRoutes.home, component: Login }];
export const authRoutes = [
  { path: configRoutes.home, component: Login },
  { path: configRoutes.login, component: Login },
  { path: configRoutes.register, component: Register },
  { path: configRoutes.forgot, component: Forgot },
];

export default mainRoutes;
