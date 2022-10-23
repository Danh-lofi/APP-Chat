import configRoutes from "../config/configRoutes";
import Forgot from "../pages/forgot/Forgot";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import Logout from "../pages/logout/Logout";
import ConfirmOTP from "../pages/confirmOTP/ConfirmOTP";

import ResetPassword from "../pages/reset-pass/ResetPassword";
import Info from "../pages/register-info/Register_info";

const mainRoutes = [{ path: configRoutes.home, component: Login }];
export const authRoutes = [
  { path: configRoutes.home, component: Login },
  { path: configRoutes.login, component: Login },
  { path: configRoutes.register, component: Register },
  { path: configRoutes.forgot, component: Forgot },
  { path: configRoutes.profile, component: Profile },
  { path: configRoutes.logout, component: Logout },
  { path: configRoutes.confirmOTP, component: ConfirmOTP },
  { path: configRoutes.resetPassword, component: ResetPassword },
  { path: configRoutes.info, component: Info },
];

export default mainRoutes;
