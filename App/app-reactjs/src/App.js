import "./App.scss";
import { Routes, Route } from "react-router-dom";
import mainRoutes, { authRoutes } from "./routes/Routes";
import LayoutMain from "./layout/layout-main/LayoutMain";
import LayoutAuth from "./layout/layout-auth/LayoutAuth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PreviewImage from "./components/modals/preview-image/PreviewImage";
import { imageAction } from "./store/imageSlice";
import ChangeInfo from "./components/modals/change-info/ChangeInfo";

function App() {
  let isAuth = useSelector((state) => state.user.isLoggedIn);
  const isSelected = useSelector((state) => state.image.isSelected);

  return (
    <div className="App">
      {isSelected ? <PreviewImage /> : ""}
      {/* App dùng cho router */}
      {/* <ChangeInfo /> */}
      {isAuth ? (
        <Routes>
          {mainRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
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
            if (route.path === "/info") {
              isRegister = true;
            }
            return (
              <Route
                key={index}
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
