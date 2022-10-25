import "./App.scss";
import { Routes, Route } from "react-router-dom";
import mainRoutes, { authRoutes } from "./routes/Routes";
import LayoutMain from "./layout/layout-main/LayoutMain";
import LayoutAuth from "./layout/layout-auth/LayoutAuth";
import { useSelector } from "react-redux";

function App() {
  let isAuth = useSelector((state) => state.user.isLoggedIn);
  return (
    <div className="App">
      {/* App dùng cho router */}
      {!isAuth ? (
        <Routes>
          {mainRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                path={route.path}
                element={
                  <LayoutMain>
                    <Page />
                  </LayoutMain>
                }
              ></Route>
            );
          })}
        </Routes>
      ) : (
        <Routes>
          {authRoutes.map((route, index) => {
            const Page = route.component;
            let isRegister = false;
            if (route.path === "/register" || route.path === "/info") {
              isRegister = true;
            }
            return (
              <Route
                path={route.path}
                element={
                  <LayoutAuth isRegister={isRegister}>
                    <Page />
                  </LayoutAuth>
                }
              ></Route>
            );
          })}
        </Routes>
      )}
    </div>
  );
}

export default App;
